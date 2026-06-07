import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

import { getCurrentBlogUser } from "@/app/lib/blog/auth";
import {
  approveTextVersion,
  rejectTextVersion,
} from "@/lib/advisoryStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ApprovalPayload = {
  versionId: string;
  action: "approve" | "reject";
  publicSummary: string;
  adminNote: string;
  approvedBy: string;
};

function getPayloadValue(
  payload: Record<string, unknown>,
  key: keyof ApprovalPayload
) {
  const value = payload[key];

  return typeof value === "string" ? value : "";
}

async function readPayload(
  request: NextRequest
): Promise<ApprovalPayload> {
  const contentType = request.headers.get("content-type") ?? "";
  const rawPayload: Record<string, unknown> = contentType.includes(
    "application/json"
  )
    ? await request.json()
    : Object.fromEntries(await request.formData());
  const action = getPayloadValue(rawPayload, "action");

  return {
    versionId: getPayloadValue(rawPayload, "versionId"),
    action: action === "reject" ? "reject" : "approve",
    publicSummary: getPayloadValue(rawPayload, "publicSummary"),
    adminNote: getPayloadValue(rawPayload, "adminNote"),
    approvedBy: getPayloadValue(rawPayload, "approvedBy"),
  };
}

async function requireAdmin() {
  const user = await getCurrentBlogUser();

  if (!user) {
    return {
      ok: false as const,
      response: Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  if (user.role !== "admin") {
    return {
      ok: false as const,
      response: Response.json(
        { error: "Admin access required" },
        { status: 403 }
      ),
    };
  }

  return {
    ok: true as const,
    user,
  };
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  try {
    const payload = await readPayload(request);

    if (!payload.versionId) {
      return Response.json(
        { error: "versionId is required" },
        { status: 400 }
      );
    }

    const result =
      payload.action === "approve"
        ? await approveTextVersion(
            payload.versionId,
            payload.publicSummary,
            payload.adminNote,
            payload.approvedBy ||
              admin.user.name ||
              admin.user.email ||
              "Admin"
          )
        : await rejectTextVersion(
            payload.versionId,
            payload.adminNote
          );

    revalidatePath("/admin/advisory-monitor");
    revalidatePath("/official-advisories");

    return Response.json({
      ...result,
      action: payload.action,
      versionId: payload.versionId,
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Advisory approval action failed.",
      },
      { status: 500 }
    );
  }
}
