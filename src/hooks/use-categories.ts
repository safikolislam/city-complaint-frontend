"use client";

import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";
import type { Category } from "@/types/complaint";

// backend-এর category route-এর আসল URL দেখে এটা মিলিয়ে নাও
const CATEGORIES_PATH = "/categories";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await clientApi<Category[]>(CATEGORIES_PATH)).data,
    staleTime: 10 * 60_000,
  });
}
