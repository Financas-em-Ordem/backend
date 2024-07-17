import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Finanças em Ordem')
    .setDescription('Documentação da API do projeto Finanças em Ordem	')
    .setVersion('1.0')
    .addTag('API')
    .addTag('usuario')
    .addTag('despesa')
    .addTag('tipo despesa')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.enableCors({
    origin: ['https://app.financas.vstec.net', '*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(parseInt(process.env.PORT));
}
bootstrap();
