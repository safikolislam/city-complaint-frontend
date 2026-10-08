"use client";

import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";
import type { AdminUser } from "@/types/admin";

export function useStaffOptions(enabled: boolean) {
  return useQuery({
    queryKey: ["staff-options"],
    queryFn: async () =>
      (await clientApi<AdminUser[]>("/admin/users?role=STAFF&limit=100")).data,
    enabled,
    staleTime: 60_000,
  });
}