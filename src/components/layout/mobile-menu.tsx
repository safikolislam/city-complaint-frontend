"use client";

import { LayoutDashboard, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { NavUser } from "@/components/layout/user-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { useLogout } from "@/hooks/use-logout";

interface MobileMenuProps {
  user: NavUser | null;
  dashboardHref?: string;
}

export function MobileMenu({ user, dashboardHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { logout, pending } = useLogout(close);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle>{siteConfig.name}</SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
            {siteConfig.publicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-2 px-4">
            {user && dashboardHref ? (
              <>
                <Link
                  href={dashboardHref}
                  onClick={close}
                  className={buttonVariants({ variant: "outline" })}
                >
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Link>
                <Button variant="destructive" onClick={logout} disabled={pending}>
                  <LogOut className="size-4" />
                  {pending ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={close}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={close}
                  className={buttonVariants()}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}