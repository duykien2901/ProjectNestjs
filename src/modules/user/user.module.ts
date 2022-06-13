import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseTransaction } from 'src/@core/base/base.transaction';
import { CacheManagerModule } from '../cache-manager/cache-manager.module';
import { Posts } from '../posts/posts.enity';
import { QueueModule } from '../queue/queue.module';
import { UserController } from './user.controller';
import { Users } from './user.entity';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, BaseTransaction],
  exports: [UserService, TypeOrmModule.forFeature([Users, Posts])],
  imports: [
    TypeOrmModule.forFeature([Users, Posts]),
    forwardRef(() => QueueModule),
    BullModule.registerQueue({ name: 'test-queue' }),
    CacheManagerModule,
  ],
})
export class UserModule {}
