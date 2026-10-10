"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Modal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";

import { type RoleValues, roleSchema } from "@/lib/validations/role";
import type { AdminUser, Department } from "@/types/admin";
import { clientApi } from "@/lib/client-api";
import { FieldShell, nativeFieldClass } from "../shared/field-shell";

export function RoleDialog({
  user,
  disabled,
}: {
  user: AdminUser;
  disabled: boolean;
}) {
  const router = useRouter();
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
      staffPosition: user.staffPosition ?? "",
      departmentId: user.department?.id ?? "",
    },
  });
  const isStaff = watch("role") === "STAFF";

  const departments = useQuery({
    queryKey: ["departments"],
    queryFn: async () => (await clientApi<Department[]>("/departments")).data,
    enabled: open && isStaff,
    staleTime: 5 * 60_000,
  });

  const mutation = useMutation({
    mutationFn: (values: RoleValues) =>
      clientApi(`/admin/users/${user.id}/role`, {
        method: "PATCH",
        body: values.role === "STAFF" ? values : { role: values.role },
      }),
    onSuccess: () => {
      toast.success("Role updated");
      setOpen(false);
      router.refresh();
    },
    onError: (error) => toast.error(error.message),
  });

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
          onSubmit={handleSubmit((v) => mutation.mutate(v))}
          className="space-y-4"
          noValidate
        >
          <FieldShell id="role" label="Role">
            <select
              id="role"
              className={nativeFieldClass}
              {...register("role")}
            >
              <option value="CITIZEN">Citizen</option>
              <option value="STAFF">Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
          </FieldShell>
          {isStaff ? (
            <>
              <FieldShell id="staffPosition" label="Position">
                <select
                  id="staffPosition"
                  className={nativeFieldClass}
                  {...register("staffPosition")}
                >
                  <option value="">Select a position</option>
                  <option value="OFFICER">Officer</option>
                  <option value="TECHNICIAN">Technician</option>
                  <option value="MANAGER">Manager</option>
                </select>
              </FieldShell>
              <FieldShell
                id="departmentId"
                label="Department"
                error={errors.departmentId?.message}
              >
                <select
                  id="departmentId"
                  className={nativeFieldClass}
                  {...register("departmentId")}
                >
                  <option value="">
                    {departments.isPending
                      ? "Loading..."
                      : "Select a department"}
                  </option>
                  {departments.data?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </FieldShell>
            </>
          ) : null}
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
