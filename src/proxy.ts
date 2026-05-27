import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";

const RATE_LIMITS: Record<string, number> = {
  "/api/shorten": 5,
  "/s/": 30,
};

const WINDOW_MS = 60 * 1000;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0] || "unknown";

  const key = Object.keys(RATE_LIMITS).find((prefix) =>
    pathname.startsWith(prefix),
  );
  const maxRequests = key ? RATE_LIMITS[key] : null;

  if (maxRequests !== null) {
    const isAllowed = checkRateLimit(ip, maxRequests, WINDOW_MS);
    if (!isAllowed)
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/shorten", "/s/:slug*"],
};
