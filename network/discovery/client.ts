import {RemoteInfo} from "dgram";
import {MulticastClient} from "../multicast/client";
import {IDiscoveryMessage} from "./message";
import {MulticastDiscoveryServer} from "./server";
import * as config from "config";
import {Packer} from "../packer/packer";
import {PackerLoader} from "../packer/loader";

export class MulticastDiscoveryClient {
  

  private client: MulticastClient;
  private packer: Packer<IDiscoveryMessage>;
  private onDiscoveryCallback: (message: IDiscoveryMessage, remote: RemoteInfo) => void;

  constructor() {
    this.client = new MulticastClient();
    this.packer = PackerLoader.loadPacker<IDiscoveryMessage>(
      config.get<string>(MulticastDiscoveryServer.PROTO_FILENAME),
      config.get<string>(MulticastDiscoveryServer.PROTO_PATH)
    );
  }

  init() {
    this.client.onMessageReceived((data, remote) => {
      var message = this.packer.unpack(data);

      if(this.onDiscoveryCallback) {
        this.onDiscoveryCallback(message, remote);
      }
    });

    return this.client.init();
  }

  onDiscovery(callback: (message: IDiscoveryMessage, remote: RemoteInfo) => void) {
    this.onDiscoveryCallback = callback;
  }
}