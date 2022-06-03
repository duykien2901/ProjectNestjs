import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './@core/config/db.config';
import { LoggerModule } from './@core/logger/logger.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './@core/interceptor/transform.interceptor';
import { QueueModule } from './modules/queue/queue.module';
import { RouterModule } from 'nest-router';
import { ROUTERS } from './@core/config/routers';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    LoggerModule,
    QueueModule,
    RouterModule.forRoutes(ROUTERS),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
