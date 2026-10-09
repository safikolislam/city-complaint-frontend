"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getNav } from "@/config/dashboard-nav";
import { siteConfig } from "@/config/site";
import type { Role, StaffPosition } from "@/types/api";

interface Props {
  role: Role;
  position?: StaffPosition | null;
  userName: string;
  children: React.ReactNode;
}

export function DashboardShell({ role, position, userName, children }: Props) {
  const [open, setOpen] = useState(false);
  const items = getNav(role, position);
  const roleLabel =
    role === "STAFF" && position ? position.toLowerCase() : role.toLowerCase();

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      {/* Desktop Sidebar */}
      <aside className="hidden border-r bg-card md:flex md:flex-col md:h-screen md:sticky md:top-0">
        <Link href="/" className="block p-4 text-lg font-bold">
          {siteConfig.name}
        </Link>
        <div className="flex-1 overflow-y-auto">
          <DashboardSidebar items={items} />
        </div>
      </aside>

      {/* Mobile Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="flex w-64 flex-col p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>{siteConfig.name}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto">
            <DashboardSidebar items={items} onNavigate={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex min-w-0 flex-col">
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
          <span className="ml-auto text-sm text-muted-foreground">
            {userName} · {roleLabel}
          </span>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
