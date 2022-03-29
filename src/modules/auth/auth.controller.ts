import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dtos/auth.dto';
import LocalAuthGuard from './guard/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req) {
    const user = req.user;
    return await this.authService.login(user);
  }

  @Post('sign-up')
  async signup(@Body() userDto: SignUpDto) {
    return await this.authService.signup(userDto);
  }
}
