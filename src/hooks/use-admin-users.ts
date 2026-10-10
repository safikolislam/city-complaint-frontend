"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";
import { toQueryString } from "@/lib/query-string";

import type { PagedResult } from "@/types/paged";
import type { UserItem } from "@/types/user";

export interface UsersQuery {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
}

export const adminUsersKey = ["admin-users"] as const;

export function useAdminUsers(query: UsersQuery) {
  return useQuery({
    queryKey: [...adminUsersKey, query],

    queryFn: async (): Promise<PagedResult<UserItem>> => {
      const res = await clientApi(`/admin/users${toQueryString(query)}`);

      const raw = (res as any)?.data ?? res;

      const items = raw?.items ?? raw?.data ?? (Array.isArray(raw) ? raw : []);

      const meta = raw?.meta ?? {
        page: query.page ?? 1,
        limit: query.limit ?? 10,
        total: items.length,
        totalPage: 1,
      };

      return {
        items,
        meta,
      };
    },

    placeholderData: keepPreviousData,
  });
}
