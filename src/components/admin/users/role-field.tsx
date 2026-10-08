import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FieldShell, nativeFieldClass } from "@/components/shared/field-shell";
import type { RoleValues } from "@/lib/validations/role";
import type { Department } from "@/types/admin";

interface RoleFieldsProps {
  register: UseFormRegister<RoleValues>;
  errors: FieldErrors<RoleValues>;
  isStaff: boolean;
  departments: Department[];
  loading: boolean;
}

export function RoleFields(props: RoleFieldsProps) {
  const { register, errors, isStaff, departments, loading } = props;

  return (
    <>
      <FieldShell id="role" label="Role">
        <select id="role" className={nativeFieldClass} {...register("role")}>
          <option value="CITIZEN">Citizen</option>
          <option value="STAFF">Staff</option>
          <option value="ADMIN">Admin</option>
        </select>
      </FieldShell>
      {isStaff ? (
        <>
          <FieldShell id="staffPosition" label="Position">
            <select
              id="staffPosition"
              className={nativeFieldClass}
              {...register("staffPosition")}
            >
              <option value="">Select a position</option>
              <option value="OFFICER">Officer</option>
              <option value="TECHNICIAN">Technician</option>
            </select>
          </FieldShell>
          <FieldShell
            id="departmentId"
            label="Department"
            error={errors.departmentId?.message}
          >
            <select
              id="departmentId"
              className={nativeFieldClass}
              {...register("departmentId")}
            >
              <option value="">
                {loading ? "Loading..." : "Select a department"}
              </option>
              {departments.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FieldShell>
        </>
      ) : null}
    </>
  );
}