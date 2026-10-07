import { redirect } from "next/navigation";
import { ApiError, type ApiOptions, apiRaw } from "@/lib/api";
import { getAccessToken } from "@/lib/session";
import type { Meta } from "@/types/api";

type Options = Omit<ApiOptions, "token" | "cookie">;

export interface Paged<T> {
  data: T;
  meta?: Meta;
}

export async function authApiFull<T>(
  path: string,
  options: Options = {},
): Promise<Paged<T>> {
  const token = await getAccessToken();
  if (!token) redirect("/auth/login");

  try {
    const { json } = await apiRaw<T>(path, { ...options, token });
    return { data: json.data, meta: json.meta };
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect("/auth/login");
    }
    throw error;
  }
}

export async function authApi<T>(
  path: string,
  options: Options = {},
): Promise<T> {
  const { data } = await authApiFull<T>(path, options);
  return data;
}
