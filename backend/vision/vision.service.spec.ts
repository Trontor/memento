import { Test, TestingModule } from '@nestjs/testing';
import { VisionService } from './vision.service';

describe('VisionService', () => {
  let service: VisionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisionService],
    }).compile();

    service = module.get<VisionService>(VisionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
