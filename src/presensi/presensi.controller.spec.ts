import { Test, TestingModule } from '@nestjs/testing';
import { PresensiController } from './presensi.controller';

describe('PresensiController', () => {
  let controller: PresensiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresensiController],
    }).compile();

    controller = module.get<PresensiController>(PresensiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
