import {
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

const adminNav: NavItem[] = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Complaints", href: "/dashboard/admin/complaints", icon: FileText },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  {
    label: "Audit Logs",
    href: "/dashboard/admin/audit-logs",
    icon: ScrollText,
  },
  profile,
];

const citizenNav: NavItem[] = [
  { label: "Overview", href: "/dashboard/citizen", icon: LayoutDashboard },
  {
    label: "My Complaints",
    href: "/dashboard/citizen/complaints",
    icon: FileText,
  },
  { label: "New Complaint", href: "/dashboard/citizen/new", icon: FilePlus2 },
  { label: "Payment History", href: "/dashboard/citizen/payment-history", icon: CreditCard },
  profile,
];

const officerNav: NavItem[] = [
  { label: "Complaints", href: staffHome.OFFICER, icon: ClipboardList },
  profile,
];

const technicianNav: NavItem[] = [
  { label: "My Tasks", href: staffHome.TECHNICIAN, icon: Wrench },
  profile,
];

export function getNav(role: Role, position?: StaffPosition | null): NavItem[] {
  if (role === "ADMIN") return adminNav;
  if (role === "CITIZEN") return citizenNav;
  return position === "TECHNICIAN" ? technicianNav : officerNav;
}
