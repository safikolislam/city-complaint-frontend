import { authApi, authApiFull } from "@/lib/auth-api";
import type {
  ComplaintDetail,
  ComplaintItem,
  ComplaintQuery,
} from "@/types/complaint";

export * from "@/types/complaint";

const MY_ASSIGNED_PATH = "/complaints/my-assigned";

async function list(path: string, query: ComplaintQuery) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }
  const qs = params.toString();
  const { data, meta } = await authApiFull<ComplaintItem[]>(
    `${path}${qs ? `?${qs}` : ""}`,
  );
  return { items: data, meta };
}

export const getComplaints = (query: ComplaintQuery = {}) =>
  list("/complaints", query);

export const getMyAssigned = (query: ComplaintQuery = {}) =>
  list(MY_ASSIGNED_PATH, query);

export const getComplaint = (id: string) =>
  authApi<ComplaintDetail>(`/complaints/${id}`);
