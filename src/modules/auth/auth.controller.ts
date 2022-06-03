import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dtos/auth.dto';
import GoogleGuard from './guard/google.guard';
import LocalAuthGuard from './guard/local.guard';

@Controller()
@ApiBearerAuth()
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

  @Get('/google')
  @UseGuards(GoogleGuard)
  async googleAuth(@Req() req) {
    return '';
  }

  @Get('/google/redirect')
  @UseGuards(GoogleGuard)
  googleAuthRedirect(@Req() req) {
    return 'this.appService.googleLogin(req)';
  }
}
