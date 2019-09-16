import { Injectable, Logger } from "@nestjs/common";
import { Upload } from "./upload.interface";
import { isImage } from "./file.utils";
import { S3Client } from "../aws/aws.s3.client";
import uuidv4 from "uuid/v4";
import { Readable } from "stream";
import { ManagedUpload } from "aws-sdk/clients/s3";
import { ConfigService } from "../config/config.service";
import * as os from "os";
import * as path from "path";
import { createWriteStream, unlink, createReadStream } from "fs";

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
  constructor(
    private readonly s3Client: S3Client,
    private readonly configService: ConfigService
  ) {}

  /**
   * Uploads an image and returns the url.
   * @param filePromise promise of Upload
   */
  public async uploadImage(filePromise: Promise<Upload>) {
    const file = await filePromise;
    const { createReadStream, mimetype } = file;
    // if (!isImage(mimetype)) {
    if (false) {
      this.logger.error(`"${mimetype}" not an accepted image format`);
      throw new Error("not an accepted image format");
    }
    return await this.uploadFile(createReadStream);
  }

  /**
   * Uploads stream and returns the url to the file.
   * @param createReadStream function that creates a Readable stream
   */
  private async uploadFile(
    createReadStreamFile: () => Readable
  ): Promise<string> {
    const filepath: string = uuidv4();
    const { writeStream, promise } = this.s3Client.uploadStream(filepath);
    const tmpPath = path.join(os.tmpdir(), filepath);

    try {
      let totalBytes: number = 0;
      const readStream: Readable = createReadStreamFile();
      readStream
        .on("data", chunk => {
          totalBytes += chunk.length;
          this.logger.debug(
            `Received ${chunk.length} bytes of data. Total = ${totalBytes} bytes`
          );
        })
        .on("error", err => {
          this.logger.error(err);
          // throw err;
        })
        .on("end", () => {
          this.logger.debug("Finished reading stream");
        });

      // save the file in tmp
      readStream
        .pipe(createWriteStream(tmpPath))
        .on("finish", () => {
          createReadStream(tmpPath)
            .on("error", err => {
              this.logger.error("Read tmp stream");
              this.logger.error(err);
              throw err;
            })
            .pipe(writeStream) // pipe to S3
            .on("error", err => {
              this.logger.error("Upload S3 stream");
              this.logger.error(err);
              throw err;
            });
        })
        .on("error", err => {
          this.logger.error("Save tmp stream");
          this.logger.error(err);
          throw err;
        });

      const res: ManagedUpload.SendData = await promise;
      this.logger.debug(res);
    } catch (err) {
      this.logger.error(err);
      throw err;
    } finally {
      unlink(tmpPath, () => {
        this.logger.log(`deleted ${tmpPath}`);
      });
    }
    const url: string = `${this.configService.cdnHostName}/${filepath}`;
    return url;
  }
}
