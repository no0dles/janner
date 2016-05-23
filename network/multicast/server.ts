import {createSocket} from "dgram";
import {Socket} from "dgram";
import * as config from "config";

export class MulticastServer {

  public static ADDRESS = "network.multicast.address";
  public static PORT = "network.multicast.port";
  public static TTL = "network.multicast.ttl";

  private socket: Socket;

  init() {
    return new Promise((resolve) => {
      this.socket = createSocket('udp4');
      this.socket.bind(null, null, () => {
        this.socket.setBroadcast(true);
        this.socket.setMulticastTTL(config.get<number>(MulticastServer.TTL));

        resolve();
      });
    });
  }

  broadcast(message: string) {
    return new Promise((resolve, reject) => {
      var data = new Buffer(message);

      this.socket.send(
        data,
        0,
        data.length,
        config.get<number>(MulticastServer.PORT),
        config.get<string>(MulticastServer.ADDRESS),
        (error) => {
          if(error) {
            return reject(error);
          }

          resolve();
        }
      );
    });
  }
}