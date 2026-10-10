import { titleOf } from "@/lib/format";
import type { ChartPoint, CitizenStats } from "@/types/citizen-stats";
import type { ComplaintItem, ComplaintStatus } from "@/types/complaint";

const FINISHED: string[] = ["RESOLVED", "CLOSED", "CANCELLED", "REJECTED"];

const STATUS_COLORS: Record<ComplaintStatus, string> = {
  PENDING_PAYMENT: "#f59e0b",
  PENDING: "#64748b",
  ASSIGNED: "#3b82f6",
  IN_PROGRESS: "#6366f1",
  RESOLVED: "#10b981",
  CLOSED: "#059669",
  REOPENED: "#f97316",
  REJECTED: "#ef4444",
  CANCELLED: "#9ca3af",
};

function tally(values: string[]) {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

function lastSixMonths(items: ComplaintItem[]): ChartPoint[] {
  const today = new Date();
  return Array.from({ length: 6 }, (_, index) => {
    const month = new Date(
      today.getFullYear(),
      today.getMonth() - (5 - index),
      1,
    );
    const value = items.filter((item) => {
      const created = new Date(item.createdAt);
      return (
        created.getFullYear() === month.getFullYear() &&
        created.getMonth() === month.getMonth()
      );
    }).length;
    return { label: month.toLocaleString("en-GB", { month: "short" }), value };
  });
}

export function buildCitizenStats(
  items: ComplaintItem[],
  total: number,
): CitizenStats {
  const now = Date.now();
  const byStatus = [...tally(items.map((i) => i.status))].map(
    ([status, value]) => ({
      label: titleOf(status),
      value,
      color: STATUS_COLORS[status as ComplaintStatus],
    }),
  );
  const byCategory = [...tally(items.map((i) => i.category?.name ?? "Other"))]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return {
    total,
    active: items.filter((i) => !FINISHED.includes(i.status)).length,
    resolved: items.filter(
      (i) => i.status === "RESOLVED" || i.status === "CLOSED",
    ).length,
    overdue: items.filter(
      (i) =>
        i.dueAt &&
        !FINISHED.includes(i.status) &&
        new Date(i.dueAt).getTime() < now,
    ).length,
    awaitingPayment: items.filter((i) => i.status === "PENDING_PAYMENT"),
    byStatus,
    byCategory,
    byMonth: lastSixMonths(items),
  };
}