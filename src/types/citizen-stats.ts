import type { ComplaintItem } from "@/types/complaint";

export interface ChartPoint {
  label: string;
  value: number;
  color?: string;
}

export interface CitizenStats {
  total: number;
  active: number;
  resolved: number;
  overdue: number;
  awaitingPayment: ComplaintItem[];
  byStatus: ChartPoint[];
  byCategory: ChartPoint[];
  byMonth: ChartPoint[];
}