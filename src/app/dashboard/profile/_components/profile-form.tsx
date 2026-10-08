"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/profile";
import { type ProfileValues, profileSchema } from "@/lib/validations/profile";
import { updateProfileAction } from "../../_actions/profileAction";

export function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? "",
    },
  });

  const onSubmit = async (values: ProfileValues) => {
    const changed = Object.fromEntries(
      Object.keys(dirtyFields).map((key) => [
        key,
        values[key as keyof ProfileValues],
      ]),
    ) as Partial<ProfileValues>;

    const result = await updateProfileAction(changed);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
    reset(values);
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 md:p-8 space-y-6"
      noValidate
    >
      <div className="space-y-4">
        <FormField
          id="name"
          label="Full name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormField
          id="phone"
          label="Phone"
          type="tel"
          placeholder="01XXXXXXXXX"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <div className="pt-2 flex justify-start">
        <Button
          type="submit"
          disabled={!isDirty || isSubmitting}
          className="px-6"
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
