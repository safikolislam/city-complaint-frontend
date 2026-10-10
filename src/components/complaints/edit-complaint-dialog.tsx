"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldShell, nativeFieldClass } from "@/components/shared/field-shell";
import { FormField } from "@/components/shared/form-field";
import { Modal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";


import type { ComplaintDetail } from "@/types/complaint";
import { useEditComplaint } from "@/hooks/use-edit-complaint";
import { editComplaintSchema, EditComplaintValues } from "@/lib/validations/edit-complaint";

interface EditDialogProps {
  complaint: ComplaintDetail;
  open: boolean;
  onClose: () => void;
}

export function EditComplaintDialog({ complaint, open, onClose }: EditDialogProps) {
  const mutation = useEditComplaint(complaint.id, onClose);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditComplaintValues>({
    resolver: zodResolver(editComplaintSchema),
    values: {
      title: complaint.title,
      description: complaint.description,
      address: complaint.address,
    },
  });

  return (
    <Modal open={open} onClose={onClose} title="Edit complaint">
      <form
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
        className="space-y-4"
        noValidate
      >
        <FormField id="title" label="Title" error={errors.title?.message} {...register("title")} />
        <FormField id="address" label="Address" error={errors.address?.message} {...register("address")} />
        <FieldShell id="description" label="Description" error={errors.description?.message}>
          <textarea id="description" rows={4} className={nativeFieldClass} {...register("description")} />
        </FieldShell>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}