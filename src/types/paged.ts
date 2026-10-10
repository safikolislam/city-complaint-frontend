import type { Meta } from "@/types/api";

export interface PagedResult<T> {
  items: T[];
  meta?: Meta;
}
