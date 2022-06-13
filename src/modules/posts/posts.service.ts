import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/@core/base/base.service';
import {
  PaginationBasic,
  PaginationBasicQuery,
} from 'src/@core/models/schemas/pagination.model.schema';
import { sortFormat } from 'src/utils/sort.format';
import { Repository } from 'typeorm';
import { PostDto } from './dtos/post.dto';
import { Posts } from './posts.enity';

@Injectable()
export class PostsService extends BaseService<Posts> {
  constructor(
    @InjectRepository(Posts) private readonly postRepository: Repository<Posts>,
  ) {
    super(postRepository);
  }

  public attributeOptions(keys: string[]) {
    let atribute = {};
    for (const key of keys) {
      atribute = { ...atribute, [key]: true };
    }
    return atribute;
  }

  async getPostById(id: number) {
    const post: Posts = await this.postRepository.findOne({
      where: { id },
      relations: {
        owner: true,
      },
      select: {
        owner: { ...this.attributeOptions(['id', 'name', 'email']) },
      },
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async createNewPost(postDto: PostDto) {
    try {
      const newPost = await this.postRepository.save({ ...postDto });
      return newPost;
    } catch (error) {
      this.logger.error(`[ERROR]: ${error.toString()}`);
      throw new BadRequestException('Bad request');
    }
  }

  async getPostByPage(query: PaginationBasicQuery) {
    const { keyword } = query;
    const { items, count } = await this.findAllAndCount(query, ['title']);
    return { items, count };
  }
}
