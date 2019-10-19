import { Test, TestingModule } from "@nestjs/testing";
import { FileService } from "./file.service";
import { S3Client } from "../aws/aws.s3.client";
import { ConfigService } from "../config/config.service";
// import { createReadStream, createWriteStream } from "fs";
// import { Readable } from "stream";
// import { IUploadedFile } from "./file.interface";

describe("FileService", () => {
  let fileService: FileService;
  // let s3Client: S3Client;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: S3Client,
          useValue: (() => {
            const client: any = jest.fn();
            client.uploadStream = jest.fn();
            return client;
          })(),
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    fileService = module.get(FileService);
    // s3Client = module.get(S3Client);
  });

  it("should be defined", () => {
    expect(fileService).toBeDefined();
  });

  // describe("upload image", () => {
  //   it("should successfully upload image", async () => {
  //     const func: () => Readable = () => createReadStream("./test-image.png");
  //     jest.spyOn(s3Client, "uploadStream").mockResolvedValueOnce({
  //       writeStream: createWriteStream("here"),
  //       uploadPromise: null,
  //     });
  //     const uploadedFile: IUploadedFile = await fileService.uploadImage(
  //       new Promise((resolve, reject) =>
  //         resolve({
  //           createReadStream: func,
  //           filename: "test-image.png",
  //           mimetype: "image/png",
  //           encoding: "",
  //         }),
  //       ),
  //     );
  //     expect(uploadedFile).toBeDefined();
  //   });
  // });
});
