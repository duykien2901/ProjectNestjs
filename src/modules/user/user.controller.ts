import { InjectQueue } from '@nestjs/bull';
import {
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Queue } from 'bull';
import {
  PaginationBasic,
  PaginationBasicQuery,
} from 'src/@core/models/schemas/pagination.model.schema';
import JwtAuthGuard from '../auth/guard/jwt.guard';
import { UserService } from './user.service';
import { GetAllRes } from 'src/@core/models/getAllResponse.model';
import { Users } from './user.entity';
import { CacheManagerService } from '../cache-manager/cache-manager.service';
import { HttpCacheInterceptor } from 'src/@core/interceptor';
import { SignUpDto } from '../auth/dtos/auth.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiTags('users')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectQueue('test-queue') private queue: Queue,
    private cacheManager: CacheManagerService,
  ) {}

  @Get('/:id')
  async getProfile(@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey('user_get')
  @CacheTTL(20)
  @Get()
  async getAllByPage(
    @Query() query: PaginationBasicQuery,
  ): Promise<GetAllRes<Users>> {
    const { items, count } = await this.userService.findAllAndCount(query);
    return { items, count };
  }

  @Get('/test/queue/:email')
  async testQueue(@Param('email') email: string) {
    this.queue.add('test', { email });
    return 'hello';
  }

  @Post('test-transaction')
  async testTransactionController(@Body() user: SignUpDto) {
    await this.userService.testTransaction(user);
    return true;
  }
}
