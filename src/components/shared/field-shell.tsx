import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

export const nativeFieldClass =
  "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

export function FieldShell({ id, label, error, children }: FieldShellProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
