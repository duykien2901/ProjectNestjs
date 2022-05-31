import { Injectable } from '@nestjs/common';
import { cloneDeep } from 'lodash';
import { PAGINATION_LIMIT } from 'src/@core/constants/pagination.constant';
import { GetAllRes } from 'src/@core/models/getAllResponse.model';
import { PaginationBasicQuery } from 'src/@core/models/schemas/pagination.model.schema';
import { FindManyOptions, Like } from 'typeorm';
import { BaseRepositoryAbstract } from '../repositories/base.repository.abstract';

@Injectable()
export class BaseService<T, R extends BaseRepositoryAbstract<T>> {
  private baseRepository: R;

  constructor(protected readonly repository: R) {
    this.baseRepository = repository;
  }

  async findAllAndCount(
    query: PaginationBasicQuery,
    fieldQueryKeyword?: string[],
  ): Promise<GetAllRes<T>> {
    query = Object.assign(cloneDeep(PAGINATION_LIMIT), { ...query });
    const { keyword, sorts, limit, page, property } = query;
    const offset = limit * (page - 1);
    const whereQuery = [
      ...fieldQueryKeyword.map((item) => {
        return { [item]: Like(`%${keyword}%`) };
      }),
    ];

    const queryCondition = {
      ...(property ? { select: property } : {}),
      where: [...whereQuery],
      order: { ...sorts },
      take: limit,
      skip: offset,
    } as FindManyOptions<T>;

    const { items, count } = await this.baseRepository.findAllAndCount(
      queryCondition,
    );
    return { items, count };
  }
}
