"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { logoutAction } from "@/app/auth/_actions/authAction";

export function useLogout(onDone?: () => void) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function logout() {
    startTransition(async () => {
      const result = await logoutAction();
      toast.success(result.message);
      onDone?.();
      router.replace(result.redirectTo ?? "/auth/login");
    });
  }

  return { logout, pending };
}