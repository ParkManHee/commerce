import {Module} from '@nestjs/common';
import {PaymentController} from './payment.controller';
import {PaymentService} from './payment.service';
import {CustomRepositoryModule} from 'src/decorator/custom-repository.decorator.module';
import {ItemsRepository} from 'src/repositories/items.repository';
import {ItemOptionsRepository} from 'src/repositories/item.options.repository';
import {UsersRepository} from 'src/repositories/users.repository';
import {PayMethodRepository} from 'src/repositories/pay.method.repository';
import {PaymentRepository} from 'src/repositories/payment.repository';
import {PaymentDetailRepository} from 'src/repositories/payment.detail.repository';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([
      ItemsRepository,
      ItemOptionsRepository,
      UsersRepository,
      PayMethodRepository,
      PaymentRepository,
      PaymentDetailRepository,
    ]),
  ],
  controllers: [PaymentController],
  providers: [
    {
      provide: 'paymentService',
      useClass: PaymentService,
    },
  ],
})
export class PaymentModule {}
