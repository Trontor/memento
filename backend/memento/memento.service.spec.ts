import { Test, TestingModule } from '@nestjs/testing';
import { MementoService } from './memento.service';

describe('MementoService', () => {
  let service: MementoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MementoService],
    }).compile();

    service = module.get<MementoService>(MementoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
