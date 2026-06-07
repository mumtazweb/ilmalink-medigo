import { createHash } from "crypto";

import type { NextRequest } from "next/server";

import { getCurrentBlogUser } from "@/app/lib/blog/auth";
import {
  compareAdvisoryVersions,
  detectAdvisorySignals,
} from "@/lib/advisoryDiff";
import { fetchAdvisorySource } from "@/lib/advisoryFetcher";
import {
  createTextVersion,
  createTextVersionChange,
  getLatestApprovedVersion,
  getPendingVersionBySource,
  getSourceById,
  getSources,
  updateSourceLastChecked,
  type AdvisorySourceRecord,
  type OfficialTextVersionInput,
} from "@/lib/advisoryStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function createTrackerId(
  prefix: string,
  sourceId: string,
  checkedAt: string,
  seed: string
) {
  const timestamp = checkedAt
    .replace(/[^0-9]/g, "")
    .slice(0, 14);
  const sourcePart = sourceId.replace(/[^a-z0-9-]/gi, "-").slice(0, 58);
  const seedHash = createHash("sha1")
    .update(seed)
    .digest("hex")
    .slice(0, 12);

  return `${prefix}_${sourcePart}_${timestamp}_${seedHash}`.slice(0, 120);
}

function createVersionLabel(
  source: AdvisorySourceRecord,
  checkedAt: string
) {
  const date = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(checkedAt));

  return `${source.category} official update - ${date}`;
}

function createSourceReference(
  sourceUrl: string,
  pdfLinks: Array<{ text: string; href: string }>
) {
  const pdfReferenceText =
    pdfLinks.length > 0
      ? `\nPDF source references detected for internal review:\n${pdfLinks
          .slice(0, 40)
          .map((link) => `- ${link.text}: ${link.href}`)
          .join("\n")}`
      : "";

  return `Official source page: ${sourceUrl}${pdfReferenceText}`;
}

function createReviewSummaryDraft(
  versionTitle: string,
  roundLabel: string | null,
  textPreview: string,
  keywordMatches: string[]
) {
  const parts = [
    versionTitle,
    roundLabel ? `Detected label: ${roundLabel}.` : null,
    keywordMatches.length > 0
      ? `Matched official keywords: ${keywordMatches.join(", ")}.`
      : null,
    textPreview,
  ].filter(Boolean);

  return parts.join("\n\n").slice(0, 1200);
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

async function getRequestedSources(request: NextRequest) {
  const sourceId = request.nextUrl.searchParams.get("sourceId");

  if (sourceId) {
    const source = await getSourceById(sourceId);
    return source ? [source] : [];
  }

  return getSources();
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const checked: string[] = [];
  const changed: string[] = [];
  const noChange: string[] = [];
  const pendingReview: string[] = [];
  const errors: Array<{ sourceId: string; message: string }> = [];

  try {
    const requestedSources = await getRequestedSources(request);
    const activeSources = requestedSources.filter(
      (source) => source.isActive
    );

    for (const source of activeSources) {
      checked.push(source.id);

      const fetchResult = await fetchAdvisorySource(source);

      if (!fetchResult.ok || fetchResult.error) {
        await updateSourceLastChecked(
          source.id,
          null,
          fetchResult.checkedAt
        );
        errors.push({
          sourceId: source.id,
          message:
            fetchResult.error ?? "Official source fetch failed.",
        });
        continue;
      }

      const previousApproved = await getLatestApprovedVersion(
        source.id
      );
      const previousHash =
        source.lastKnownHash ||
        previousApproved?.extractedData?.hash ||
        null;
      const existingPending = await getPendingVersionBySource(
        source.id
      );

      if (previousHash === fetchResult.hash) {
        await updateSourceLastChecked(
          source.id,
          fetchResult.hash,
          fetchResult.checkedAt
        );
        noChange.push(source.id);

        if (existingPending) {
          pendingReview.push(existingPending.id);
        }

        continue;
      }

      if (
        existingPending?.extractedData?.hash &&
        existingPending.extractedData.hash === fetchResult.hash
      ) {
        await updateSourceLastChecked(
          source.id,
          fetchResult.hash,
          fetchResult.checkedAt
        );
        pendingReview.push(existingPending.id);
        continue;
      }

      const comparison = compareAdvisoryVersions(
        previousApproved,
        fetchResult
      );
      const versionId = createTrackerId(
        "ver",
        source.id,
        fetchResult.checkedAt,
        fetchResult.hash
      );
      const version: OfficialTextVersionInput = {
        id: versionId,
        sourceId: source.id,
        country: source.country,
        category: source.category,
        sourceName: source.sourceName,
        sourceType: source.sourceType,
        title: fetchResult.title,
        versionLabel: createVersionLabel(
          source,
          fetchResult.checkedAt
        ),
        roundLabel: comparison.roundLabel,
        sourceUrl: fetchResult.sourceUrl,
        sourceReference: createSourceReference(
          fetchResult.sourceUrl,
          fetchResult.pdfLinks
        ),
        extractedText: fetchResult.normalizedText,
        extractedData: {
          textPreview: fetchResult.textPreview,
          foundLinks: fetchResult.foundLinks.slice(0, 300),
          pdfLinks: fetchResult.pdfLinks.slice(0, 120),
          keywordMatches: fetchResult.keywordMatches,
          hash: fetchResult.hash,
          signals: detectAdvisorySignals(
            fetchResult,
            previousHash,
            previousApproved?.extractedData?.pdfLinks
          ),
          checkedAt: fetchResult.checkedAt,
        },
        detectedAt: fetchResult.checkedAt,
        effectiveDate: null,
        status: "Needs Review",
        adminNote: null,
        publicSummary: createReviewSummaryDraft(
          fetchResult.title,
          comparison.roundLabel,
          fetchResult.textPreview,
          fetchResult.keywordMatches
        ),
      };

      await createTextVersion(version);

      if (previousApproved) {
        await createTextVersionChange({
          id: createTrackerId(
            "chg",
            source.id,
            fetchResult.checkedAt,
            `${previousApproved.id}:${versionId}`
          ),
          oldVersionId: previousApproved.id,
          newVersionId: versionId,
          sourceId: source.id,
          country: source.country,
          category: source.category,
          changeSummary: comparison.changeSummary,
          addedItems: comparison.addedItems,
          removedItems: comparison.removedItems,
          changedItems: comparison.changedItems,
          adminNote: null,
          status: "Needs Review",
        });
      }

      await updateSourceLastChecked(
        source.id,
        fetchResult.hash,
        fetchResult.checkedAt
      );
      changed.push(source.id);
      pendingReview.push(versionId);
    }

    for (const source of requestedSources) {
      if (!source.isActive) {
        errors.push({
          sourceId: source.id,
          message:
            "Source is inactive because its official URL is not configured.",
        });
      }
    }

    return Response.json({
      checked: checked.length,
      checkedSources: checked,
      changed,
      noChange,
      errors,
      pendingReview,
    });
  } catch (error) {
    return Response.json(
      {
        checked: checked.length,
        checkedSources: checked,
        changed,
        noChange,
        errors: [
          ...errors,
          {
            sourceId: "system",
            message:
              error instanceof Error
                ? error.message
                : "Advisory checker failed.",
          },
        ],
        pendingReview,
      },
      { status: 500 }
    );
  }
}
