import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const CRON_SECRET = process.env.CRON_SECRET || "";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      { status: 401 },
    );
  }

  await redis.set("keep", "alive", {
    expiration: {
      type: "EX",
      value: 3600, // 1hour
    },
  });

  return NextResponse.json({
    ok: true,
  });
}
