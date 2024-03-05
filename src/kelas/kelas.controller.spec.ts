import { Test, TestingModule } from '@nestjs/testing';
import { KelasController } from './kelas.controller';

describe('KelasController', () => {
  let controller: KelasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KelasController],
    }).compile();

    controller = module.get<KelasController>(KelasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
