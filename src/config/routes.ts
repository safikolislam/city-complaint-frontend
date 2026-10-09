import type { Role, StaffPosition } from "@/types/api";

export const roleHome: Record<Role, string> = {
  CITIZEN: "/dashboard/citizen",
  STAFF: "/dashboard/staff",
  ADMIN: "/dashboard/admin",
};

export const staffHome: Record<StaffPosition, string> = {
  OFFICER: "/dashboard/staff/officer",
  TECHNICIAN: "/dashboard/staff/technician",
};


export function homeFor(user: {
  role: Role;
  staffPosition?: StaffPosition | null;
}): string {
  if (user.role === "STAFF" && user.staffPosition) {
    return staffHome[user.staffPosition];
  }
  return roleHome[user.role];
}
