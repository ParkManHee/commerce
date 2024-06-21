import {Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import UsersEntity from '../entity/users.entity';
import ItemEntity from 'src/entity/items.entity';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, ItemEntity])],
  controllers: [],
  providers: [],
  exports: [EntityDIModule],
})
export class EntityDIModule {}
