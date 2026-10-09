import type { UseFormRegisterReturn } from "react-hook-form";
import { FieldShell, nativeFieldClass } from "@/components/shared/field-shell";
import type { AdminUser } from "@/types/admin";

interface MemberSelectProps {
  id: string;
  label: string;
  field: UseFormRegisterReturn;
  members: AdminUser[];
  loading: boolean;
  error?: string;
}

export function MemberSelect(props: MemberSelectProps) {
  const { id, label, field, members, loading, error } = props;
  const name = label.toLowerCase();

  return (
    <FieldShell id={id} label={label} error={error}>
      <select id={id} className={nativeFieldClass} {...field}>
        <option value="">
          {loading ? "Loading..." : `No ${name} selected`}
        </option>
        {members.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </select>
      {!loading && members.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          No {name} in this department.
        </p>
      ) : null}
    </FieldShell>
  );
}
