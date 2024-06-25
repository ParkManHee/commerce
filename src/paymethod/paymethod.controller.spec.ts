import { Test, TestingModule } from '@nestjs/testing';
import { PaymethodController } from './paymethod.controller';

describe('PaymethodController', () => {
  let controller: PaymethodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymethodController],
    }).compile();

    controller = module.get<PaymethodController>(PaymethodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
