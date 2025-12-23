// src/app/api/auth/google/mobile/route.ts   //new created(chalangar job)
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.redirect(
    new URL("/api/auth/google", req.url),
    {
      headers: {
        "X-Client": "mobile-app",
      },
    }
  );
}
