import { UsersTable } from "@/components/admin/users-table";
import { ListFilters } from "@/components/shared/list-filters";
import { Pagination } from "@/components/shared/pagination";

import { getProfile } from "@/lib/profile";

export const metadata = { title: "Users" };

const LIMIT = 10;
const roleOptions = [
  { value: "CITIZEN", label: "Citizen" },
  { value: "STAFF", label: "Staff" },
  { value: "ADMIN", label: "Admin" },
];

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; role?: string }>;
}) {
  const { page, search, role } = await searchParams;
  const current = Math.max(Number(page) || 1, 1);
  const [{ items, meta }, me] = await Promise.all([
    getUsers({ page: current, limit: LIMIT, search, role }),
    getProfile(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-muted-foreground">
          {meta ? `${meta.total} in total` : "All users"}
        </p>
      </div>
      <ListFilters
        searchPlaceholder="Search by name or email"
        selectParam="role"
        selectLabel="All roles"
        options={roleOptions}
      />
      <UsersTable items={items} currentUserId={me.id} />
      <Pagination page={current} limit={LIMIT} total={meta?.total ?? 0} />
    </div>
  );
}
