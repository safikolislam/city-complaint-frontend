"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { useDepartments } from "@/hooks/use-departments";
import { useUpdateRole } from "@/hooks/use-update-role";
import { type RoleValues, roleSchema } from "@/lib/validations/role";
import type { AdminUser } from "@/types/admin";
import { RoleFields } from "./role-field";

const toPosition = (value: string | null) =>
  value === "OFFICER" || value === "TECHNICIAN" ? value : "";

interface RoleDialogProps {
  user: AdminUser;
  disabled: boolean;
}

export function RoleDialog({ user, disabled }: RoleDialogProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RoleValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: user.role,
      staffPosition: toPosition(user.staffPosition),
      departmentId: user.department?.id ?? "",
    },
  });
  const isStaff = watch("role") === "STAFF";
  const departments = useDepartments();
  const mutation = useUpdateRole(user.id, () => setOpen(false));

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={() => setOpen(true)}
      >
        Change role
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`Change role: ${user.name}`}
      >
        <form
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
          className="space-y-4"
          noValidate
        >
          <RoleFields
            register={register}
            errors={errors}
            isStaff={isStaff}
            departments={departments.data ?? []}
            loading={departments.isPending}
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
              {mutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
