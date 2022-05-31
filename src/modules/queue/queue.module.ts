import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { config } from 'src/@core/config/config';
import { UserModule } from '../user/user.module';
import { QueueService } from './queue.service';

const { redis } = config;
const { host, port } = redis;

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host,
        port: +port,
      },
    }),
    forwardRef(() => UserModule),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
