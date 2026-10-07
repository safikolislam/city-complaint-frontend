import { ApiSuccess, FieldError } from "@/types/api";

export class ApiError extends Error {
  status: number;
  errors: FieldError[];

  constructor(status: number, message: string, errors: FieldError[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

type Options = Omit<RequestInit, "body"> & {
  token?: string;
  body?: unknown;
};

export async function api<T>(
  path: string,
  { token, body, headers, ...rest }: Options = {},
): Promise<ApiSuccess<T>> {
  const res = await fetch(`${process.env.API_BASE_URL}${path}`, {
    ...rest,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    throw new ApiError(
      res.status,
      json?.message ?? "Request failed",
      json?.errors ?? [],
    );
  }
  return json as ApiSuccess<T>;
}
