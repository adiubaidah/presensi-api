import { Test, TestingModule } from '@nestjs/testing';
import { AkunController } from './akun.controller';

describe('AkunController', () => {
  let controller: AkunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AkunController],
    }).compile();

    controller = module.get<AkunController>(AkunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
