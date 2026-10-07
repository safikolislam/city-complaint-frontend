
import { getAccessToken } from "@/lib/session";
import { api } from "./api";

export async function authApi<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
) {
  const token = await getAccessToken();
  return api<T>(path, { ...options, token });
}