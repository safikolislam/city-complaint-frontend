"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FieldShell, nativeFieldClass } from "@/components/shared/field-shell";
import { Modal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { useOfficerAssign } from "@/hooks/use-officer-assign";
import { useTechnicianOptions } from "@/hooks/use-technician-options";
import {
  type AssignTechnicianValues,
  assignTechnicianSchema,
} from "@/lib/validations/assign-technician";
import type { ComplaintStatus } from "@/types/complaint";

const ASSIGNABLE: ComplaintStatus[] = ["PENDING", "REOPENED"];

interface AssignTechnicianDialogProps {
  complaint: { id: string; title: string; status: ComplaintStatus };
}

export function AssignTechnicianDialog({
  complaint,
}: AssignTechnicianDialogProps) {
  const [open, setOpen] = useState(false);
  const technicians = useTechnicianOptions(open);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignTechnicianValues>({
    resolver: zodResolver(assignTechnicianSchema),
    defaultValues: { technicianId: "" },
  });

  const close = () => {
    setOpen(false);
    reset();
  };
  const mutation = useOfficerAssign(complaint.id, close);
  const people = technicians.data ?? [];

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        disabled={!ASSIGNABLE.includes(complaint.status)}
        onClick={() => setOpen(true)}
      >
        <UserPlus className="mr-2 size-4" />
        Assign
      </Button>

      <Modal
        open={open}
        onClose={() => {
          if (!mutation.isPending) close();
        }}
        title="Assign to technician"
      >
        <p className="mb-4 rounded-lg bg-muted/50 p-3 text-sm font-medium">
          {complaint.title}
        </p>

        {technicians.isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : technicians.isError ? (
          <div className="space-y-3 py-4 text-center">
            <p className="text-sm text-destructive">
              {technicians.error.message}
            </p>
            <Button variant="outline" size="sm" onClick={() => technicians.refetch()}>
              Try again
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit((v) => mutation.mutate(v.technicianId))}
            className="space-y-4"
            noValidate
          >
            <FieldShell
              id="technicianId"
              label="Technician"
              error={errors.technicianId?.message}
            >
              <select
                id="technicianId"
                className={nativeFieldClass}
                disabled={mutation.isPending}
                {...register("technicianId")}
              >
                <option value="">Select a technician</option>
                {people.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name} ({person.email})
                  </option>
                ))}
              </select>
              {people.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No technician found in your department.
                </p>
              ) : null}
            </FieldShell>
            <div className="flex justify-end gap-3 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={close}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Assigning..." : "Assign"}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}