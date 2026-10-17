import type { UseFormRegisterReturn } from "react-hook-form";
import { FieldShell, nativeFieldClass } from "@/components/shared/field-shell";
import { titleOf } from "@/lib/format";
import { PRIORITIES } from "@/lib/validations/complaint";

type Props = { registration: UseFormRegisterReturn; error?: string };

export function PriorityField({ registration, error }: Props) {
  return (
    <FieldShell id="priority" label="Priority" error={error}>
      <select id="priority" className={nativeFieldClass} {...registration}>
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {titleOf(p)}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}