"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { successAlert } from "@/lib/alert";
import { clientApi } from "@/lib/client-api";
import type { CreateComplaintValues } from "@/lib/validations/complaint";
import type { ComplaintStatus } from "@/types/complaint";

const LIST = "/dashboard/citizen/complaints";

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
    onError: (error: Error) => toast.error(error.message),
  });
}