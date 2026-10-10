import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime, titleOf } from "@/lib/format";
import type { StatusHistoryItem } from "@/types/complaint";

export function OverviewHistory({ items }: { items: StatusHistoryItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative space-y-5 border-l pl-6">
          {items.map((item) => (
            <li key={item.id} className="relative">
              <span className="absolute top-1 -left-[31px] size-3 rounded-full border-2 border-primary bg-background" />
              <p className="text-sm font-medium">{titleOf(item.toStatus)}</p>
              {item.note ? (
                <p className="text-sm text-muted-foreground">{item.note}</p>
              ) : null}
              <p className="text-xs text-muted-foreground">
                {formatDateTime(item.createdAt)}
              </p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
