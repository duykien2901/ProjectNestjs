import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryAbstract } from 'src/@core/base/repositories/base.repository.abstract';
import { Repository } from 'typeorm';
import { Users } from './user.entity';

@Injectable()
export class UserRepository extends BaseRepositoryAbstract<Users> {
  constructor(
    @InjectRepository(Users) public readonly userRepository: Repository<Users>,
  ) {
    super(userRepository);
  }
}
