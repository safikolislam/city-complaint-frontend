import { PageHeader } from "@/components/publlic/page-header";
import { FAQS } from "@/config/faq";
import { ChevronDown } from "lucide-react";
import type { Metadata } from "next";

const description =
  "Answers to common questions about reporting, tracking and paying.";

export const metadata: Metadata = {
  title: "FAQ",
  description,
  openGraph: { title: "FAQ", description },
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently asked questions"
        description={description}
      />
      <section className="mx-auto max-w-3xl space-y-3 px-4 py-14">
        {FAQS.map((item) => (
          <details
            key={item.question}
            className="group rounded-lg border bg-card p-4"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium">
              {item.question}
              <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </section>
    </>
  );
}
