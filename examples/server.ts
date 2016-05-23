import {AddressUtil} from "../network/util";
import {PeerServer} from "../network/peer/server";

var servers = [];
for(var address of AddressUtil.getNetworkAddresses()) {
  servers.push(new PeerServer(address, 1337));
}

Promise.all(servers.map(s => s.init())).then(() => {
  console.log("done");
});
