import { NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { getCurrentPortalStaff } from "../../../../lib/portal/session";
import { parseStoredInterests } from "../../../../lib/portal/validation";

function csvCell(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET() {
  const staff = await getCurrentPortalStaff();
  if (
    !staff ||
    !["super_admin", "education_admin", "management"].includes(
      staff.portalRole
    )
  ) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const students = await prisma.studentAccount.findMany({
    orderBy: { createdAt: "desc" },
  });
  const rows = [
    [
      "Lead ID",
      "Name",
      "Mobile",
      "Email",
      "WhatsApp",
      "Interest",
      "State",
      "NEET Year",
      "NEET Score",
      "Status",
      "Assigned Counsellor",
      "Created Date",
    ],
    ...students.map((student) => [
      student.leadCode,
      student.name,
      student.mobile,
      student.email,
      student.whatsappNumber,
      parseStoredInterests(student.interests).join("; "),
      student.state,
      student.neetYear,
      student.neetScore,
      student.status,
      student.assignedToName,
      student.createdAt.toISOString(),
    ]),
  ];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="ilmalink-student-leads-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
