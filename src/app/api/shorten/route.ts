import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { recaptcha } from "@/lib/recaptcha";
import { v4 as uuidv4 } from "uuid";

const REDIS_TIME_TO_LIVE = process.env.REDIS_TIME_TO_LIVE
  ? parseInt(process.env.REDIS_TIME_TO_LIVE)
  : 60 * 60 * 24;
const REDIS_EX = process.env.REDIS_EX === "true";
const SLUG = process.env.SLUG_LENGTH ? parseInt(process.env.SLUG_LENGTH) : 8;
const LOCK_DOMAIN = process.env.LOCK_DOMAIN === "true";
const LOCK_DOMAIN_URL = process.env.LOCK_DOMAIN_URL || "";
const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function POST(req: Request) {
  const { url, token } = await req.json();

  // recaptcha verification
  if (!(await recaptcha(token)))
    return NextResponse.json(
      {
        error: "reCAPTCHA verification failed. Please try again.",
      },
      { status: 400 }
    );

  // Validate URL
  if (!url || !/^https:\/\//.test(url))
    return NextResponse.json(
      { error: "Invalid URL. URL must start in https://" },
      { status: 400 }
    );

  // Check if URL starts with the locked domain
  if (LOCK_DOMAIN && !url.startsWith(LOCK_DOMAIN_URL || ""))
    return NextResponse.json(
      { error: `URL must start with ${LOCK_DOMAIN_URL}` },
      { status: 400 }
    );

  if (url.startsWith(NEXT_PUBLIC_SITE_URL)) {
    return NextResponse.json(
      { error: `URL must not start with ${NEXT_PUBLIC_SITE_URL}` },
      { status: 400 }
    );
  }
  
  // generate slug and store in Redis
  const slug = uuidv4().slice(0, SLUG);
  if (REDIS_EX) {
    await redis.set(slug, url, {
      expiration: {
        type: "EX",
        value: REDIS_TIME_TO_LIVE,
      },
    });
  } else {
    await redis.set(slug, url);
  }

  return NextResponse.json({
    shortUrl: `${NEXT_PUBLIC_SITE_URL}/s/${slug}`,
  });
}
