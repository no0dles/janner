import {IProtoMessage} from "./message";

export class Packer<T extends IProtoMessage> {
  constructor(private message: T) {

  }

  new() {
    return new this.message() as T;
  }

  pack(data: T) {
    return data.toBase64();
  }

  unpack(data: string) {
    return this.message.decode64(data) as T;
  }
}