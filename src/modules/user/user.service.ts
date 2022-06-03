import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from '../auth/dtos/auth.dto';
import { Users } from './user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/@core/base/base.service';
import { CacheManagerService } from '../cache-manager/cache-manager.service';

@Injectable()
export class UserService extends BaseService<Users> {
  constructor(
    @InjectRepository(Users) public readonly repository: Repository<Users>,
    private cacheManager: CacheManagerService,
  ) {
    super(repository);
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  async findById(id: number) {
    const user: Users = await this.repository.findOneBy({ id });
    return user;
  }

  async createUser(user: SignUpDto) {
    const emailUserExist = await this.repository.findOneBy({
      email: user.email,
    });
    if (emailUserExist) {
      throw new BadRequestException('User is exist');
    }

    const passwordHash = await bcrypt.hash(user.password, 10);
    const userEntity = await this.repository.create({
      ...user,
      password: passwordHash,
    });
    const newUser = await this.repository.create(userEntity);
    return newUser;
  }
}
