import {
  CalendarClock,
  ContactRound,
  LayoutDashboard,
  Settings,
  TableProperties,
  UsersRound,
  UserRoundCog,
} from "lucide-react";

import PortalDashboardShell from "../../components/portal/PortalDashboardShell";
import { requirePortalStaff } from "../../lib/portal/session";

export const dynamic = "force-dynamic";

export default async function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const staff = await requirePortalStaff(["super_admin", "education_admin"]);

  return (
    <PortalDashboardShell
      title="Education Admin Dashboard"
      subtitle={`Signed in as ${staff.name}. Manage student leads, counsellor assignment, follow-ups and reports without entering the blog dashboard.`}
      roleLabel={staff.portalRole.replace(/_/g, " ")}
      navItems={[
        { label: "Dashboard", href: "/portal/admin/dashboard", icon: LayoutDashboard },
        { label: "Students", href: "/portal/admin/students", icon: UsersRound },
        { label: "Leads", href: "/portal/admin/leads", icon: ContactRound },
        { label: "Follow-ups", href: "/portal/admin/followups", icon: CalendarClock },
        { label: "Reports", href: "/portal/admin/reports", icon: TableProperties },
        { label: "Portal Users", href: "/portal/admin/users", icon: UserRoundCog },
        { label: "Settings", href: "/portal/admin/settings", icon: Settings },
      ]}
    >
      {children}
    </PortalDashboardShell>
  );
}
