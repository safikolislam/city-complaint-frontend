"use server";

import { roleHome } from "@/config/routes";
import { ApiError, api, apiRaw } from "@/lib/api";
import { REFRESH_COOKIE } from "@/lib/cookie-config";
import { readRefreshCookie } from "@/lib/refresh";
import { clearSession, getRefreshToken, setSession } from "@/lib/session";
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

interface RegisterInput extends Credentials {
  name: string;
  phone?: string;
}

function toFailure(error: unknown): ActionResult {
  if (error instanceof ApiError) {
    return {
      success: false,
      message: error.errors[0]?.message ?? error.message,
    };
  }
  return { success: false, message: "Something went wrong. Please try again." };
}

export async function loginAction(values: Credentials): Promise<ActionResult> {
  try {
    const { json, headers } = await apiRaw<LoginData>("/auth/login", {
      method: "POST",
      body: { email: values.email, password: values.password },
    });
    const refreshToken = readRefreshCookie(headers);
    if (!refreshToken) {
      return { success: false, message: "Login failed. Please try again." };
    }
    await setSession(json.data.accessToken, refreshToken);
    return {
      success: true,
      message: "Login successful",
      redirectTo: roleHome[json.data.user.role],
    };
  } catch (error) {
    return toFailure(error);
  }
}

export async function registerAction(
  values: RegisterInput,
): Promise<ActionResult> {
  const { name, email, password, phone } = values;

  try {
    await api("/auth/register", {
      method: "POST",
      body: { name, email, password, ...(phone ? { phone } : {}) },
    });
  } catch (error) {
    return toFailure(error);
  }

  const login = await loginAction({ email, password });
  if (login.success) return login;

  return {
    success: true,
    message: "Account created. Please log in.",
    redirectTo: "/auth/login",
  };
}

export async function logoutAction(): Promise<ActionResult> {
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    await api("/auth/logout", {
      method: "POST",
      cookie: `${REFRESH_COOKIE}=${refreshToken}`,
    }).catch(() => undefined);
  }
  await clearSession();
  return { success: true, message: "Logged out", redirectTo: "/auth/login" };
}
