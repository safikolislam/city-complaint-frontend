import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { QueryProvider } from "@/components/providers/query-provider";
import { getCurrentUser } from "@/lib/current-user";
import { getProfile } from "@/lib/profile";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const profile = await getProfile();

  return (
    <DashboardShell
      role={user.role}
      position={profile.staffPosition}
      userName={profile.name}
    >
      <QueryProvider>{children}</QueryProvider>
    </DashboardShell>
  );
}
