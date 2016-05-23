import {Socket} from "net";
import {createServer} from "net";
import {Server} from "net";


export class PeerServer {

  private server: Server;

  constructor(private address: string,
              private port: number) {
  }

  init() {
    return new Promise((resolve) => {
      this.server = createServer((socket:Socket) => {

        socket.on("data", (data) => {
          console.log(data);
        });

        socket.on("close", () => {
          console.log("disconnected");
        });
      });

      this.server.on("error", (error: Error) => {
        console.log(error);
      });

      this.server.listen(
        this.port,
        this.address,
        () => {
          resolve();
        }
      );
    });
  }
}

