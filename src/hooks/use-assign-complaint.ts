"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { clientApi } from "@/lib/client-api";

export interface AssignValues {
  staffId: string;
  technicianId: string;
}

export function useAssignComplaint(
  complaintId: string,
  onSuccess?: () => void,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: AssignValues) => {
      return clientApi(`/complaints/${complaintId}/assign`, {
        method: "POST",
        body: values,
      });
    },

    onSuccess: () => {
      toast.success("Complaint assigned successfully");

      queryClient.invalidateQueries({
        queryKey: ["complaints"],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-assigned"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });

      onSuccess?.();
    },

    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to assign complaint";

      toast.error(message);
    },
  });
}
