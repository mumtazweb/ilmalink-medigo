import type { NextRequest } from "next/server";

import { buildSiteAnswerFromSearch } from "@/lib/siteAnswerBuilder";
import {
  searchInternalSiteData,
  type SiteSearchRecord,
} from "@/lib/siteDataSearch";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type AdvisoryVersionForSearch = {
  id: string;
  sourceName: string;
  country: string;
  category: string;
  versionLabel: string;
  roundLabel?: string | null;
  sourceUrl: string;
  publicSummary?: string | null;
  extractedText?: string | null;
  detectedAt?: string | null;
  lastChecked?: string | null;
};

let advisoryRecordsCache:
  | {
      expiresAt: number;
      records: SiteSearchRecord[];
    }
  | undefined;

async function getApprovedAdvisoryRecords(): Promise<SiteSearchRecord[]> {
  const now = Date.now();

  if (advisoryRecordsCache && advisoryRecordsCache.expiresAt > now) {
    return advisoryRecordsCache.records;
  }

  try {
    const store = await import("@/lib/advisoryStore");
    const approvedVersions =
      (await store.getApprovedVersions()) as AdvisoryVersionForSearch[];

    const records: SiteSearchRecord[] = approvedVersions.map((version) => ({
      id: `approved-advisory-${version.id}`,
      title: `${version.sourceName} - ${version.versionLabel}`,
      description:
        version.publicSummary?.slice(0, 280) ||
        version.extractedText?.slice(0, 280) ||
        "Approved official-source update summary.",
      url: "/official-advisories/",
      category: version.category,
      group: "Pages",
      type: "page",
      tags: [
        version.country,
        version.category,
        version.sourceName,
        version.versionLabel,
        version.roundLabel ?? "",
        "official advisory",
        "approved update",
        "seat matrix",
        "counselling",
      ].filter(Boolean),
      content: [
        version.sourceName,
        version.country,
        version.category,
        version.versionLabel,
        version.roundLabel ?? "",
        version.publicSummary ?? "",
        version.extractedText?.slice(0, 1600) ?? "",
        "official advisory approved update seat matrix counselling NMC FMGL",
      ].join(" "),
      priority: 108,
      matchedDataType: "Official Advisory",
      sourceLabel: "Approved ilmaLink official-source update",
      lastUpdated: version.lastChecked ?? version.detectedAt,
      data: {
        kind: "approved-advisory",
        sourceName: version.sourceName,
        country: version.country,
        category: version.category,
        versionLabel: version.versionLabel,
        roundLabel: version.roundLabel,
        sourceUrl: version.sourceUrl,
      },
    }));

    advisoryRecordsCache = {
      expiresAt: now + 60_000,
      records,
    };

    return records;
  } catch {
    advisoryRecordsCache = {
      expiresAt: now + 15_000,
      records: [],
    };

    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { question?: unknown };
    const question =
      typeof body.question === "string" ? body.question.trim() : "";

    if (!question) {
      return Response.json(
        {
          answer:
            "Please type a keyword or MBBS-related question.",
          confidence: "low",
          detectedFilters: [],
          matchedItems: [],
          suggestedLinks: [],
          shouldShowConnectCTA: true,
          shouldAutoOpenCounselling: true,
          notFound: true,
        },
        { status: 400 }
      );
    }

    const advisoryRecords = await getApprovedAdvisoryRecords();
    const search = searchInternalSiteData(question, {
      extraRecords: advisoryRecords,
    });
    const answer = buildSiteAnswerFromSearch(search);

    return Response.json({
      ...answer,
      matchedItems: answer.matchedItems.slice(0, 4).map((item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        dataType: item.matchedDataType,
        score: item.score,
      })),
    });
   } catch (error) {
    console.error("Ask ilmaLink API error:", error);

    return Response.json(
      {
        answer:
          "I could not find a confident match in ilmaLink data. You can ask in another way or connect with ilmalink for counselling support.",
        confidence: "low",
        detectedFilters: [],
        matchedItems: [],
        suggestedLinks: [],
        shouldShowConnectCTA: true,
        shouldAutoOpenCounselling: false,
        notFound: true,
      },
      { status: 500 }
    );
  }
}
