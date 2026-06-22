import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";
import {
  isTrustedPortalRequest,
  readJsonObject,
} from "../../../../../lib/portal/request";
import { getCurrentPortalStaff } from "../../../../../lib/portal/session";
import {
  cleanOptionalText,
  cleanText,
  normalizeStudentStatus,
} from "../../../../../lib/portal/validation";

type LeadRouteProps = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, { params }: LeadRouteProps) {
  if (!isTrustedPortalRequest(request)) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }
  const staff = await getCurrentPortalStaff();
  if (!staff) {
    return NextResponse.json({ message: "Please log in again." }, { status: 401 });
  }
  const { id } = await params;
  const lead = await prisma.studentAccount.findUnique({ where: { id } });
  if (!lead) {
    return NextResponse.json({ message: "Student lead not found." }, { status: 404 });
  }

  const isAdmin =
    staff.portalRole === "super_admin" ||
    staff.portalRole === "education_admin";
  const isAssignedCounsellor =
    staff.portalRole === "counsellor" && lead.assignedToId === staff.id;
  if (!isAdmin && !isAssignedCounsellor) {
    return NextResponse.json(
      { message: "You can update only leads assigned to you." },
      { status: 403 }
    );
  }

  const body = await readJsonObject(request);
  if (!body) {
    return NextResponse.json({ message: "Invalid update." }, { status: 400 });
  }
  const status = body.status
    ? normalizeStudentStatus(body.status)
    : lead.status;
  if (!status) {
    return NextResponse.json({ message: "Invalid lead status." }, { status: 400 });
  }

  let assignedToId = lead.assignedToId;
  let assignedToName = lead.assignedToName;
  if (isAdmin && "assignedToId" in body) {
    const requestedAssignee = cleanText(body.assignedToId, 191);
    if (requestedAssignee) {
      const counsellor = await prisma.user.findFirst({
        where: {
          id: requestedAssignee,
          portalAccess: true,
          portalRole: "counsellor",
        },
        select: { id: true, name: true },
      });
      if (!counsellor) {
        return NextResponse.json(
          { message: "Select a valid portal counsellor." },
          { status: 400 }
        );
      }
      assignedToId = counsellor.id;
      assignedToName = counsellor.name;
    } else {
      assignedToId = null;
      assignedToName = null;
    }
  }

  const followUpInput = cleanText(body.followUpDate, 40);
  const followUpDate = followUpInput ? new Date(followUpInput) : null;
  if (followUpInput && Number.isNaN(followUpDate?.getTime())) {
    return NextResponse.json(
      { message: "Enter a valid follow-up date." },
      { status: 400 }
    );
  }
  const activityNote = cleanOptionalText(body.activityNote, 3000);
  const notes = cleanOptionalText(body.notes, 10000);

  const updated = await prisma.studentAccount.update({
    where: { id: lead.id },
    data: {
      status,
      assignedToId,
      assignedToName,
      followUpDate,
      notes: notes ?? lead.notes,
      activities: activityNote
        ? {
            create: {
              action: "staff_followup",
              note: activityNote,
              createdBy: `${staff.portalRole}:${staff.email}`,
            },
          }
        : undefined,
    },
  });

  return NextResponse.json({
    ok: true,
    message: "Lead updated.",
    lead: {
      id: updated.id,
      status: updated.status,
      assignedToId: updated.assignedToId,
      assignedToName: updated.assignedToName,
      followUpDate: updated.followUpDate,
    },
  });
}
