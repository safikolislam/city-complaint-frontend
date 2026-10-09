export type PagedResult<T> = {
  items: T[];
  meta?: Record<string, number>;
};
