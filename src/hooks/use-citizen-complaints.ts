"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";
import type { Meta } from "@/types/api";
import type { ComplaintItem } from "@/types/complaint";

export interface CitizenComplaintsQuery {
  page: number;
  limit: number;
  status?: string;
  search?: string;
}

export interface CitizenComplaintsResult {
  items: ComplaintItem[];
  meta?: Meta;
}

function toSearch(query: CitizenComplaintsQuery) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }
  return params.toString();
}

export function useCitizenComplaints(query: CitizenComplaintsQuery) {
  return useQuery({
    queryKey: ["citizen-complaints", query],
    queryFn: async (): Promise<CitizenComplaintsResult> => {
      const res = await clientApi<ComplaintItem[]>(
        `/complaints?${toSearch(query)}`,
      );
      return { items: res.data, meta: res.meta };
    },
    placeholderData: keepPreviousData,
  });
}
