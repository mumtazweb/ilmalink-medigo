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
import { assertPortalSessionConfigured } from "../../../../../lib/portal/token";
import {
  cleanText,
  normalizeIndianMobile,
  normalizePortalAudience,
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

  const mobile = normalizeIndianMobile(body.mobile);
  if (!mobile) {
    return NextResponse.json(
      { message: "Enter a valid 10-digit Indian mobile number." },
      { status: 400 }
    );
  }

  const name = cleanText(body.name, 120);
  const firstName = name.split(/\s+/)[0] ?? "";
  const audience = normalizePortalAudience(
    body.audienceType,
    body.otherAudience
  );

  if (name.length < 2 || firstName.length < 2) {
    return NextResponse.json(
      { message: "Enter your name. The first name must have at least 2 characters." },
      { status: 400 }
    );
  }
  if (!audience) {
    return NextResponse.json(
      {
        message:
          body.audienceType === "Other"
            ? "Tell us who you are in the Other field."
            : "Select whether you are a student, teacher, parent, NEET aspirant, or other.",
      },
      { status: 400 }
    );
  }

  try {
    // Validate session configuration before touching the database. Creating the
    // student first would leave an account behind while the browser receives a
    // server error if signed sessions are not configured.
    assertPortalSessionConfigured();

    const duplicate = await prisma.studentAccount.findFirst({
      where: { mobile },
      select: { mobile: true },
    });
    if (duplicate) {
      return NextResponse.json(
        {
          message:
            "This mobile number is already registered. Please use Student Login instead.",
          code: "MOBILE_EXISTS",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(firstName, 12);
    const leadCode = await createLeadCode();
    const student = await prisma.studentAccount.create({
      data: {
        leadCode,
        name,
        mobile,
        email: null,
        password: hashedPassword,
        mobileVerified: false,
        whatsappAvailable: "same",
        whatsappNumber: mobile,
        interests: JSON.stringify([]),
        category: audience,
        activities: {
          create: {
            action: "student_signup",
            note: `${audience} created a free profile using the simplified signup form.`,
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
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: unknown }).code === "P2002"
    ) {
      return NextResponse.json(
        {
          message:
            "This mobile number is already registered. Please use Student Login instead.",
          code: "MOBILE_EXISTS",
        },
        { status: 409 }
      );
    }

    console.error(
      "Student signup failed:",
      error instanceof Error ? error.message : "Unknown signup error"
    );

    return NextResponse.json(
      {
        message:
          "Signup is temporarily unavailable. Please try again in a few minutes.",
      },
      { status: 503 }
    );
  }
}

function studentActor(leadCode: string) {
  return `student:${leadCode}`;
}
