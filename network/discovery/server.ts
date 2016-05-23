import {MulticastServer} from "../multicast/server";
import {AddressUtil} from "../util";
import {IDiscoveryMessage} from "./message";
import * as config from "config";
import {PackerLoader} from "../packer/loader";
import {Packer} from "../packer/packer";

export class MulticastDiscoveryServer {

  public static PROTO_FILENAME = "network.discovery.proto.filename";
  public static PROTO_PATH = "network.discovery.proto.path";

  private packer: Packer<IDiscoveryMessage>;
  private server: MulticastServer;

  constructor() {
    this.server = new MulticastServer();
    this.packer = PackerLoader.loadPacker<IDiscoveryMessage>(
      config.get<string>(MulticastDiscoveryServer.PROTO_FILENAME),
      config.get<string>(MulticastDiscoveryServer.PROTO_PATH)
    );
  }

  init() {
    return this.server.init();
  }

  broadcast(address: string, port: number, identifier: string) {
    var packet = this.packer.new();

    packet.address = AddressUtil.toLong(address);
    packet.port = port;
    packet.identifier = identifier;

    return this.server.broadcast(packet.toBase64());
  }
}