import { Injectable, Logger } from '@nestjs/common';
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
    fieldQueryKeyword?: string[],
  ): Promise<GetAllRes<T>> {
    const {
      keyword = '',
      sorts = [],
      limit = PAGINATION_LIMIT.limit,
      page = PAGINATION_LIMIT.page,
      property = '',
    } = query;

    const sortQuery = sorts.reduce((result, { by, direction }) => {
      return { ...result, [by]: direction };
    }, {});

    const selectQuery = property.split(',').reduce((result, item) => {
      return { ...result, [item]: true };
    }, {});

    const offset = limit * (page - 1);

    const whereQuery = fieldQueryKeyword
      ? [
          ...fieldQueryKeyword.map((item) => {
            return { [item]: Like(`%${keyword}%`) };
          }),
        ]
      : {};

    const queryCondition = {
      select: selectQuery,
      where: whereQuery,
      order: sortQuery,
      take: +limit,
      skip: +offset,
    } as FindManyOptions<T>;

    const [items, count] = await this.baseRepository.findAndCount(
      queryCondition,
    );
    return { items, count };
  }
}
