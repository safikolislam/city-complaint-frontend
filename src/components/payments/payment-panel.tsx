"use client";

import { Wallet } from "lucide-react";
import { PayButton } from "@/components/payments/pay-button";
import { Card, CardContent } from "@/components/ui/card";
import { useCategoryFees } from "@/hooks/use-category-fee";
import type { ComplaintStatus } from "@/types/complaint";

interface PaymentPanelProps {
  complaintId: string;
  categoryId: string;
  status: ComplaintStatus;
}

export function PaymentPanel(props: PaymentPanelProps) {
  const { complaintId, categoryId, status } = props;
  const fees = useCategoryFees();
  const fee = fees.data?.[categoryId];

  if (status !== "PENDING_PAYMENT") return null;

  return (
    <Card className="border-primary/40 bg-primary/5">
      <CardContent className="flex flex-wrap items-center justify-between gap-4 pt-6">
        <div className="flex items-start gap-3">
          <Wallet className="mt-0.5 size-5 text-primary" aria-hidden="true" />
          <div>
            <p className="font-medium">Payment required</p>
            <p className="text-sm text-muted-foreground">
              {fee
                ? `Pay the service fee of ৳${fee} to send this request to the department.`
                : "Pay the service fee to send this request to the department."}
            </p>
          </div>
        </div>
        <PayButton complaintId={complaintId} />
      </CardContent>
    </Card>
  );
}
