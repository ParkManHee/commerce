import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({path: path.resolve(__dirname, '../../env/.env')});

export const DB = {
  DATABASE_NAME: process.env.POSTGRES_DATABASE,
  USERS: 'users',
  ITEMS: 'items',
  ITEMS_OPTIONS: 'item_options',
  PAYMENT_METHOD: 'payment_method',
  PAYMENT: 'payment',
  PAYMENT_DETAIL: 'payment_detail',
} as const;

export const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: DB.DATABASE_NAME,
  autoLoadEntities: true,
  synchronize: true,
  logging: false,
};
