type ApiStatus = 'success' | 'error';

type ApiPagination = {
  pagination: {
    page: number;
    totalPages: number;
  };
};

export type WithPagination<Entity = {}> = ApiPagination & Entity;

export type ApiResponse<Data = {}> = {
  status: ApiStatus;
  data: Data;
  message?: string;
};

export interface PaginationInput {
  page: number;
  limit?: number;
}
