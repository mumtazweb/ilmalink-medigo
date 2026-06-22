import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";
import { isPortalStaffRole } from "../../../../../lib/portal/constants";
import {
  isTrustedPortalRequest,
  readJsonObject,
} from "../../../../../lib/portal/request";
import { getCurrentPortalStaff } from "../../../../../lib/portal/session";

type UserRouteProps = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, { params }: UserRouteProps) {
  if (!isTrustedPortalRequest(request)) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }
  const staff = await getCurrentPortalStaff();
  if (!staff || staff.portalRole !== "super_admin") {
    return NextResponse.json(
      { message: "Only Super Admin can manage portal users." },
      { status: 403 }
    );
  }
  const body = await readJsonObject(request);
  const portalAccess = body?.portalAccess === true;
  const requestedRole = body?.portalRole;
  if (portalAccess && !isPortalStaffRole(requestedRole)) {
    return NextResponse.json(
      { message: "Select a valid education portal role." },
      { status: 400 }
    );
  }
  const portalRole = portalAccess && isPortalStaffRole(requestedRole)
    ? requestedRole
    : null;
  const { id } = await params;
  const user = await prisma.user.update({
    where: { id },
    data: { portalAccess, portalRole },
    select: {
      id: true,
      name: true,
      email: true,
      portalAccess: true,
      portalRole: true,
    },
  });
  return NextResponse.json({ ok: true, user });
}
