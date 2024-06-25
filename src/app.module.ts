import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {options} from './constants/db';
import {ConfigModule} from '@nestjs/config';
import {EntityDIModule} from './config/entity.di.module';
import {RouterModule} from '@nestjs/core';
import {ItemsModule} from './items/items.module';
import {OptionsModule} from './options/options.module';
import { PaymethodModule } from './paymethod/paymethod.module';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./config/env/.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'commerce',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
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
        module: PaymethodModule
      }
    ]),
    EntityDIModule,
    ItemsModule,
    OptionsModule,
    PaymethodModule,
    PurchasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
