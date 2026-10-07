import type { Role } from "@/types/api";

export const roleHome: Record<Role, string> = {
  CITIZEN: "/dashboard/citizen",
  STAFF: "/dashboard/staff",
  ADMIN: "/dashboard/admin",
};
