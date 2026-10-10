import { Eye, Gauge, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/publlic/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const description =
  "CityFix connects citizens with city departments so problems get fixed faster.";

export const metadata: Metadata = {
  title: "About",
  description,
  openGraph: { title: "About", description },
};

const values = [
  {
    title: "Transparency",
    text: "Every complaint has a visible timeline, so you always know what is happening.",
    icon: Eye,
  },
  {
    title: "Accountability",
    text: "Each issue is assigned to a named officer and technician with a due date.",
    icon: ShieldCheck,
  },
  {
    title: "Speed",
    text: "Automatic routing sends your report to the right department immediately.",
    icon: Gauge,
  },
];

const roles = [
  ["Citizens", "Report problems, track progress and pay for paid services."],
  ["Officers", "Review incoming complaints and assign them to technicians."],
  ["Technicians", "Take assigned work, update progress and mark it resolved."],
  ["Administrators", "Manage users, monitor performance and view reports."],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About CityFix" description={description} />
      <section className="mx-auto max-w-4xl space-y-4 px-4 py-14 text-center">
        <h2 className="text-2xl font-semibold">Our mission</h2>
        <p className="text-muted-foreground">
          Many city problems go unreported because people do not know where to
          turn. CityFix gives everyone one place to report an issue, follow it
          to the end and hold the process accountable.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-14 sm:grid-cols-3">
        {values.map(({ title, text, icon: Icon }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="mb-2 size-6 text-primary" />
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {text}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="border-t bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="mb-6 text-center text-2xl font-semibold">
            Who uses CityFix
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {roles.map(([name, text]) => (
              <div key={name} className="rounded-lg border bg-card p-4">
                <p className="font-medium">{name}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
