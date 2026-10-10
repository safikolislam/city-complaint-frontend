import type { FaqItem } from "@/types/public-content";

export const FAQS: FaqItem[] = [
  {
    question: "How do I report a problem?",
    answer:
      "Create a free account, open New Complaint, choose a category, describe the problem and add the address. You can track it from your dashboard.",
  },
  {
    question: "How is my complaint handled?",
    answer:
      "It is sent to the right department automatically. An officer assigns it to a technician, who updates the status until it is resolved.",
  },
  {
    question: "Can I edit or cancel a complaint?",
    answer:
      "You can edit or delete a complaint while it is still pending. After it is assigned you can cancel it, and once it is resolved you can close or reopen it.",
  },
  {
    question: "What is a paid service request?",
    answer:
      "Some requests, such as a new water connection, carry a service fee. These stay in Pending Payment until you pay.",
  },
  {
    question: "How do I pay?",
    answer:
      "Open the request and start the payment. You are redirected to bKash to confirm, then brought back automatically.",
  },
  {
    question: "Where can I see my payments?",
    answer:
      "Your dashboard has a Payment History page with the date, amount, method and status of every payment.",
  },
  {
    question: "How long does a fix take?",
    answer:
      "Each category has a target time. The due date appears on your complaint, and overdue items are flagged so they get attention.",
  },
  {
    question: "Who can see my complaint?",
    answer:
      "Only you, the staff of the responsible department and administrators can see it.",
  },
];
