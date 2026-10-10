export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";

export interface PaymentHistoryItem {
  id: string;
  amount: string | number;
  currency?: string | null;
  gateway: string;
  status: PaymentStatus;
  transactionId?: string | null;
  createdAt: string;
  paidAt?: string | null;
  complaint: { id: string; title: string };
}

export interface PaymentHistoryQuery {
  page?: number;
  limit?: number;
  status?: string;
}
