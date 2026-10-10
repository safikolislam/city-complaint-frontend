import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FieldShell, nativeFieldClass } from "@/components/shared/field-shell";
import { FormField } from "@/components/shared/form-field";
import { SelectField } from "@/components/shared/select-field";
import { PRIORITIES } from "@/lib/validations/complaint";
import type { CreateComplaintValues } from "@/lib/validations/create-complaint";

interface DetailFieldsProps {
  register: UseFormRegister<CreateComplaintValues>;
  errors: FieldErrors<CreateComplaintValues>;
}

export function ComplaintDetailFields({ register, errors }: DetailFieldsProps) {
  return (
    <>
      <FormField
        id="title"
        label="Title"
        placeholder="e.g. Water pipe leaking near market"
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
          placeholder="Describe the problem in detail..."
          {...register("description")}
        />
      </FieldShell>
      <FormField
        id="address"
        label="Address"
        placeholder="e.g. Station Road, Narsingdi"
        error={errors.address?.message}
        {...register("address")}
      />
      <SelectField
        id="priority"
        label="Priority"
        className="capitalize"
        {...register("priority")}
      >
        {PRIORITIES.map((item) => (
          <option key={item} value={item}>
            {item.toLowerCase()}
          </option>
        ))}
      </SelectField>
    </>
  );
}
