import { CheckCircle2, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ICONS = {
  success: <CheckCircle2 className="size-12 text-green-600" aria-hidden="true" />,
  pending: <Clock className="size-12 text-amber-500" aria-hidden="true" />,
  failed: <XCircle className="size-12 text-destructive" aria-hidden="true" />,
};

interface PaymentResultProps {
  tone: keyof typeof ICONS;
  title: string;
  message: string;
  primaryLabel: string;
  complaintId?: string;
}

export function PaymentResult(props: PaymentResultProps) {
  const { tone, title, message, primaryLabel, complaintId } = props;

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          {ICONS[tone]}
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">{message}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {complaintId ? (
              <Link
                href={`/dashboard/citizen/complaints/${complaintId}`}
                className={buttonVariants()}
              >
                {primaryLabel}
              </Link>
            ) : null}
            <Link
              href="/dashboard/citizen/complaints"
              className={buttonVariants({ variant: "outline" })}
            >
              My complaints
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}