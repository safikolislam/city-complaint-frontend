"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { officerComplaintsKey } from "@/hooks/use-officer-complaints";
import { clientApi } from "@/lib/client-api";
import type { PagedResult } from "@/types/paged";
import type { ComplaintItem } from "@/types/complaint";

type Cached = PagedResult<ComplaintItem> | undefined;

export function useOfficerAssign(complaintId: string, onDone: () => void) {
  const client = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (technicianId: string) =>
      clientApi(`/complaints/${complaintId}/assign`, {
        method: "POST",
        body: { technicianId },
      }),
    onMutate: async () => {
      await client.cancelQueries({ queryKey: officerComplaintsKey });
      const snapshots = client.getQueriesData<Cached>({
        queryKey: officerComplaintsKey,
      });
      client.setQueriesData<Cached>(
        { queryKey: officerComplaintsKey },
        (old) =>
          old
            ? {
                ...old,
                items: old.items.map((item) =>
                  item.id === complaintId
                    ? { ...item, status: "ASSIGNED" as const }
                    : item,
                ),
              }
            : old,
      );
      return { snapshots };
    },
    onError: (error, _id, context) => {
      for (const [key, data] of context?.snapshots ?? []) {
        client.setQueryData(key, data);
      }
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Complaint assigned");
      onDone();
    },
    onSettled: () => {
      client.invalidateQueries({ queryKey: officerComplaintsKey });
      router.refresh();
    },
  });
}
