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
      subtitle={
        staff.portalRole === "super_admin"
          ? `Owner preview for ${staff.name}. All student leads are available in this counsellor view.`
          : `Welcome ${staff.name}. Only student leads assigned to your education portal account are available here.`
      }
      roleLabel={
        staff.portalRole === "super_admin" ? "Super Admin · Counsellor View" : "Counsellor"
      }
      isSuperAdmin={staff.portalRole === "super_admin"}
      navItems={[
        { label: "Dashboard", href: "/portal/counsellor/dashboard", icon: "dashboard" },
        { label: "My Leads", href: "/portal/counsellor/leads", icon: "leads" },
        { label: "Follow-ups", href: "/portal/counsellor/followups", icon: "followups" },
      ]}
    >
      {children}
    </PortalDashboardShell>
  );
}
