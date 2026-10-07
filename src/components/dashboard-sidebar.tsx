"use client";

import {
  BarChart3,
  ClipboardList,
  CreditCard,
  FilePlus2,
  FileText,
  LayoutDashboard,
  type LucideIcon,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Role } from "@/types/api";

interface Item {
  label: string;
  href: string;
  icon: LucideIcon;
}

const items: Record<Role, Item[]> = {
  CITIZEN: [
    {
      label: "My Complaints",
      href: "/dashboard/citizen",
      icon: LayoutDashboard,
    },
    {
      label: "Payments",
      href: "/dashboard/citizen/payments",
      icon: CreditCard,
    },
    { label: "New Complaint", href: "/dashboard/citizen/new", icon: FilePlus2 },
    { label: "Profile", href: "/dashboard/profile", icon: User },
  ],
  STAFF: [
    { label: "My Tasks", href: "/dashboard/staff", icon: ClipboardList },
    { label: "Profile", href: "/dashboard/profile", icon: User },
  ],
  ADMIN: [
    { label: "Overview", href: "/dashboard/admin", icon: BarChart3 },
    {
      label: "Complaints",
      href: "/dashboard/admin/complaints",
      icon: FileText,
    },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Profile", href: "/dashboard/profile", icon: User },
  ],
};

export function DashboardSidebar({ role }: { role: Role }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-3" aria-label="Dashboard">
      {items[role].map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
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
