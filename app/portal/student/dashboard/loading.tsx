export default function StudentDashboardLoading() {
  return (
    <div className="space-y-4" aria-label="Loading student dashboard">
      <div className="h-44 animate-pulse rounded-2xl border border-[#DCE4EE] bg-[#EDF3FA]" />
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-20 animate-pulse rounded-2xl border border-[#E2E8F0] bg-white" />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-72 animate-pulse rounded-2xl border border-[#E2E8F0] bg-white" />
        ))}
      </div>
    </div>
  );
}
