import { NextRequest, NextResponse } from "next/server";

import { OTP_LENGTH, verifyStudentOtp } from "../../../../../lib/portal/otp";
import {
  isTrustedPortalRequest,
  readJsonObject,
} from "../../../../../lib/portal/request";
import { createPortalToken } from "../../../../../lib/portal/token";
import { normalizeIndianMobile } from "../../../../../lib/portal/validation";

export async function POST(request: NextRequest) {
  if (!isTrustedPortalRequest(request)) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }

  const body = await readJsonObject(request);
  const mobile = normalizeIndianMobile(body?.mobile);
  const otp = String(body?.otp ?? "").replace(/\D/g, "").slice(0, OTP_LENGTH);

  if (!mobile || otp.length !== OTP_LENGTH) {
    return NextResponse.json(
      { message: "Enter the complete 4-digit verification code." },
      { status: 400 }
    );
  }

  const result = await verifyStudentOtp(mobile, "signup", otp);
  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: 400 });
  }

  const verificationToken = createPortalToken(
    {
      kind: "signup_verification",
      sub: mobile,
      mobile,
      otpId: result.record.id,
      exp: 0,
    },
    15 * 60
  );

  return NextResponse.json({
    ok: true,
    message: "Mobile number verified.",
    verificationToken,
  });
}
