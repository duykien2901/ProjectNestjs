import { ApiProperty } from '@nestjs/swagger';

class Sort {
  by: string;
  direction: string;
}

type Property = {
  [key: string]: boolean;
};

export interface PaginationBasic {
  sorts?: Sort;

  keyword?: string;

  page?: number;

  limit?: number;

  property?: Property;
}

export class PaginationBasicQuery {
  @ApiProperty({ required: false })
  sorts?: Sort[];

  @ApiProperty({ required: false })
  keyword?: string;

  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  limit?: number;

  @ApiProperty({ required: false })
  property?: string;
}
