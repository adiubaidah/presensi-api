import { Test, TestingModule } from '@nestjs/testing';
import { PertemuanController } from './pertemuan.controller';

describe('PertemuanController', () => {
  let controller: PertemuanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PertemuanController],
    }).compile();

    controller = module.get<PertemuanController>(PertemuanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
