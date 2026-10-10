import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ComplaintItem } from "@/types/complaint";

interface CitizenPaymentCardProps {
  totalPaid: number | null;
  currency: string;
  paidCount: number;
  awaiting: ComplaintItem[];
}

export function CitizenPaymentCard(props: CitizenPaymentCardProps) {
  const { totalPaid, currency, paidCount, awaiting } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Total paid</p>
          <p className="text-3xl font-bold">
            {totalPaid === null
              ? "-"
              : `${totalPaid.toLocaleString()} ${currency}`}
          </p>
          <p className="text-xs text-muted-foreground">
            {paidCount} successful payment{paidCount === 1 ? "" : "s"}
          </p>
        </div>

        {awaiting.length > 0 ? (
          <div className="space-y-2 rounded-lg border bg-muted/40 p-3">
            <p className="text-sm font-medium">Waiting for your payment</p>
            <ul className="space-y-1 text-sm">
              {awaiting.slice(0, 3).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/dashboard/citizen/complaints/${c.id}`}
                    className="hover:underline"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <Link
          href="/dashboard/citizen/payment-history"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          Payment history
        </Link>
      </CardContent>
    </Card>
  );
}