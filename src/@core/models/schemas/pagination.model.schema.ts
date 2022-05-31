type Sort = {
  [key: string]: string;
};

type Property = {
  [key: string]: boolean;
};

export interface PaginationBasicQuery {
  sorts?: Sort;

  keyword?: string;

  page?: number;

  limit?: number;

  property?: Property;
}
