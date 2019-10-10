import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from "@nestjs/common";
import * as AWS from "aws-sdk";

/**
 * AWS Rekognition Client that wraps the `aws-sdk`.
 */
@Injectable()
export class RekognitionClient {
  private readonly logger = new Logger(RekognitionClient.name);
  private connection: AWS.Rekognition;

  constructor(
    private readonly regionName: string,
    private readonly s3BucketName: string,
  ) {
    this.connection = new AWS.Rekognition({ region: this.regionName });
  }

  /**
   * Creates a new Face collection and returns the ARN.
   */
  public async createCollection(): Promise<string> {
    try {
      const res = await this.connection.createCollection().promise();
      this.logger.debug(res);
      if (!res.CollectionArn)
        throw new Error(
          "Could not create new Face collection: CollectionArn is undefined",
        );
      return res.CollectionArn;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  public async findFacesInImage(
    imageKey: string,
    collectionArn: string,
    maxFaces: number = 5,
  ) {
    const params: AWS.Rekognition.SearchFacesByImageRequest = {
      CollectionId: collectionArn,
      Image: {
        S3Object: {
          Bucket: this.s3BucketName,
          Name: imageKey,
        },
      },
      MaxFaces: maxFaces,
    };
    try {
      // this.connection.indexFaces()
      // this.connection.searchFaces()
      // const result = await this.connection.searchFacesByImage(params).promise();
      // result.
      this.logger.log(params);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  public async detectObjectsInImageS3(
    s3Key: string,
    maxLabels: number,
    minConfidence: number,
  ): Promise<AWS.Rekognition.Label[] | undefined> {
    const params: AWS.Rekognition.Types.DetectLabelsRequest = {
      Image: {
        S3Object: {
          Bucket: this.s3BucketName,
          Name: s3Key,
        },
      },
      MaxLabels: maxLabels,
      MinConfidence: minConfidence,
    };

    try {
      const res = await this.connection.detectLabels(params).promise();
      this.logger.debug(res);
      return res.Labels;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException("Cannot detect objects in image");
    }
  }
}
