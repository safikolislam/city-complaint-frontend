import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api";
import { authApi } from "@/lib/auth-api";
import type { ComplaintItem, ComplaintStatus } from "@/lib/complaints";

export interface StatusHistoryItem {
  id: string;
  fromStatus: ComplaintStatus | null;
  toStatus: ComplaintStatus;
  note: string | null;
  createdAt: string;
}

export interface ComplaintDetail extends Omit<ComplaintItem, "category"> {
  description: string;
  category: { id: string; name: string; slaHours: number };
  citizen: { id: string; name: string; email: string };
  statusHistory: StatusHistoryItem[];
}

export async function getComplaint(id: string) {
  try {
    return await authApi<ComplaintDetail>(`/complaints/${id}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
}
