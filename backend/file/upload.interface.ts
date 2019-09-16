import { Readable } from "stream";

export interface Upload {
  createReadStream: () => Readable;
  filename: string;
  mimetype: string;
  encoding: string;
}
