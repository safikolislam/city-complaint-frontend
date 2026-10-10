"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";
import { toQueryString } from "@/lib/query-string";
import type { AdminUser } from "@/types/admin";
import type { PagedResult } from "@/types/paged";

export type UsersQuery = {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
};

export const adminUsersKey = ["admin-users"] as const;

export function useAdminUsers(query: UsersQuery) {
  return useQuery({
    queryKey: [...adminUsersKey, query],

    queryFn: async (): Promise<PagedResult<AdminUser>> => {
      const res = await clientApi<AdminUser[]>(
        `/admin/users${toQueryString(query)}`,
      );
      const items = res.data ?? [];

      return {
        items,
        meta: res.meta ?? {
          page: query.page ?? 1,
          limit: query.limit ?? 10,
          total: items.length,
          totalPage: 1,
        },
      };
    },

    placeholderData: keepPreviousData,
  });
}
