"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { clientApi } from "@/lib/client-api";
import { toQueryString } from "@/lib/query-string";
import type { ComplaintItem } from "@/lib/complaints";
import type { ComplaintsQuery } from "@/types/admin";
import type { PagedResult } from "@/types/paged";

export const myAssignedComplaintsKey = ["my-assigned-complaints"] as const;

export function useMyAssignedComplaints(query: ComplaintsQuery) {
  return useQuery({
    queryKey: [...myAssignedComplaintsKey, query],

    queryFn: async (): Promise<PagedResult<ComplaintItem>> => {
      const res = (await clientApi(
        `/complaints/my-assigned${toQueryString(query)}`,
      )) as
        | PagedResult<ComplaintItem>
        | {
            data: PagedResult<ComplaintItem>;
          };

      if ("items" in res) {
        return res;
      }

      return (
        res?.data ?? {
          items: [],
          meta: {
            page: query.page || 1,
            limit: query.limit || 10,
            total: 0,
            totalPage: 0,
          },
        }
      );
    },

    placeholderData: keepPreviousData,
  });
}