import {Module} from '@nestjs/common';
import {PurchasesController} from './purchases.controller';
import {PurchasesService} from './purchases.service';
import {CustomRepositoryModule} from 'src/decorator/custom-repository.decorator.module';
import ItemsEntity from 'src/entity/items.entity';
import ItemOptionsEntity from 'src/entity/item.options.entity';
import PaymentMethodEntity from 'src/entity/payment.method.entity';
import UsersEntity from 'src/entity/users.entity';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([
      ItemsEntity,
      ItemOptionsEntity,
      UsersEntity,
      PaymentMethodEntity,
    ]),
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
