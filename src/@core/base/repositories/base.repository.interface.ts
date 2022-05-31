import { GetAllRes } from 'src/@core/models/getAllResponse.model';
import { DeleteResult } from 'typeorm';

export interface BaseRepositoryInterface<T> {
  create(data: T | any): Promise<T>;

  findOneById(id: number): Promise<T>;

  findOneByCondition(filter: any): Promise<T>;

  findAllAndCount(query: any): Promise<GetAllRes<T>>;

  findAll(): Promise<T[]>;

  remove(id: number): Promise<DeleteResult>;
}
