import PortalDashboardShell from "../../components/portal/PortalDashboardShell";
import { requirePortalStaff } from "../../lib/portal/session";

export const dynamic = "force-dynamic";

export default async function ManagementPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const staff = await requirePortalStaff(["management", "super_admin"]);

  return (
    <PortalDashboardShell
      title="Management Dashboard"
      subtitle={`Summary and reporting access for ${staff.name}. Operational student edits remain with Education Admin and assigned counsellors.`}
      roleLabel={staff.portalRole.replace(/_/g, " ")}
      isSuperAdmin={staff.portalRole === "super_admin"}
      navItems={[
        { label: "Dashboard", href: "/portal/management/dashboard", icon: "dashboard" },
        { label: "Reports", href: "/portal/management/reports", icon: "reports" },
      ]}
    >
      {children}
    </PortalDashboardShell>
  );
}
