import { decodeJwt } from "jose";
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
    return { role: payload.role, name: payload.name, email: payload.email };
  } catch {
    return null;
  }
}