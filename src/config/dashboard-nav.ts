import {
  BarChart3,
  ClipboardList,
  CreditCard,
  FilePlus2,
  FileText,
  LayoutDashboard,
  type LucideIcon,
  ScrollText,
  User,
  Users,
  Wrench,
} from "lucide-react";
import type { Role, StaffPosition } from "@/types/api";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const profile: NavItem = {
  label: "Profile",
  href: "/dashboard/profile",
  icon: User,
};

export function getNav(role: Role, position?: StaffPosition | null): NavItem[] {
  if (role === "CITIZEN") {
    return [
      { label: "Overview", href: "/dashboard/citizen", icon: LayoutDashboard },
      {
        label: "My Complaints",
        href: "/dashboard/citizen/complaints",
        icon: FileText,
      },
      {
        label: "New Complaint",
        href: "/dashboard/citizen/new",
        icon: FilePlus2,
      },
      {
        label: "Payments",
        href: "/dashboard/citizen/payments",
        icon: CreditCard,
      },
      profile,
    ];
  }
  if (role === "ADMIN") {
    return [
      { label: "Overview", href: "/dashboard/admin", icon: BarChart3 },
      {
        label: "Complaints",
        href: "/dashboard/admin/complaints",
        icon: FileText,
      },
      { label: "Users", href: "/dashboard/admin/users", icon: Users },
      {
        label: "Audit Logs",
        href: "/dashboard/admin/reports",
        icon: ScrollText,
      },
      profile,
    ];
  }
  if (position === "TECHNICIAN") {
    return [
      { label: "My Tasks", href: "/dashboard/staff/technician", icon: Wrench },
      profile,
    ];
  }
  return [
    {
      label: "Overview",
      href: "/dashboard/staff/officer",
      icon: ClipboardList,
    },
    profile,
  ];
}
