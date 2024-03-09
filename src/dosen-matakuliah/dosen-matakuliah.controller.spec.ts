import { Test, TestingModule } from '@nestjs/testing';
import { DosenMatakuliahController } from './dosen-matakuliah.controller';

describe('DosenMatakuliahController', () => {
  let controller: DosenMatakuliahController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DosenMatakuliahController],
    }).compile();

    controller = module.get<DosenMatakuliahController>(DosenMatakuliahController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
