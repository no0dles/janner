export interface IProtoMessage {
  new(): IProtoMessage;
  decode64(string: string): IProtoMessage;
  toBase64(): string;
}