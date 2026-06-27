import type { Metadata } from "next";

import PortalUserAccessTable from "../../../components/portal/PortalUserAccessTable";
import { prisma } from "../../../lib/prisma";
import { requirePortalStaff } from "../../../lib/portal/session";
import { isSiteOwnerAdminEmail } from "../../../lib/siteOwner";

export const metadata: Metadata = {
  title: "Portal User Access | ilmaLink",
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage() {
  const staff = await requirePortalStaff(["super_admin", "education_admin"]);
  if (staff.portalRole !== "super_admin") {
    return (
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-lg font-black text-amber-900">
          Super Admin access required
        </h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
          Education Admin can manage students and reports, but only Super Admin
          can enable staff portal access or change portal roles.
        </p>
      </section>
    );
  }

  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <PortalUserAccessTable
      initialUsers={users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        blogRole: user.role,
        portalAccess: user.portalAccess,
        portalRole: user.portalRole || "",
        isOwner: isSiteOwnerAdminEmail(user.email),
      }))}
    />
  );
}
