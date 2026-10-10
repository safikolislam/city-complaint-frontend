import { type NextRequest, NextResponse } from "next/server";
import { refreshTokens } from "@/lib/refresh";
import { getAccessToken, getRefreshToken, setSession } from "@/lib/session";

type Context = { params: Promise<{ path: string[] }> };

function send(
  request: NextRequest,
  path: string[],
  body?: string,
  token?: string,
) {
  const headers: Record<string, string> = {};
  if (body) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/${path.join("/")}`;
  return fetch(`${url}${request.nextUrl.search}`, {
    method: request.method,
    headers,
    body,
    cache: "no-store",
  });
}

async function handle(request: NextRequest, { params }: Context) {
  const { path } = await params;
  if (path.some((part) => part === ".." || part === ".")) {
    return NextResponse.json(
      { success: false, message: "Invalid path", errors: [] },
      { status: 400 },
    );
  }

  const canHaveBody = !["GET", "HEAD"].includes(request.method);
  const text = canHaveBody ? await request.text() : "";
  const body = text.length > 0 ? text : undefined;

  let response = await send(request, path, body, await getAccessToken());

  if (response.status === 401) {
    const refresh = await getRefreshToken();
    const renewed = refresh ? await refreshTokens(refresh) : null;
    if (renewed) {
      await setSession(renewed.accessToken, renewed.refreshToken);
      response = await send(request, path, body, renewed.accessToken);
    }
  }

  return new NextResponse(response.body, {
    status: response.status,
    headers: {
      "Content-Type":
        response.headers.get("Content-Type") ?? "application/json",
    },
  });
}

export {
  handle as DELETE,
  handle as GET,
  handle as PATCH,
  handle as POST,
  handle as PUT,
};
