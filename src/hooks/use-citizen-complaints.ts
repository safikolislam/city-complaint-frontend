"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { complaintKey } from "@/hooks/use-compliant-mutations";
import { successAlert } from "@/lib/alert";
import { clientApi } from "@/lib/client-api";
import type {
  CreateComplaintValues,
  EditComplaintValues,
} from "@/lib/validations/complaint";
import type { ComplaintStatus } from "@/types/complaint";

const LIST = "/dashboard/citizen/complaints";
const onError = (error: Error) => toast.error(error.message);

export function useCreateComplaint() {
  const router = useRouter();
  return useMutation({
    mutationFn: (values: CreateComplaintValues) =>
      clientApi<{ id: string; status: ComplaintStatus }>("/complaints", {
        method: "POST",
        body: values,
      }),
    onSuccess: ({ data }) => {
      successAlert(
        "Complaint submitted",
        data.status === "PENDING_PAYMENT"
          ? "Payment is required to continue."
          : undefined,
      );
      router.push(`${LIST}/${data.id}`);
      router.refresh();
    },
    onError,
  });
}

export function useEditComplaint(id: string, onDone: () => void) {
  const client = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (values: EditComplaintValues) =>
      clientApi(`/complaints/${id}`, { method: "PATCH", body: values }),
    onSuccess: () => {
      successAlert("Complaint updated");
      onDone();
      client.invalidateQueries({ queryKey: complaintKey(id) });
      router.refresh();
    },
    onError,
  });
}

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
