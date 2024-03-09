import { Test, TestingModule } from '@nestjs/testing';
import { DosenMatakuliahService } from './dosen-matakuliah.service';

describe('DosenMatakuliahService', () => {
  let service: DosenMatakuliahService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DosenMatakuliahService],
    }).compile();

    service = module.get<DosenMatakuliahService>(DosenMatakuliahService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
