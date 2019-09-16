import { Injectable, Logger } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { ManagedUpload } from "aws-sdk/clients/s3";
import { Stream, PassThrough } from "stream";

@Injectable()
export class S3Client {
  private readonly logger = new Logger(S3Client.name);
  private connection: AWS.S3;

  constructor(private regionName: string, private bucketName: string) {
    this.connection = new AWS.S3({ region: this.regionName });
  }

  async upload(
    filePath: string,
    payload: any
  ): Promise<ManagedUpload.SendData> {
    try {
      const res = await this.connection
        .upload({
          Bucket: this.bucketName,
          Key: filePath,
          Body: payload
        })
        .promise();
      return res;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  public uploadStream(key: string) {
    const pass = new PassThrough();

    const manager = this.connection.upload({
      Bucket: this.bucketName,
      Key: key,
      Body: pass
    });

    manager.on("httpUploadProgress", progress => {
      this.logger.debug(progress); // { loaded: 4915, total: 192915, part: 1, key: 'foo.jpg' }
    });

    return {
      promise: manager.promise(),
      writeStream: pass
    };
  }
}
