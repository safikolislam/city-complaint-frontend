"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { complaintKey } from "@/hooks/use-compliant-mutations";
import { successAlert } from "@/lib/alert";
import { clientApi } from "@/lib/client-api";
import type { EditComplaintValues } from "@/lib/validations/edit-complaint";

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
    onError: (error: Error) => toast.error(error.message),
  });
}
