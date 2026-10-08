import type { Metadata } from "next";

import { getProfile } from "@/lib/profile";
import { AssignedComplaints } from "@/components/staff/assigned-complaints";


export const metadata: Metadata = {
  title: "Staff Dashboard",
};

export default async function StaffDashboardPage() {
  const profile = await getProfile();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome, {profile.name}
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage your assigned complaints and update their status.
        </p>
      </div>

      <AssignedComplaints />
    </div>
  );
}
