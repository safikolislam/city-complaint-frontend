export const COMPLAINT_STATUSES = [
  "PENDING_PAYMENT",
  "PENDING",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
  "REOPENED",
  "REJECTED",
  "CANCELLED",
] as const;
export type ComplaintStatus = (typeof COMPLAINT_STATUSES)[number];

export type ComplaintPriority = "LOW" | "MEDIUM" | "HIGH";

export interface ComplaintItem {
  id: string;
  title: string;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  address: string;
  dueAt?: string | null;
  createdAt: string;
  category: { name: string };
  department?: { name: string } | null;
}

export interface StatusHistoryItem {
  id: string;
  toStatus: ComplaintStatus;
  note?: string | null;
  createdAt: string;
}

export interface ComplaintDetail extends ComplaintItem {
  description: string;
  department: { name: string };
  citizen: { id?: string; name: string; email: string };
  statusHistory: StatusHistoryItem[];
}

export interface ComplaintQuery {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}
