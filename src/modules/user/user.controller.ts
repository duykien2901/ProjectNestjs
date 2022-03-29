import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../auth/guard/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Param('id') id: number) {
    return await this.userService.findById(id);
  }
}
