import { NextRequest, NextResponse } from "next/server";

function unauthorized(message = "Authentication required") {
  return new NextResponse(message, {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Research Workstation Beta"',
      "Cache-Control": "no-store",
    },
  });
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return result === 0;
}

function decodeBasicAuth(header: string | null) {
  if (!header?.startsWith("Basic ")) return null;
  try {
    const decoded = atob(header.slice("Basic ".length));
    const separator = decoded.indexOf(":");
    if (separator === -1) return null;
    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const username = process.env.RW_BETA_USERNAME?.trim() || "";
  const password = process.env.RW_BETA_PASSWORD?.trim() || "";

  if (!username || !password) {
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.next();
    }
    return new NextResponse("Research Workstation beta access is not configured.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const credentials = decodeBasicAuth(request.headers.get("authorization"));
  if (!credentials) return unauthorized();

  const validUser = timingSafeEqual(credentials.username, username);
  const validPassword = timingSafeEqual(credentials.password, password);
  if (!validUser || !validPassword) return unauthorized("Invalid beta credentials");

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
