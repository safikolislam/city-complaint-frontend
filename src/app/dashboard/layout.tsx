import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { QueryProvider } from "@/components/providers/query-provider";
import { getProfile } from "@/lib/profile";
import { getSession } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const profile = await getProfile();

  return (
    <QueryProvider>
      <DashboardShell role={session.role} userName={profile.name}>
        {children}
      </DashboardShell>
    </QueryProvider>
  );
}
