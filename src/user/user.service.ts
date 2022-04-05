import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from '../auth/dtos/auth.dto';
import { Users } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async findByEmail(email: string): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findById(id: number) {
    const user: Users = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async createUser(user: SignUpDto) {
    const emailUserExist = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (emailUserExist) {
      throw new BadRequestException('User is exist');
    }

    const passwordHash = await bcrypt.hash(user.password, 10);
    const userEntity = this.userRepository.create({
      ...user,
      password: passwordHash,
    });
    const newUser = await this.userRepository.save(userEntity);
    return newUser;
  }
}
