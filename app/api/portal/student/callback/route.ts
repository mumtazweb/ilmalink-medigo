import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { isTrustedPortalRequest } from "../../../../lib/portal/request";
import { getCurrentPortalStudent } from "../../../../lib/portal/session";

export async function POST(request: NextRequest) {
  if (!isTrustedPortalRequest(request)) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }
  const student = await getCurrentPortalStudent();
  if (!student) {
    return NextResponse.json({ message: "Please log in again." }, { status: 401 });
  }

  await prisma.leadActivity.create({
    data: {
      studentId: student.id,
      action: "callback_requested",
      note: "Student requested a counselling callback from the dashboard.",
      createdBy: `student:${student.leadCode}`,
    },
  });

  return NextResponse.json({
    ok: true,
    message: "Callback request saved. The counselling team can now follow up.",
  });
}
