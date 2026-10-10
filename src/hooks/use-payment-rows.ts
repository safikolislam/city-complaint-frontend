"use client";

import { useQuery } from "@tanstack/react-query";

import { clientApi } from "@/lib/client-api";
import type { ComplaintItem } from "@/lib/complaints";
import { paymentStateOf } from "@/lib/payment-state";
import type { PaymentRow } from "@/types/payments";
import { useCategoryFees } from "./use-category-fee";

export function usePaymentRows() {
  const fees = useCategoryFees();
  const requests = useQuery({
    queryKey: ["payment-requests"],
    queryFn: async () => {
      const res = await clientApi<ComplaintItem[]>("/complaints?limit=100");
      return res.data.filter((item) => item.type === "SERVICE_REQUEST");
    },
    staleTime: 0,
  });

  const rows: PaymentRow[] = (requests.data ?? []).map((item) => ({
    item,
    fee: fees.data?.[item.category.id] ?? 0,
    state: paymentStateOf(item.status),
  }));

  return { rows, requests };
}
