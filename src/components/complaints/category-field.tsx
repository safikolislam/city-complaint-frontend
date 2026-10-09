"use client";

import type { UseFormRegisterReturn } from "react-hook-form";
import { FieldShell, nativeFieldClass } from "@/components/shared/field-shell";
import { useCategories } from "@/hooks/use-categories";

const isPaid = (fee?: string | number | null) =>
  fee !== null && fee !== undefined;

interface CategoryFieldProps {
  registration: UseFormRegisterReturn;
  selectedId: string;
  error?: string;
}

export function CategoryField(props: CategoryFieldProps) {
  const { registration, selectedId, error } = props;
  const { data, isPending, isError } = useCategories();
  const selected = data?.find((c) => c.id === selectedId);

  return (
    <FieldShell id="categoryId" label="Category" error={error}>
      <select id="categoryId" className={nativeFieldClass} {...registration}>
        <option value="">
          {isPending ? "Loading..." : "Select a category"}
        </option>
        {data?.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
            {isPaid(c.serviceFee) ? " (paid service)" : ""}
          </option>
        ))}
      </select>
      {isError ? (
        <p className="text-xs text-destructive">Could not load categories.</p>
      ) : null}
      {selected && isPaid(selected.serviceFee) ? (
        <p className="text-xs text-muted-foreground">
          Service fee: {Number(selected.serviceFee)}. You will need to pay after
          submitting.
        </p>
      ) : null}
    </FieldShell>
  );
}