"use client";

import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";

export interface Technician {
  id: string;
  name: string;
  email: string;
}

export function useDepartmentTechnicians() {
  return useQuery({
    queryKey: ["department-technicians"],
    queryFn: async () =>
      (await clientApi<Technician[]>("/complaints/technicians")).data,
    staleTime: 60_000,
  });
}
