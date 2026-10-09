import type { Metadata } from "next";

import CreateComplaintForm from "@/components/complaints/create-complaint-form";

export const metadata: Metadata = {
  title: "Submit Complaint",
  description: "Submit a new city complaint",
};

export default function NewComplaintPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Submit a Complaint</h1>

        <p className="text-sm text-muted-foreground">
          Report a problem in your area and help make your city better.
        </p>
      </div>

      <CreateComplaintForm />
    </div>
  );
}
