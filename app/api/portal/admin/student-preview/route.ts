import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import {
  isTrustedPortalRequest,
  readJsonObject,
} from "../../../../lib/portal/request";
import {
  clearStudentPortalSession,
  getCurrentPortalStaff,
  setStudentPortalSession,
} from "../../../../lib/portal/session";

export async function POST(request: NextRequest) {
  if (!isTrustedPortalRequest(request)) {
    return NextResponse.json(
      { message: "Invalid request origin." },
      { status: 403 }
    );
  }

  const staff = await getCurrentPortalStaff();
  if (!staff || staff.portalRole !== "super_admin") {
    return NextResponse.json(
      { message: "Only Super Admin can preview a student dashboard." },
      { status: 403 }
    );
  }

  const body = await readJsonObject(request);
  const studentId =
    typeof body?.studentId === "string" ? body.studentId.trim() : "";
  if (!studentId) {
    return NextResponse.json(
      { message: "Select a student to preview." },
      { status: 400 }
    );
  }

  const student = await prisma.studentAccount.findUnique({
    where: { id: studentId },
    select: { id: true },
  });
  if (!student) {
    return NextResponse.json(
      { message: "Student account not found." },
      { status: 404 }
    );
  }

  await setStudentPortalSession(student.id, { preserveStaffSession: true });
  return NextResponse.json({
    ok: true,
    redirectTo: "/portal/student/dashboard",
  });
}

export async function DELETE(request: NextRequest) {
  if (!isTrustedPortalRequest(request)) {
    return NextResponse.json(
      { message: "Invalid request origin." },
      { status: 403 }
    );
  }

  const staff = await getCurrentPortalStaff();
  if (!staff || staff.portalRole !== "super_admin") {
    return NextResponse.json(
      { message: "Super Admin session not found." },
      { status: 403 }
    );
  }

  await clearStudentPortalSession();
  return NextResponse.json({
    ok: true,
    redirectTo: "/portal/admin/dashboard",
  });
}
