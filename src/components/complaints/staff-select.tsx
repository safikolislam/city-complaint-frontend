import type { UseFormRegisterReturn } from "react-hook-form";
import { FieldShell, nativeFieldClass } from "@/components/shared/field-shell";
import type { AdminUser } from "@/types/admin";

interface StaffSelectProps {
  id: string;
  label: string;
  members: AdminUser[];
  registration: UseFormRegisterReturn;
  disabled?: boolean;
  error?: string;
}

export function StaffSelect(props: StaffSelectProps) {
  const { id, label, members, registration, disabled, error } = props;

  return (
    <FieldShell id={id} label={label} error={error}>
      <select
        id={id}
        className={nativeFieldClass}
        disabled={disabled}
        {...registration}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {members.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name} ({member.email})
          </option>
        ))}
      </select>
      {members.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          No {label.toLowerCase()} found for this department.
        </p>
      ) : null}
    </FieldShell>
  );
}