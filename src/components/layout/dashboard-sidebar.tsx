"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/config/dashboard-nav";
import { cn } from "@/lib/utils";

interface Props {
  items: NavItem[];
  onNavigate?: () => void;
}

export function DashboardSidebar({ items, onNavigate }: Props) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-3" aria-label="Dashboard">
      {items.map(({ label, href, icon: Icon }) => {
        const isRoot = href.split("/").length <= 3;
        const active = isRoot
          ? pathname === href
          : pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
