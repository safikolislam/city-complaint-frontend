"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminComplaintsKey } from "@/hooks/use-admin-complaints";
import { clientApi } from "@/lib/client-api";
import type { ComplaintItem } from "@/lib/complaints";
import type { AssignValues } from "@/lib/validations/assign";
import type { PagedResult } from "@/types/paged";

type Cached = PagedResult<ComplaintItem> | undefined;

const toBody = (values: AssignValues) => ({
  ...(values.staffId ? { staffId: values.staffId } : {}),
  ...(values.technicianId ? { technicianId: values.technicianId } : {}),
});

export function useAssignComplaint(id: string, onDone: () => void) {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (values: AssignValues) =>
      clientApi(`/complaints/${id}/assign`, {
        method: "POST",
        body: toBody(values),
      }),
    onMutate: async () => {
      await client.cancelQueries({ queryKey: adminComplaintsKey });
      const snapshots = client.getQueriesData<Cached>({
        queryKey: adminComplaintsKey,
      });
      client.setQueriesData<Cached>({ queryKey: adminComplaintsKey }, (old) =>
        old
          ? {
              ...old,
              items: old.items.map((item) =>
                item.id === id
                  ? { ...item, status: "ASSIGNED" as const }
                  : item,
              ),
            }
          : old,
      );
      return { snapshots };
    },
    onError: (error, _values, context) => {
      for (const [key, data] of context?.snapshots ?? []) {
        client.setQueryData(key, data);
      }
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Complaint assigned");
      onDone();
    },
    onSettled: () => client.invalidateQueries({ queryKey: adminComplaintsKey }),
  });
}