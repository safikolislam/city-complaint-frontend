"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useDepartmentTechnicians } from "@/hooks/use-department-technicians";
import { clientApi } from "@/lib/client-api";
import { SelectField } from "../shared/select-field";

const schema = z.object({
  technicianId: z.string().min(1, "Select a technician"),
});
type Values = z.infer<typeof schema>;

export function OfficerAssignForm({ complaintId }: { complaintId: string }) {
  const router = useRouter();
  const { data: technicians = [], isLoading } = useDepartmentTechnicians();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { technicianId: "" },
  });

  const assign = useMutation({
    mutationFn: (values: Values) =>
      clientApi(`/complaints/${complaintId}/assign`, {
        method: "POST",
        body: JSON.stringify(values),
      }),
    onSuccess: () => {
      toast.success("Complaint assigned");
      router.refresh();
    },
    onError: (error) => toast.error(error.message),
  });

  if (!isLoading && technicians.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No technician is available in your department yet.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((values) => assign.mutate(values))}
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
      noValidate
    >
      <div className="flex-1">
        <SelectField
          id="technicianId"
          label="Technician"
          disabled={isLoading}
          error={errors.technicianId?.message}
          {...register("technicianId")}
        >
          <option value="">
            {isLoading ? "Loading..." : "Select a technician"}
          </option>
          {technicians.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name} ({t.email})
            </option>
          ))}
        </SelectField>
      </div>
      <Button type="submit" disabled={assign.isPending}>
        {assign.isPending ? "Assigning..." : "Assign"}
      </Button>
    </form>
  );
}
