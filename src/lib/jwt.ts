import { jwtVerify } from "jose";

export type Role = "CITIZEN" | "STAFF" | "ADMIN";

export interface TokenPayload {
  id: string;
  role: Role;
}

export async function verifyAccessToken(
  token?: string,
): Promise<TokenPayload | null> {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!token || !secret) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );
    if (typeof payload.id !== "string" || typeof payload.role !== "string") {
      return null;
    }
    return { id: payload.id, role: payload.role as Role };
  } catch {
    return null;
  }
}
