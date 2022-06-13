import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './@core/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { RedisIOAdapter } from './modules/sockets/adapters/redis.adapter';
import { HttpLoggingInterceptor } from './@core/interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new HttpLoggingInterceptor());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Api Docs')
    .setDescription('The App API description')
    .setVersion('1.0')
    .addTag('Social network')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  const redisIoAdapter = new RedisIOAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(process.env.PORT);
}
bootstrap();
