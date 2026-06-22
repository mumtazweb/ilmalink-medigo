import { stat } from "fs/promises";
import { Readable } from "stream";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";
import {
  createPortalDocumentReadStream,
  isPortalDocumentStorageKey,
  portalDocumentMimeType,
  portalDownloadContentDisposition,
  resolvePortalDocumentPath,
} from "../../../../../lib/portal/documentStorage";
import {
  getCurrentPortalStaff,
  getCurrentPortalStudentIdentity,
} from "../../../../../lib/portal/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DocumentDownloadRouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: DocumentDownloadRouteProps
) {
  const { id } = await params;
  const document = await prisma.studentDocument.findUnique({
    where: { id },
    include: {
      student: {
        select: {
          id: true,
          assignedToId: true,
        },
      },
    },
  });

  if (!document) {
    return new NextResponse("Document not found.", { status: 404 });
  }

  const allowed = await canDownloadDocument(document.student);
  if (!allowed) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (!document.fileUrl) {
    return new NextResponse("Document file is not available.", { status: 404 });
  }

  if (!isPortalDocumentStorageKey(document.fileUrl)) {
    return NextResponse.redirect(new URL(document.fileUrl, request.url));
  }

  try {
    const filePath = resolvePortalDocumentPath(document.fileUrl);
    const fileStat = await stat(filePath);
    const stream = Readable.toWeb(createPortalDocumentReadStream(document.fileUrl));

    return new NextResponse(stream as ReadableStream, {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Disposition": portalDownloadContentDisposition(
          document.fileName
        ),
        "Content-Length": String(fileStat.size),
        "Content-Type": portalDocumentMimeType(document.fileName),
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("[PortalDocumentDownloadError]", error);
    return new NextResponse("Document file is not available.", { status: 404 });
  }
}

async function canDownloadDocument(student: {
  id: string;
  assignedToId: string | null;
}) {
  const currentStudent = await getCurrentPortalStudentIdentity();
  if (currentStudent?.id === student.id) return true;

  const staff = await getCurrentPortalStaff();
  if (!staff) return false;

  if (
    staff.portalRole === "super_admin" ||
    staff.portalRole === "education_admin" ||
    staff.portalRole === "management"
  ) {
    return true;
  }

  return staff.portalRole === "counsellor" && student.assignedToId === staff.id;
}
