import { jwtVerify } from "jose";
import type { Role } from "@/types/api";

export interface TokenPayload {
  id: string;
  role: Role;
  exp?: number;
}

const secret = () => new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

export async function verifyAccessToken(
  token: string,
): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}
