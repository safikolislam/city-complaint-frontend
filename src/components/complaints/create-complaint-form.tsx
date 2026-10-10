"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CategorySelect } from "@/components/complaints/category-select";
import { ComplaintDetailFields } from "@/components/complaints/complaint-detail-fields";
import { LocationFields } from "@/components/complaints/location-fields";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCategories } from "@/hooks/use-categories";
import { useCreateComplaint } from "@/hooks/use-create-complaint";
import {
  type CreateComplaintValues,
  createComplaintDefaults,
  createComplaintSchema,
} from "@/lib/validations/create-complaint";

export default function CreateComplaintForm() {
  const router = useRouter();
  const categories = useCategories();
  const create = useCreateComplaint();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateComplaintValues>({
    resolver: zodResolver(createComplaintSchema),
    defaultValues: createComplaintDefaults,
  });

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">Submit a complaint</CardTitle>
        <p className="text-sm text-muted-foreground">
          Tell us about the problem in your area. The right department will
          review it.
        </p>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit((values) => create.mutate(values))}
          className="space-y-5"
          noValidate
        >
          <CategorySelect
            register={register}
            errors={errors}
            categories={categories.data ?? []}
            loading={categories.isPending}
            selectedId={watch("categoryId")}
          />
          <ComplaintDetailFields register={register} errors={errors} />
          <LocationFields
            register={register}
            setValue={setValue}
            errors={errors}
          />
          <div className="flex justify-end gap-3 border-t pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/citizen/complaints")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={create.isPending}>
              {create.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              {create.isPending ? "Submitting..." : "Submit complaint"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
