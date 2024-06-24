import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SnakeToCamelPipe} from './global/snake-to-camel-pipe';
import {setupSwagger} from './setup.swagger';

async function bootstrap() {
  console.log(__dirname);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new SnakeToCamelPipe());
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
