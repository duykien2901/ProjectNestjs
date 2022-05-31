import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from '../auth/dtos/auth.dto';
import { Users } from './user.entity';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/@core/base/service/base.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService
  extends BaseService<Users, UserRepository>
  implements OnModuleInit
{
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
  onModuleInit() {
    console.log('tesst');
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.userRepository.entity.findOne({ where: { email } });
    return user;
  }

  async findById(id: number) {
    const user: Users = await this.userRepository.findOneById(id);
    return user;
  }

  async createUser(user: SignUpDto) {
    const emailUserExist = await this.userRepository.findOneByCondition({
      email: user.email,
    });
    if (emailUserExist) {
      throw new BadRequestException('User is exist');
    }

    const passwordHash = await bcrypt.hash(user.password, 10);
    const userEntity = await this.userRepository.entity.create({
      ...user,
      password: passwordHash,
    });
    const newUser = await this.userRepository.create(userEntity);
    return newUser;
  }
}
