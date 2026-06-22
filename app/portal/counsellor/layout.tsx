import {
  CalendarClock,
  ContactRound,
  LayoutDashboard,
} from "lucide-react";

import PortalDashboardShell from "../../components/portal/PortalDashboardShell";
import { requirePortalStaff } from "../../lib/portal/session";

export const dynamic = "force-dynamic";

export default async function CounsellorPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const staff = await requirePortalStaff(["counsellor"]);

  return (
    <PortalDashboardShell
      title="Counsellor Dashboard"
      subtitle={`Welcome ${staff.name}. Only student leads assigned to your education portal account are available here.`}
      roleLabel="Counsellor"
      navItems={[
        { label: "Dashboard", href: "/portal/counsellor/dashboard", icon: LayoutDashboard },
        { label: "My Leads", href: "/portal/counsellor/leads", icon: ContactRound },
        { label: "Follow-ups", href: "/portal/counsellor/followups", icon: CalendarClock },
      ]}
    >
      {children}
    </PortalDashboardShell>
  );
}
