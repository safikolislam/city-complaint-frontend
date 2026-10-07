import { type NextRequest, NextResponse } from "next/server";
import { roleHome } from "@/config/routes";
import {
  ACCESS_COOKIE,
  accessMaxAge,
  cookieOptions,
  mergeCookieHeader,
  REFRESH_COOKIE,
  REFRESH_MAX_AGE,
} from "@/lib/cookie-config";
import { type Role, verifyAccessToken } from "@/lib/jwt";
import { refreshTokens, type Tokens } from "@/lib/refresh";

const AUTH_ROUTES = ["/auth/login", "/auth/register"];
const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/faq",
  "/statistics",
];
const ROLE_AREAS: Record<string, Role> = {
  "/dashboard/admin": "ADMIN",
  "/dashboard/staff": "STAFF",
  "/dashboard/citizen": "CITIZEN",
};

const matches = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`);

function isPrefetch(request: NextRequest) {
  return (
    request.headers.get("next-router-prefetch") === "1" ||
    request.headers.get("purpose") === "prefetch"
  );
}

function guard(pathname: string, role?: Role): string | null {
  const isAuth = AUTH_ROUTES.some((route) => matches(pathname, route));
  const isPublic = PUBLIC_ROUTES.some((route) => matches(pathname, route));

  if (!role) return isAuth || isPublic ? null : "/auth/login";
  if (isAuth) return roleHome[role];

  const area = Object.keys(ROLE_AREAS).find((a) => matches(pathname, a));
  return area && ROLE_AREAS[area] !== role ? roleHome[role] : null;
}

function setTokens(response: NextResponse, tokens: Tokens) {
  const { accessToken, refreshToken } = tokens;
  response.cookies.set(
    ACCESS_COOKIE,
    accessToken,
    cookieOptions(accessMaxAge(accessToken)),
  );
  response.cookies.set(
    REFRESH_COOKIE,
    refreshToken,
    cookieOptions(REFRESH_MAX_AGE),
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value;
  let user = await verifyAccessToken(request.cookies.get(ACCESS_COOKIE)?.value);
  let renewed: Tokens | null = null;

  if (!user && refresh) {
    if (isPrefetch(request)) return NextResponse.next();
    renewed = await refreshTokens(refresh);
    user = await verifyAccessToken(renewed?.accessToken);
  }

  const target = guard(pathname, user?.role);
  let response: NextResponse;

  if (target) {
    const url = new URL(target, request.url);
    if (target === "/auth/login") url.searchParams.set("redirect", pathname);
    response = NextResponse.redirect(url);
  } else {
    const headers = new Headers(request.headers);
    if (renewed) {
      const cookie = mergeCookieHeader(request.headers.get("cookie"), renewed);
      headers.set("cookie", cookie);
    }
    response = NextResponse.next({ request: { headers } });
  }

  if (renewed && user) {
    setTokens(response, renewed);
  } else if (!user && refresh) {
    response.cookies.delete(ACCESS_COOKIE);
    response.cookies.delete(REFRESH_COOKIE);
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images/|.*\\..*).*)",
  ],
};