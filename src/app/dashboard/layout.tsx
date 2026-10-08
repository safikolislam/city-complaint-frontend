import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
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
		<DashboardShell
			role={session.role}
			position={profile.staffPosition}
			userName={profile.name}
		>
			{children}
		</DashboardShell>
	);
}
