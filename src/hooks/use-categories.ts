"use client";

import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";

export interface CategoryOption {
  id: string;
  name: string;
  serviceFee: string | number | null;
  department?: { id: string; name: string } | null;
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      (await clientApi<CategoryOption[]>("/categories")).data ?? [],
    staleTime: 5 * 60_000,
  });
}
