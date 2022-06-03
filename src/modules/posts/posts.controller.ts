import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import JwtAuthGuard from '../auth/guard/jwt.guard';
import { PostDto } from './dtos/post.dto';
import { Posts } from './posts.enity';
import { PostsService } from './posts.service';

@Controller()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post('')
  async createPost(@Body() postDto: PostDto): Promise<any> {
    return await this.postService.createNewPost(postDto);
  }

  @Get('/:id')
  async getPost(@Param('id') id: number): Promise<Posts> {
    return await this.postService.getPostById(id);
  }
}
