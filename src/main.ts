import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.enableCors({
    allowedHeaders:"*",
    origin: "*"
});

  await app.listen(3000);
}
bootstrap();
