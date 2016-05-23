"use strict";
var os_1 = require("os");
var ip_1 = require("ip");
var ip_2 = require("ip");
var AddressUtil = (function () {
    function AddressUtil() {
    }
    AddressUtil.getNetworkAddresses = function () {
        var addresses = [];
        var interfaces = os_1.networkInterfaces();
        for (var k in interfaces) {
            for (var k2 in interfaces[k]) {
                var address = interfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                    addresses.push(address);
                }
            }
        }
        return addresses;
    };
    AddressUtil.toLong = function (address) {
        return ip_2.toLong(address);
    };
    AddressUtil.fromLong = function (address) {
        return ip_1.fromLong(address);
    };
    return AddressUtil;
}());
exports.AddressUtil = AddressUtil;
//# sourceMappingURL=util.js.map