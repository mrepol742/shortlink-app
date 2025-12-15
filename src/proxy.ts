import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";

export async function proxy(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0] || "unknown";

  const maxRequest = /api\/shorten/.test(request.nextUrl.pathname) ? 5 : 10;
  const window = 60 * 100;
  const isAllowed = checkRateLimit(ip, maxRequest, window);
  if (!isAllowed)
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
