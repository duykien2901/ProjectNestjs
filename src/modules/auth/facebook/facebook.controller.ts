import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { FacebookGuard } from '../guard/facebook.guard';

@Controller('auth/facebook')
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
