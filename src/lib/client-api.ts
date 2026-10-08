import type { Meta } from "@/types/api";

export interface ClientResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: Meta;
}

interface ErrorBody {
  message?: string;
  errors?: { message?: string }[];
}

export async function clientApi<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<ClientResponse<T>> {
  const { method = "GET", body } = options;
  const res = await fetch(`/api/proxy${path}`, {
    method,
    headers: body !== undefined ? { "Content-Type": "application/json" } : {},
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const json = (await res.json().catch(() => null)) as
    | (Partial<ClientResponse<T>> & ErrorBody)
    | null;

  if (!res.ok) {
    throw new Error(
      json?.errors?.[0]?.message ?? json?.message ?? "Request failed",
    );
  }
  return (json ?? {
    success: true,
    message: "",
    data: undefined,
  }) as ClientResponse<T>;
}
