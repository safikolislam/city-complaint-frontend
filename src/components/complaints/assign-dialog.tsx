"use client";

import { Loader2, UserPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Modal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { useAssignComplaint } from "@/hooks/use-assign-complaint";
import { useDepartmentOfficers } from "@/hooks/use-department-officers";
import { useOfficerAssign } from "@/hooks/use-officer-assign";
import { useTechnicians } from "@/hooks/use-technicians";
import type { ComplaintItem } from "@/types/complaint";
import { OfficerAssignForm } from "../staff/officer-assign-form";

const ASSIGNABLE: string[] = ["PENDING", "REOPENED"];

export function AssignDialog({ complaint }: { complaint: ComplaintItem }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isAdmin = pathname.startsWith("/dashboard/admin");
  const isOfficer = pathname.startsWith("/dashboard/staff/officer");
  const departmentId = complaint.department?.id;
  const close = () => setOpen(false);

  const officers = useDepartmentOfficers(departmentId, open && isAdmin);
  const technicians = useTechnicians(open && isOfficer);
  const adminAssign = useAssignComplaint(complaint.id, close);
  const officerAssign = useOfficerAssign(complaint.id, close);

  if (!isAdmin && !isOfficer) return null;

  const people: Person[] = isAdmin
    ? officers.officers
    : (technicians.data ?? []);
  const loading = isAdmin ? officers.isLoading : technicians.isLoading;
  const error = isAdmin ? officers.error : technicians.error;
  const pending = adminAssign.isPending || officerAssign.isPending;
  const label = isAdmin ? "Officer" : "Technician";

  const submit = (id: string) => {
    if (isAdmin) adminAssign.mutate({ staffId: id });
    else officerAssign.mutate(id);
  };

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
          if (!pending) close();
        }}
        title={`Assign to ${label.toLowerCase()}`}
      >
        <div className="mb-4 rounded-lg bg-muted/50 p-4">
          <p className="font-semibold">{complaint.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Department: {complaint.department?.name ?? "Not assigned"}
          </p>
        </div>

        {isAdmin && !departmentId ? (
          <p className="py-6 text-center text-sm text-destructive">
            Department is missing for this complaint.
          </p>
        ) : loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : error ? (
          <p className="py-6 text-center text-sm text-destructive">
            {error.message}
          </p>
        ) : open ? (
          <OfficerAssignForm
            label={label}
            people={people}
            pending={pending}
            onSubmit={submit}
            onCancel={close}
          />
        ) : null}
      </Modal>
    </>
  );
}
