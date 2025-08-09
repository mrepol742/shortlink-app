import { redis } from "@/lib/redis";
import { redirect } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function RedirectPage({ params }: Props) {
  const { slug } = await params;
  const url = await redis.get(slug);

  if (!url) return redirect("/");

  redirect(url);
}
