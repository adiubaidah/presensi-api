import { Test, TestingModule } from '@nestjs/testing';
import { ProdiController } from './prodi.controller';

describe('ProdiController', () => {
  let controller: ProdiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdiController],
    }).compile();

    controller = module.get<ProdiController>(ProdiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
