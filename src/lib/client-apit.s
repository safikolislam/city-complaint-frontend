import { ApiError, type ApiEnvelope } from "@/lib/api";

interface ClientOptions {
  method?: string;
  body?: unknown;
}

export async function clientApi<T>(path: string, options: ClientOptions = {}) {
  const hasBody = options.body !== undefined;

  const res = await fetch(`/api/proxy${path}`, {
    method: options.method ?? "GET",
    headers: hasBody ? { "Content-Type": "application/json" } : undefined,
    body: hasBody ? JSON.stringify(options.body) : undefined,
  });

  const json = (await res.json().catch(() => null)) as ApiEnvelope<T> | null;
  if (!res.ok || !json?.success) {
    throw new ApiError(
      res.status,
      json?.message ?? "Something went wrong",
      json?.errors ?? [],
    );
  }
  return json;
}