"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { clientApi } from "@/lib/client-api";
import type { RoleValues } from "@/lib/validations/role";

export const adminUsersKey = ["admin-users"] as const;

const toBody = (values: RoleValues) =>
  values.role === "STAFF"
    ? {
        role: values.role,
        staffPosition: values.staffPosition,
        departmentId: values.departmentId,
      }
    : { role: values.role };

export function useUpdateRole(userId: string, onDone: () => void) {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (values: RoleValues) =>
      clientApi(`/admin/users/${userId}/role`, {
        method: "PATCH",
        body: toBody(values),
      }),
    onSuccess: () => {
      toast.success("Role updated");
      client.invalidateQueries({ queryKey: adminUsersKey });
      onDone();
    },
    onError: (error) => toast.error(error.message),
  });
}
