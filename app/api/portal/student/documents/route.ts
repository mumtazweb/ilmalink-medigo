import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { isTrustedPortalRequest } from "../../../../lib/portal/request";
import { getCurrentPortalStudentIdentity } from "../../../../lib/portal/session";
import {
  cleanOptionalText,
  cleanText,
} from "../../../../lib/portal/validation";
import {
  createPortalDocumentStorageKey,
  deletePortalDocumentFile,
  writePortalDocumentFile,
} from "../../../../lib/portal/documentStorage";
import {
  PORTAL_OTHER_DOCUMENT_LABEL,
  isSupportedPortalDocumentFile,
  portalDocumentDownloadHref,
} from "../../../../lib/portal/documentChecklist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isTrustedPortalRequest(request)) {
    return NextResponse.json(
      { message: "Invalid request origin." },
      { status: 403 }
    );
  }

  const student = await getCurrentPortalStudentIdentity();
  if (!student) {
    return NextResponse.json(
      { message: "Please log in again." },
      { status: 401 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { message: "Upload could not be read. Please try again." },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { message: "Select a document to upload." },
      { status: 400 }
    );
  }

  const selectedType = cleanText(formData.get("documentType"), 120);
  const customType = cleanText(formData.get("customDocumentType"), 120);
  const documentType =
    selectedType === PORTAL_OTHER_DOCUMENT_LABEL
      ? customType
      : selectedType || customType;

  if (!isSupportedPortalDocumentFile(file)) {
    return NextResponse.json(
      { message: "Only image and PDF documents can be uploaded." },
      { status: 415 }
    );
  }

  if (documentType.length < 2) {
    return NextResponse.json(
      { message: "Enter the document name." },
      { status: 400 }
    );
  }

  const fileName = cleanText(file.name || "student-document", 240);
  const storageKey = createPortalDocumentStorageKey(student.id, fileName);

  try {
    await writePortalDocumentFile(storageKey, file);

    const [document] = await prisma
      .$transaction([
        prisma.studentDocument.create({
          data: {
            studentId: student.id,
            documentType,
            fileName,
            fileUrl: storageKey,
            status: "uploaded",
            note: cleanOptionalText(formData.get("note"), 1000),
          },
        }),
        prisma.leadActivity.create({
          data: {
            studentId: student.id,
            action: "document_uploaded",
            note: `${documentType} uploaded by student.`,
            createdBy: `student:${student.leadCode}`,
          },
        }),
      ])
      .catch(async (error) => {
        await deletePortalDocumentFile(storageKey);
        throw error;
      });

    revalidatePath("/portal/student/documents");
    revalidatePath("/portal/student/dashboard");
    revalidatePath("/portal/student/application-status");

    return NextResponse.json({
      ok: true,
      message: "Document uploaded.",
      document: {
        id: document.id,
        documentType: document.documentType,
        fileName: document.fileName,
        status: document.status,
        createdAt: document.createdAt.toISOString(),
        downloadUrl: portalDocumentDownloadHref(document.id),
      },
    });
  } catch (error) {
    console.error("[PortalDocumentUploadError]", error);
    return NextResponse.json(
      { message: "Document upload failed. Please try again." },
      { status: 500 }
    );
  }
}
