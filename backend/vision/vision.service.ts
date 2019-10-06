import { Injectable, Logger } from "@nestjs/common";
import { RekognitionClient } from "../aws/aws.rekognition.client";
import { FamilyService } from "../family/family.service";

type UserId = string;
type CollectionName = string;

/**
 * Interface for a Vision service.
 */
export interface IVisionService {
  detectObjects(
    imageKey: string,
    minConfidence: number,
  ): Promise<Set<string> | undefined>;
  initVisionForFamily(familyId: string): Promise<CollectionName>;
  identifyUserFacesInImage(imageKey: string, familyId: string): Promise<UserId>;
}

/**
 * Manages computer vision operations, such as facial recognition
 * and object detection.
 */
@Injectable()
export class VisionService implements IVisionService {
  private readonly logger = new Logger(VisionService.name);
  constructor(
    private readonly rekognition: RekognitionClient,
    private readonly familyService: FamilyService,
  ) {}

  async initVisionForFamily(familyId: string): Promise<CollectionName> {
    this.logger.log(`Initialising vision for family ${familyId}`);
    const arn = await this.rekognition.createCollection();
    return arn;
  }

  /**
   * Identifies faces of users in an image and returns an array of images.
   *
   * @param imageKey reference to image (e.g. in S3)
   * @param familyId
   */
  async identifyUserFacesInImage(
    imageKey: string,
    familyId: string,
  ): Promise<UserId> {
    const collectionArn = await this.familyService.getVisionCollection(
      familyId,
    );
    this.rekognition.findFacesInImage(imageKey, collectionArn);
    return "user id";
  }

  /**
   * Detects objects in images.
   *
   * @param imageKey key to image object in S3 bucket
   * @param maxLabels maximum number of labels to detect in an image
   * @param minConfidence minimum confidence for detected labels to be returned
   */
  async detectObjects(
    imageKey: string,
    maxLabels: number = 5,
    minConfidence: number = 90,
  ) {
    const labels:
      | AWS.Rekognition.Label[]
      | undefined = await this.rekognition.detectObjectsInImageS3(
      imageKey,
      maxLabels,
      minConfidence,
    );
    if (!labels) return undefined;
    const labelNames: string[] = labels
      .map(l => l.Name)
      .filter(Boolean) as string[];
    return new Set<string>(labelNames);
  }
}
