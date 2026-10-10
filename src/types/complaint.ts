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

export type ComplaintPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type ComplaintType = "COMPLAINT" | "SERVICE_REQUEST";

export interface ComplaintItem {
  id: string;
  title: string;
  type?: ComplaintType;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  address: string;
  dueAt?: string | null;
  createdAt: string;
  category: { id?: string; name: string };
  department?: { id: string; name: string } | null;
}

export interface StatusHistoryItem {
  id: string;
  toStatus: ComplaintStatus;
  note?: string | null;
  createdAt: string;
}

export interface ComplaintDetail extends ComplaintItem {
  description: string;
  department: { id: string; name: string };
  citizen: { id?: string; name: string; email: string };
  latitude?: number | null;
  longitude?: number | null;
  statusHistory: StatusHistoryItem[];
}

export interface ComplaintQuery {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export interface Category {
  id: string;
  name: string;
  serviceFee?: string | number | null;
}

export interface StatusHistoryItem {
  id: string;
  fromStatus: string | null;

  createdAt: string;
}