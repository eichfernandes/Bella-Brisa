import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  console.log(req)

  if (pathname == ("/login")) {
    return NextResponse.next();
  }

  // Redirect if no token is present
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

