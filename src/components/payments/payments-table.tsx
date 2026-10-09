import { Inbox } from "lucide-react";
import Link from "next/link";
import { PayButton } from "@/components/payments/pay-button";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, titleOf } from "@/lib/format";
import type { PaymentRow, PaymentState } from "@/types/payments";

const stickyAction = "sticky right-0 border-l bg-card text-right";
const BADGES: Record<PaymentState, "secondary" | "outline" | "destructive"> = {
  UNPAID: "secondary",
  PAID: "outline",
  CANCELLED: "destructive",
};

export function PaymentsTable({ rows }: { rows: PaymentRow[] }) {
  if (rows.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
          <Inbox className="size-10 text-muted-foreground" />
          <p className="font-medium">No paid service requests</p>
          <p className="text-sm text-muted-foreground">
            Requests for paid services will appear here with their payment status.
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
              <TableHead>Request</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className={stickyAction}>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(({ item, fee, state }) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.category.name}
                  </p>
                </TableCell>
                <TableCell>{fee > 0 ? `৳${fee}` : "-"}</TableCell>
                <TableCell>
                  <Badge variant={BADGES[state]}>{titleOf(state)}</Badge>
                </TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell className={stickyAction}>
                  {state === "UNPAID" ? (
                    <PayButton complaintId={item.id} size="sm" />
                  ) : (
                    <Link
                      href={`/dashboard/citizen/complaints/${item.id}`}
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      View
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}