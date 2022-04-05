import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../user/user.entity';
import { PostsController } from './posts.controller';
import { Posts } from './posts.enity';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService, TypeOrmModule.forFeature([Posts, Users])],
  imports: [TypeOrmModule.forFeature([Posts, Users])],
})
export class PostsModule {}
