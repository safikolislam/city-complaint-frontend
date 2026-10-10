"use client";

import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";

export interface Department {
  id: string;
  name: string;
}

export function useDepartments() {
  return useQuery({
    queryKey: ["departments"],
    queryFn: async () => (await clientApi<Department[]>("/departments")).data,
    staleTime: 5 * 60_000,
  });
}
