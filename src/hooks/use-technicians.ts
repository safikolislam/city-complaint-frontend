"use client";

import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";

export interface Technician {
  id: string;
  name: string;
  email: string;
}

export function useTechnicians(enabled = true) {
  return useQuery({
    queryKey: ["technicians"],
    queryFn: async () =>
      (await clientApi<Technician[]>("/complaints/technicians")).data,
    enabled,
    staleTime: 60_000,
  });
}
