import type { Metadata } from "next";

import PortalLeadTable from "../../../components/portal/PortalLeadTable";
import { prisma } from "../../../lib/prisma";
import { toPortalLeadRow } from "../../../lib/portal/presentation";
import { getMonthlySignupSummary } from "../../../lib/portal/queries";

export const metadata: Metadata = {
  title: "Management Reports | ILMALINK MEDIGO",
  robots: { index: false, follow: false },
};

export default async function ManagementReportsPage() {
  const [students, months, counsellors] = await Promise.all([
    prisma.studentAccount.findMany({ orderBy: { createdAt: "desc" } }),
    getMonthlySignupSummary(),
    prisma.user.findMany({
      where: { portalAccess: true, portalRole: "counsellor" },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);
  const max = Math.max(1, ...months.map((month) => month.value));
  const counsellorPerformance = counsellors.map((counsellor) => {
    const assigned = students.filter(
      (student) => student.assignedToId === counsellor.id
    );
    return {
      ...counsellor,
      assigned: assigned.length,
      interested: assigned.filter((student) => student.status === "interested")
        .length,
      applications: assigned.filter(
        (student) => student.status === "application-started"
      ).length,
      admitted: assigned.filter((student) => student.status === "admitted")
        .length,
    };
  });

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)]">
        <h2 className="text-xl font-black text-[#082A62]">Monthly signups</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {months.map((month) => (
            <div key={month.label} className="rounded-xl bg-[#F4F8FC] p-3">
              <strong className="text-xl font-black text-[#0B4AA2]">
                {month.value}
              </strong>
              <p className="mt-1 text-xs font-bold text-[#60738F]">
                {month.label}
              </p>
              <div className="mt-2 h-1.5 rounded-full bg-[#DFE8F1]">
                <div
                  className="h-full rounded-full bg-[#08A776]"
                  style={{ width: `${(month.value / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)]">
        <h2 className="text-xl font-black text-[#082A62]">
          Counsellor performance summary
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#D8E4EF] bg-[#F4F8FC] text-[#46617F]">
                {[
                  "Counsellor",
                  "Assigned",
                  "Interested",
                  "Applications",
                  "Admitted",
                ].map((heading) => (
                  <th key={heading} className="px-3 py-3 font-black">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {counsellorPerformance.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#E5ECF3] last:border-0"
                >
                  <td className="px-3 py-3 font-black text-[#17396E]">
                    {row.name}
                  </td>
                  <td className="px-3 py-3 font-bold text-[#46617F]">
                    {row.assigned}
                  </td>
                  <td className="px-3 py-3 font-bold text-[#46617F]">
                    {row.interested}
                  </td>
                  <td className="px-3 py-3 font-bold text-[#46617F]">
                    {row.applications}
                  </td>
                  <td className="px-3 py-3 font-bold text-[#087A60]">
                    {row.admitted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {counsellorPerformance.length === 0 ? (
            <p className="py-6 text-center text-sm font-medium text-[#71839A]">
              No counsellor accounts are enabled yet.
            </p>
          ) : null}
        </div>
      </section>
      <PortalLeadTable
        initialLeads={students.map(toPortalLeadRow)}
        readOnly
      />
    </div>
  );
}
