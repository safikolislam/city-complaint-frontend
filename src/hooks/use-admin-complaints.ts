"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";
import { toQueryString } from "@/lib/query-string";
import type { ComplaintsQuery } from "@/types/admin";
import type { ComplaintItem } from "@/types/complaint";
import type { PagedResult } from "@/types/paged";

export const adminComplaintsKey = ["admin-complaints"] as const;

export function useAdminComplaints(query: ComplaintsQuery) {
  return useQuery({
    queryKey: [...adminComplaintsKey, query],
    queryFn: async (): Promise<PagedResult<ComplaintItem>> => {
      const res = await clientApi<ComplaintItem[]>(
        `/complaints${toQueryString(query)}`,
      );
      return { items: res.data ?? [], meta: res.meta };
    },
    placeholderData: keepPreviousData,
  });
}
