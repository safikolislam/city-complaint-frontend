import { useQuery } from "@tanstack/react-query";

export type CategoryStat = { id: string; name: string; count: number };

async function fetchCategoryStats(): Promise<CategoryStat[]> {
  const res = await fetch("/api/proxy/public/stats/categories");
  if (!res.ok) throw new Error("Failed to load category stats");
  const json = (await res.json()) as { data: CategoryStat[] };
  return json.data;
}

export function useCategoryStats() {
  return useQuery({
    queryKey: ["category-stats"],
    queryFn: fetchCategoryStats,
    staleTime: 60_000,
  });
}