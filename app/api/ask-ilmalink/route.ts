import { NextResponse, type NextRequest } from "next/server";

import {
  generateIlmalinkGeminiAnswer,
  ILMALINK_COUNSELLING_FALLBACK,
  type SearchSource,
} from "@/lib/ilmalinkGeminiAnswer";
import {
  searchSiteData,
  type SiteSearchMatch,
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

function toSearchSource(item: SiteSearchMatch): SearchSource {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    url: item.url,
    category: item.category,
    content: item.content,
    priority: item.priority,
    dataType: item.matchedDataType,
    sourceLabel: item.sourceLabel,
    lastUpdated: item.lastUpdated,
    score: item.score,
    keyFacts: item.keyFacts,
  };
}

function toPublicSource(source: SearchSource) {
  return {
    title: source.title,
    url: source.url,
    category: source.category || source.dataType,
    description: source.description,
  };
}

function toSuggestedLink(source: SearchSource) {
  return {
    title: source.title,
    description: source.description || "",
    url: source.url,
    sourceLabel: source.sourceLabel || "ilmaLink local source",
    dataType: source.dataType || source.category || "Page",
    lastUpdated: source.lastUpdated,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      question?: unknown;
      query?: unknown;
    };
    const question =
      typeof body.question === "string"
        ? body.question.trim()
        : typeof body.query === "string"
          ? body.query.trim()
          : "";

    if (!question) {
      return NextResponse.json(
        {
          answer: ILMALINK_COUNSELLING_FALLBACK,
          sources: [],
          confidence: "low",
          dataAvailable: false,
          needsCounselling: true,
          openCounsellingPopup: true,
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
    const search = searchSiteData(question, {
      limit: 12,
      extraRecords: advisoryRecords,
    });
    const localSources = search.matchedItems
      .slice(0, 8)
      .map(toSearchSource);
    const aiResult = await generateIlmalinkGeminiAnswer({
      query: question,
      sources: localSources,
    });
    const publicSources = aiResult.sourcesUsed.map(toPublicSource);

    return NextResponse.json({
      answer: aiResult.answer,
      sources: publicSources,
      confidence: aiResult.confidence,
      dataAvailable: aiResult.dataAvailable,
      needsCounselling: aiResult.needsCounselling,
      openCounsellingPopup: aiResult.openCounsellingPopup,
      detectedFilters: search.detectedFilters,
      matchedItems: search.matchedItems.slice(0, 4).map((item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        dataType: item.matchedDataType,
        score: item.score,
      })),
      suggestedLinks: aiResult.sourcesUsed.map(toSuggestedLink),
      shouldShowConnectCTA: true,
      shouldAutoOpenCounselling: aiResult.openCounsellingPopup,
      notFound: !aiResult.dataAvailable,
    });
   } catch (error) {
    console.error("Ask ilmaLink API error:", error);

    return NextResponse.json(
      {
        answer: ILMALINK_COUNSELLING_FALLBACK,
        sources: [],
        confidence: "low",
        dataAvailable: false,
        needsCounselling: true,
        openCounsellingPopup: true,
        detectedFilters: [],
        matchedItems: [],
        suggestedLinks: [],
        shouldShowConnectCTA: true,
        shouldAutoOpenCounselling: true,
        notFound: true,
      },
      { status: 500 }
    );
  }
}
