"use client";

import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";
import type { AdminUser } from "@/types/admin";

const STAFF_PATH = "/admin/users?role=STAFF&limit=100";

export function useDepartmentStaff(
  departmentId: string | undefined,
  enabled: boolean,
) {
  const query = useQuery({
    queryKey: ["staff", "all"],
    queryFn: async () => (await clientApi<AdminUser[]>(STAFF_PATH)).data,
    enabled,
    staleTime: 5 * 60_000,
  });

  const members = departmentId
    ? (query.data ?? []).filter((m) => m.department?.id === departmentId)
    : [];

  return {
    officers: members.filter((m) => m.staffPosition === "OFFICER"),
    technicians: members.filter((m) => m.staffPosition === "TECHNICIAN"),
    isLoading: query.isLoading,
    error: query.error,
  };
}