import type { LucideIcon } from "lucide-react";
import { Construction, Droplets, Trash2 } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/home/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Department {
  name: string;
  text: string;
  icon: LucideIcon;
}

const DEPARTMENTS: Department[] = [
  {
    name: "Roads & Infrastructure",
    text: "Road damage, drainage and other public infrastructure issues.",
    icon: Construction,
  },
  {
    name: "Waste Management",
    text: "Garbage collection, illegal dumping and cleanliness problems.",
    icon: Trash2,
  },
  {
    name: "Water Supply",
    text: "Leakage, supply problems and new water connections.",
    icon: Droplets,
  },
];

export function DepartmentsSection() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Departments that respond"
          description="Your report goes straight to the department responsible."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {DEPARTMENTS.map(({ name, text, icon: Icon }) => (
            <Card key={name}>
              <CardContent className="space-y-3 pt-6">
                <Icon className="size-8 text-primary" aria-hidden="true" />
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/services"
            className={buttonVariants({ variant: "outline" })}
          >
            View all services
          </Link>
        </div>
      </div>
    </section>
  );
}
