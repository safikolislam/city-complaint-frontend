import type { Metadata } from "next";
import { Suspense } from "react";
import { UsersView } from "@/components/admin/users/users-view";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "Manage users" };

export default async function AdminUsersPage() {
  const session = await getSession();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-muted-foreground">
          Search users, change roles and place staff in departments.
        </p>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <UsersView currentUserId={session?.id} />
      </Suspense>
    </div>
  );
}