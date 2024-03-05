import { Test, TestingModule } from '@nestjs/testing';
import { MahasiswaController } from './mahasiswa.controller';

describe('MahasiswaController', () => {
  let controller: MahasiswaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MahasiswaController],
    }).compile();

    controller = module.get<MahasiswaController>(MahasiswaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
