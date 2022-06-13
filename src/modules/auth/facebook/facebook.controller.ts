import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FacebookGuard } from '../guard/facebook.guard';

@Controller('auth/facebook')
@ApiTags('facebook')
export class FacebookController {
  // constructor() {}

  @Get()
  @UseGuards(FacebookGuard)
  async login() {
    return;
  }

  @Get('/redirect')
  @UseGuards(FacebookGuard)
  async redirectLogin(@Req() req) {
    return req.user;
  }
}
