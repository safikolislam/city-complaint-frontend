"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { myTasksKey } from "@/hooks/use-my-tasks";
import { workStatusKey } from "@/hooks/use-work-status";
import { clientApi } from "@/lib/client-api";
import type { ComplaintItem } from "@/lib/complaints";
import type { PagedResult } from "@/types/paged";

type Cached = PagedResult<ComplaintItem> | undefined;
type NextStatus = "IN_PROGRESS" | "RESOLVED";

export function useTaskStatus(id: string) {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (status: NextStatus) =>
      clientApi(`/complaints/${id}/status`, {
        method: "PATCH",
        body: { status },
      }),
    onMutate: async (status) => {
      await client.cancelQueries({ queryKey: myTasksKey });
      const snapshots = client.getQueriesData<Cached>({
        queryKey: myTasksKey,
      });
      client.setQueriesData<Cached>({ queryKey: myTasksKey }, (old) =>
        old
          ? {
              ...old,
              items: old.items.map((item) =>
                item.id === id ? { ...item, status } : item,
              ),
            }
          : old,
      );
      return { snapshots };
    },
    onError: (error, _status, context) => {
      for (const [key, data] of context?.snapshots ?? []) {
        client.setQueryData(key, data);
      }
      toast.error(error.message);
    },
    onSuccess: (_data, status) =>
      toast.success(
        status === "RESOLVED" ? "Marked as resolved" : "Work started",
      ),
    onSettled: () => {
      client.invalidateQueries({ queryKey: myTasksKey });
      client.invalidateQueries({ queryKey: workStatusKey(id) });
    },
  });
}