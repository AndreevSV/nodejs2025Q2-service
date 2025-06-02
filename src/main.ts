import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import * as YAML from 'yaml';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('The Home Library API description')
    .setVersion('1.0')
    .addTag('music')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  writeFileSync('./doc/api.yaml', YAML.stringify(document), 'utf8');

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
