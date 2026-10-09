
import { NewComplaintForm } from "@/components/complaints/new-complaint-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "New complaint" };

export default function NewComplaintPage() {
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>New complaint</CardTitle>
      </CardHeader>
      <CardContent>
        <NewComplaintForm />
      </CardContent>
    </Card>
  );
}