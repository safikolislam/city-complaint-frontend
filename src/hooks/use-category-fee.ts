"use client";

import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";

interface CategoryOption {
  id: string;
  serviceFee: string | number | null;
}

export function useCategoryFees() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      (await clientApi<CategoryOption[]>("/categories")).data,
    staleTime: 5 * 60_000,
    select: (list) =>
      Object.fromEntries(
        list.map((item) => [item.id, Number(item.serviceFee ?? 0)]),
      ) as Record<string, number>,
  });
}