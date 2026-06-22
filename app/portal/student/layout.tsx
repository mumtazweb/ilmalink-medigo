import StudentDashboardShell from "../../components/portal/StudentDashboardShell";

export const dynamic = "force-dynamic";

export default async function StudentPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StudentDashboardShell>{children}</StudentDashboardShell>
  );
}
