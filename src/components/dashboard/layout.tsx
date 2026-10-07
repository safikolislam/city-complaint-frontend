import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { PublicNavbar } from "@/components/layout/public-navbar";
import { homeFor } from "@/config/routes";

import { getProfile } from "@/lib/profile";
import { getCurrentUser } from "@/lib/current-user";
import { SidebarNav } from "./sidebar-nav";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const home = homeFor(user.role === "STAFF" ? await getProfile() : user);
  const items = [
    { label: "Overview", href: home },
    { label: "My Profile", href: "/dashboard/profile" },
  ];

  return (
    <>
      <PublicNavbar />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row">
        <aside className="md:w-56 md:shrink-0">
          <SidebarNav items={items} />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </>
  );
}