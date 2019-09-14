import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import { Upload } from "./upload.interface";
import { isImage } from "./file.utils";
import * as path from "path";
import * as os from "os";
import { unlink, createWriteStream } from "fs";

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
  constructor(private readonly configService: ConfigService) {}

  async uploadImage(filePromise: Promise<Upload>) {
    const file = await filePromise;
    const { createReadStream, filename, encoding, mimetype } = file;
    if (!isImage(mimetype)) {
      this.logger.error(`${mimetype} not an accepted image format`);
      throw new Error("not an accepted image format");
    }
    const destinationPath = path.join(os.tmpdir(), filename);
    this.logger.log(`Saving image to ${destinationPath}`);
    const url: string = await new Promise((resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(destinationPath))
        .on("error", reject)
        .on("finish", () => {
          // TODO: upload file to cloudinary

          // Delete the tmp file uploaded
          unlink(destinationPath, () => {
            resolve("your image url..");
          });
        })
    );

    return url;
  }
}
