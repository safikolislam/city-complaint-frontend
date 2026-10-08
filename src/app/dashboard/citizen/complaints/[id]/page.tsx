import {
  ComplaintList,
  type ListSearchParams,
} from "@/components/complaints/complaint-list";

export const metadata = { title: "My complaints" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<ListSearchParams>;
}) {
  return (
    <ComplaintList
      title="My complaints"
      searchParams={await searchParams}
      fetcher={getComplaints}
      hrefBase="/dashboard/citizen/complaints"
    />
  );
}
