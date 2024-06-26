import {Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import UsersEntity from '../entity/users.entity';
import ItemEntity from 'src/entity/items.entity';
import ItemOptionsEntity from 'src/entity/item.options.entity';
import PayMethodEntity from 'src/entity/paymethod.entity';
import PaymentEntity from 'src/entity/payment.entity';
import PaymentDetailEntity from 'src/entity/payment.detail.entity';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      ItemEntity,
      ItemOptionsEntity,
      PayMethodEntity,
      PaymentEntity,
      PaymentDetailEntity,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [EntityDIModule],
})
export class EntityDIModule {}
