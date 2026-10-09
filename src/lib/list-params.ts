export interface ListSearchParams {
  page?: string;
  status?: string;
  search?: string;
}

export const LIST_LIMIT = 10;

export function parseListParams(params: ListSearchParams) {
  return {
    page: Math.max(Number(params.page) || 1, 1),
    limit: LIST_LIMIT,
    status: params.status,
    search: params.search,
  };
}