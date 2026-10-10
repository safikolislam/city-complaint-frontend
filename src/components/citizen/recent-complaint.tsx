import Link from "next/link";
import { StatusBadge } from "@/components/complaints/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import type { ComplaintItem } from "@/types/complaint";

export function RecentComplaints({ items }: { items: ComplaintItem[] }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Recent complaints</CardTitle>
        <Link
          href="/dashboard/citizen/complaints"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            You have not submitted any complaint yet.
          </p>
        ) : (
          <ul className="divide-y">
            {items.map((c) => (
              <li
                key={c.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3"
              >
                <div className="min-w-0">
                  <Link
                    href={`/dashboard/citizen/complaints/${c.id}`}
                    className="font-medium hover:underline"
                  >
                    {c.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {c.category?.name} · {formatDate(c.createdAt)}
                  </p>
                </div>
                <StatusBadge status={c.status} />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
