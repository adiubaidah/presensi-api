import { Test, TestingModule } from '@nestjs/testing';
import { KelasService } from './kelas.service';

describe('KelasService', () => {
  let service: KelasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KelasService],
    }).compile();

    service = module.get<KelasService>(KelasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
