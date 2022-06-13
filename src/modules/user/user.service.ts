import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from '../auth/dtos/auth.dto';
import { Users } from './user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { BaseService } from 'src/@core/base/base.service';
import { CacheManagerService } from '../cache-manager/cache-manager.service';
import { BaseTransaction } from 'src/@core/base/base.transaction';

@Injectable()
export class UserService extends BaseService<Users> {
  constructor(
    @InjectRepository(Users) public readonly repository: Repository<Users>,
    private cacheManager: CacheManagerService,
    private baseTransaction: BaseTransaction,
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

  async createUser(user: SignUpDto, query?: QueryRunner) {
    if (query) {
      const emailUserExist = await query.manager.findOneBy(Users, {
        email: user.email,
      });
      if (emailUserExist) {
        throw new BadRequestException('User is exist');
      }

      const passwordHash = await bcrypt.hash(user.password, 10);
      const userEntity = await query.manager.create(Users, {
        ...user,
        password: passwordHash,
      });
      const newUser = await query.manager.save(userEntity);
      return newUser;
    } else {
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

  async getAll() {
    return;
  }

  async testTransaction(user: SignUpDto) {
    await this.baseTransaction.startTransaction(async (queryRunner) => {
      await this.createUser(user, queryRunner);
    });
  }
}
