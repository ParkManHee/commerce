import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import { SnakeToCamelPipe } from "./global/snake-to-camel-pipe";

async function bootstrap() {
  console.log(__dirname);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new SnakeToCamelPipe());
  await app.listen(3000);
}
bootstrap();
