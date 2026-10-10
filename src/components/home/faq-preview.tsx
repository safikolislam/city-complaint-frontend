import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/home/section-heading";
import { buttonVariants } from "@/components/ui/button";

const FAQS = [
  {
    question: "How do I report a problem?",
    answer:
      "Create a free account, choose New Complaint, pick a category, describe the issue and add the address.",
  },
  {
    question: "Do I have to pay?",
    answer:
      "Reporting a problem is free. Some service requests, such as a new water connection, have a fee that you pay online with bKash.",
  },
  {
    question: "Can I change or cancel a complaint?",
    answer:
      "Yes, you can edit or cancel it while it is still waiting for payment or for review. After it is assigned, the department takes over.",
  },
  {
    question: "How do I know the progress?",
    answer:
      "Open the complaint to see its timeline. Items that pass their target time are flagged as overdue.",
  },
];

export function FaqPreview() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Common questions" />
        <div className="divide-y rounded-xl border">
          {FAQS.map(({ question, answer }) => (
            <details key={question} className="group p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown
                  className="size-4 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/faq" className={buttonVariants({ variant: "outline" })}>
            More questions
          </Link>
        </div>
      </div>
    </section>
  );
}