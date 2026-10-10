import type { ComplaintStatus } from "@/lib/complaints";
import type { PaymentState } from "@/types/payments";

export function paymentStateOf(status: ComplaintStatus): PaymentState {
  if (status === "PENDING_PAYMENT") return "UNPAID";
  if (status === "CANCELLED") return "CANCELLED";
  return "PAID";
}
