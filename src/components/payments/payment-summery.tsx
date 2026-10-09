import { Card, CardContent } from "@/components/ui/card";
import type { PaymentRow } from "@/types/payments";

export function PaymentSummary({ rows }: { rows: PaymentRow[] }) {
  const paid = rows.filter((row) => row.state === "PAID");
  const unpaid = rows.filter((row) => row.state === "UNPAID");
  const total = paid.reduce((sum, row) => sum + row.fee, 0);

  const stats = [
    { label: "Awaiting payment", value: String(unpaid.length) },
    { label: "Paid requests", value: String(paid.length) },
    { label: "Total paid", value: `৳${total}` },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}