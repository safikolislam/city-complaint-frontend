"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldShell, nativeFieldClass } from "@/components/shared/field-shell";
import { Button } from "@/components/ui/button";
import { type AssignValues, assignSchema } from "@/lib/validations/assign";

export interface Person {
  id: string;
  name: string;
  email: string;
}

interface AssignFormProps {
  label: string;
  people: Person[];
  pending: boolean;
  onSubmit: (id: string) => void;
  onCancel: () => void;
}

export function AssignForm(props: AssignFormProps) {
  const { label, people, pending, onSubmit, onCancel } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignValues>({
    resolver: zodResolver(assignSchema),
    defaultValues: { staffId: "" },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values.staffId))}
      className="space-y-4"
      noValidate
    >
      <FieldShell id="staffId" label={label} error={errors.staffId?.message}>
        <select
          id="staffId"
          className={nativeFieldClass}
          disabled={pending}
          {...register("staffId")}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name} ({person.email})
            </option>
          ))}
        </select>
        {people.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No {label.toLowerCase()} found for this department.
          </p>
        ) : null}
      </FieldShell>
      <div className="flex justify-end gap-3 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={pending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? "Assigning..." : "Assign"}
        </Button>
      </div>
    </form>
  );
}
