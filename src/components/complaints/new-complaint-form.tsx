"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryField } from "@/components/complaints/category-field";
import { FieldShell, nativeFieldClass } from "@/components/shared/field-shell";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { useCreateComplaint } from "@/hooks/use-create-complaint";
import { titleOf } from "@/lib/format";
import { PRIORITIES } from "@/lib/validations/complaint";
import {
  type CreateComplaintValues,
  createComplaintSchema,
} from "@/lib/validations/create-complaint";

export function NewComplaintForm() {
  const mutation = useCreateComplaint();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateComplaintValues>({
    resolver: zodResolver(createComplaintSchema),
    defaultValues: {
      title: "",
      description: "",
      address: "",
      categoryId: "",
      priority: "MEDIUM",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      className="space-y-4"
      noValidate
    >
      <FormField
        id="title"
        label="Title"
        error={errors.title?.message}
        {...register("title")}
      />
      <CategoryField
        registration={register("categoryId")}
        selectedId={watch("categoryId")}
        error={errors.categoryId?.message}
      />
      <FieldShell
        id="priority"
        label="Priority"
        error={errors.priority?.message}
      >
        <select
          id="priority"
          className={nativeFieldClass}
          {...register("priority")}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {titleOf(p)}
            </option>
          ))}
        </select>
      </FieldShell>
      <FormField
        id="address"
        label="Address"
        error={errors.address?.message}
        {...register("address")}
      />
      <FieldShell
        id="description"
        label="Description"
        error={errors.description?.message}
      >
        <textarea
          id="description"
          rows={4}
          className={nativeFieldClass}
          {...register("description")}
        />
      </FieldShell>
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Submitting..." : "Submit complaint"}
      </Button>
    </form>
  );
}
