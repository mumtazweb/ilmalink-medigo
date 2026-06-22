import StudentDashboardShell from "../../components/portal/StudentDashboardShell";
import {
  getCurrentPortalStaff,
  getCurrentPortalStudentIdentity,
} from "../../lib/portal/session";

export const dynamic = "force-dynamic";

export default async function StudentPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [staff, student] = await Promise.all([
    getCurrentPortalStaff(),
    getCurrentPortalStudentIdentity(),
  ]);
  const adminPreview =
    staff?.portalRole === "super_admin" && student
      ? {
          studentName: student.name || student.leadCode,
          studentCode: student.leadCode,
        }
      : undefined;

  return (
    <StudentDashboardShell adminPreview={adminPreview}>
      {children}
    </StudentDashboardShell>
  );
}
