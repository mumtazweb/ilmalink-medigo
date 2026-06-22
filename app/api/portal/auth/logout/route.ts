import { NextRequest, NextResponse } from "next/server";

import { isTrustedPortalRequest } from "../../../../lib/portal/request";
import { clearPortalSessions } from "../../../../lib/portal/session";

export async function POST(request: NextRequest) {
  if (!isTrustedPortalRequest(request)) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }
  await clearPortalSessions();
  return NextResponse.json({ ok: true, redirectTo: "/portal/login" });
}
