"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/shared/modal";
import { SelectField } from "@/components/shared/select-field";
import { Button } from "@/components/ui/button";
import { useOfficerAssign } from "@/hooks/use-officer-assign";
import { useTechnicians } from "@/hooks/use-technicians";
import type { ComplaintItem } from "@/lib/complaints";
import {
  type OfficerAssignValues,
  officerAssignSchema,
} from "@/lib/validations/officer-assign";

type DialogComplaint = Pick<ComplaintItem, "id" | "title" | "status">;

export function OfficerAssignDialog({
  complaint,
}: {
  complaint: DialogComplaint;
}) {
  const [open, setOpen] = useState(false);
  const technicians = useTechnicians(open);
  const close = () => setOpen(false);
  const mutation = useOfficerAssign(complaint.id, close);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OfficerAssignValues>({
    resolver: zodResolver(officerAssignSchema),
    defaultValues: { technicianId: "" },
  });

  const canAssign =
    complaint.status === "PENDING" || complaint.status === "REOPENED";
  const list = technicians.data ?? [];

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        disabled={!canAssign}
        onClick={() => setOpen(true)}
      >
        <UserPlus className="size-4" /> Assign
      </Button>
      <Modal open={open} onClose={close} title="Assign complaint">
        <p className="mb-4 text-sm text-muted-foreground">{complaint.title}</p>
        <form
          onSubmit={handleSubmit((v) => mutation.mutate(v.technicianId))}
          className="space-y-4"
          noValidate
        >
          <SelectField
            id="technicianId"
            label="Technician"
            disabled={technicians.isPending}
            error={errors.technicianId?.message}
            {...register("technicianId")}
          >
            <option value="">
              {technicians.isPending ? "Loading..." : "Select a technician"}
            </option>
            {list.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </SelectField>
          {technicians.isError ? (
            <p role="alert" className="text-sm text-destructive">
              {technicians.error.message}
            </p>
          ) : null}
          {technicians.isSuccess && list.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No technician in your department yet.
            </p>
          ) : null}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Assigning..." : "Assign"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}