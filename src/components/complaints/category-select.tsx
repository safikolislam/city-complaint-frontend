import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { SelectField } from "@/components/shared/select-field";
import type { CategoryOption } from "@/hooks/use-categories";
import type { CreateComplaintValues } from "@/lib/validations/create-complaint";

interface CategorySelectProps {
  register: UseFormRegister<CreateComplaintValues>;
  errors: FieldErrors<CreateComplaintValues>;
  categories: CategoryOption[];
  loading: boolean;
  selectedId: string;
}

export function CategorySelect(props: CategorySelectProps) {
  const { register, errors, categories, loading, selectedId } = props;
  const fee = Number(
    categories.find((item) => item.id === selectedId)?.serviceFee ?? 0,
  );

  return (
    <div className="space-y-1.5">
      <SelectField
        id="categoryId"
        label="Category"
        disabled={loading}
        error={errors.categoryId?.message}
        {...register("categoryId")}
      >
        <option value="">
          {loading ? "Loading categories..." : "Select a category"}
        </option>
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.department?.name
              ? `${item.name} (${item.department.name})`
              : item.name}
          </option>
        ))}
      </SelectField>
      {fee > 0 ? (
        <p className="text-sm text-muted-foreground">
          This is a paid service. A fee of ৳{fee} applies after you submit.
        </p>
      ) : null}
    </div>
  );
}
