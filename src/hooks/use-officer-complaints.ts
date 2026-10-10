"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";
import type { ComplaintItem } from "@/lib/complaints";
import { toQueryString } from "@/lib/query-string";
import type { ComplaintsQuery } from "@/types/admin";
import type { PagedResult } from "@/types/paged";

export const officerComplaintsKey = ["officer-complaints"] as const;

export function useOfficerComplaints(query: ComplaintsQuery) {
  return useQuery({
    queryKey: [...officerComplaintsKey, query],
    queryFn: async (): Promise<PagedResult<ComplaintItem>> => {
      const res = await clientApi<ComplaintItem[]>(
        `/complaints${toQueryString(query)}`,
      );
      return { items: res.data, meta: res.meta };
    },
    placeholderData: keepPreviousData,
  });
}
