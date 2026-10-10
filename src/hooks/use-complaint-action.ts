"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { complaintKey } from "@/hooks/use-compliant-mutations";
import { successAlert } from "@/lib/alert";
import { clientApi } from "@/lib/client-api";

const LIST = "/dashboard/citizen/complaints";
const onError = (error: Error) => toast.error(error.message);

export function useCancelComplaint(id: string) {
  const client = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () =>
      clientApi(`/complaints/${id}/cancel`, { method: "POST", body: {} }),
    onSuccess: () => {
      successAlert("Complaint cancelled");
      client.invalidateQueries({ queryKey: complaintKey(id) });
      router.refresh();
    },
    onError,
  });
}

export function useDeleteComplaint(id: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: () => clientApi(`/complaints/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      successAlert("Complaint deleted");
      router.replace(LIST);
      router.refresh();
    },
    onError,
  });
}
