import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDto } from './dtos/post.dto';
import { Posts } from './posts.enity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly postRepository: Repository<Posts>,
  ) {}

  public attributeOptions(keys: string[]) {
    let atribute = {};
    for (const key of keys) {
      atribute = { ...atribute, [key]: true };
    }
    return atribute;
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({
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
    const newPost = await this.postRepository.save({ ...postDto });
    return newPost;
  }
}
