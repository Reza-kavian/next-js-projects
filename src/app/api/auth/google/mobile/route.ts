// src/app/api/auth/google/mobile/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL("/api/auth/google", req.nextUrl.origin);

  const res = NextResponse.redirect(url);

  res.cookies.set("oauth_source", "mobile", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 5 * 60,
    path: "/",
  });

  return res;
}
