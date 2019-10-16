import { Injectable } from "@nestjs/common";
import { RekognitionClient } from "../aws/aws.rekognition.client";

/**
 * Interface for a Vision service.
 */
export interface IVisionService {
  detectObjects(
    imageKey: string,
    minConfidence: number,
  ): Promise<Set<IDetectionResults> | undefined>;
}

/**
 * Interface for Object detection results.
 */
export interface IDetectionResults {
  // label name
  name: string;
  // float: [0, 100] indicating confidence of detection
  confidence: number;
}

/**
 * Manages computer vision operations, such as facial recognition
 * and object detection.
 */
@Injectable()
export class VisionService implements IVisionService {
  constructor(private readonly rekognition: RekognitionClient) {}

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
    // const labelNames: string[] = (labels
    //   .map(l => l.Name)
    //   .filter(Boolean) as string[]).map(name => name.toLowerCase());
    const detectionResults: IDetectionResults[] = labels.map(label => ({
      name: label.Name || "",
      confidence: label.Confidence || 0,
    }));
    return new Set<IDetectionResults>(detectionResults);
  }
}
