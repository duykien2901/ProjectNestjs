import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dtos/auth.dto';
import GoogleGuard from './guard/google.guard';
import LocalAuthGuard from './guard/local.guard';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      description: 'login',
      properties: {
        email: { type: 'string', example: 'kienlop9altt2014@gmail.com' },
        password: { type: 'string', example: '1' },
      },
    },
  })
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
