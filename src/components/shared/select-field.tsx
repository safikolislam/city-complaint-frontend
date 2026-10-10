import type { ComponentProps } from "react";
import { FieldShell, nativeFieldClass } from "@/components/shared/field-shell";
import { cn } from "@/lib/utils";

interface SelectFieldProps extends ComponentProps<"select"> {
  id: string;
  label: string;
  error?: string;
}

export function SelectField({
  id,
  label,
  error,
  className,
  children,
  ...props
}: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        className={cn(
          nativeFieldClass,
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}
