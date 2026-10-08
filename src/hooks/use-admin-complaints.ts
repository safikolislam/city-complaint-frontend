"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";
import type { ComplaintItem } from "@/lib/complaints";
import { toQueryString } from "@/lib/query-string";
import type { ComplaintsQuery } from "@/types/admin";
import type { PagedResult } from "@/types/paged";

export const adminComplaintsKey = ["admin-complaints"] as const;

export function useAdminComplaints(query: ComplaintsQuery) {
  return useQuery({
    queryKey: [...adminComplaintsKey, query],
    queryFn: async (): Promise<PagedResult<ComplaintItem>> => {
      const res = (await clientApi(`/complaints${toQueryString(query)}`)) as
        | PagedResult<ComplaintItem>
        | { data: PagedResult<ComplaintItem> };

      if ("items" in res) {
        return res;
      }

      return (
        res?.data ?? {
          items: [],
          meta: { page: 1, limit: 10, total: 0, totalPage: 0 },
        }
      );
    },
    placeholderData: keepPreviousData,
  });
}