import {INestApplication} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('commerce docs')
    .setDescription(``);

  const document = SwaggerModule.createDocument(app, options.build());
  SwaggerModule.setup('docs', app, document);
};
