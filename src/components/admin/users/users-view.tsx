"use client";

import { UsersTable } from "@/components/admin/users/users-table";
import { ErrorState } from "@/components/shared/error-state";
import { ListFilters } from "@/components/shared/list-filters";
import { Pagination } from "@/components/shared/pagination";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { useAdminUsers } from "@/hooks/use-admin-users";

import { useUrlParams } from "@/hooks/use-url-params";

const LIMIT = 10;
const ROLES = [
  { value: "CITIZEN", label: "Citizen" },
  { value: "STAFF", label: "Staff" },
  { value: "ADMIN", label: "Admin" },
];

export function UsersView({ currentUserId }: { currentUserId?: string }) {
  const { searchParams } = useUrlParams();
  const page = Math.max(Number(searchParams.get("page")) || 1, 1);
  const role = searchParams.get("role") ?? "";
  const search = searchParams.get("search") ?? "";
  const users = useAdminUsers({ page, limit: LIMIT, role, search });

  let body: React.ReactNode;
  if (users.isPending) {
    body = <TableSkeleton />;
  } else if (users.isError) {
    body = (
      <ErrorState
        message={users.error.message}
        onRetry={() => users.refetch()}
      />
    );
  } else {
    body = (
      <div className={users.isPlaceholderData ? "opacity-60" : undefined}>
        <div className="space-y-6">
          <UsersTable items={users.data.items} currentUserId={currentUserId} />
          <Pagination
            page={page}
            limit={LIMIT}
            total={users.data.meta?.total ?? 0}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ListFilters
        searchPlaceholder="Search by name or email"
        selectParam="role"
        selectLabel="All roles"
        options={ROLES}
      />
      {body}
    </div>
  );
}
