"use client";

import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/client-api";

export interface Technician {
  id: string;
  name: string;
  email: string;
}

export function useDepartmentTechnicians(
  departmentId?: string,
  enabled = true,
) {
  return useQuery({
    queryKey: ["department-technicians", departmentId],
    queryFn: async () => {
      
      const url = departmentId
        ? `/staff/technicians?departmentId=${departmentId}`
        : `/staff/technicians`;
      const res = await clientApi<Technician[]>(url);
      return res.data;
    },
   
    enabled: Boolean(departmentId) && enabled,
    staleTime: 60_000,
  });
}
