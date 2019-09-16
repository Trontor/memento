import { Readable } from "stream";

// Interface for GraphQL upload promise
export interface Upload {
  createReadStream: () => Readable;
  filename: string;
  mimetype: string;
  encoding: string;
}
