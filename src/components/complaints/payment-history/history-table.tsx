import { Receipt } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime, titleOf } from "@/lib/format";
import type {
  PaymentHistoryItem,
  PaymentStatus,
} from "@/types/payment-history";

const BADGES: Record<PaymentStatus, "default" | "secondary" | "destructive"> = {
  PAID: "default",
  PENDING: "secondary",
  FAILED: "destructive",
  CANCELLED: "destructive",
};

export function PaymentHistoryTable({
  items,
}: {
  items: PaymentHistoryItem[];
}) {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
          <Receipt className="size-10 text-muted-foreground" />
          <p className="font-medium">No payments found</p>
          <p className="text-sm text-muted-foreground">
            Payments for paid services will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Complaint</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Transaction</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{formatDateTime(p.paidAt ?? p.createdAt)}</TableCell>
                <TableCell className="font-medium">
                  <Link
                    href={`/dashboard/citizen/complaints/${p.complaint.id}`}
                    className="hover:underline"
                  >
                    {p.complaint.title}
                  </Link>
                </TableCell>
                <TableCell>
                  {Number(p.amount).toLocaleString()} {p.currency ?? ""}
                </TableCell>
                <TableCell>
                  {p.gateway === "BKASH" ? "bKash" : titleOf(p.gateway)}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {p.transactionId ?? "-"}
                </TableCell>
                <TableCell>
                  <Badge variant={BADGES[p.status] ?? "secondary"}>
                    {titleOf(p.status)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
