import { Badge } from "@/components/ui/badge";
import type { ComplaintItem } from "@/lib/complaints";
import { formatDate } from "@/lib/format";

const ACTIVE = ["PENDING", "ASSIGNED", "IN_PROGRESS", "REOPENED"];

export function DueCell({ item }: { item: ComplaintItem }) {
  if (!item.dueAt) return <span>-</span>;

  const overdue =
    new Date(item.dueAt) < new Date() && ACTIVE.includes(item.status);

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <span>{formatDate(item.dueAt)}</span>
      {overdue ? <Badge variant="destructive">Overdue</Badge> : null}
    </div>
  );
}