"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/app/auth/_actions/authAction";
import { ApiError } from "@/lib/api";
import { authApi } from "@/lib/auth-api";
import type { ProfileValues } from "@/lib/validations/profile";

export async function updateProfileAction(
  values: Partial<ProfileValues>,
): Promise<ActionResult> {
  if (Object.keys(values).length === 0) {
    return { success: false, message: "No changes to save." };
  }

  try {
    await authApi("/users/me", { method: "PATCH", body: values });
    revalidatePath("/dashboard", "layout");
    return { success: true, message: "Profile updated" };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.errors[0]?.message ?? error.message,
      };
    }
    return { success: false, message: "Something went wrong. Try again." };
  }
}
