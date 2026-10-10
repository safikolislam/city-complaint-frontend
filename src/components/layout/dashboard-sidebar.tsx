"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/layout/logout-button";
import type { NavItem } from "@/config/dashboard-nav";
import { cn } from "@/lib/utils";

interface Props {
  items: NavItem[];
  onNavigate?: () => void;
}

export function DashboardSidebar({ items, onNavigate }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between">
      <nav className="flex flex-col gap-1 p-3" aria-label="Dashboard">
        {items.map(({ label, href, icon: Icon }) => {
          // /dashboard/xxx ধরনের মূল পেজ শুধু হুবহু মিললে active
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

      <div className="border-t p-3">
        <LogoutButton />
      </div>
    </div>
  );
}
