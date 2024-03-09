import { Test, TestingModule } from '@nestjs/testing';
import { KelasMatakuliahService } from './kelas-matakuliah.service';

describe('KelasMatakuliahService', () => {
  let service: KelasMatakuliahService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KelasMatakuliahService],
    }).compile();

    service = module.get<KelasMatakuliahService>(KelasMatakuliahService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
