import {IProtoMessage} from "../packer/message";

export interface IDiscoveryMessage extends IProtoMessage {
  identifier: string;
  address: number;
  port: number;
}