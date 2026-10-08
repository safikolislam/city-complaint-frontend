import { authApi, authApiFull } from "@/lib/auth-api";
import type { AdminStats, AdminUser, AuditLogItem } from "@/types/admin";

export * from "@/types/admin";

type Query = Record<string, string | number | undefined>;

async function list<T>(path: string, query: Query) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }
  const { data, meta } = await authApiFull<T[]>(`${path}?${params.toString()}`);
  return { items: data, meta };
}

export const getStats = () => authApi<AdminStats>("/admin/dashboard-stats");
export const getUsers = (query: Query) =>
  list<AdminUser>("/admin/users", query);
export const getAuditLogs = (query: Query) =>
  list<AuditLogItem>("/admin/audit-logs", query);
