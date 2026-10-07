import { decodeJwt } from "jose";
import { getProfile } from "@/lib/profile";
import { getAccessToken } from "@/lib/session";
import type { SessionUser } from "@/types/api";

export interface CurrentUser {
  role: SessionUser["role"];
  name?: string;
  email?: string;
}

interface TokenPayload {
  role?: SessionUser["role"];
  name?: string;
  email?: string;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const payload = decodeJwt(token) as TokenPayload;
    if (!payload.role) return null;

    const user: CurrentUser = {
      role: payload.role,
      name: payload.name,
      email: payload.email,
    };
    if (user.name && user.email) return user;

    const profile = await getProfile().catch(() => null);
    return {
      ...user,
      name: profile?.name ?? user.name,
      email: profile?.email ?? user.email,
    };
  } catch {
    return null;
  }
}