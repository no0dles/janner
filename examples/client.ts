import {PeerClient} from "../network/peer/client";

var client = new PeerClient(
  "192.168.0.125",
  1337);

client.init().then(() => {
  console.log("done");
});