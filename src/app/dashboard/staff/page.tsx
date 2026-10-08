import {
  ComplaintList,
  type ListSearchParams,
} from "@/components/complaints/complaint-list";
import { getMyAssigned } from "@/lib/complaints";

export const metadata = { title: "My tasks" };

export default async function StaffPage({
  searchParams,
}: {
  searchParams: Promise<ListSearchParams>;
}) {
  return (
    <ComplaintList
      title="My tasks"
      searchParams={await searchParams}
      fetcher={getMyAssigned}
      hrefBase="/dashboard/staff/tasks"
    />
  );
}
