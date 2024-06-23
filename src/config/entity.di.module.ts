import {Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import UsersEntity from '../entity/users.entity';
import ItemEntity from 'src/entity/items.entity';
import ItemOptionsEntity from 'src/entity/item.options.entity';
import PaymentMethodEntity from 'src/entity/payment.method.entity';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, ItemEntity, ItemOptionsEntity, PaymentMethodEntity])],
  controllers: [],
  providers: [],
  exports: [EntityDIModule],
})
export class EntityDIModule {}
