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
  score?: number;
  keyFacts?: string[];
};

export type IlmalinkAiConfidence = "high" | "medium" | "low";

export type IlmalinkAiAnswer = {
  answer: string;
  confidence: IlmalinkAiConfidence;
  dataAvailable: boolean;
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

If the provided ilmalink context does not contain enough exact answer data, say exactly:
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
      source.keyFacts?.join(" "),
    ]
      .filter(Boolean)
      .join(" ")
  );
}

function hasMeaningfulSourceMatch(query: string, sources: SearchSource[]) {
  if (!sources.length) return false;

  const combinedSourceText = sources.map(getSourceText).join(" ");
  const intents = detectLocalIntents(query);
  const importantTokens = getImportantQueryTokens(query);
  const matchedTokenCount = importantTokens.filter((token) =>
    combinedSourceText.includes(token)
  ).length;
  const hasEntityOrLocationEvidence =
    importantTokens.length > 0 &&
    matchedTokenCount >= Math.min(2, importantTokens.length);
  const hasIntentEvidence =
    intents.length === 0 ||
    intents.every((intent) => includesAny(combinedSourceText, INTENT_EVIDENCE[intent]));
  const exactDataIntents: LocalIntent[] = ["fees", "cutoff", "fmge"];
  const needsNumericEvidence = intents.some((intent) =>
    exactDataIntents.includes(intent)
  );
  const hasNumericEvidence = /\d/.test(combinedSourceText);
  const hasRichSource = sources.some(
    (source) =>
      `${source.description ?? ""} ${source.content ?? ""} ${
        source.keyFacts?.join(" ") ?? ""
      }`.trim().length >= 180
  );
  if (needsNumericEvidence && !hasNumericEvidence) {
    return false;
  }

  return hasIntentEvidence && hasRichSource && hasEntityOrLocationEvidence;
}

function buildCounsellingFallback(sources: SearchSource[] = []): IlmalinkAiAnswer {
  return {
    answer: ILMALINK_COUNSELLING_FALLBACK,
    confidence: "low",
    dataAvailable: false,
    needsCounselling: true,
    openCounsellingPopup: true,
    sourcesUsed: sources.slice(0, 3),
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

      return `Source ${index + 1}
Title: ${compact(source.title, 220)}
Link: ${source.url}
Category: ${compact(source.category || source.dataType || "", 120)}
Location: ${compact(location, 160)}
College/University: ${compact(source.collegeName || "", 160)}
Useful facts:
${facts || "- No separate fact list."}
Excerpt: ${compact(source.content || source.description || "", 1600)}`;
    })
    .join("\n\n---\n\n");
}

function buildGeminiInput(query: string, sources: SearchSource[]) {
  return `Student question:
${query}

Relevant ilmalink source excerpts:
${buildRetrievedContext(sources)}

Write the answer only from the excerpts above. If the exact answer is not clearly supported, return only:
${ILMALINK_COUNSELLING_FALLBACK}`;
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

  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    console.warn("Missing GEMINI_API_KEY for ilmalink Gemini answer generation.");
    return buildCounsellingFallback(topSources);
  }

  if (!hasMeaningfulSourceMatch(cleanQuery, topSources)) {
    return buildCounsellingFallback(topSources);
  }

  if (Date.now() < geminiUnavailableUntil) {
    return buildCounsellingFallback(topSources);
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
      return buildCounsellingFallback(topSources);
    }

    if (isFallbackAnswer(answer) || answer.includes(ILMALINK_COUNSELLING_FALLBACK)) {
      return buildCounsellingFallback(topSources);
    }

    return {
      answer,
      confidence: topSources.length >= 3 ? "high" : "medium",
      dataAvailable: true,
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
    return buildCounsellingFallback(topSources);
  }
}
