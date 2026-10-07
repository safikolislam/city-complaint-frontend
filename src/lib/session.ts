import { cookies } from "next/headers";
import {
  ACCESS_COOKIE,
  accessMaxAge,
  cookieOptions,
  REFRESH_COOKIE,
  REFRESH_MAX_AGE,
} from "@/lib/cookie-config";
import { verifyAccessToken } from "@/lib/jwt";

export async function setSession(accessToken: string, refreshToken: string) {
  const store = await cookies();
  store.set(
    ACCESS_COOKIE,
    accessToken,
    cookieOptions(accessMaxAge(accessToken)),
  );
  store.set(REFRESH_COOKIE, refreshToken, cookieOptions(REFRESH_MAX_AGE));
}

export async function getAccessToken() {
  return (await cookies()).get(ACCESS_COOKIE)?.value;
}

export async function getRefreshToken() {
  return (await cookies()).get(REFRESH_COOKIE)?.value;
}

export async function getSession() {
  return verifyAccessToken(await getAccessToken());
}

export async function clearSession() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}
