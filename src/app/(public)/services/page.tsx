import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/publlic/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICES } from "@/config/services";

const description =
  "Report problems in water, electricity, roads, waste, lighting and public health.";

export const metadata: Metadata = {
  title: "Services",
  description,
  openGraph: { title: "Services", description },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="Our services" description={description} />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ title, description: text, icon: Icon }) => (
            <Card key={title}>
              <CardHeader>
                <span className="mb-2 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {text}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-xl border bg-muted/40 p-6 text-center">
          <h2 className="text-lg font-semibold">Paid service requests</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            Requests such as a new water connection carry a service fee. Pay
            securely with bKash and your request moves forward automatically.
          </p>
          <Link href="/auth/register" className={`${buttonVariants()} mt-4`}>
            Get started
          </Link>
        </div>
      </section>
    </>
  );
}
