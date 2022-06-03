import { InjectQueue } from '@nestjs/bull';
import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  HttpException,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Queue } from 'bull';
import { PaginationBasicQuery } from 'src/@core/models/schemas/pagination.model.schema';
import JwtAuthGuard from '../auth/guard/jwt.guard';
import { UserService } from './user.service';
import { pick, omit } from 'lodash';
import { GetAllRes } from 'src/@core/models/getAllResponse.model';
import { Users } from './user.entity';
import { CacheManagerService } from '../cache-manager/cache-manager.service';
import { HttpCacheInterceptor } from 'src/@core/interceptor';

@Controller()
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectQueue('test-queue') private queue: Queue,
    private cacheManager: CacheManagerService,
  ) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey('user_get')
  @CacheTTL(20)
  @Get()
  async getAllByPage(@Query() query: any): Promise<GetAllRes<Users>> {
    try {
      const { keyword, page, limit, ...rest } = query;
      const paginationQuery: PaginationBasicQuery = {
        keyword,
        page,
        limit,
        sorts: rest,
      };
      const { items, count } = await this.userService.findAllAndCount(
        paginationQuery,
      );
      return { items, count };
    } catch (error) {
      throw new HttpException(`${error}`, 404);
    }
  }

  @Get('/test/queue/:email')
  async testQueue(@Param('email') email) {
    this.queue.add('test', { email });
    return 'hello';
  }
}
