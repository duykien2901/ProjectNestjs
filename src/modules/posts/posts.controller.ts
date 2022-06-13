import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationBasicQuery } from 'src/@core/models/schemas/pagination.model.schema';
import JwtAuthGuard from '../auth/guard/jwt.guard';
import { PostDto } from './dtos/post.dto';
import { Posts } from './posts.enity';
import { PostsService } from './posts.service';

@Controller('post')
@ApiTags('posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async getAll(@Query() query: PaginationBasicQuery) {
    return await this.postService.getPostByPage(query);
  }

  @Post()
  async createPost(@Body() postDto: PostDto): Promise<any> {
    return await this.postService.createNewPost(postDto);
  }

  @Get('/:id')
  async getPost(@Param('id') id: number): Promise<Posts> {
    return await this.postService.getPostById(id);
  }
}
