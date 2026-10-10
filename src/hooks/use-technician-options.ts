"use client";

import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";
import type { TechnicianOption } from "@/types/technician";

export function useTechnicianOptions(enabled: boolean) {
  return useQuery({
    queryKey: ["technician-options"],
    queryFn: async () =>
      (await clientApi<TechnicianOption[]>("/complaints/technicians")).data,
    enabled,
    staleTime: 60_000,
    retry: false,
  });
}