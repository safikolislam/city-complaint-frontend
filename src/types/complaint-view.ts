import type { ComplaintStatus } from "@/lib/complaints";

export interface HistoryEntry {
  id: string;
  toStatus: string;
  note: string | null;
  createdAt: string;
}

export interface ComplaintView {
  id: string;
  title: string;
  description: string;
  address: string;
  priority: string;
  status: ComplaintStatus;
  dueAt: string | null;
  createdAt: string;
  category: { name: string };
  department: { name: string };
  citizen: { name: string; email: string };
  statusHistory: HistoryEntry[];
}