"use server";

import { roleHome } from "@/config/routes";
import { ApiError, api } from "@/lib/api";
import { clearSession, setSession } from "@/lib/session";
import type { SessionUser } from "@/types/api";

export interface ActionResult {
  success: boolean;
  message: string;
  redirectTo?: string;
}

interface LoginData {
  accessToken: string;
  user: SessionUser;
}

interface Credentials {
  email: string;
  password: string;
}

function toFailure(error: unknown): ActionResult {
  if (error instanceof ApiError) {
    return { success: false, message: error.message };
  }
  return { success: false, message: "Something went wrong. Please try again." };
}

export async function loginAction(values: Credentials): Promise<ActionResult> {
  try {
    const res = await api<LoginData>("/auth/login", {
      method: "POST",
      body: values,
    });
    await setSession(res.data.accessToken);
    return {
      success: true,
      message: "Login successful",
      redirectTo: roleHome[res.data.user.role],
    };
  } catch (error) {
    return toFailure(error);
  }
}

export async function logoutAction(): Promise<ActionResult> {
  await clearSession();
  return { success: true, message: "Logged out", redirectTo: "/auth/login" };
}
