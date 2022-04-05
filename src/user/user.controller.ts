import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import JwtAuthGuard from '../auth/guard/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Param('id') id: number) {
    return await this.userService.findById(id);
  }
}
