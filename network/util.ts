import {networkInterfaces} from "os";
import {fromLong} from "ip";
import {toLong} from "ip";

export class AddressUtil {
  static getNetworkAddresses() {
    var addresses = [];
    var interfaces = networkInterfaces();
    for (var k in interfaces) {
      for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
          addresses.push(address);
        }
      }
    }

    return addresses;
  }

  static toLong(address: string) {
    return toLong(address);
  }

  static fromLong(address: number) {
    return fromLong(address);
  }
}