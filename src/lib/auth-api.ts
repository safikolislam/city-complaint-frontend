import { api, apiRaw } from "@/lib/api";
import { getAccessToken } from "@/lib/session";
import type { Meta } from "@/types/api";

interface Options {
  method?: string;
  body?: unknown;
}

export async function authApi<T>(path: string, options: Options = {}) {
  const token = await getAccessToken();
  return api<T>(path, { ...options, token });
}

export async function authApiFull<T>(path: string, options: Options = {}) {
  const token = await getAccessToken();
  const { json } = await apiRaw<T>(path, { ...options, token });
  return { data: json.data, meta: json.meta as Meta | undefined };
}
