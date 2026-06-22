import {
  ClipboardList,
  FileText,
  LayoutDashboard,
  UserRound,
} from "lucide-react";

import PortalDashboardShell from "../../components/portal/PortalDashboardShell";
import { requirePortalStudent } from "../../lib/portal/session";

export const dynamic = "force-dynamic";

export default async function StudentPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const student = await requirePortalStudent();

  return (
    <PortalDashboardShell
      title={`Welcome, ${student.name || "Student"}`}
      subtitle={`Student ID: ${student.leadCode}. Your private profile, documents and application progress are available here.`}
      roleLabel="Student"
      navItems={[
        {
          label: "Dashboard",
          href: "/portal/student/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "My Profile",
          href: "/portal/student/profile",
          icon: UserRound,
        },
        {
          label: "My Documents",
          href: "/portal/student/documents",
          icon: FileText,
        },
        {
          label: "Application Status",
          href: "/portal/student/application-status",
          icon: ClipboardList,
        },
      ]}
    >
      {children}
    </PortalDashboardShell>
  );
}
