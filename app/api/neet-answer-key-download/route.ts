import { promises as fs } from "node:fs";
import path from "node:path";

import type { NextRequest } from "next/server";

import {
  NEET_ANSWER_KEY_DOWNLOADS,
  type NeetAnswerKeyDownloadResource,
} from "../../data/neetAnswerKeyDownloads";
import { getCurrentPortalStudent } from "../../lib/portal/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isDownloadResource(
  value: string
): value is NeetAnswerKeyDownloadResource {
  return value in NEET_ANSWER_KEY_DOWNLOADS;
}

function readProtectedPdf(resource: NeetAnswerKeyDownloadResource) {
  const metadata = NEET_ANSWER_KEY_DOWNLOADS[resource];

  return fs.readFile(
    path.join(process.cwd(), "private-assets", metadata.fileName)
  );
}

export async function GET(request: NextRequest) {
  const student = await getCurrentPortalStudent();

  if (!student?.mobileVerified) {
    return Response.json(
      {
        ok: false,
        code: "STUDENT_ACCOUNT_REQUIRED",
        message:
          "Create a verified student profile or log in before downloading PDFs.",
      },
      {
        status: 401,
        headers: { "Cache-Control": "private, no-store" },
      }
    );
  }

  const resource = request.nextUrl.searchParams.get("resource") ?? "";

  if (!isDownloadResource(resource)) {
    return Response.json(
      { ok: false, message: "The requested answer-key file was not found." },
      { status: 404 }
    );
  }

  try {
    const file = await readProtectedPdf(resource);
    const metadata = NEET_ANSWER_KEY_DOWNLOADS[resource];

    return new Response(new Uint8Array(file), {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Disposition": `attachment; filename="${metadata.fileName}"`,
        "Content-Length": String(file.byteLength),
        "Content-Type": "application/pdf",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error(
      "Protected NEET answer-key download error:",
      error instanceof Error ? error.message : "Unknown file error"
    );

    return Response.json(
      { ok: false, message: "The protected PDF is not available right now." },
      { status: 404 }
    );
  }
}
