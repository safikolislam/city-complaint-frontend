"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormField } from "@/components/shared/form-field";
import { PasswordField } from "@/components/shared/password-field";
import { Button } from "@/components/ui/button";
import { type RegisterValues, registerSchema } from "@/lib/validations/auth";
import { registerAction } from "../_actions/authAction";

export function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values: RegisterValues) => {
    const { name, email, phone, password } = values;
    const result = await registerAction({
      name,
      email,
      password,
      ...(phone ? { phone } : {}),
    });
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("Account created");
    router.push(result.redirectTo ?? "/");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
        label="Phone "
        type="tel"
        placeholder="01XXXXXXXXX"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <PasswordField
        id="password"
        label="Password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />
      <PasswordField
        id="confirmPassword"
        label="Confirm password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
