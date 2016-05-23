import {RemoteInfo} from "dgram";
import {Socket} from "dgram";
import {createSocket} from "dgram";
import {MulticastServer} from "./server";
import * as config from "config";

export class MulticastClient {

  private socket: Socket;
  private onMessageReceivedCallback: (message: string, remote: RemoteInfo) => void;

  onMessageReceived(callback: (message: string, remote: RemoteInfo) => void) {
    this.onMessageReceivedCallback = callback;
  }

  init() {
    return new Promise((resolve) => {
      this.socket = createSocket('udp4');

      this.socket.on('listening', () => {
        this.socket.setBroadcast(true);
        this.socket.setMulticastTTL(config.get<number>(MulticastServer.TTL));
        this.socket.addMembership(config.get<string>(MulticastServer.ADDRESS));

        resolve();
      });

      this.socket.on('message', (message: Buffer, remote: RemoteInfo) => {
        if(this.onMessageReceivedCallback) {
          this.onMessageReceivedCallback(message.toString(), remote);
        }
      });

      this.socket.bind(config.get<number>(MulticastServer.PORT));
    });
  }
}