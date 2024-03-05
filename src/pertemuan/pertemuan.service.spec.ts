import { Test, TestingModule } from '@nestjs/testing';
import { PertemuanService } from './pertemuan.service';

describe('PertemuanService', () => {
  let service: PertemuanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PertemuanService],
    }).compile();

    service = module.get<PertemuanService>(PertemuanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
