import { GoogleGenAI } from "@google/genai";

export type SearchSource = {
  id?: string;
  title: string;
  description?: string;
  url: string;
  category?: string;
  content?: string;
  priority?: number;
  dataType?: string;
  sourceLabel?: string;
  lastUpdated?: string | null;
  country?: string;
  state?: string;
  city?: string;
  collegeName?: string;
  fees?: string;
  hasFee?: boolean;
  seatMatrixText?: string;
  cutoffText?: string;
  score?: number;
  keyFacts?: string[];
};

export type IlmalinkAiConfidence = "high" | "medium" | "low";

export type IlmalinkAiAnswerMode =
  | "strong_answer"
  | "direct_page_answer"
  | "no_answer";

export type IlmalinkAiAnswer = {
  answer: string;
  mode: IlmalinkAiAnswerMode;
  confidence: IlmalinkAiConfidence;
  dataAvailable: boolean;
  partialData: boolean;
  needsCounselling: boolean;
  openCounsellingPopup: boolean;
  sourcesUsed: SearchSource[];
};

export const ILMALINK_COUNSELLING_FALLBACK =
  "This query will be answered shortly. Please sign up or chat with our experts live.";

const GEMINI_MODEL = "gemini-3.5-flash";
const MAX_SOURCES_FOR_GEMINI = 8;
const GEMINI_QUOTA_BACKOFF_MS = 5 * 60 * 1000;

let geminiUnavailableUntil = 0;

const SYSTEM_INSTRUCTION = `You are ilmaLink's admission-data assistant.

You must answer only from the provided ilmalink context.
Do not use outside knowledge.
Do not search the web.
Do not invent data.
Do not guess fees, cutoff, last rank, seats, recognition, FMGE data, eligibility, documents, hostel, scholarship, loan, admission route, or best-college claims.

Important answer rule:
If the provided ilmalink context contains a relevant page, source, excerpt, college, university, country or topic, answer directly.
Do not say the query is unanswered when relevant ilmalink sources exist.
Do not use the fallback sentence when sources exist.

If exact numeric values are present in the context, show them clearly.
If a relevant source exists but exact numeric values are not present, give a helpful page-based answer and guide the user to open the relevant ilmalink source page. Ask the user to verify the latest official fee letter, cutoff notice, counselling update or university document before final decision.

Use this fallback sentence only when there is no relevant ilmalink source at all:
"${ILMALINK_COUNSELLING_FALLBACK}"

Never mention dataset, index, crawler, script, prompt, SEO, GEO, missing data, technical limitation, or internal system words.

Brand rules:
- Official entity name: ilmalink
- Public visual style: ilmaLink
- Medigo is only an extension/service line of ilmalink, not a separate brand.

Answer style:
- Human and counsellor-like
- Clear and practical
- Student/parent friendly
- Short but useful
- Direct answer first
- Add caution/verification note if needed
- Mention useful source links naturally at the end
- Do not overpromise admission, ranking, recognition, approval, cutoff, or fees
- Do not say guaranteed`;

const INTERNAL_BLOCKED_WORDS = [
  "dataset",
  "index",
  "crawler",
  "script",
  "prompt",
  "seo",
  "geo",
  "technical limitation",
  "missing data",
  "internal system",
  "provided context does not",
  "not enough information",
  "exact data is not available",
  "current ilmalink dataset",
];

const GENERIC_QUERY_WORDS = new Set([
  "a",
  "about",
  "admission",
  "admissions",
  "all",
  "and",
  "any",
  "ask",
  "best",
  "better",
  "college",
  "colleges",
  "cost",
  "cutoff",
  "data",
  "details",
  "did",
  "do",
  "does",
  "doesnt",
  "eligibility",
  "exist",
  "existing",
  "fee",
  "fees",
  "for",
  "from",
  "give",
  "good",
  "ilmalink",
  "imaginary",
  "in",
  "is",
  "last",
  "mbbs",
  "medical",
  "medigo",
  "nonexistent",
  "not",
  "of",
  "pass",
  "query",
  "question",
  "rate",
  "rank",
  "ranking",
  "required",
  "result",
  "show",
  "should",
  "tell",
  "that",
  "the",
  "these",
  "this",
  "those",
  "top",
  "university",
  "universities",
  "what",
  "which",
  "will",
  "would",
]);

const INTENT_EVIDENCE = {
  fees: [
    "fee",
    "fees",
    "tuition",
    "hostel",
    "mess",
    "package",
    "cost",
    "budget",
    "expense",
    "payment",
  ],
  cutoff: [
    "cutoff",
    "cut off",
    "closing rank",
    "last rank",
    "opening rank",
    "rank",
    "score",
    "allotment",
  ],
  best: [
    "best",
    "top",
    "ranking",
    "ranked",
    "priority",
    "recommended",
    "compare",
    "comparison",
    "better",
    "suggested",
  ],
  eligibility: [
    "eligibility",
    "eligible",
    "neet",
    "pcb",
    "gpa",
    "age",
    "marks",
    "qualification",
  ],
  fmge: [
    "fmge",
    "pass rate",
    "appeared",
    "passed",
    "result",
    "nbems",
  ],
  recognition: [
    "nmc",
    "wdoms",
    "fmgl",
    "recognition",
    "accreditation",
    "approved",
    "listed",
    "license",
    "licence",
  ],
  documents: [
    "documents",
    "passport",
    "marksheet",
    "certificate",
    "embassy",
    "oci",
    "nri",
  ],
  hostel: [
    "hostel",
    "mess",
    "food",
    "accommodation",
    "living cost",
    "safety",
    "campus",
  ],
} as const;

type LocalIntent = keyof typeof INTENT_EVIDENCE;

function normalizeText(value = "") {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text: string, words: readonly string[]) {
  return words.some((word) => text.includes(normalizeText(word)));
}

function compact(value = "", maxLength = 1600) {
  const cleaned = value.replace(/\s+/g, " ").trim();

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  return `${cleaned.slice(0, maxLength)}...`;
}

function detectLocalIntents(query: string): LocalIntent[] {
  const normalizedQuery = normalizeText(query);
  const intents: LocalIntent[] = [];

  if (includesAny(normalizedQuery, INTENT_EVIDENCE.fees)) intents.push("fees");
  if (includesAny(normalizedQuery, INTENT_EVIDENCE.cutoff)) intents.push("cutoff");
  if (includesAny(normalizedQuery, INTENT_EVIDENCE.best)) intents.push("best");
  if (includesAny(normalizedQuery, INTENT_EVIDENCE.eligibility)) intents.push("eligibility");
  if (includesAny(normalizedQuery, INTENT_EVIDENCE.fmge)) intents.push("fmge");
  if (includesAny(normalizedQuery, INTENT_EVIDENCE.recognition)) intents.push("recognition");
  if (includesAny(normalizedQuery, INTENT_EVIDENCE.documents)) intents.push("documents");
  if (includesAny(normalizedQuery, INTENT_EVIDENCE.hostel)) intents.push("hostel");

  return Array.from(new Set(intents));
}

function getImportantQueryTokens(query: string) {
  return normalizeText(query)
    .split(" ")
    .filter((token) => token.length >= 3)
    .filter((token) => !GENERIC_QUERY_WORDS.has(token));
}

function getSourceText(source: SearchSource) {
  return normalizeText(
    [
      source.title,
      source.description,
      source.category,
      source.content,
      source.dataType,
      source.sourceLabel,
      source.country,
      source.state,
      source.city,
      source.collegeName,
      source.fees,
      source.seatMatrixText,
      source.cutoffText,
      source.keyFacts?.join(" "),
    ]
      .filter(Boolean)
      .join(" ")
  );
}

function hasMeaningfulSourceMatch(query: string, sources: SearchSource[]) {
  if (!sources.length) return false;

  const combinedSourceText = sources.map(getSourceText).join(" ");
  const importantTokens = getImportantQueryTokens(query);

  if (!importantTokens.length) {
    return true;
  }

  const matchedTokenCount = importantTokens.filter((token) =>
    combinedSourceText.includes(token)
  ).length;

  return matchedTokenCount >= 1;
}

function buildCounsellingFallback(sources: SearchSource[] = []): IlmalinkAiAnswer {
  return {
    answer: ILMALINK_COUNSELLING_FALLBACK,
    mode: "no_answer",
    confidence: "low",
    dataAvailable: false,
    partialData: false,
    needsCounselling: true,
    openCounsellingPopup: true,
    sourcesUsed: sources.slice(0, 3),
  };
}

function buildDirectPageAnswer({
  query,
  sources,
}: {
  query: string;
  sources: SearchSource[];
}): IlmalinkAiAnswer {
  const topSources = sources.slice(0, 3);
  const top = topSources[0];

  if (!top) {
    return buildCounsellingFallback();
  }

  const normalizedQuery = normalizeText(query);
  const subject =
    top.collegeName ||
    top.title
      .replace(/fee structure/gi, "")
      .replace(/fees/gi, "")
      .replace(/\s+/g, " ")
      .trim();

  const isFeeQuery = includesAny(normalizedQuery, INTENT_EVIDENCE.fees);
  const isRankQuery = includesAny(normalizedQuery, INTENT_EVIDENCE.cutoff);
  const isBestQuery = includesAny(normalizedQuery, INTENT_EVIDENCE.best);
  const isEligibilityQuery = includesAny(normalizedQuery, INTENT_EVIDENCE.eligibility);
  const isFmgeQuery = includesAny(normalizedQuery, INTENT_EVIDENCE.fmge);
  const isRecognitionQuery = includesAny(normalizedQuery, INTENT_EVIDENCE.recognition);
  const isDocumentQuery = includesAny(normalizedQuery, INTENT_EVIDENCE.documents);
  const isHostelQuery = includesAny(normalizedQuery, INTENT_EVIDENCE.hostel);

  let answer: string;

  if (isFeeQuery) {
    const exactFeeSource = topSources.find(
      (source) =>
        source.hasFee &&
        source.fees &&
        !normalizeText(source.fees).includes("to be updated")
    );

    answer = exactFeeSource?.fees
      ? `${exactFeeSource.collegeName || exactFeeSource.title} MBBS fees: ${exactFeeSource.fees}. Verify the latest official fee notice before payment or choice filling.`
      : `${subject} MBBS fee is to be updated in ilmalink. Open the linked page and verify the latest official fee notice or contact an ilmaLink expert before payment.`;
  } else if (isRankQuery) {
    answer = `${subject} rank or counselling information is available in ilmalink. Open the linked page to check available cutoff, last-rank, counselling-route or allotment details. Final allotment can change by year, category, quota and counselling round.`;
  } else if (isBestQuery) {
    answer = `I found relevant ilmalink information for this college-selection question. Use the linked pages to compare recommendation level, accreditation notes, FMGE information, fees, location, patient exposure and admission suitability before final choice.`;
  } else if (isEligibilityQuery) {
    answer = `Eligibility information related to your query is available in ilmalink. Open the linked page to check NEET, academic marks, documents, country-specific rules and admission requirements.`;
  } else if (isFmgeQuery) {
    answer = `FMGE-related information is available in ilmalink for this query. Open the linked page to review appeared, passed, pass-rate or university-level FMGE references where listed.`;
  } else if (isRecognitionQuery) {
    answer = `Recognition or accreditation-related information is available in ilmalink. Open the linked page and verify the latest NMC/FMGL, WDOMS or official recognition details before admission.`;
  } else if (isDocumentQuery) {
    answer = `Document-related information is available in ilmalink. Open the linked page to check passport, marksheet, certificate, embassy, OCI, NRI or country-specific document requirements where listed.`;
  } else if (isHostelQuery) {
    answer = `Hostel, mess, food, accommodation or campus-related information is available in ilmalink. Open the linked page to check the available living and campus details before final admission planning.`;
  } else {
    answer = `I found relevant ilmalink information for your query. Open the linked page to check the available details and verify final admission information before taking a decision.`;
  }

  return {
    answer,
    mode: "direct_page_answer",
    confidence: "medium",
    dataAvailable: true,
    partialData: true,
    needsCounselling: false,
    openCounsellingPopup: false,
    sourcesUsed: topSources,
  };
}

function shouldBlockAnswer(answer: string) {
  const normalizedAnswer = normalizeText(answer);

  return INTERNAL_BLOCKED_WORDS.some((word) =>
    normalizedAnswer.includes(normalizeText(word))
  );
}

function isFallbackAnswer(answer: string) {
  return answer.trim() === ILMALINK_COUNSELLING_FALLBACK;
}

function buildRetrievedContext(sources: SearchSource[]) {
  return sources
    .slice(0, MAX_SOURCES_FOR_GEMINI)
    .map((source, index) => {
      const location = [source.city, source.state, source.country]
        .filter(Boolean)
        .join(", ");
      const facts = source.keyFacts?.length
        ? source.keyFacts.map((fact) => `- ${compact(fact, 220)}`).join("\n")
        : "";
      const dataFacts = [
        source.fees ? `Fees: ${source.fees}` : "",
        source.seatMatrixText ? `Seat matrix: ${compact(source.seatMatrixText, 320)}` : "",
        source.cutoffText ? `Cutoff/last rank: ${compact(source.cutoffText, 420)}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      return `Source ${index + 1}
Title: ${compact(source.title, 220)}
Link: ${source.url}
Category: ${compact(source.category || source.dataType || "", 120)}
Location: ${compact(location, 160)}
College/University: ${compact(source.collegeName || "", 160)}
Useful facts:
${dataFacts || facts || "- No separate fact list."}
Excerpt: ${compact(source.content || source.description || "", 1600)}`;
    })
    .join("\n\n---\n\n");
}

function buildGeminiInput(query: string, sources: SearchSource[]) {
  return `Student question:
${query}

Relevant ilmalink source excerpts:
${buildRetrievedContext(sources)}

Write the answer only from the excerpts above.

Rules:
- If exact values are present, show them clearly.
- If the source is relevant but exact values are not present, still answer directly and guide the user to open the linked ilmalink source page.
- Do not use the counselling fallback when relevant sources exist.
- Use the counselling fallback only if there is no relevant ilmalink source at all.`;
}

function cleanGeminiAnswer(answer: string) {
  return answer
    .replace(/^["']|["']$/g, "")
    .replace(/\s+$/g, "")
    .trim();
}

function isQuotaOrRateLimitError(message: string) {
  const normalizedMessage = normalizeText(message);

  return (
    normalizedMessage.includes("429") ||
    normalizedMessage.includes("quota") ||
    normalizedMessage.includes("rate limit") ||
    normalizedMessage.includes("resource exhausted")
  );
}

export async function generateIlmalinkGeminiAnswer({
  query,
  sources,
}: {
  query: string;
  sources: SearchSource[];
}): Promise<IlmalinkAiAnswer> {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    return buildCounsellingFallback();
  }

  const topSources = sources
    .filter((source) => source.title && source.url)
    .filter((source) => source.description || source.content || source.keyFacts?.length)
    .slice(0, MAX_SOURCES_FOR_GEMINI);

  if (!topSources.length) {
    return buildCounsellingFallback();
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    console.warn("Missing GEMINI_API_KEY for ilmalink Gemini answer generation.");
    return buildDirectPageAnswer({
      query: cleanQuery,
      sources: topSources,
    });
  }

  const hasLocalMatch = hasMeaningfulSourceMatch(cleanQuery, topSources);

  if (!hasLocalMatch) {
    return buildDirectPageAnswer({
      query: cleanQuery,
      sources: topSources,
    });
  }

  if (Date.now() < geminiUnavailableUntil) {
    return buildDirectPageAnswer({
      query: cleanQuery,
      sources: topSources,
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const interaction = await ai.interactions.create({
      model: GEMINI_MODEL,
      system_instruction: SYSTEM_INSTRUCTION,
      input: buildGeminiInput(cleanQuery, topSources),
      generation_config: {
        temperature: 0.15,
        thinking_level: "low",
      },
    });

    const answer = cleanGeminiAnswer(String(interaction.output_text || ""));

    if (!answer || shouldBlockAnswer(answer)) {
      return buildDirectPageAnswer({
        query: cleanQuery,
        sources: topSources,
      });
    }

    if (isFallbackAnswer(answer) || answer.includes(ILMALINK_COUNSELLING_FALLBACK)) {
      return buildDirectPageAnswer({
        query: cleanQuery,
        sources: topSources,
      });
    }

    return {
      answer,
      mode: "strong_answer",
      confidence: topSources.length >= 3 ? "high" : "medium",
      dataAvailable: true,
      partialData: false,
      needsCounselling: false,
      openCounsellingPopup: false,
      sourcesUsed: topSources,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    if (isQuotaOrRateLimitError(message)) {
      geminiUnavailableUntil = Date.now() + GEMINI_QUOTA_BACKOFF_MS;
    }

    console.error("Gemini answer generation failed:", message);

    return buildDirectPageAnswer({
      query: cleanQuery,
      sources: topSources,
    });
  }
}
