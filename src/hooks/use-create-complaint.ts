"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { clientApi } from "@/lib/client-api";
import type { CreateComplaintValues } from "@/lib/validations/create-complaint";

const toNumber = (value: string) => (value === "" ? undefined : Number(value));

export function useCreateComplaint() {
  const router = useRouter();
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ latitude, longitude, ...rest }: CreateComplaintValues) =>
      clientApi<{ id: string; status: string }>("/complaints", {
        method: "POST",
        body: {
          ...rest,
          latitude: toNumber(latitude),
          longitude: toNumber(longitude),
        },
      }),
    onSuccess: (res) => {
      toast.success(
        res.data.status === "PENDING_PAYMENT"
          ? "Saved. Pay the service fee from your complaint list."
          : "Complaint submitted successfully",
      );
      client.invalidateQueries({ queryKey: ["payment-requests"] });
      router.push("/dashboard/citizen/complaints");
      router.refresh();
    },
    onError: (error) => toast.error(error.message),
  });
}
