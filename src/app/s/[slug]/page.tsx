import { redis } from "@/lib/redis";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RedirectPage({ params }: Props) {
  const { slug } = await params;
  const url = await redis.get(slug);

  if (!url) return notFound();

  redirect(url);
}
