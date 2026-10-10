"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";
import type { ComplaintItem } from "@/lib/complaints";
import { toQueryString } from "@/lib/query-string";
import type { ComplaintsQuery } from "@/types/admin";
import type { PagedResult } from "@/types/paged";

export const myTasksKey = ["my-tasks"] as const;

export function useMyTasks(query: ComplaintsQuery) {
  return useQuery({
    queryKey: [...myTasksKey, query],
    queryFn: async (): Promise<PagedResult<ComplaintItem>> => {
      const res = await clientApi<ComplaintItem[]>(
        `/complaints/my-assigned${toQueryString(query)}`,
      );
      return { items: res.data, meta: res.meta };
    },
    placeholderData: keepPreviousData,
  });
}
