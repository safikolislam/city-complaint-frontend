"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";
import type { ComplaintItem } from "@/lib/complaints";
import type { ComplaintsQuery } from "@/types/admin";
import type { PagedResult } from "@/types/paged";

export function useCitizenComplaints(query: ComplaintsQuery) {
  const queryString = new URLSearchParams();
  if (query.page) queryString.set("page", String(query.page));
  if (query.limit) queryString.set("limit", String(query.limit));
  if (query.status) queryString.set("status", query.status);
  if (query.search) queryString.set("search", query.search);

  return useQuery({
    queryKey: ["citizen-complaints", query],
    queryFn: async (): Promise<PagedResult<ComplaintItem>> => {
      const res = (await clientApi(
        `/complaints?${queryString.toString()}`,
      )) as any;

      const raw = res?.data ?? res;
      const items = raw?.items ?? raw?.data ?? (Array.isArray(raw) ? raw : []);
      const meta = raw?.meta ?? {
        page: query.page || 1,
        limit: query.limit || 10,
        total: items.length,
        totalPage: 1,
      };

      return { items, meta };
    },
    placeholderData: keepPreviousData,
  });
}