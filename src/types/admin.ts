import type { Role, StaffPosition } from "@/types/api";

export type AdminStaffPosition = StaffPosition;

export interface AdminStats {
  totalComplaints: number;
  totalUsers: number;
  overdueComplaints: number;
  byStatus: { status: string; count: number }[];
  byDepartment: { department: string; count: number }[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  staffPosition: AdminStaffPosition | null;
  isActive: boolean;
  department: { id: string; name: string } | null;
  createdAt: string;
}

export interface AuditLogItem {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  metadata: unknown;
  createdAt: string;
  actor: { id: string; name: string; email: string } | null;
}

export interface Department {
  id: string;
  name: string;
}

export type UsersQuery = {
  page: number;
  limit: number;
  role?: string;
  search?: string;
};

export type ComplaintsQuery = {
  page: number;
  limit: number;
  status?: string;
  priority?: string;
  search?: string;
};

export interface Department {
  id: string;
  name: string;
}

