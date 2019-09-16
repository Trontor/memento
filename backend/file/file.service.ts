import { Injectable, Logger, BadRequestException } from "@nestjs/common";
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
    const { createReadStream, filename, mimetype } = file;
    // if (!isImage(mimetype)) {
    if (false) {
      this.logger.error(`"${mimetype}" not an accepted image format`);
      throw new Error("not an accepted image format");
    }
    return await this.uploadFile(createReadStream, filename);
  }

  /**
   * Uploads stream and returns the url to the file.
   * @param createReadStream function that creates a Readable stream
   */
  private async uploadFile(
    createReadStreamFile: () => Readable,
    filename: string
  ): Promise<string> {
    const fileId: string = uuidv4();
    const ext = path.extname(filename);
    if (!ext) {
      throw new BadRequestException("No extension given to uploaded file");
    }
    const filepath = `${fileId}${ext}`;
    this.logger.log(filepath);
    const { writeStream, promise } = this.s3Client.uploadStream(filepath);
    const tmpPath = path.join(os.tmpdir(), filepath);

    const x: Promise<ManagedUpload.SendData> = new Promise(
      async (resolve, reject) => {
        let totalBytes: number = 0;
        createReadStreamFile()
          .on("data", chunk => {
            totalBytes += chunk.length;
            this.logger.debug(
              `Received ${chunk.length} bytes of data. Total = ${totalBytes} bytes`
            );
          })
          .on("error", err => {
            this.logger.error(err);
            reject(err);
          })
          .on("end", () => {
            this.logger.debug("Finished reading stream");
          })
          .pipe(createWriteStream(tmpPath)) // pipe to tmp
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
            reject(err);
          });

        const res: ManagedUpload.SendData = await promise;
        this.logger.debug(res);
        resolve(res);
      }
    );

    try {
      const res = await x;
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException("File too large motherfucker!");
    } finally {
      unlink(tmpPath, () => {
        this.logger.log(`deleted ${tmpPath}`);
      });
    }

    const url: string = `${this.configService.cdnHostName}/${filepath}`;
    return url;
  }
}
