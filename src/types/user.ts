export interface UserItem {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}
