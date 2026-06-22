import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import {
  isTrustedPortalRequest,
  readJsonObject,
} from "../../../../lib/portal/request";
import { getCurrentPortalStudent } from "../../../../lib/portal/session";
import {
  cleanOptionalText,
  cleanText,
  normalizeEmail,
  normalizeIndianMobile,
  normalizeInterests,
} from "../../../../lib/portal/validation";

export async function PATCH(request: NextRequest) {
  if (!isTrustedPortalRequest(request)) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }
  const student = await getCurrentPortalStudent();
  if (!student) {
    return NextResponse.json({ message: "Please log in again." }, { status: 401 });
  }
  const body = await readJsonObject(request);
  if (!body) {
    return NextResponse.json({ message: "Invalid profile data." }, { status: 400 });
  }

  const name = cleanText(body.name, 120);
  const emailInput = cleanText(body.email, 191);
  const email = emailInput ? normalizeEmail(emailInput) : null;
  const interests = normalizeInterests(body.interests);
  const whatsappAvailable = cleanText(body.whatsappAvailable, 20);
  const whatsappNumber =
    whatsappAvailable === "same"
      ? student.mobile
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
      { message: "Enter a valid email address." },
      { status: 400 }
    );
  }
  if (whatsappAvailable === "different" && !whatsappNumber) {
    return NextResponse.json(
      { message: "Enter a valid WhatsApp number." },
      { status: 400 }
    );
  }

  try {
    await prisma.studentAccount.update({
      where: { id: student.id },
      data: {
        name,
        email,
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
            action: "profile_updated",
            note: "Student updated profile details.",
            createdBy: `student:${student.leadCode}`,
          },
        },
      },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: unknown }).code === "P2002"
    ) {
      return NextResponse.json(
        { message: "This email is already linked to another profile." },
        { status: 409 }
      );
    }
    throw error;
  }

  return NextResponse.json({ ok: true, message: "Profile updated." });
}
