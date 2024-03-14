import { Test, TestingModule } from '@nestjs/testing';
import { KelasMatakuliahController } from './pembelajaran.controller';

describe('KelasMatakuliahController', () => {
  let controller: KelasMatakuliahController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KelasMatakuliahController],
    }).compile();

    controller = module.get<KelasMatakuliahController>(KelasMatakuliahController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
