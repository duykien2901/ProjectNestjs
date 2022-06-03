import { Injectable, Logger } from '@nestjs/common';
import { cloneDeep } from 'lodash';
import { PAGINATION_LIMIT } from 'src/@core/constants/pagination.constant';
import { GetAllRes } from 'src/@core/models/getAllResponse.model';
import { PaginationBasicQuery } from 'src/@core/models/schemas/pagination.model.schema';
import { FindManyOptions, Like, Repository } from 'typeorm';

@Injectable()
export class BaseService<T> {
  private baseRepository: Repository<T>;
  public logger: Logger;

  constructor(protected readonly repository: Repository<T>) {
    this.baseRepository = repository;
    this.logger = new Logger('Base service');
  }

  async findAllAndCount(
    query: PaginationBasicQuery,
    fieldQueryKeyword: string[] = [],
  ): Promise<GetAllRes<T>> {
    const {
      keyword = '',
      sorts = {},
      limit = PAGINATION_LIMIT.limit,
      page = PAGINATION_LIMIT.page,
      property,
    } = query;
    const offset = limit * (page - 1);

    const whereQuery = [
      ...fieldQueryKeyword.map((item) => {
        return { [item]: Like(`%${keyword}%`) };
      }),
    ];

    const queryCondition = {
      ...(property ? { select: property } : {}),
      ...(whereQuery.length ? { where: [...whereQuery] } : {}),
      order: { ...sorts },
      take: +limit,
      skip: +offset,
    } as FindManyOptions<T>;

    const [items, count] = await this.baseRepository.findAndCount(
      queryCondition,
    );
    return { items, count };
  }
}
