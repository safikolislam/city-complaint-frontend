"use client";

import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";
import type { Department } from "@/types/admin";

export function useDepartments(enabled: boolean) {
  return useQuery({
    queryKey: ["departments"],
    queryFn: async () => (await clientApi<Department[]>("/departments")).data,
    enabled,
    staleTime: 5 * 60_000,
  });
}