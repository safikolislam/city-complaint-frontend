import type { ComplaintItem } from "@/lib/complaints";

export type PaymentState = "UNPAID" | "PAID" | "CANCELLED";

export interface PaymentRow {
  item: ComplaintItem;
  fee: number;
  state: PaymentState;
}
