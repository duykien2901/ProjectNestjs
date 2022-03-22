import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userDto: LoginDto) {
    await this.authService.validateUserLogin(userDto);
    return 'tesst';
  }

  @Post('sign-up')
  async signup(@Body() userDto: SignUpDto);
}
