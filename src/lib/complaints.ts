import { authApiFull } from "@/lib/auth-api";
import type { Meta } from "@/types/api";

export type ComplaintStatus =
  | "PENDING_PAYMENT"
  | "PENDING"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED"
  | "REOPENED"
  | "REJECTED"
  | "CANCELLED";

export interface ComplaintItem {
  id: string;
  title: string;
  type: "COMPLAINT" | "SERVICE_REQUEST";
  status: ComplaintStatus;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  address: string;
  dueAt: string | null;
  createdAt: string;
  category: { id: string; name: string };
  department: { id: string; name: string };
}

export interface ComplaintQuery {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  search?: string;
}

export async function getComplaints(query: ComplaintQuery = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }

  const { data, meta } = await authApiFull<ComplaintItem[]>(
    `/complaints?${params.toString()}`,
  );
  return { items: data, meta: meta as Meta | undefined };
}
