import { apiRaw } from "@/lib/api";
import { REFRESH_COOKIE } from "@/lib/cookie-config";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export function readRefreshCookie(headers: Headers): string | null {
  for (const line of headers.getSetCookie()) {
    const match = line.match(new RegExp(`^${REFRESH_COOKIE}=([^;]+)`));
    if (match) return match[1];
  }
  return null;
}

export async function refreshTokens(
  refreshToken: string,
): Promise<Tokens | null> {
  try {
    const { json, headers } = await apiRaw<{ accessToken: string }>(
      "/auth/refresh-token",
      { method: "POST", cookie: `${REFRESH_COOKIE}=${refreshToken}` },
    );
    const next = readRefreshCookie(headers);
    if (!next) return null;
    return { accessToken: json.data.accessToken, refreshToken: next };
  } catch {
    return null;
  }
}
