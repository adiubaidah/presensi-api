import { Test, TestingModule } from '@nestjs/testing';
import { ProdiService } from './prodi.service';

describe('ProdiService', () => {
  let service: ProdiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdiService],
    }).compile();

    service = module.get<ProdiService>(ProdiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
