"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { clientApi } from "@/lib/client-api";

interface PayButtonProps {
  complaintId: string;
  size?: "default" | "sm";
}

export function PayButton({ complaintId, size = "default" }: PayButtonProps) {
  const pay = useMutation({
    mutationFn: async () => {
      const res = await clientApi<{ bkashURL?: string }>("/payments/initiate", {
        method: "POST",
        body: { complaintId },
      });
      if (!res.data.bkashURL) {
        throw new Error("Could not start the payment. Please try again.");
      }
      return res.data.bkashURL;
    },
    onSuccess: (url) => window.location.assign(url),
    onError: (error) => toast.error(error.message),
  });

  const { reset } = pay;
  useEffect(() => {
    // bKash থেকে "Back" চাপলে ব্রাউজার পুরনো অবস্থা ফিরিয়ে আনে, বোতাম যেন আটকে না থাকে
    const onShow = (event: PageTransitionEvent) => {
      if (event.persisted) reset();
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, [reset]);

  const busy = pay.isPending || pay.isSuccess;

  return (
    <Button size={size} disabled={busy} onClick={() => pay.mutate()}>
      {busy ? "Opening bKash..." : "Pay with bKash"}
    </Button>
  );
}
