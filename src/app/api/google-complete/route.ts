import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { homeFor } from "@/config/routes";
import { apiRaw } from "@/lib/api";
import { readRefreshCookie } from "@/lib/refresh";
import { setSession } from "@/lib/session";
import type { SessionUser } from "@/types/api";

interface LoginData {
  accessToken: string;
  user: SessionUser;
}

const NEXT_AUTH_COOKIES = [
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
  "next-auth.callback-url",
  "__Secure-next-auth.callback-url",
];

export async function GET(req: NextRequest) {
  const loginUrl = new URL("/auth/login", req.url);

  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (typeof token?.idToken !== "string") {
      return NextResponse.redirect(loginUrl);
    }

    const { json, headers } = await apiRaw<LoginData>("/auth/google", {
      method: "POST",
      body: { idToken: token.idToken },
    });

    const refreshToken = readRefreshCookie(headers);

    if (!refreshToken) {
      return NextResponse.redirect(loginUrl);
    }

    await setSession(json.data.accessToken, refreshToken);

    const response = NextResponse.redirect(
      new URL(homeFor(json.data.user), req.url),
    );

    NEXT_AUTH_COOKIES.forEach((name) => response.cookies.delete(name));

    return response;
  } catch {
    return NextResponse.redirect(loginUrl);
  }
}