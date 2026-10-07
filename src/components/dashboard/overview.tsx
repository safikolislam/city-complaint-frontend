import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Profile } from "@/lib/profile";

interface OverviewProps {
  profile: Profile;
  subtitle?: string;
}

export function Overview({ profile, subtitle }: OverviewProps) {
  const rows = [
    { label: "Email", value: profile.email },
    { label: "Phone", value: profile.phone || "Not added yet" },
    {
      label: "Role",
      value: [profile.role, profile.staffPosition].filter(Boolean).join(" · "),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {profile.name}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Your account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between gap-4 text-sm">
              <span className="text-muted-foreground">{row.label}</span>
              <span className="font-medium">{row.value}</span>
            </div>
          ))}
          <Link
            href="/dashboard/profile"
            className={buttonVariants({ size: "sm" })}
          >
            Edit profile
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}