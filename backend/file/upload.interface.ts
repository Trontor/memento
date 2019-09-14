import { Stream } from "stream";

export interface Upload {
  createReadStream: () => Stream;
  filename: string;
  mimetype: string;
  encoding: string;
}
