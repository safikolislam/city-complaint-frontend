"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { complaintKey } from "@/hooks/use-compliant-mutations";
import { clientApi } from "@/lib/client-api";
import type { AssignValues } from "@/lib/validations/assign";

export function useAssignComplaint(id: string, onDone: () => void) {
  const client = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (values: AssignValues) =>
      clientApi(`/complaints/${id}/assign`, { method: "POST", body: values }),
    onSuccess: () => {
      toast.success("Complaint assigned");
      onDone();
      client.invalidateQueries({ queryKey: complaintKey(id) });
      router.refresh();
    },
    onError: (error) => toast.error(error.message),
  });
}
