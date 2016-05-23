import {loadProtoFile, ProtoBuilder} from "protobufjs";
import {IProtoMessage} from "./message";
import {Packer} from "./packer";


export class PackerLoader {

  private static files: { [fielname: string]: ProtoBuilder } = {};

  static loadPacker<T extends IProtoMessage>(filename: string, path: string) {
    var builder = this.loadBuilder(filename);
    return new Packer<T>(<any>builder.build(path));
  }

  static loadBuilder(filename: string) {
    if(this.files[filename]) {
      return this.files[filename];
    }

    this.files[filename] = loadProtoFile(filename);

    return this.files[filename];
  }
}