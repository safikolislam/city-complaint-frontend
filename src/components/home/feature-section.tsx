import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Clock,
  CreditCard,
  History,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  title: string;
  text: string;
  icon: LucideIcon;
}

const FEATURES: Feature[] = [
  {
    title: "Report with location",
    text: "Describe the problem, add the address and share your coordinates in one short form.",
    icon: MapPin,
  },
  {
    title: "Routed to the right team",
    text: "Every category belongs to a department, so your report reaches the people who can fix it.",
    icon: Building2,
  },
  {
    title: "Track every step",
    text: "Follow your complaint from submission to resolution on a clear timeline.",
    icon: History,
  },
  {
    title: "Response deadlines",
    text: "Each category has a target time, and late items are flagged as overdue.",
    icon: Clock,
  },
  {
    title: "Pay for services online",
    text: "Paid services such as a new water connection can be paid with bKash.",
    icon: CreditCard,
  },
  {
    title: "Accountable by design",
    text: "Assignments, status changes and role updates are recorded in an audit log.",
    icon: ShieldCheck,
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-muted/40 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Everything you need to get problems fixed"
          description="One place for citizens, department staff and city admins."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ title, text, icon: Icon }) => (
            <Card key={title}>
              <CardContent className="space-y-3 pt-6">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
