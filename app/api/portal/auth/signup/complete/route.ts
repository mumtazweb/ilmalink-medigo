import { randomInt } from "node:crypto";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";
import { sendNewStudentAlert } from "../../../../../lib/portal/email";
import {
  isTrustedPortalRequest,
  readJsonObject,
} from "../../../../../lib/portal/request";
import { setStudentPortalSession } from "../../../../../lib/portal/session";
import { verifyPortalToken } from "../../../../../lib/portal/token";
import {
  cleanOptionalText,
  cleanText,
  normalizeEmail,
  normalizeIndianMobile,
  normalizeInterests,
  validatePassword,
} from "../../../../../lib/portal/validation";

async function createLeadCode() {
  const year = new Date().getFullYear();

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = `ILM-${year}-${randomInt(100000, 1000000)}`;
    const exists = await prisma.studentAccount.findUnique({
      where: { leadCode: code },
      select: { id: true },
    });
    if (!exists) return code;
  }

  return `ILM-${year}-${Date.now().toString(36).toUpperCase()}`;
}

export async function POST(request: NextRequest) {
  if (!isTrustedPortalRequest(request)) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }

  const body = await readJsonObject(request);
  if (!body) {
    return NextResponse.json({ message: "Invalid signup data." }, { status: 400 });
  }

  const verification = verifyPortalToken(
    String(body.verificationToken ?? ""),
    "signup_verification"
  );
  const mobile = normalizeIndianMobile(body.mobile);
  if (
    !verification ||
    !mobile ||
    verification.mobile !== mobile ||
    verification.sub !== mobile ||
    !verification.otpId
  ) {
    return NextResponse.json(
      { message: "Mobile verification expired. Please verify again." },
      { status: 401 }
    );
  }

  const verifiedOtp = await prisma.studentOtp.findFirst({
    where: {
      id: verification.otpId,
      mobile,
      purpose: "signup",
      used: true,
    },
    select: { id: true },
  });
  if (!verifiedOtp) {
    return NextResponse.json(
      { message: "Mobile verification could not be confirmed." },
      { status: 401 }
    );
  }

  const passwordResult = validatePassword(body.password);
  if (!passwordResult.ok) {
    return NextResponse.json(
      { message: passwordResult.message },
      { status: 400 }
    );
  }
  if (passwordResult.password !== String(body.confirmPassword ?? "")) {
    return NextResponse.json(
      { message: "Password and confirm password do not match." },
      { status: 400 }
    );
  }

  const name = cleanText(body.name, 120);
  const emailInput = cleanText(body.email, 191);
  const email = emailInput ? normalizeEmail(emailInput) : null;
  const interests = normalizeInterests(body.interests);
  const whatsappAvailable = cleanText(body.whatsappAvailable, 20);
  const whatsappNumber =
    whatsappAvailable === "same"
      ? mobile
      : whatsappAvailable === "different"
        ? normalizeIndianMobile(body.whatsappNumber)
        : null;

  if (name.length < 2) {
    return NextResponse.json(
      { message: "Enter the student's full name." },
      { status: 400 }
    );
  }
  if (emailInput && !email) {
    return NextResponse.json(
      { message: "Enter a valid email address or leave it blank." },
      { status: 400 }
    );
  }
  if (!["same", "different", "none"].includes(whatsappAvailable)) {
    return NextResponse.json(
      { message: "Select a WhatsApp preference." },
      { status: 400 }
    );
  }
  if (whatsappAvailable === "different" && !whatsappNumber) {
    return NextResponse.json(
      { message: "Enter a valid WhatsApp number." },
      { status: 400 }
    );
  }
  if (interests.length === 0) {
    return NextResponse.json(
      { message: "Select at least one guidance interest." },
      { status: 400 }
    );
  }

  const duplicate = await prisma.studentAccount.findFirst({
    where: {
      OR: [
        { mobile },
        ...(email ? [{ email }] : []),
      ],
    },
    select: { mobile: true, email: true },
  });
  if (duplicate) {
    return NextResponse.json(
      {
        message:
          "A student profile already exists with this mobile number or email. Please log in or reset the password.",
      },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(passwordResult.password, 12);
  const leadCode = await createLeadCode();
  const student = await prisma.studentAccount.create({
    data: {
      leadCode,
      name,
      mobile,
      email,
      password: hashedPassword,
      mobileVerified: true,
      whatsappAvailable,
      whatsappNumber,
      interests: JSON.stringify(interests),
      className: cleanOptionalText(body.className, 80),
      neetYear: cleanOptionalText(body.neetYear, 20),
      state: cleanOptionalText(body.state, 80),
      city: cleanOptionalText(body.city, 80),
      district: cleanOptionalText(body.district, 80),
      category: cleanOptionalText(body.category, 50),
      neetScore: cleanOptionalText(body.neetScore, 20),
      neetRank: cleanOptionalText(body.neetRank, 30),
      preferredCourse: cleanOptionalText(body.preferredCourse, 100),
      preferredCountry: cleanOptionalText(body.preferredCountry, 100),
      activities: {
        create: {
          action: "student_signup",
          note: "Student completed mobile verification and created a free profile.",
          createdBy: studentActor(leadCode),
        },
      },
    },
  });

  await setStudentPortalSession(student.id);

  try {
    await sendNewStudentAlert(student);
  } catch (error) {
    console.error(
      "New student alert email failed:",
      error instanceof Error ? error.message : "Mail provider error"
    );
  }

  return NextResponse.json({
    ok: true,
    leadCode: student.leadCode,
    redirectTo: "/portal/student/dashboard",
  });
}

function studentActor(leadCode: string) {
  return `student:${leadCode}`;
}
