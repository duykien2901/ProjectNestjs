import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, SignUpDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { Users } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserLogin(userDto: LoginDto) {
    const user: Users = await this.usersService.findByEmail(userDto.email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(userDto.password, user.password);
    if (!isMatch || user.email !== userDto.email) {
      throw new UnauthorizedException('Email or Password is invalid');
    }

    return user;
  }

  async login(user: Users) {
    const payload = { email: user.email, id: user.id, name: user.name };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async signup(userSignup: SignUpDto) {
    const user: Users = await this.usersService.createUser(userSignup);
    return user;
  }
}
