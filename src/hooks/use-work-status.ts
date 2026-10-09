"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { clientApi } from "@/lib/client-api";
import type { ComplaintStatus } from "@/lib/complaints";

export const workStatusKey = (id: string) => ["work-status", id] as const;

interface StatusInput {
  status: "IN_PROGRESS" | "RESOLVED";
  note?: string;
}

export function useWorkStatus(id: string, initialStatus: ComplaintStatus) {
  const client = useQueryClient();
  const router = useRouter();

  const query = useQuery({
    queryKey: workStatusKey(id),
    queryFn: async () =>
      (await clientApi<{ status: ComplaintStatus }>(`/complaints/${id}`)).data
        .status,
    initialData: initialStatus,
  });

  const mutation = useMutation({
    mutationFn: (input: StatusInput) =>
      clientApi(`/complaints/${id}/status`, { method: "PATCH", body: input }),
    onMutate: async (input) => {
      await client.cancelQueries({ queryKey: workStatusKey(id) });
      const previous = client.getQueryData<ComplaintStatus>(workStatusKey(id));
      client.setQueryData(workStatusKey(id), input.status);
      return { previous };
    },
    onError: (error, _input, context) => {
      if (context?.previous) {
        client.setQueryData(workStatusKey(id), context.previous);
      }
      toast.error(error.message);
    },
    onSuccess: (_data, input) =>
      toast.success(
        input.status === "RESOLVED" ? "Marked as resolved" : "Work started",
      ),
    onSettled: () => {
      client.invalidateQueries({ queryKey: workStatusKey(id) });
      router.refresh();
    },
  });

  return { status: query.data, mutation };
}