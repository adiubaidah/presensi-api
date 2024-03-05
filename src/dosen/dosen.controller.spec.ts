import { Test, TestingModule } from '@nestjs/testing';
import { DosenController } from './dosen.controller';

describe('DosenController', () => {
  let controller: DosenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DosenController],
    }).compile();

    controller = module.get<DosenController>(DosenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
