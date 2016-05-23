import {AddressUtil} from "../network/util";
import {MulticastDiscoveryServer} from "../network/discovery/server";
import {MulticastDiscoveryClient} from "../network/discovery/client";
import {RemoteInfo} from "dgram";
import {IDiscoveryMessage} from "../network/discovery/message";


var addresses = AddressUtil.getNetworkAddresses();

for(var address of addresses) {
  var server = new MulticastDiscoveryServer();
  var client = new MulticastDiscoveryClient();

  Promise.all([server.init(), client.init()]).then(() => {
    server.broadcast(address.address, 2123, "abc");
  }).catch((error) => {
    console.log(error);
  });

  client.onDiscovery((message: IDiscoveryMessage, remote: RemoteInfo) => {

    console.log(
      ' - Identifier: ' + message.identifier +
      ' - Address: ' + AddressUtil.fromLong(message.address) +
      ' - Port: ' + message.port
    );
    
  });
}