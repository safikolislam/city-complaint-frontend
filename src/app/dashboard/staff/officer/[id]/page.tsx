export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <ComplaintDetailPage
      params={params}
      mode="view"
      backHref="/dashboard/staff/officer"
    />
  );
}
