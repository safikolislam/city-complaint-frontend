export type Role = "CITIZEN" | "STAFF" | "ADMIN";
export type StaffPosition = "OFFICER" | "TECHNICIAN";

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
  meta?: Meta;
}

export interface FieldError {
  field?: string;
  message: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  staffPosition?: StaffPosition | null;
}
