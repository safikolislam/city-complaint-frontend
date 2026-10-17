"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function GoogleLoginButton() {
  return (
    <Button
      variant="outline"
      onClick={() => signIn("google", { callbackUrl: "/api/google-complete" })}
      className="w-full"
    >
      <FcGoogle className="mr-2 size-5" />
      Continue with Google
    </Button>
  );
}