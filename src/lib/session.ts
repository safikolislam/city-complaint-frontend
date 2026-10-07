import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt";

export const TOKEN_COOKIE = "accessToken";
const ONE_DAY = 60 * 60 * 24;

export async function setSession(token: string) {
  const store = await cookies();
  store.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ONE_DAY,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(TOKEN_COOKIE);
}

export async function getToken() {
  const store = await cookies();
  return store.get(TOKEN_COOKIE)?.value;
}

export async function getSession() {
  const token = await getToken();
  if (!token) return null;
  return verifyAccessToken(token);
}
