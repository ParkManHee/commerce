import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const DB = {
  DATABASE_NAME: process.env.POSTGRES_DATABASE,
  USERS: 'users',
  ITEMS: 'items',
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
console.log(options);
