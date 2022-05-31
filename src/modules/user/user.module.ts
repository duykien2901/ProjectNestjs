import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../posts/posts.enity';
import { QueueModule } from '../queue/queue.module';
import { UserController } from './user.controller';
import { Users } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [
    UserService,
    UserRepository,
    TypeOrmModule.forFeature([Users, Posts]),
  ],
  imports: [
    TypeOrmModule.forFeature([Users, Posts]),
    forwardRef(() => QueueModule),
    BullModule.registerQueue({ name: 'test-queue' }),
  ],
})
export class UserModule {}
