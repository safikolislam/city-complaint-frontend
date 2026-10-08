"use client";

import { useAssignComplaint } from "@/hooks/use-assign-complaint";
import { useStaffOptions } from "@/hooks/use-staff-options";
import { assignSchema, AssignValues } from "@/lib/validations/assign";
import { ComplaintItem } from "@/types/complaint";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Modal } from "../shared/modal";
import { MemberSelect } from "./member-select";



export function AssignDialog({ complaint }: { complaint: ComplaintItem }) {
  const [open, setOpen] = useState(false);
  const staff = useStaffOptions(open);
  const mutation = useAssignComplaint(complaint.id, () => setOpen(false));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignValues>({
    resolver: zodResolver(assignSchema),
    defaultValues: { staffId: "", technicianId: "" },
  });

const members = (staff.data ?? []).filter(
  (member) => member.department?.id === complaint.department?.id,
);
  const canAssign =
    complaint.status === "PENDING" || complaint.status === "REOPENED";

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        disabled={!canAssign}
        onClick={() => setOpen(true)}
      >
        Assign
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Assign complaint"
      >
        <p className="mb-4 text-sm text-muted-foreground">
          {complaint.title} · {complaint.department?.name}
        </p>
        <form
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
          className="space-y-4"
          noValidate
        >
          <MemberSelect
            id="staffId"
            label="Officer"
            field={register("staffId")}
            members={members.filter((m) => m.staffPosition === "OFFICER")}
            loading={staff.isPending}
          />
          <MemberSelect
            id="technicianId"
            label="Technician"
            field={register("technicianId")}
            members={members.filter((m) => m.staffPosition === "TECHNICIAN")}
            loading={staff.isPending}
            error={errors.technicianId?.message}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
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