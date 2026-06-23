import {
  handleUpload,
  type HandleUploadBody,
} from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";

import {
  PORTAL_DOCUMENT_MAX_BYTES,
  isSupportedPortalDocumentFile,
} from "../../../../../lib/portal/documentChecklist";
import { isTrustedPortalRequest } from "../../../../../lib/portal/request";
import { getCurrentPortalStudentIdentity } from "../../../../../lib/portal/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { message: "Document storage is not configured." },
      { status: 503 }
    );
  }

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

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json(
      { message: "Upload request could not be read." },
      { status: 400 }
    );
  }

  try {
    const result = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname) => {
        const expectedPathPrefix = `portal-documents/${student.id}/`;
        const fileName = pathname.slice(expectedPathPrefix.length);

        if (
          !pathname.startsWith(expectedPathPrefix) ||
          !fileName ||
          !isSupportedPortalDocumentFile({ name: fileName, type: "" })
        ) {
          throw new Error("Invalid document upload path.");
        }

        return {
          allowedContentTypes: [
            "image/*",
            "application/pdf",
            "application/octet-stream",
          ],
          maximumSizeInBytes: PORTAL_DOCUMENT_MAX_BYTES,
          validUntil: Date.now() + 10 * 60 * 1000,
          addRandomSuffix: false,
          allowOverwrite: false,
        };
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[PortalBlobUploadTokenError]", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Document upload could not be started.",
      },
      { status: 400 }
    );
  }
}
