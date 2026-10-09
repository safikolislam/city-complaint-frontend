"use client";

import { useEffect, useState } from "react";
import { Loader2, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useAssignComplaint } from "@/hooks/use-assign-complaint";
import { clientApi } from "@/lib/client-api";
import { assignSchema, AssignValues } from "@/lib/validations/assign";
import type { ComplaintItem } from "@/types/complaint";

import { Button } from "../ui/button";
import { Modal } from "../shared/modal";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  staffPosition?: "OFFICER" | "TECHNICIAN" | null;
  department?: {
    id: string;
    name: string;
  } | null;
}

export function AssignDialog({ complaint }: { complaint: ComplaintItem }) {
  const [open, setOpen] = useState(false);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loadingStaff, setLoadingStaff] = useState(false);

  const mutation = useAssignComplaint(complaint.id, () => setOpen(false));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignValues>({
    resolver: zodResolver(assignSchema),
    defaultValues: {
      staffId: "",
      technicianId: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    const loadStaff = async () => {
      try {
        setLoadingStaff(true);

        const response = await clientApi<StaffMember[]>(
          "/admin/users?role=STAFF&limit=100",
        );

        const raw = response?.data;

        const users = Array.isArray(raw)
          ? raw
          : ((raw as any)?.items ?? (raw as any)?.data ?? []);

        setStaff(users);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load staff members");
      } finally {
        setLoadingStaff(false);
      }
    };

    loadStaff();
  }, [open]);

  const departmentId = complaint.department?.id;

  const departmentStaff = staff.filter(
    (member) => member.department?.id === departmentId,
  );

  const officers = departmentStaff.filter(
    (member) => member.staffPosition === "OFFICER",
  );

  const technicians = departmentStaff.filter(
    (member) => member.staffPosition === "TECHNICIAN",
  );

  const canAssign =
    complaint.status === "PENDING" || complaint.status === "REOPENED";

  const submitHandler = (values: AssignValues) => {
    mutation.mutate(values);
  };

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

      <Modal open={open} onClose={closeModal} title="Assign Complaint">
        <div className="mb-5 rounded-lg bg-muted/50 p-4">
          <p className="font-semibold">{complaint.title}</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Department: {complaint.department?.name ?? "Not assigned"}
          </p>
        </div>

        {loadingStaff ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="size-6 animate-spin" />

            <span className="ml-2 text-sm text-muted-foreground">
              Loading staff...
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="space-y-5"
            noValidate
          >
            {/* Officer */}
            <div className="space-y-2">
              <label htmlFor="staffId" className="text-sm font-medium">
                Officer
              </label>

              <select
                id="staffId"
                {...register("staffId")}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                disabled={mutation.isPending}
              >
                <option value="">Select Officer</option>

                {officers.map((officer) => (
                  <option key={officer.id} value={officer.id}>
                    {officer.name} ({officer.email})
                  </option>
                ))}
              </select>

              {errors.staffId?.message && (
                <p className="text-sm text-destructive">
                  {errors.staffId.message}
                </p>
              )}

              {officers.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No officer found for this department.
                </p>
              )}
            </div>

            {/* Technician */}
            <div className="space-y-2">
              <label htmlFor="technicianId" className="text-sm font-medium">
                Technician
              </label>

              <select
                id="technicianId"
                {...register("technicianId")}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                disabled={mutation.isPending}
              >
                <option value="">Select Technician</option>

                {technicians.map((technician) => (
                  <option key={technician.id} value={technician.id}>
                    {technician.name} ({technician.email})
                  </option>
                ))}
              </select>

              {errors.technicianId?.message && (
                <p className="text-sm text-destructive">
                  {errors.technicianId.message}
                </p>
              )}

              {technicians.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No technician found for this department.
                </p>
              )}
            </div>

            {/* Buttons */}
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
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Assigning...
                  </>
                ) : (
                  "Assign Complaint"
                )}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
