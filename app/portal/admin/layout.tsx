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
      isSuperAdmin={staff.portalRole === "super_admin"}
      navItems={[
        { label: "Dashboard", href: "/portal/admin/dashboard", icon: "dashboard" },
        { label: "Students", href: "/portal/admin/students", icon: "students" },
        { label: "Leads", href: "/portal/admin/leads", icon: "leads" },
        { label: "Follow-ups", href: "/portal/admin/followups", icon: "followups" },
        { label: "Reports", href: "/portal/admin/reports", icon: "reports" },
        { label: "Portal Users", href: "/portal/admin/users", icon: "users" },
        { label: "Settings", href: "/portal/admin/settings", icon: "settings" },
      ]}
    >
      {children}
    </PortalDashboardShell>
  );
}
