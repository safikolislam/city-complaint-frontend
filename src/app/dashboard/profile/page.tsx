import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProfile } from "@/lib/profile";
import { ProfileForm } from "./_components/profile-form";

export const metadata: Metadata = { title: "My profile" };

const roleLabel: Record<string, string> = {
  CITIZEN: "Citizen",
  STAFF: "Staff",
  ADMIN: "Admin",
};

export default async function ProfilePage() {
  const user = await getProfile();
  const joined = new Date(user.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">My profile</h1>
        <p className="text-muted-foreground text-sm">
          Update your name, email and phone number.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle>{user.name}</CardTitle>
            <Badge variant="secondary">
              {roleLabel[user.role] ?? user.role}
            </Badge>
          </div>
          <CardDescription>
            {user.email} · Member since {joined}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm profile={user} />
        </CardContent>
      </Card>
    </div>
  );
}
