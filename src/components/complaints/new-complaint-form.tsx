"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AiSuggestCard } from "@/components/complaints/ai-suggest-card";
import { CategoryField } from "@/components/complaints/category-field";
import { PriorityField } from "@/components/complaints/priority-field";
import { FieldShell, nativeFieldClass } from "@/components/shared/field-shell";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/use-categories";
import { useCreateComplaint } from "@/hooks/use-create-complaint";
import {
  type CreateComplaintValues,
  createComplaintDefaults,
  createComplaintSchema,
} from "@/lib/validations/create-complaint";

export function NewComplaintForm() {
  const mutation = useCreateComplaint();
  const categories = useCategories();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateComplaintValues>({
    resolver: zodResolver(createComplaintSchema),
    defaultValues: createComplaintDefaults,
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
      <AiSuggestCard
        title={watch("title")}
        description={watch("description")}
        categories={categories.data ?? []}
        onApply={(r) => {
          setValue("categoryId", r.categoryId, {
            shouldValidate: true,
            shouldDirty: true,
          });
          setValue("priority", r.priority, { shouldDirty: true });
        }}
      />
      <CategoryField
        registration={register("categoryId")}
        selectedId={watch("categoryId")}
        error={errors.categoryId?.message}
      />
      <PriorityField
        registration={register("priority")}
        error={errors.priority?.message}
      />
      <FormField
        id="address"
        label="Address"
        error={errors.address?.message}
        {...register("address")}
      />
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Submitting..." : "Submit complaint"}
      </Button>
    </form>
  );
}
