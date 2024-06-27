import {Module, OnApplicationBootstrap} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {options} from './constants/db';
import {ConfigModule} from '@nestjs/config';
import {EntityDIModule} from './config/entity.di.module';
import {RouterModule} from '@nestjs/core';
import {ItemsModule} from './items/items.module';
import {OptionsModule} from './options/options.module';
import {PaymethodModule} from './paymethod/paymethod.module';
import {PaymentModule} from './payment/payment.module';
import {SeedsService} from './seeds/seeds.service';
import * as path from 'path';
import {UsersRepository} from './repositories/users.repository';
import {ItemsRepository} from './repositories/items.repository';
import {ItemOptionsRepository} from './repositories/item.options.repository';
import {CustomRepositoryModule} from './decorator/custom-repository.decorator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [path.resolve(__dirname, '../env/.env')],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(options),
    RouterModule.register([
      {
        path: 'items',
        module: ItemsModule,
      },
      {
        path: 'options',
        module: OptionsModule,
      },
      {
        path: 'payMethod',
        module: PaymethodModule,
      },
      {
        path: 'payment',
        module: PaymentModule,
      },
    ]),
    EntityDIModule,
    ItemsModule,
    OptionsModule,
    PaymethodModule,
    PaymentModule,
    CustomRepositoryModule.forCustomRepository([
      ItemsRepository,
      ItemOptionsRepository,
      UsersRepository,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, SeedsService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedsService: SeedsService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedsService.seed();
  }
}
