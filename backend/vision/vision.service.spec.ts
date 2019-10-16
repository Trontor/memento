import { Test, TestingModule } from "@nestjs/testing";
import { VisionService } from "./vision.service";
import { RekognitionClient } from "../aws/aws.rekognition.client";

describe("VisionService", () => {
  let visionService: VisionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisionService,
        {
          provide: RekognitionClient,
          useValue: {},
        },
      ],
    }).compile();

    visionService = module.get<VisionService>(VisionService);
  });

  it("should be defined", () => {
    expect(visionService).toBeDefined();
  });
});
