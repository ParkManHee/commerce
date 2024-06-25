import { Test, TestingModule } from '@nestjs/testing';
import { PaymethodService } from './paymethod.service';

describe('PaymethodService', () => {
  let service: PaymethodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymethodService],
    }).compile();

    service = module.get<PaymethodService>(PaymethodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
