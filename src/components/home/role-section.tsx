import type { LucideIcon } from "lucide-react";
import { Check, ShieldCheck, UserRound, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RoleInfo {
  title: string;
  icon: LucideIcon;
  points: string[];
}

const ROLES: RoleInfo[] = [
  {
    title: "Citizens",
    icon: UserRound,
    points: [
      "Report problems with location details",
      "Follow progress on a timeline",
      "Pay for paid services with bKash",
      "Edit or cancel a request while it is pending",
    ],
  },
  {
    title: "Department staff",
    icon: Wrench,
    points: [
      "Officers review department complaints",
      "Officers assign work to technicians",
      "Technicians see their assigned tasks",
      "Technicians start work and mark it resolved",
    ],
  },
  {
    title: "City admins",
    icon: ShieldCheck,
    points: [
      "See city-wide numbers and charts",
      "Manage users and staff roles",
      "Assign complaints to staff",
      "Review the audit log",
    ],
  },
];

export function RolesSection() {
  return (
    <section className="bg-muted/40 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Built for everyone involved"
          description="Each role gets its own dashboard with only the tools it needs."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {ROLES.map(({ title, icon: Icon, points }) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
