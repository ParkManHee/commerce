import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersEntity from '../entity/users.entity';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [],
  providers: [],
  exports: [EntityDIModule],
})
export class EntityDIModule {}
