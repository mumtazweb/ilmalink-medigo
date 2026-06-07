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

async function getApprovedAdvisoryRecords(): Promise<SiteSearchRecord[]> {
  try {
    const store = await import("@/lib/advisoryStore");
    const approvedVersions =
      (await store.getApprovedVersions()) as AdvisoryVersionForSearch[];

    return approvedVersions.map((version) => ({
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
      sourceLabel: "Approved ILMALINK official-source update",
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
  } catch {
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
          matchedItems: [],
          suggestedLinks: [],
          shouldShowConnectCTA: true,
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

    return Response.json(answer);
  } catch {
    return Response.json(
      {
        answer:
          "This question can be answered better by our experts. Connect ILMALINK for a personalised reply, and you can ask any other MBBS question there too.",
        confidence: "low",
        matchedItems: [],
        suggestedLinks: [],
        shouldShowConnectCTA: true,
        notFound: true,
      },
      { status: 500 }
    );
  }
}
