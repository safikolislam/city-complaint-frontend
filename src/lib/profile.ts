import { cache } from "react";
import { authApi } from "@/lib/auth-api";
import type { Role, StaffPosition } from "@/types/api";

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: Role;
  staffPosition?: StaffPosition | null;
  createdAt: string;
}

export const getProfile = cache(() => authApi<Profile>("/users/me"));
