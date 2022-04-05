import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../posts/posts.enity';
import { UserController } from './user.controller';
import { Users } from './user.entity';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule.forFeature([Users, Posts])],
  imports: [TypeOrmModule.forFeature([Users, Posts])],
})
export class UserModule {}
