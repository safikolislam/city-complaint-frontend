import {
  FileText,
  LayoutDashboard,
  type LucideIcon,
  User,
  Users,
  Wrench,
} from "lucide-react";
import { staffHome } from "@/config/routes";
import type { Role, StaffPosition } from "@/types/api";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const profile: NavItem = {
  label: "My Profile",
  href: "/dashboard/profile",
  icon: User,
};

export function getNav(role: Role, position?: StaffPosition | null): NavItem[] {
  if (role === "ADMIN") {
    return [
      { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
      {
        label: "Complaints",
        href: "/dashboard/admin/complaints",
        icon: FileText,
      },
      { label: "Users", href: "/dashboard/admin/users", icon: Users },
      profile,
    ];
  }

  if (role === "STAFF") {
    if (position === "TECHNICIAN") {
      return [
        { label: "My Tasks", href: staffHome.TECHNICIAN, icon: Wrench },
        profile,
      ];
    }
    if (position === "OFFICER") {
      return [
        { label: "Complaints", href: staffHome.OFFICER, icon: FileText },
        profile,
      ];
    }
    return [
      { label: "Overview", href: "/dashboard/staff", icon: LayoutDashboard },
      profile,
    ];
  }

  return [
    { label: "Overview", href: "/dashboard/citizen", icon: LayoutDashboard },
    {
      label: "My Complaints",
      href: "/dashboard/citizen/complaints",
      icon: FileText,
    },
    profile,
  ];
}
