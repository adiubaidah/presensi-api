import { Test, TestingModule } from '@nestjs/testing';
import { PresensiService } from './presensi.service';

describe('PresensiService', () => {
  let service: PresensiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresensiService],
    }).compile();

    service = module.get<PresensiService>(PresensiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
