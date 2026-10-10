"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FieldShell, nativeFieldClass } from "@/components/shared/field-shell";
import { Modal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { useAssignComplaint } from "@/hooks/use-assign-complaint";
import { useDepartmentOfficers } from "@/hooks/use-department-officers";
import { type AssignValues, assignSchema } from "@/lib/validations/assign";
import type { ComplaintItem } from "@/types/complaint";

const ALLOWED_AREAS = ["/dashboard/admin", "/dashboard/staff/officer"];

export function AssignDialog({ complaint }: { complaint: ComplaintItem }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { officers, isLoading, error } = useDepartmentOfficers(
    complaint.department?.id,
    open,
  );
  const mutation = useAssignComplaint(complaint.id, () => setOpen(false));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignValues>({
    resolver: zodResolver(assignSchema),
    defaultValues: { staffId: "" },
  });

  if (!ALLOWED_AREAS.some((area) => pathname.startsWith(area))) return null;

  const canAssign =
    complaint.status === "PENDING" || complaint.status === "REOPENED";

  const closeModal = () => {
    if (mutation.isPending) return;
    setOpen(false);
    reset();
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        disabled={!canAssign}
        onClick={() => setOpen(true)}
      >
        <UserPlus className="mr-2 size-4" />
        Assign
      </Button>

      <Modal open={open} onClose={closeModal} title="Assign to officer">
        <div className="mb-4 rounded-lg bg-muted/50 p-4">
          <p className="font-semibold">{complaint.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Department: {complaint.department?.name ?? "Not assigned"}
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : error ? (
          <p className="py-6 text-center text-sm text-destructive">
            {error.message}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit((values) => mutation.mutate(values))}
            className="space-y-4"
            noValidate
          >
            <FieldShell
              id="staffId"
              label="Officer"
              error={errors.staffId?.message}
            >
              <select
                id="staffId"
                className={nativeFieldClass}
                disabled={mutation.isPending}
                {...register("staffId")}
              >
                <option value="">Select officer</option>
                {officers.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name} ({o.email})
                  </option>
                ))}
              </select>
              {officers.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No officer found for this department.
                </p>
              ) : null}
            </FieldShell>
            <div className="flex justify-end gap-3 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={closeModal}
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
