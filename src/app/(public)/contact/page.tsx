import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/publlic/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contactInfo } from "@/config/contact";

const description =
  "Questions or feedback? Get in touch with the CityFix team.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  openGraph: { title: "Contact", description },
};

const details = [
  { icon: Mail, label: "Email", value: contactInfo.email },
  { icon: Phone, label: "Phone", value: contactInfo.phone },
  { icon: MapPin, label: "Address", value: contactInfo.address },
  { icon: Clock, label: "Office hours", value: contactInfo.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact us" description={description} />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Get in touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-3">
                <Icon className="mt-0.5 size-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
