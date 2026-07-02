import { NextResponse, type NextRequest } from "next/server";

import {
  generateIlmalinkGeminiAnswer,
  ILMA_LINK_COUNSELLING_FALLBACK,
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
    country:
      typeof item.data?.country === "string" ? item.data.country : undefined,
    state: typeof item.data?.state === "string" ? item.data.state : undefined,
    city: typeof item.data?.city === "string" ? item.data.city : undefined,
    collegeName:
      typeof item.data?.collegeName === "string"
        ? item.data.collegeName
        : typeof item.data?.universityName === "string"
          ? item.data.universityName
          : undefined,
    fees:
      typeof item.data?.fees === "string"
        ? item.data.fees
        : typeof item.data?.feeText === "string"
          ? item.data.feeText
          : undefined,
    hasFee:
      typeof item.data?.hasFee === "boolean" ? item.data.hasFee : undefined,
    seatMatrixText:
      typeof item.data?.seatMatrixText === "string"
        ? item.data.seatMatrixText
        : undefined,
    cutoffText:
      typeof item.data?.cutoffText === "string"
        ? item.data.cutoffText
        : undefined,
  };
}

function toPublicSource(source: SearchSource) {
  return {
    id: source.id,
    title: source.title,
    url: source.url,
    category: source.category || source.dataType,
    description: source.description,
    dataType: source.dataType,
    sourceLabel: source.sourceLabel,
    lastUpdated: source.lastUpdated,
    country: source.country,
    state: source.state,
    city: source.city,
    collegeName: source.collegeName,
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

function buildNoAnswerResponse(status = 200) {
  return NextResponse.json(
    {
      answer: ILMA_LINK_COUNSELLING_FALLBACK,
      mode: "no_answer",
      sources: [],
      confidence: "low",
      dataAvailable: false,
      partialData: false,
      needsCounselling: true,
      openCounsellingPopup: true,
      detectedFilters: [],
      matchedItems: [],
      suggestedLinks: [],
      shouldShowConnectCTA: true,
      shouldAutoOpenCounselling: true,
      notFound: true,
    },
    { status }
  );
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
      return buildNoAnswerResponse(400);
    }

    const advisoryRecords = await getApprovedAdvisoryRecords();

    const search = searchSiteData(question, {
      limit: 12,
      extraRecords: advisoryRecords,
    });

    const localSources = search.matchedItems.slice(0, 8).map(toSearchSource);

    const aiResult = await generateIlmalinkGeminiAnswer({
      query: question,
      sources: localSources,
    });

    const publicSources = aiResult.sourcesUsed.map(toPublicSource);
    const isNoAnswer = aiResult.mode === "no_answer";

    return NextResponse.json({
      answer: aiResult.answer,
      mode: aiResult.mode,
      sources: publicSources,
      confidence: aiResult.confidence,
      dataAvailable: aiResult.dataAvailable,
      partialData: aiResult.partialData,
      needsCounselling: aiResult.needsCounselling,
      openCounsellingPopup: aiResult.openCounsellingPopup && isNoAnswer,
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
      shouldAutoOpenCounselling: aiResult.openCounsellingPopup && isNoAnswer,
      notFound: isNoAnswer,
    });
  } catch (error) {
    console.error("Ask ilmaLink API error:", error);
    return buildNoAnswerResponse(500);
  }
}
