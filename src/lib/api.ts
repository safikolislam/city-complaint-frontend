import type { Meta } from "@/types/api";

const BASE_URL = process.env.API_BASE_URL ?? "http://localhost:5000/api/v1";

export interface ApiErrorItem {
  field?: string;
  message: string;
}

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: Meta;
  errors?: unknown;
}
export class ApiError extends Error {
  status: number;
  errors: ApiErrorItem[];

  constructor(message: string, status: number, errors: ApiErrorItem[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export interface ApiOptions {
  method?: string;
  body?: unknown;
  token?: string | null;
  cookie?: string;
}

function normalizeErrors(raw: unknown): ApiErrorItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item): ApiErrorItem | null => {
      if (typeof item === "string") return { message: item };
      if (item && typeof item === "object" && "message" in item) {
        const { message, field, path } = item as {
          message: unknown;
          field?: unknown;
          path?: unknown;
        };
        return {
          message: String(message),
          field:
            typeof field === "string"
              ? field
              : typeof path === "string"
                ? path
                : undefined,
        };
      }
      return null;
    })
    .filter((item): item is ApiErrorItem => item !== null);
}

export async function apiRaw<T>(
  path: string,
  options: ApiOptions = {},
): Promise<{ json: ApiEnvelope<T>; headers: Headers; status: number }> {
  const { method = "GET", body, token, cookie } = options;

  const headers = new Headers({ Accept: "application/json" });
  if (body !== undefined) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (cookie) headers.set("Cookie", cookie);

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch (error) {
    console.error(`[api] ${method} ${BASE_URL}${path} failed:`, error);
    throw new ApiError("cannot connected the backend", 503);
  }

  const json = (await res.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!res.ok || !json) {
    const message =
      (json && typeof json.message === "string" && json.message) ||
      `Request failed (${res.status})`;
    console.error(`[api] ${method} ${path} -> ${res.status}`, json);
    throw new ApiError(message, res.status, normalizeErrors(json?.errors));
  }

  return { json, headers: res.headers, status: res.status };
}

export async function api<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const { json } = await apiRaw<T>(path, options);
  return json.data;
}
