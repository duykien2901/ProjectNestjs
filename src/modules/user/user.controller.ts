import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Queue } from 'bull';
import JwtAuthGuard from '../auth/guard/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectQueue('test-queue') private queue: Queue,
  ) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @Get('/')
  async getAllByPage(@Query() query) {
    console.log(query);
    return;
  }

  @Get('/test/queue/:email')
  async testQueue(@Param('email') email) {
    this.queue.add('test', { email });
    return 'hello';
  }
}
