import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { v4 as uuidv4 } from "uuid";

const SLUG = process.env.SLUG_LENGTH ? parseInt(process.env.SLUG_LENGTH) : 8;
const LOCK_DOMAIN = process.env.LOCK_DOMAIN === "true";
const LOCK_DOMAIN_URL = process.env.LOCK_DOMAIN_URL || "";
const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url || !/^https:\/\//.test(url)) {
    return NextResponse.json(
      { error: "Invalid URL. URL must start in https://" },
      { status: 400 }
    );
  }

  if (LOCK_DOMAIN && !url.startsWith(LOCK_DOMAIN_URL || "")) {
    return NextResponse.json(
      { error: `URL must start with ${LOCK_DOMAIN_URL}` },
      { status: 400 }
    );
  }

  const slug = uuidv4().slice(0, SLUG);
  await redis.set(slug, url);

  return NextResponse.json({
    shortUrl: `${NEXT_PUBLIC_SITE_URL}/${slug}`,
  });
}
