import { cloneDeep } from 'lodash';
import { PAGINATION_LIMIT } from 'src/@core/constants/pagination.constant';
import { GetAllRes } from 'src/@core/models/getAllResponse.model';
import { PaginationBasicQuery } from 'src/@core/models/schemas/pagination.model.schema';
import {
  BaseEntity,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Like,
  Repository,
} from 'typeorm';
import { BaseRepositoryInterface } from './base.repository.interface';

export abstract class BaseRepositoryAbstract<T>
  implements BaseRepositoryInterface<T>
{
  private entity: Repository<T>;

  constructor(protected readonly repository: Repository<T>) {
    this.entity = repository;
  }

  public async findAllAndCount(queryCondition: any): Promise<GetAllRes<T>> {
    const [items, count] = await this.entity.findAndCount({
      ...queryCondition,
    });
    return { items, count };
  }

  public async create(data: any): Promise<T> {
    return await this.entity.save(data);
  }

  public async findOneById(id: any): Promise<T> {
    const queryId = { id } as FindOptionsWhere<T>;
    return await this.entity.findOneBy({ ...queryId });
  }

  public async findOneByCondition(filter: FindOptionsWhere<T>): Promise<T> {
    return await this.entity.findOneBy({ ...filter });
  }

  public async findAll(): Promise<T[]> {
    return await this.entity.find();
  }

  public async remove(id: number): Promise<DeleteResult> {
    return await this.entity.delete(id);
  }
}
