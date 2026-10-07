import { decodeJwt } from "jose";

export const ACCESS_COOKIE = "accessToken";
export const REFRESH_COOKIE = "refreshToken";
export const REFRESH_MAX_AGE = 7 * 24 * 60 * 60;

export function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export function accessMaxAge(token: string): number {
  try {
    const { exp } = decodeJwt(token);
    return exp ? Math.max(exp - Math.floor(Date.now() / 1000), 1) : 900;
  } catch {
    return 900;
  }
}

export function mergeCookieHeader(
  original: string | null,
  tokens: { accessToken: string; refreshToken: string },
): string {
  const kept = (original ?? "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .filter(
      (part) =>
        !part.startsWith(`${ACCESS_COOKIE}=`) &&
        !part.startsWith(`${REFRESH_COOKIE}=`),
    );
  return [
    ...kept,
    `${ACCESS_COOKIE}=${tokens.accessToken}`,
    `${REFRESH_COOKIE}=${tokens.refreshToken}`,
  ].join("; ");
}
