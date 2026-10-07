"use client";

import { Shield, User, UserCog, Wrench, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { type DemoRole, demoLoginAction } from "../_actions/demoAction";

interface DemoAccount {
  label: string;
  role: DemoRole;
  icon: LucideIcon;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  { label: "Citizen", role: "CITIZEN", icon: User },
  { label: "Officer", role: "OFFICER", icon: UserCog },
  { label: "Technician", role: "TECHNICIAN", icon: Wrench },
  { label: "Admin", role: "ADMIN", icon: Shield },
];

export function DemoLogin() {
  const router = useRouter();
  const [active, setActive] = useState<DemoRole | null>(null);

  const handleDemo = async (account: DemoAccount) => {
    setActive(account.role);
    const result = await demoLoginAction(account.role);
    if (!result.success) {
      toast.error(result.message);
      setActive(null);
      return;
    }
    toast.success(`Logged in as ${account.label}`);
    router.push(result.redirectTo ?? "/");
    router.refresh();
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        OR
        <span className="h-px flex-1 bg-border" />
      </div>
      <p className="text-center text-sm font-medium">Quick Demo Login</p>
      <div className="grid grid-cols-2 gap-2">
        {DEMO_ACCOUNTS.map((account) => (
          <Button
            key={account.role}
            type="button"
            variant="outline"
            disabled={active !== null}
            onClick={() => handleDemo(account)}
          >
            <account.icon className="size-4" />
            {active === account.role ? "Logging in..." : account.label}
          </Button>
        ))}
      </div>
    </div>
  );
}