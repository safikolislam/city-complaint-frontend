"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { complaintKey } from "@/hooks/use-compliant-mutations";
import { clientApi } from "@/lib/client-api";
import type { ComplaintStatus } from "@/types/complaint";

type Next = Extract<ComplaintStatus, "CLOSED" | "REOPENED">;

export function useChangeStatus(id: string) {
  const client = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (status: Next) =>
      clientApi(`/complaints/${id}/status`, {
        method: "PATCH",
        body: { status },
      }),
    onSuccess: (_data, status) => {
      toast.success(
        status === "CLOSED" ? "Complaint closed" : "Complaint reopened",
      );
      client.invalidateQueries({ queryKey: complaintKey(id) });
      router.refresh();
    },
    onError: (error: Error) => toast.error(error.message),
  });
}