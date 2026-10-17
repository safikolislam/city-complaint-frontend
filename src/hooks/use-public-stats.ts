"use client";

import { useQuery } from "@tanstack/react-query";
import type { PublicStats } from "@/types/public-stats";

const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
const apiRoot = base.endsWith("/api/v1") ? base : `${base}/api/v1`;

async function fetchPublicStats(): Promise<PublicStats> {
  const res = await fetch(`${apiRoot}/public/stats`);
  if (!res.ok) throw new Error("Failed to load stats");
  const json = (await res.json()) as { data: PublicStats };
  return json.data;
}

export function usePublicStats() {
  return useQuery({
    queryKey: ["public-stats"],
    queryFn: fetchPublicStats,
    staleTime: 5 * 60 * 1000,
  });
}