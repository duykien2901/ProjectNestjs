import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import JwtAuthGuard from '../auth/guard/jwt.guard';
import { PostDto } from './dtos/post.dto';
import { Posts } from './posts.enity';

@Controller('posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PostsController {
  @Post('')
  async createPost(@Body() postDto: PostDto): Promise<Posts | string> {
    return Promise.resolve('');
  }
}
