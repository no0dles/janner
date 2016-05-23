import {Socket} from "net";

export class PeerClient {

  private socket: Socket;

  constructor(private address: string, 
              private port: number) {
    this.socket = new Socket();
  }

  init() {
    return new Promise((resolve) => {
      this.socket.connect(this.port, this.address, () => {
        console.log('Connected');
        this.socket.write('Hello, server! Love, Client.');
        
        resolve();
      });

      this.socket.on('data', (data) => {
        console.log('Received: ' + data);
        //this.socket.destroy(); // kill client after server's response
        this.socket.end();
      });

      this.socket.on('timeout', () => {
        console.log('Connection closed');
      });

      this.socket.on('close', (hadError: boolean) => {
        console.log('Connection closed');
      });

      this.socket.on('end', () => {
        console.log('Connection closed');
      });

      this.socket.on("error", (error: Error) => {
        console.log(error);
      });
    });
  }
}