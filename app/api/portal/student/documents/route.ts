import { del, head } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import {
  isTrustedPortalRequest,
  readJsonObject,
} from "../../../../lib/portal/request";
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
  PORTAL_DOCUMENT_MAX_BYTES,
  PORTAL_DOCUMENT_MAX_LABEL,
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

  if (request.headers.get("content-type")?.includes("application/json")) {
    return completeBlobUpload(request, student);
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

  if (file.size > PORTAL_DOCUMENT_MAX_BYTES) {
    return NextResponse.json(
      { message: `The document must be ${PORTAL_DOCUMENT_MAX_LABEL} or smaller.` },
      { status: 413 }
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

async function completeBlobUpload(
  request: NextRequest,
  student: {
    id: string;
    leadCode: string;
  }
) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { message: "Document storage is not configured." },
      { status: 503 }
    );
  }

  const payload = await readJsonObject(request);
  if (!payload) {
    return NextResponse.json(
      { message: "Upload details could not be read." },
      { status: 400 }
    );
  }

  const selectedType = cleanText(payload.documentType, 120);
  const customType = cleanText(payload.customDocumentType, 120);
  const documentType =
    selectedType === PORTAL_OTHER_DOCUMENT_LABEL
      ? customType
      : selectedType || customType;
  const fileName = cleanText(payload.fileName || "student-document", 240);
  const fileType = cleanText(payload.fileType, 160).toLowerCase();
  const blobUrl = cleanText(payload.blobUrl, 2048);
  const blobPathname = cleanText(payload.blobPathname, 1024);
  const expectedPathPrefix = `portal-documents/${student.id}/`;

  if (documentType.length < 2) {
    return NextResponse.json(
      { message: "Enter the document name." },
      { status: 400 }
    );
  }

  if (
    !blobUrl ||
    !blobPathname.startsWith(expectedPathPrefix) ||
    !isSupportedPortalDocumentFile({ name: fileName, type: fileType })
  ) {
    return NextResponse.json(
      { message: "The uploaded document is invalid." },
      { status: 400 }
    );
  }

  try {
    const blob = await head(blobUrl);

    if (
      blob.pathname !== blobPathname ||
      !blob.pathname.startsWith(expectedPathPrefix) ||
      !isSupportedPortalDocumentFile({
        name: fileName,
        type: blob.contentType || fileType,
      })
    ) {
      return NextResponse.json(
        { message: "The uploaded document could not be verified." },
        { status: 400 }
      );
    }

    if (blob.size > PORTAL_DOCUMENT_MAX_BYTES) {
      await del(blobUrl).catch(() => undefined);
      return NextResponse.json(
        {
          message: `The document must be ${PORTAL_DOCUMENT_MAX_LABEL} or smaller.`,
        },
        { status: 413 }
      );
    }

    const existingDocument = await prisma.studentDocument.findFirst({
      where: {
        studentId: student.id,
        fileUrl: blobUrl,
      },
    });

    if (existingDocument) {
      return NextResponse.json({
        ok: true,
        message: "Document uploaded.",
        document: serializeDocument(existingDocument),
      });
    }

    const [document] = await prisma
      .$transaction([
        prisma.studentDocument.create({
          data: {
            studentId: student.id,
            documentType,
            fileName,
            fileUrl: blobUrl,
            status: "uploaded",
            note: cleanOptionalText(payload.note, 1000),
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
        await del(blobUrl).catch(() => undefined);
        throw error;
      });

    revalidatePortalDocumentPages();

    return NextResponse.json({
      ok: true,
      message: "Document uploaded.",
      document: serializeDocument(document),
    });
  } catch (error) {
    console.error("[PortalBlobDocumentCompletionError]", error);
    return NextResponse.json(
      { message: "Document upload could not be completed. Please try again." },
      { status: 500 }
    );
  }
}

function serializeDocument(document: {
  id: string;
  documentType: string;
  fileName: string | null;
  status: string;
  createdAt: Date;
}) {
  return {
    id: document.id,
    documentType: document.documentType,
    fileName: document.fileName,
    status: document.status,
    createdAt: document.createdAt.toISOString(),
    downloadUrl: portalDocumentDownloadHref(document.id),
  };
}

function revalidatePortalDocumentPages() {
  revalidatePath("/portal/student/documents");
  revalidatePath("/portal/student/dashboard");
  revalidatePath("/portal/student/application-status");
}
