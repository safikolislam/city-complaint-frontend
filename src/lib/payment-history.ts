import { authApiFull } from "@/lib/auth-api";
import type {
  PaymentHistoryItem,
  PaymentHistoryQuery,
} from "@/types/payment-history";

export async function getPaymentHistory(query: PaymentHistoryQuery = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }
  const qs = params.toString();
  const { data, meta } = await authApiFull<PaymentHistoryItem[]>(
    `/payments${qs ? `?${qs}` : ""}`,
  );
  return { items: data, meta };
}