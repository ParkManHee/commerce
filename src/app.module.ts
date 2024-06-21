import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {options} from "./constants/db";
import {ConfigModule} from "@nestjs/config";
import { EntityDIModule } from "./config/entity.di.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ["./config/env/.env"],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "127.0.0.1",
      port: 5432,
      username: "admin",
      password: "password",
      database: "commerce",
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    EntityDIModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
