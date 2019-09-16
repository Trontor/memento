import { Injectable, Logger } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { ManagedUpload } from "aws-sdk/clients/s3";
import { PassThrough } from "stream";

/**
 * AWS S3 Client that wraps the `aws-sdk`.
 */
@Injectable()
export class S3Client {
  private readonly logger = new Logger(S3Client.name);
  private connection: AWS.S3;

  constructor(private regionName: string, private bucketName: string) {
    this.connection = new AWS.S3({ region: this.regionName });
  }

  /**
   * Returns a stream which can be written to for upload to S3.
   * Also returns a promise to obtain data when upload has finished.
   * @param key path for new file in S3 bucket
   */
  public uploadStream(key: string) {
    // create a new PassThrough stream that can be written to
    const pass = new PassThrough();

    // use the aws-sdk for upload
    const manager = this.connection.upload({
      Bucket: this.bucketName,
      Key: key,
      Body: pass
    });

    // debug logging of upload progress
    // example: { loaded: 4915, total: 192915, part: 1, key: 'foo.jpg' }
    manager.on("httpUploadProgress", progress => {
      this.logger.debug(progress);
    });

    return {
      uploadPromise: manager.promise(),
      writeStream: pass
    };
  }
}
