import { Test, TestingModule } from '@nestjs/testing';
import { DosenService } from './dosen.service';

describe('DosenService', () => {
  let service: DosenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DosenService],
    }).compile();

    service = module.get<DosenService>(DosenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
