import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { Upload } from "./upload.interface";
import { isImage, isVideo } from "./file.utils";
import { S3Client } from "../aws/aws.s3.client";
import uuidv4 from "uuid/v4";
import { Readable, Writable } from "stream";
import { ManagedUpload } from "aws-sdk/clients/s3";
import { ConfigService } from "../config/config.service";
import * as os from "os";
import * as path from "path";
import { createWriteStream, unlink, createReadStream } from "fs";

/**
 * Manages file upload, deletion, updating.
 */
@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
  constructor(
    private readonly s3Client: S3Client,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Uploads an image and returns the url.
   * @param filePromise promise of Upload
   */
  public async uploadImage(filePromise: Promise<Upload>) {
    const file = await filePromise;
    const { createReadStream, filename, mimetype } = file;
    if (!isImage(mimetype)) {
      this.logger.error(`"${mimetype}" not an accepted image format`);
      throw new Error("not an accepted image format");
    }
    return await this.uploadFile(createReadStream, filename, mimetype);
  }

  /**
   * Uploads a video and returns the url.
   * @param filePromise promise of Upload
   */
  public async uploadVideo(filePromise: Promise<Upload>) {
    const file = await filePromise;
    const { createReadStream: createReadStreamFile, filename, mimetype } = file;
    if (!isVideo(mimetype)) {
      this.logger.error(`"${mimetype}" not an accepted video format`);
      throw new Error("not an accepted video format");
    }
    return await this.uploadFile(createReadStreamFile, filename, mimetype);
  }

  /**
   * Uploads stream and returns the url to the file.
   * @param createReadStream function that creates a Readable stream
   */
  private async uploadFile(
    createReadStreamFile: () => Readable,
    filename: string,
    mimetype: string,
  ): Promise<string> {
    // create a random file id to store file
    const fileId: string = uuidv4();
    const ext = path.extname(filename);
    if (!ext) {
      throw new BadRequestException("No extension given to uploaded file");
    }
    const filepath = `${fileId}${ext}`;
    this.logger.log(filepath);

    // create a stream for uploading to AWS S3 bucket
    const { writeStream, uploadPromise } = this.s3Client.uploadStream(
      filepath,
      mimetype,
    );

    // temporary path to store the file locally
    // to ensure file size is within limit before uploading to S3
    const tmpPath = path.join(os.tmpdir(), filepath);

    // let's finally create a stream for the incoming file
    const readStream: Readable = createReadStreamFile();

    let res: ManagedUpload.SendData;
    const tmpStream: Writable = createWriteStream(tmpPath);
    try {
      // wait for the upload to finish and resolve with S3 file metadata
      await this.handleUploadWithStreams(
        tmpPath,
        readStream,
        tmpStream,
        writeStream,
      );
      // get the response from S3
      res = await uploadPromise;
      this.logger.debug(res);
      const url: string = `https://${this.configService.cdnHostName}/${res.Key}`;
      return url;
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException("File exceeds size limit");
    } finally {
      // delete temporary file
      unlink(tmpPath, () => {
        this.logger.log(`deleted ${tmpPath}`);
      });
      // destroy streams
      readStream.destroy();
      writeStream.destroy();
      tmpStream.destroy();
    }
  }

  /**
   * Handles streams with logging.
   * @param tmpPath temporary path to save read stream to
   * @param readStream readable stream of data
   * @param tmpStream writeable stream of data for storing file temporarily on server
   * @param writeSteam passthrough stream
   */
  private handleUploadWithStreams(
    tmpPath: string,
    readStream: Readable,
    tmpStream: Writable,
    writeStream: Writable,
  ) {
    return new Promise<ManagedUpload.SendData>(async (resolve, reject) => {
      let totalBytes: number = 0;

      // setup event listeners for the read stream
      readStream
        .on("data", chunk => {
          totalBytes += chunk.length;
          this.logger.debug(
            `Received ${chunk.length} bytes of data. Total = ${totalBytes} bytes`,
          );
        })
        .on("error", err => {
          // catches the excess file size limit errors
          this.logger.error(err);
          reject(err);
        })
        .on("end", () => {
          this.logger.debug("Finished reading stream");
        })
        // now save the incoming file to a temporary location
        .pipe(
          tmpStream.on("error", err => {
            reject(err);
          }),
        )
        .on("error", err => {
          this.logger.error(err);
          reject(err);
        })
        .on("finish", () => {
          // once temporary file has been saved without errors,
          // we can read from the temporary file
          createReadStream(tmpPath)
            .on("error", err => {
              this.logger.error(err);
              reject(err);
            })
            // ... and finally upload the temporary file to S3 using
            // the provided Writable stream
            .pipe(writeStream)
            .on("finish", () => {
              // finished upload!
              resolve();
            })
            .on("error", err => {
              this.logger.error(err);
              reject(err);
            });
        });
    });
  }
}
