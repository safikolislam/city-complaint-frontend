"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { successAlert } from "@/lib/alert";
import { clientApi } from "@/lib/client-api";
import type { ComplaintDetail, ComplaintStatus } from "@/types/complaint";

export const complaintKey = (id: string) => ["complaint", id] as const;

interface StatusInput {
  status: ComplaintStatus;
  note?: string;
}

export function useChangeStatus(id: string) {
  const client = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (input: StatusInput) =>
      clientApi(`/complaints/${id}/status`, { method: "PATCH", body: input }),
    onMutate: async (input) => {
      await client.cancelQueries({ queryKey: complaintKey(id) });
      const previous = client.getQueryData<ComplaintDetail>(complaintKey(id));
      if (previous) {
        client.setQueryData(complaintKey(id), {
          ...previous,
          status: input.status,
        });
      }
      return { previous };
    },
    onError: (error, _input, context) => {
      if (context?.previous) {
        client.setQueryData(complaintKey(id), context.previous);
      }
      toast.error(error.message);
    },
    onSuccess: () => successAlert("Status updated"),
    onSettled: () => {
      client.invalidateQueries({ queryKey: complaintKey(id) });
      router.refresh();
    },
  });
}
