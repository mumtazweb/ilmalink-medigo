import {
  globalSearchIndex,
  type GlobalSearchEntry,
} from "@/app/data/searchIndex";
import {
  mbbsIndiaColleges,
  mbbsIndiaCollegesByState,
} from "@/app/data/mbbsIndiaColleges";
import {
  getMBBSIndiaCollegeCounselling2025,
  getMBBSIndiaStateCounselling2025,
} from "@/app/data/mbbsIndiaCounselling";
import { getMBBSIndiaAdmissionAccess } from "@/app/data/mbbsIndiaAdmissionAccess";
import { navbarCountryDestinations } from "@/app/data/navbarDestinations";
import { kyrgyzstanUniversities } from "@/app/data/kyrgyzstanUniversities";
import { georgiaUniversities } from "@/app/data/georgiaUniversities";
import { bangladeshFeaturedUniversities } from "@/app/data/bangladeshUniversities";
import { fmgeCountries } from "@/app/data/fmgeData";
import {
  getFmgeCollegeDetailHref,
  getFmgeCountryHref,
  getMBBSIndiaCollegeHref,
  getMBBSIndiaStateHref,
} from "@/app/data/exploreLinks";
import {
  buildInternalSearchQueryProfile,
  classifyInternalSearchRecord,
  getInternalSearchRankingBoost,
  passesInternalSearchRegionFilter,
  type InternalSearchQueryProfile,
} from "@/lib/internalSearchRanking";

export type SearchConfidence = "high" | "medium" | "low";

export type SiteQuestionIntent =
  | "mbbs-india-cutoff"
  | "mbbs-india-state-counselling"
  | "seat-matrix-round-update"
  | "mbbs-india-college-search"
  | "mbbs-abroad-university-recommendation"
  | "mbbs-abroad-country-comparison"
  | "university-fee"
  | "accreditation-status"
  | "fmge-data"
  | "nmc-fmgl-rules"
  | "scholarship-loan"
  | "official-advisory"
  | "general-counselling";

export type SiteSearchDataType =
  | "Page"
  | "Page Section"
  | "Country Page"
  | "University"
  | "University Fee"
  | "Accreditation"
  | "MBBS India State"
  | "MBBS India College"
  | "FMGE Country"
  | "FMGE College"
  | "Official Advisory"
  | "Blog";

export type SiteSearchRecord = GlobalSearchEntry & {
  matchedDataType: SiteSearchDataType;
  sourceLabel: string;
  lastUpdated?: string | null;
  keyFacts?: string[];
  data?: Record<string, unknown>;
};

export type SiteSearchMatch = SiteSearchRecord & {
  score: number;
};

export type SuggestedSiteLink = {
  title: string;
  description: string;
  url: string;
  sourceLabel: string;
  dataType: SiteSearchDataType;
  lastUpdated?: string | null;
  details?: string[];
  whySuggested?: string;
};

export type CounsellingGreetingIntent =
  | "greeting"
  | "islamic-greeting"
  | "thanks";

export type CounsellingCollegeTypeIntent =
  | "Government"
  | "Private"
  | "Deemed";

export type CounsellingSearchIntent = {
  greeting: CounsellingGreetingIntent | null;
  region: "india" | "abroad" | "global";
  country?: string;
  state?: string;
  city?: string;
  collegeType?: CounsellingCollegeTypeIntent;
  course?: "MBBS" | "BDS";
  entity?: string;
  best: boolean;
  oldCollege: boolean;
  seatPreference: boolean;
  fmgePreference: boolean;
  ambiguousBest: boolean;
  directed: boolean;
  detectedFilters: string[];
};

export type SiteDataSearchResponse = {
  query: string;
  intent: SiteQuestionIntent;
  counsellingIntent: CounsellingSearchIntent;
  detectedFilters: string[];
  matchedItems: SiteSearchMatch[];
  matchedPages: SiteSearchMatch[];
  matchedDataType: SiteSearchDataType[];
  confidence: SearchConfidence;
  suggestedLinks: SuggestedSiteLink[];
  sourceLabels: string[];
  lastUpdated?: string | null;
};

const cityLabels: Record<string, string> = {
  Bengaluru: "Bengaluru",
  bengaluru: "Bengaluru",
  calcutta: "Kolkata",
  kolkata: "Kolkata",
};

const entityCountryAliases = [
  {
    entity: "Green Life Medical College and Hospital",
    country: "Bangladesh",
    aliases: ["green life", "green life medical college"],
  },
  {
    entity: "Jahurul Islam Medical College and Hospital",
    country: "Bangladesh",
    aliases: ["jahurul islam", "jahurul islam medical college"],
  },
  {
    entity: "ALTE University",
    country: "Georgia",
    aliases: ["alte", "alte university"],
  },
] as const;

function includesPhrase(text: string, phrase: string) {
  return ` ${text} `.includes(` ${normalizeSiteSearchText(phrase)} `);
}

function detectGreetingIntent(
  query: string
): CounsellingGreetingIntent | null {
  const raw = query.trim().toLowerCase();
  const normalized = normalizeSiteSearchText(query);

  if (
    ["assalamualaikum", "as salamu alaykum", "salam"].includes(normalized) ||
    raw === "السلام عليكم"
  ) {
    return "islamic-greeting";
  }

  if (["hi", "hello", "hey", "hii", "helo"].includes(normalized)) {
    return "greeting";
  }

  if (["thanks", "thank you"].includes(normalized)) {
    return "thanks";
  }

  return null;
}

export function detectCounsellingSearchIntent(
  query: string
): CounsellingSearchIntent {
  const normalized = normalizeSearchQueryWithCorrections(query);
  const profile = buildInternalSearchQueryProfile(query);
  const greeting = detectGreetingIntent(query);
  const localEntity = entityCountryAliases.find((item) =>
    item.aliases.some((alias) => includesPhrase(normalized, alias))
  );
  const country = profile.country ?? localEntity?.country;
  const entity = profile.entity?.canonicalName ?? localEntity?.entity;
  const best = includesPhrase(normalized, "best") ||
    includesPhrase(normalized, "recommended") ||
    includesPhrase(normalized, "suggest");
  const collegeType: CounsellingCollegeTypeIntent | undefined =
    includesPhrase(normalized, "private")
      ? "Private"
      : includesPhrase(normalized, "government") ||
          includesPhrase(normalized, "govt")
        ? "Government"
        : includesPhrase(normalized, "deemed")
          ? "Deemed"
          : undefined;
  const course = includesPhrase(normalized, "bds")
    ? "BDS"
    : includesPhrase(normalized, "mbbs")
      ? "MBBS"
      : undefined;
  const region = country
    ? "abroad"
    : profile.regionIntent === "india"
      ? "india"
      : profile.regionIntent === "abroad"
        ? "abroad"
        : "global";
  const asksForInstitution =
    profile.intents.college ||
    /\bcollege|university|institute|academy\b/.test(normalized);
  const ambiguousBest =
    best &&
    asksForInstitution &&
    !country &&
    !profile.state &&
    !profile.city &&
    region === "global";
  const explicitIndia =
    includesPhrase(normalized, "india") ||
    includesPhrase(normalized, "mbbs india") ||
    includesPhrase(normalized, "mbbs in india");
  const detectedFilters = greeting
    ? [
        greeting === "islamic-greeting"
          ? "Islamic greeting"
          : greeting === "thanks"
            ? "Thanks"
            : "Greeting",
      ]
    : [
        region === "india" ? "India" : undefined,
        country,
        profile.state,
        profile.city
          ? cityLabels[profile.city] ??
            profile.city.replace(/\b\w/g, (character) =>
              character.toUpperCase()
            )
          : undefined,
        collegeType,
        course,
        best
          ? /\bcollege|colleges\b/.test(normalized)
            ? "Best college"
            : country
              ? "Best university"
              : "Best college"
          : undefined,
        /\bold|oldest|legacy|established\b/.test(normalized)
          ? "Older institutions first"
          : undefined,
        /\bseat|seats|intake\b/.test(normalized)
          ? "Higher seat count"
          : undefined,
        /\bfmge|nbems|appeared|pass rate|passed\b/.test(normalized)
          ? "FMGE data"
          : undefined,
        entity,
      ].filter((value): value is string => Boolean(value));

  return {
    greeting,
    region,
    country,
    state: profile.state,
    city: profile.city,
    collegeType,
    course,
    entity,
    best,
    oldCollege: /\bold|oldest|legacy|established\b/.test(normalized),
    seatPreference: /\bseat|seats|intake\b/.test(normalized),
    fmgePreference: /\bfmge|nbems|appeared|pass rate|passed\b/.test(
      normalized
    ),
    ambiguousBest,
    directed: Boolean(
      greeting ||
        ambiguousBest ||
        country ||
        entity ||
        profile.state ||
        profile.city ||
        collegeType ||
        (region === "india" && (asksForInstitution || explicitIndia))
    ),
    detectedFilters: Array.from(new Set(detectedFilters)),
  };
}

const stopWords = new Set([
  "a",
  "about",
  "after",
  "all",
  "also",
  "am",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "best",
  "can",
  "could",
  "do",
  "does",
  "for",
  "from",
  "give",
  "has",
  "have",
  "help",
  "how",
  "i",
  "in",
  "is",
  "it",
  "latest",
  "me",
  "my",
  "get",
  "getting",
  "want",
  "will",
  "would",
  "should",
  "possible",
  "possibility",
  "chance",
  "chances",
  "marks",
  "mark",
  "of",
  "on",
  "or",
  "please",
  "question",
  "show",
  "specific",
  "tell",
  "the",
  "to",
  "unknown",
  "very",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "with",
]);

const synonymGroups = [
  ["cutoff", "cut", "off", "closing", "rank", "neet", "score"],
  ["fee", "fees", "cost", "tuition", "budget", "structure"],
  ["fmge", "nbems", "pass", "passed", "result", "performance", "appeared"],
  ["nmc", "fmgl", "wdoms", "internship", "licence", "license"],
  ["seat", "matrix", "allotment", "round", "mop", "stray"],
  ["counselling", "counseling", "quota", "domicile", "reporting"],
  ["accreditation", "recognition", "recommended", "verified"],
  ["advisory", "official", "embassy", "notice", "update"],
  ["college", "colleges", "university", "universities", "institute", "institution"],
];

const spellingAliases: Record<string, string> = {
  acadamy: "academy",
  accreditaton: "accreditation",
  accredition: "accreditation",
  admision: "admission",
  advicory: "advisory",
  advisary: "advisory",
  alloted: "allotted",
  allottment: "allotment",
  alredy: "already",
  aproval: "approval",
  aproved: "approved",
  atest: "latest",
  buget: "budget",
  collage: "college",
  colage: "college",
  colleg: "college",
  collge: "college",
  colloge: "college",
  counceling: "counselling",
  councling: "counselling",
  counselng: "counselling",
  counsiling: "counselling",
  cutof: "cutoff",
  cuttoff: "cutoff",
  domacile: "domicile",
  eligiblity: "eligibility",
  embasy: "embassy",
  fgme: "fmge",
  fmg: "fmge",
  fmgee: "fmge",
  hostelss: "hostel",
  institue: "institute",
  intarnship: "internship",
  kirgistan: "kyrgyzstan",
  kirgigystan: "kyrgyzstan",
  kirgizstan: "kyrgyzstan",
  kirgystan: "kyrgyzstan",
  kyrgistan: "kyrgyzstan",
  kyrgyzsthan: "kyrgyzstan",
  kyrgyztan: "kyrgyzstan",
  kyrgyzystan: "kyrgyzstan",
  licance: "licence",
  lisence: "license",
  mbb: "mbbs",
  mbbsindia: "mbbs",
  medicl: "medical",
  neetug: "neet",
  phillipines: "philippines",
  philipines: "philippines",
  recomend: "recommend",
  recomended: "recommended",
  russianfederation: "russian",
  scholorship: "scholarship",
  universitys: "universities",
  univercity: "university",
  unversity: "university",
  uzbakistan: "uzbekistan",
  uzbekstan: "uzbekistan",
};

const coreVocabulary = [
  "abroad",
  "academy",
  "accreditation",
  "admission",
  "advisory",
  "allotment",
  "appeared",
  "approval",
  "approved",
  "budget",
  "category",
  "college",
  "colleges",
  "counselling",
  "country",
  "cutoff",
  "domicile",
  "education",
  "eligibility",
  "criteria",
  "embassy",
  "fee",
  "fees",
  "fmge",
  "fmgl",
  "georgia",
  "government",
  "hostel",
  "india",
  "institute",
  "institution",
  "internship",
  "kyrgyzstan",
  "latest",
  "licence",
  "license",
  "matrix",
  "mbbs",
  "medical",
  "neet",
  "nmc",
  "private",
  "quota",
  "recognition",
  "recommended",
  "requirements",
  "reporting",
  "result",
  "round",
  "russia",
  "russian",
  "score",
  "seat",
  "state",
  "study",
  "tbilisi",
  "tuition",
  "university",
  "universities",
  "uzbekistan",
  "wdoms",
];

const neverCorrectTerms = new Set([
  "best",
  "better",
  "biggest",
  "compare",
  "good",
  "greater",
  "has",
  "highest",
  "large",
  "larger",
  "largest",
  "maximum",
  "most",
  "number",
  "student",
  "students",
  "top",
]);

const universityAliases: Record<string, string[]> = {
  "international-higher-school-of-medicine": [
    "IHSM",
    "International Higher School of Medicine",
  ],
  "kyrgyz-state-medical-academy": [
    "KSMA",
    "Kyrgyz State Medical Academy",
    "I K Akhunbaev Kyrgyz State Medical Academy",
  ],
  "east-european-university": [
    "EEU",
    "East European University",
    "East European University Georgia",
    "East European University Faculty of Healthcare Sciences",
  ],
};

export function normalizeSiteSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9%]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function baseTokenize(value: string) {
  return normalizeSiteSearchText(value)
    .split(" ")
    .filter((term) => term.length > 0);
}

let canonicalVocabularyCache: Set<string> | null = null;

function getCanonicalVocabulary() {
  if (canonicalVocabularyCache) return canonicalVocabularyCache;

  const vocabulary = new Set(coreVocabulary);

  for (const group of synonymGroups) {
    group.forEach((term) => vocabulary.add(term));
  }

  Object.values(spellingAliases).forEach((term) => vocabulary.add(term));

  for (const destination of navbarCountryDestinations) {
    baseTokenize(destination.label).forEach((term) => vocabulary.add(term));
  }

  for (const country of fmgeCountries) {
    baseTokenize(country.country).forEach((term) => vocabulary.add(term));
  }

  for (const group of mbbsIndiaCollegesByState) {
    baseTokenize(group.state).forEach((term) => vocabulary.add(term));
  }

  for (const university of kyrgyzstanUniversities) {
    baseTokenize(university.name).forEach((term) => vocabulary.add(term));
    baseTokenize(university.location).forEach((term) => vocabulary.add(term));
  }

  for (const university of georgiaUniversities) {
    baseTokenize(university.name).forEach((term) => vocabulary.add(term));
    baseTokenize(university.location).forEach((term) => vocabulary.add(term));
    baseTokenize(university.city).forEach((term) => vocabulary.add(term));
  }

  for (const aliases of Object.values(universityAliases)) {
    aliases.forEach((alias) =>
      baseTokenize(alias).forEach((term) => vocabulary.add(term))
    );
  }

  canonicalVocabularyCache = vocabulary;
  return vocabulary;
}

function levenshteinDistance(first: string, second: string) {
  if (first === second) return 0;
  if (!first.length) return second.length;
  if (!second.length) return first.length;

  const previous = Array.from({ length: second.length + 1 }, (_, index) => index);
  const current = new Array<number>(second.length + 1);

  for (let i = 1; i <= first.length; i += 1) {
    current[0] = i;

    for (let j = 1; j <= second.length; j += 1) {
      const cost = first[i - 1] === second[j - 1] ? 0 : 1;
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost
      );
    }

    for (let j = 0; j <= second.length; j += 1) {
      previous[j] = current[j];
    }
  }

  return previous[second.length];
}

function maxCorrectionDistance(term: string) {
  if (term.length <= 3) return 0;
  if (term.length <= 5) return 1;
  if (term.length <= 8) return 2;
  return 3;
}

function correctSearchToken(term: string) {
  const aliased = spellingAliases[term];
  if (aliased) return aliased;

  const vocabulary = getCanonicalVocabulary();
  if (
    neverCorrectTerms.has(term) ||
    stopWords.has(term) ||
    vocabulary.has(term) ||
    term.length <= 3
  ) {
    return term;
  }

  let bestTerm = term;
  let bestDistance = Number.POSITIVE_INFINITY;
  const allowedDistance = maxCorrectionDistance(term);

  for (const candidate of vocabulary) {
    if (Math.abs(candidate.length - term.length) > allowedDistance) continue;

    const distance = levenshteinDistance(term, candidate);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestTerm = candidate;
    }
  }

  return bestDistance <= allowedDistance ? bestTerm : term;
}

function tokenize(value: string) {
  return baseTokenize(value).map(correctSearchToken);
}

export function normalizeSearchQueryWithCorrections(value: string) {
  return tokenize(value).join(" ");
}

function slugify(value: string) {
  return normalizeSiteSearchText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getImportantQueryTerms(query: string) {
  const normalizedQuery = normalizeSearchQueryWithCorrections(query);
  const terms = new Set(
    tokenize(query).filter(
      (term) =>
        term.length > 1 &&
        !stopWords.has(term) &&
        !/^\d[\d,]*$/.test(term)
    )
  );

  for (const group of synonymGroups) {
    if (group.some((term) => normalizedQuery.includes(term))) {
      group.forEach((term) => terms.add(term));
    }
  }

  if (/\bksma\b/i.test(query)) {
    tokenize("kyrgyz state medical academy").forEach((term) =>
      terms.add(term)
    );
  }

  if (/\bihsm\b/i.test(query)) {
    tokenize("international higher school medicine").forEach((term) =>
      terms.add(term)
    );
  }

  if (/\beeu\b/i.test(query)) {
    tokenize("east european university georgia tbilisi").forEach((term) =>
      terms.add(term)
    );
  }

  return Array.from(terms);
}

export function detectSiteQuestionIntent(
  query: string
): SiteQuestionIntent {
  const text = normalizeSearchQueryWithCorrections(query);
  const profile = buildInternalSearchQueryProfile(query);
  const hasNumericValue = /\b\d{2,7}\b/.test(text);

  if (
    text.includes("cutoff") ||
    text.includes("cut off") ||
    text.includes("lowest cutoff") ||
    text.includes("closing rank")
  ) {
    return "mbbs-india-cutoff";
  }

  if (
    text.includes("seat matrix") ||
    text.includes("allotment") ||
    text.includes("mop up") ||
    text.includes("stray vacancy") ||
    /\bround [1-4]\b/.test(text)
  ) {
    return "seat-matrix-round-update";
  }

  if (
    text.includes("fee") ||
    text.includes("fees") ||
    text.includes("tuition") ||
    text.includes("cost") ||
    text.includes("budget")
  ) {
    return "university-fee";
  }

  if (
    hasNumericValue &&
    (text.includes("neet") ||
      text.includes("score") ||
      text.includes("rank") ||
      text.includes("mark") ||
      text.includes("college") ||
      text.includes("kpc"))
  ) {
    return "mbbs-india-cutoff";
  }

  if (
    text.includes("accredit") ||
    text.includes("recognition") ||
    text.includes("recommended") ||
    text.includes("verify")
  ) {
    return "accreditation-status";
  }

  if (
    text.includes("fmge") ||
    text.includes("nbems") ||
    text.includes("appeared") ||
    text.includes("has most") ||
    text.includes("highest number") ||
    text.includes("most number") ||
    text.includes("pass rate") ||
    text.includes("better result")
  ) {
    return "fmge-data";
  }

  if (
    text.includes("nmc") ||
    text.includes("fmgl") ||
    text.includes("wdoms") ||
    text.includes("internship") ||
    text.includes("english medium") ||
    text.includes("licence") ||
    text.includes("license")
  ) {
    return "nmc-fmgl-rules";
  }

  if (
    text.includes("advisory") ||
    text.includes("embassy") ||
    text.includes("official update") ||
    text.includes("notice")
  ) {
    return "official-advisory";
  }

  if (
    text.includes("counselling") ||
    text.includes("counseling") ||
    text.includes("domicile") ||
    text.includes("quota")
  ) {
    return "mbbs-india-state-counselling";
  }

  if (profile.intents.scholarship) {
    return "scholarship-loan";
  }

  if (
    profile.regionIntent === "india" &&
    (profile.intents.college ||
      profile.intents.course ||
      text.includes("mbbs"))
  ) {
    return "mbbs-india-college-search";
  }

  if (
    (text.includes("best") ||
      text.includes("recommend") ||
      text.includes("suitable") ||
      text.includes("for me")) &&
    (text.includes("college") ||
      text.includes("university") ||
      text.includes("institute") ||
      text.includes("mbbs abroad"))
  ) {
    return "mbbs-abroad-university-recommendation";
  }

  if (
    text.includes("private college") ||
    text.includes("government college") ||
    text.includes("medical college")
  ) {
    return "mbbs-india-college-search";
  }

  if (
    text.includes("country") ||
    text.includes("countries") ||
    text.includes("compare") ||
    text.includes("abroad") ||
    text.includes("better")
  ) {
    return "mbbs-abroad-country-comparison";
  }

  return "general-counselling";
}

function createRecord(
  entry: GlobalSearchEntry,
  matchedDataType: SiteSearchDataType,
  sourceLabel: string,
  extra?: Partial<SiteSearchRecord>
): SiteSearchRecord {
  return {
    ...entry,
    matchedDataType,
    sourceLabel,
    ...extra,
  };
}

function getCountryAliases(country: string) {
  if (country === "RUSSIAN FEDERATION") return ["Russia"];
  if (country === "UNITED ARAB EMIRATES") return ["UAE", "Dubai"];
  if (country === "UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND") {
    return ["United Kingdom", "UK"];
  }

  return [];
}

function summarizeFmgePerformance(
  performance:
    | {
        appeared: number;
        passed: number;
        passRate: string;
      }[]
    | undefined
) {
  if (!performance?.length) {
    return {
      appeared: 0,
      passed: 0,
      passRate: 0,
    };
  }

  const appeared = performance.reduce(
    (total, item) => total + item.appeared,
    0
  );
  const passed = performance.reduce(
    (total, item) => total + item.passed,
    0
  );

  return {
    appeared,
    passed,
    passRate: appeared > 0 ? (passed / appeared) * 100 : 0,
  };
}

function countAvailableValues(values: unknown[]) {
  return values.reduce<number>(
    (count, value) =>
      count +
      (Array.isArray(value)
        ? value.length > 0
          ? 1
          : 0
        : value !== undefined && value !== null && value !== ""
          ? 1
          : 0),
    0
  );
}

function buildBaseRecords() {
  const records: SiteSearchRecord[] = [
    createRecord(
      {
        id: "ask-mbbs-india-directory",
        title: "Study MBBS in India - Full NMC Medical College List",
        description:
          "State-wise MBBS India directory with government/private college counts, seats, access guidance, and college anchors.",
        url: "/mbbs-india/",
        category: "MBBS India",
        group: "Pages",
        type: "page",
        tags: [
          "MBBS India",
          "NMC college list",
          "medical colleges",
          "cutoff",
          "state counselling",
          "private MBBS",
        ],
        content:
          "MBBS India colleges NMC medical college list state counselling cutoff closing rank government private seats quota domicile fees admission 2025 prior-year data 5.5 year course 4.5 year academic study 1 year internship NEET 180 questions 720 marks Physics Chemistry Biology",
        priority: 105,
      },
      "Page",
      "ILMALINK MBBS India dataset"
    ),
    createRecord(
      {
        id: "ask-neet-rank-predictor",
        title: "NEET Rank Predictor and MBBS India College Options",
        description:
          "Convert NEET marks into an estimated rank range, then compare with previous-year counselling cutoff ranks for MBBS India colleges.",
        url: "/?rank-predictor=open",
        category: "MBBS India",
        group: "Pages",
        type: "page",
        tags: [
          "NEET rank predictor",
          "marks to rank",
          "MBBS India college predictor",
          "NEET counselling",
          "closing rank",
          "cutoff",
        ],
        content:
          "NEET marks score rank predictor MBBS India college options government private medical college counselling cutoff closing rank category quota state domicile AIQ MCC",
        priority: 125,
      },
      "Page",
      "ILMALINK NEET rank predictor",
      {
        data: {
          kind: "rank-predictor",
          country: "India",
        },
      }
    ),
    ...navbarCountryDestinations.map((destination) =>
      createRecord(
        {
          id: `ask-country-${slugify(destination.label)}`,
          title: `Study MBBS in ${destination.label}`,
          description: destination.insight,
          url: destination.href,
          category: "MBBS Abroad",
          group: "Destinations",
          type: "destination",
          tags: [
            destination.label,
            "MBBS Abroad",
            "country comparison",
            "fees",
            "FMGE",
            "admission",
          ],
          content: [
            destination.label,
            destination.insight,
            "MBBS abroad country comparison fees universities admission FMGE NMC FMGL",
          ].join(" "),
          priority: destination.badge === "Top" ? 101 : 96,
        },
        "Country Page",
        "ILMALINK destination pages",
        {
          data: {
            kind: "country-page",
            country: destination.label,
          },
        }
      )
    ),
  ];

  bangladeshFeaturedUniversities.forEach((university, index) => {
    records.push(
      createRecord(
        {
          id: `ask-bangladesh-university-${slugify(university.name)}`,
          title: university.name,
          description: `${university.city}, Bangladesh. ${university.summary}`,
          url: `/mbbs-abroad/bangladesh?q=${encodeURIComponent(
            university.name
          )}#bangladesh-universities`,
          category: "Bangladesh Universities",
          group: "Destinations",
          type: "destination",
          tags: [
            "Bangladesh",
            "MBBS in Bangladesh",
            university.name,
            university.city,
            "private medical college",
            "FMGE",
          ],
          content: [
            university.name,
            university.city,
            university.fees,
            university.summary,
            `${university.fmge.appeared} appeared`,
            `${university.fmge.passed} passed`,
            `${university.fmge.passRate} pass rate`,
            "Bangladesh MBBS private medical college FMGE admission fees",
          ].join(" "),
          priority: 104 - index,
        },
        "University",
        "ILMALINK Bangladesh university data",
        {
          keyFacts: [
            "Private medical college",
            `${university.city}, Bangladesh`,
            `${university.fmge.appeared?.toLocaleString("en-IN") ?? "Verify separately"} FMGE appeared`,
`${university.fmge.passed?.toLocaleString("en-IN") ?? "Verify separately"} FMGE passed`,
            `${university.fmge.passRate} pass rate`,
          ],
          data: {
            kind: "bangladesh-university",
            country: "Bangladesh",
            city: university.city,
            institutionType: "Private medical college",
            fees: university.fees,
            appeared: university.fmge.appeared,
            passed: university.fmge.passed,
            passRate: university.fmge.passRate,
            featured: true,
            projectOrder: index,
            pageExists: false,
            dataCompleteness: countAvailableValues([
              university.city,
              university.fees,
              university.summary,
              university.fmge,
            ]),
          },
        }
      )
    );
  });

  for (const group of mbbsIndiaCollegesByState) {
    const access = getMBBSIndiaAdmissionAccess(
      group.state,
      group.privateCount
    );
    const counselling = getMBBSIndiaStateCounselling2025(group.state);
    const counsellingSummary = counselling
      ? `${counselling.seatMatrix.length} seat matrix rows and ${counselling.cutoffs.length} cutoff colleges for 2025`
      : "";

    records.push(
      createRecord(
        {
          id: `ask-mbbs-india-state-${slugify(group.state)}`,
          title: `MBBS Colleges in ${group.state}`,
          description: `${access.label}: ${group.privateCount} private, ${group.governmentCount} government, and ${group.totalSeats.toLocaleString(
            "en-IN"
          )} MBBS seats in ${group.state}.`,
          url: getMBBSIndiaStateHref(group.state),
          category: "MBBS India",
          group: "Pages",
          type: "page",
          tags: [
            group.state,
            access.label,
            "MBBS India",
            "state counselling",
            "cutoff",
            "seat matrix",
            "private MBBS",
            ...(counselling
              ? ["2025 counselling", "closing score", "closing rank"]
              : []),
          ],
          content: [
            group.state,
            `${group.totalSeats} seats`,
            `${group.governmentCount} government colleges`,
            `${group.privateCount} private colleges`,
            access.detail,
            access.sourceLabel,
            counsellingSummary,
            counselling?.stateFacts
              ? `${counselling.stateFacts.governmentStateQuotaPercent}% government state quota ${counselling.stateFacts.privateStateQuotaPercent}% private state quota management quota all India`
              : "",
            "cutoff closing rank quota domicile counselling seat matrix fees",
            ...group.governmentColleges.map(
              (college) => college.collegeName
            ),
            ...group.privateColleges.map(
              (college) => college.collegeName
            ),
          ].join(" "),
          priority: access.status === "open" ? 99 : 94,
        },
        "MBBS India State",
        access.sourceLabel,
        {
          keyFacts: [
            `${group.totalSeats.toLocaleString("en-IN")} MBBS seats`,
            `${group.governmentCount} government colleges`,
            `${group.privateCount} private colleges`,
            access.label,
            ...(counselling
              ? [
                  `${counselling.seatMatrix.length} 2025 seat-matrix rows`,
                  `${counselling.cutoffs.length} colleges with 2025 cutoff data`,
                ]
              : []),
          ],
          data: {
            kind: "mbbs-india-state",
            state: group.state,
            governmentCount: group.governmentCount,
            privateCount: group.privateCount,
            totalSeats: group.totalSeats,
            accessLabel: access.label,
            accessDetail: access.detail,
            counselling2025: counselling,
          },
        }
      )
    );
  }

  for (const college of mbbsIndiaColleges) {
    const access = getMBBSIndiaAdmissionAccess(college.state);
    const counselling = getMBBSIndiaCollegeCounselling2025(
      college.collegeName
    );
    const seatMatrixText =
      counselling?.seatMatrix
        .map(
          (row) =>
            `${row.quota} total ${row.totalSeats ?? "unavailable"} ${Object.entries(
              row.categorySeats
            )
              .map(
                ([category, seats]) =>
                  `${category} ${seats ?? "unavailable"}`
              )
              .join(" ")}`
        )
        .join(" ") ?? "";
    const cutoffText =
      counselling?.cutoff?.categories
        .map(
          (row) =>
            `${row.category} round 1 score ${row.round1Score ?? "unavailable"} rank ${row.round1Rank ?? "unavailable"} round 2 score ${row.round2Score ?? "unavailable"} rank ${row.round2Rank ?? "unavailable"} round 3 score ${row.round3Score ?? "unavailable"} rank ${row.round3Rank ?? "unavailable"} stray score ${row.strayScore ?? "unavailable"} rank ${row.strayRank ?? "unavailable"}`
        )
        .join(" ") ?? "";

    records.push(
      createRecord(
        {
          id: `ask-mbbs-india-college-${slugify(
            `${college.state}-${college.collegeName}`
          )}`,
          title: college.collegeName,
          description: `${college.category} medical college in ${college.state} with ${college.seatCapacity.toLocaleString(
            "en-IN"
          )} MBBS seats. ${access.label}.`,
          url: getMBBSIndiaCollegeHref(college),
          category: "MBBS India",
          group: "Pages",
          type: "page",
          tags: [
            college.state,
            college.category,
            "MBBS India",
            "medical college",
            "cutoff",
            "fees",
            ...(counselling
              ? ["2025 counselling", "seat matrix", "closing rank"]
              : []),
          ],
          content: [
            college.collegeName,
            college.state,
            college.category,
            `${college.seatCapacity} seats`,
            `established ${college.establishmentYear}`,
            access.detail,
            seatMatrixText,
            cutoffText,
            "cutoff closing rank counselling quota domicile fees admission",
          ].join(" "),
          priority: college.category === "Private" ? 95 : 92,
        },
        "MBBS India College",
        "ILMALINK MBBS India college data",
        {
          keyFacts: [
            `${college.category} college`,
            `${college.seatCapacity.toLocaleString("en-IN")} MBBS seats`,
            `State: ${college.state}`,
            ...(counselling
              ? [
                  `${counselling.seatMatrix.length} seat-matrix row(s)`,
                  counselling.cutoff
                    ? `${counselling.cutoff.categories.length} cutoff category/quota rows`
                    : "No cutoff row",
                ]
              : []),
          ],
          data: {
            kind: "mbbs-india-college",
            country: "India",
            state: college.state,
            category: college.category,
            institutionType: /deemed/i.test(college.collegeName)
              ? "Deemed"
              : college.category,
            seatCapacity: college.seatCapacity,
            establishmentYear: college.establishmentYear,
            fees: college.fees,
            counselling2025: counselling,
            dataCompleteness: countAvailableValues([
              college.state,
              college.category,
              college.seatCapacity,
              college.establishmentYear,
              college.fees !== "To be updated" ? college.fees : undefined,
              counselling,
            ]),
          },
        }
      )
    );
  }

  for (const [projectOrder, university] of kyrgyzstanUniversities.entries()) {
    const aliases = universityAliases[university.slug] ?? [];
    const firstFee = university.feeRows[0];
    const fmgeStats = summarizeFmgePerformance(
      university.fmgePerformance
    );
    const fmgeSummary = university.fmgePerformance
      ?.map(
        (item) =>
          `${item.sourceName}: ${item.appeared} appeared, ${item.passed} passed, ${item.passRate} pass rate`
      )
      .join(" ");

    records.push(
      createRecord(
        {
          id: `ask-kyrgyz-university-${university.slug}`,
          title: university.name,
          description: `${university.recommendationLevel}: ${university.accreditationLabel}.`,
          url: university.pageExists
            ? `/mbbs-abroad/kyrgyzstan/${university.slug}/`
            : "/",
          category: "Kyrgyzstan Universities",
          group: "Destinations",
          type: "destination",
          tags: [
            "Kyrgyzstan",
            "MBBS in Kyrgyzstan",
            university.name,
            university.location,
            university.recommendationLevel,
            university.accreditationLabel,
            ...aliases,
          ],
          content: [
            university.name,
            ...aliases,
            university.location,
            university.program,
            university.intake,
            university.accreditationStatus,
            university.recommendationLevel,
            university.recommendationMessage,
            firstFee
              ? `${firstFee.year} ${firstFee.semester} tuition ${firstFee.tuitionFee} hostel ${firstFee.hostelAccommodation} mess ${firstFee.mess} total ${firstFee.totalCost}`
              : "",
            ...university.feeRows.map(
              (row) =>
                `${row.year} ${row.semester} tuition ${row.tuitionFee} hostel ${row.hostelAccommodation} mess ${row.mess} total ${row.totalCost}`
            ),
            ...university.highlights,
            ...university.feeNotes,
            fmgeSummary ?? "",
            "fees cost tuition accreditation recognition recommended NMC FMGL WDOMS internship English medium hostel admission",
          ].join(" "),
          priority: university.pageExists ? 106 : 91,
        },
        university.feeRows.some(
          (row) => row.totalCost !== "To be updated"
        )
          ? "University Fee"
          : "Accreditation",
        "ILMALINK Kyrgyzstan university data",
        {
          keyFacts: [
            university.recommendationLevel,
            university.accreditationLabel,
            firstFee
              ? `First listed total: ${firstFee.totalCost}`
              : "Fees to be verified",
          ].filter(Boolean),
          data: {
            kind: "kyrgyz-university",
            country: "Kyrgyzstan",
            slug: university.slug,
            name: university.name,
            location: university.location,
            institutionType: "University",
            accreditationLabel: university.accreditationLabel,
            recommendationLevel: university.recommendationLevel,
            recommendationMessage: university.recommendationMessage,
            feeRows: university.feeRows,
            feeNotes: university.feeNotes,
            fmgePerformance: university.fmgePerformance,
            appeared: fmgeStats.appeared,
            passed: fmgeStats.passed,
            passRate: `${fmgeStats.passRate.toFixed(2)}%`,
            pageExists: Boolean(university.pageExists),
            projectOrder,
            dataCompleteness: countAvailableValues([
              university.location,
              university.program,
              university.accreditationLabel,
              university.recommendationLevel,
              university.feeRows,
              university.fmgePerformance,
              university.highlights,
              university.entryRequirements,
            ]),
          },
        }
      )
    );
  }

  for (const [projectOrder, university] of georgiaUniversities.entries()) {
    const aliases = universityAliases[university.slug] ?? [];
    const firstFee = university.feeRows[0];
    const fmgeStats = summarizeFmgePerformance(
      university.fmgePerformance
    );
    const fmgeSummary = university.fmgePerformance
      ?.map(
        (item) =>
          `${item.sourceName}: ${item.appeared} appeared, ${item.passed} passed, ${item.passRate} pass rate`
      )
      .join(" ");
    const url = university.pageExists
      ? `/mbbs-abroad/georgia/${university.slug}/`
      : `/mbbs-abroad/georgia?q=${encodeURIComponent(university.name)}#georgia-universities`;

    records.push(
      createRecord(
        {
          id: `ask-georgia-university-${university.slug}`,
          title: university.name,
          description: `${university.recommendationLabel}: ${university.feeSummary}`,
          url,
          category: "Georgia Universities",
          group: "Destinations",
          type: "destination",
          tags: [
            "Georgia",
            "MBBS in Georgia",
            "Tbilisi",
            university.name,
            university.shortName ?? "",
            university.location,
            university.recommendationLabel,
            university.accreditationLabel,
            ...aliases,
          ].filter(Boolean),
          content: [
            university.name,
            university.shortName ?? "",
            ...aliases,
            university.city,
            university.location,
            university.program,
            university.intake,
            university.duration,
            university.medium,
            university.feeSummary,
            university.totalTuition ?? "",
            university.annualTuition ?? "",
            university.mandatoryHostelMess ?? "",
            university.livingCost ?? "",
            university.accreditationLabel,
            university.recommendationLabel,
            university.summary,
            firstFee
              ? `${firstFee.year} ${firstFee.semester} tuition ${firstFee.tuitionFee} hostel ${firstFee.hostelAndMess} total ${firstFee.semesterTotal}`
              : "",
            ...university.feeRows.map(
              (row) =>
                `${row.year} ${row.semester} tuition ${row.tuitionFee} hostel mess ${row.hostelAndMess} total ${row.semesterTotal}`
            ),
            ...university.additionalFees.map(
              (fee) => `${fee.label} ${fee.amount} ${fee.note ?? ""}`
            ),
            ...university.highlights,
            ...university.feeNotes,
            ...university.entryRequirements,
            ...university.documentChecklist,
            ...university.facilities,
            fmgeSummary ?? "",
            "fees cost tuition hostel mess admission documents FMGE NMC FMGL WDOMS Georgia Tbilisi East European University EEU",
          ].join(" "),
          priority: university.pageExists ? 107 : 93,
        },
        university.feeRows.length ? "University Fee" : "University",
        "ILMALINK Georgia university data",
        {
          keyFacts: [
            university.recommendationLabel,
            university.accreditationLabel,
            university.totalTuition
              ? `Total tuition: ${university.totalTuition}`
              : university.feeSummary,
            fmgeSummary ? "FMGE 2025 reference available" : undefined,
          ].filter(Boolean) as string[],
          data: {
            kind: "georgia-university",
            country: "Georgia",
            slug: university.slug,
            name: university.name,
            city: university.city,
            location: university.location,
            institutionType: "University",
            recommendationLabel: university.recommendationLabel,
            feeSummary: university.feeSummary,
            feeRows: university.feeRows,
            feeNotes: university.feeNotes,
            fmgePerformance: university.fmgePerformance,
            appeared: fmgeStats.appeared,
            passed: fmgeStats.passed,
            passRate: `${fmgeStats.passRate.toFixed(2)}%`,
            pageExists: Boolean(university.pageExists),
            projectOrder,
            dataCompleteness: countAvailableValues([
              university.city,
              university.program,
              university.duration,
              university.medium,
              university.feeSummary,
              university.accreditationLabel,
              university.recommendationLabel,
              university.fmgePerformance,
              university.highlights,
              university.entryRequirements,
            ]),
          },
        }
      )
    );
  }

  for (const country of fmgeCountries) {
    const countryAliases = getCountryAliases(country.country);

    records.push(
      createRecord(
        {
          id: `ask-fmge-country-${slugify(country.country)}`,
          title: `${country.country} FMGE Data`,
          description: `${country.appeared.toLocaleString(
            "en-IN"
          )} appeared, ${country.passed.toLocaleString(
            "en-IN"
          )} passed, ${country.passRate} pass rate.`,
          url: getFmgeCountryHref(country.country),
          category: "FMGE Data",
          group: "Destinations",
          type: "destination",
          tags: [
            country.country,
            ...countryAliases,
            "MBBS Abroad",
            "best country",
            "FMGE",
            "NBEMS",
            "country-wise FMGE",
            "appeared",
            "pass rate",
          ],
          content: [
            country.country,
            ...countryAliases,
            country.appeared,
            country.passed,
            country.passRate,
            "MBBS abroad best country study FMGE NBEMS country wise institute wise appeared pass rate better result comparison",
            ...country.colleges.map((college) => college.name),
          ].join(" "),
          priority: 94,
        },
        "FMGE Country",
        "ILMALINK FMGE data",
        {
          keyFacts: [
            `${country.appeared.toLocaleString("en-IN")} appeared`,
            `${country.passed.toLocaleString("en-IN")} passed`,
            `${country.passRate} pass rate`,
          ],
          data: {
            kind: "fmge-country",
            country: country.country,
            appeared: country.appeared,
            passed: country.passed,
            passRate: country.passRate,
          },
        }
      )
    );

    for (const college of country.colleges) {
      records.push(
        createRecord(
          {
            id: `ask-fmge-college-${slugify(
              `${country.country}-${college.name}`
            )}`,
            title: college.name,
            description: `${country.country} FMGE: ${college.appeared.toLocaleString(
              "en-IN"
            )} appeared, ${college.passed.toLocaleString(
              "en-IN"
            )} passed, ${college.passRate} pass rate.`,
            url:
              getFmgeCollegeDetailHref(country.country, college.name) ??
              getFmgeCountryHref(country.country),
            category: "FMGE Data",
            group: "Destinations",
            type: "destination",
            tags: [
              country.country,
              ...countryAliases,
              college.name,
              "MBBS Abroad",
              "FMGE",
              "NBEMS",
              "college-wise FMGE",
              "appeared",
            ],
            content: [
              college.name,
              country.country,
              ...countryAliases,
              college.appeared,
              college.passed,
              college.passRate,
              "MBBS abroad college university most appeared number FMGE NBEMS institute wise pass rate result",
            ].join(" "),
            priority: 90,
          },
          "FMGE College",
          "ILMALINK FMGE data",
          {
            keyFacts: [
              `${college.appeared.toLocaleString("en-IN")} appeared`,
              `${college.passed.toLocaleString("en-IN")} passed`,
              `${college.passRate} pass rate`,
            ],
            data: {
              kind: "fmge-college",
              country: country.country,
              college: college.name,
              appeared: college.appeared,
              passed: college.passed,
              passRate: college.passRate,
            },
          }
        )
      );
    }
  }

  for (const entry of globalSearchIndex) {
    const dataType: SiteSearchDataType =
      entry.subType === "section"
        ? "Page Section"
        : entry.group === "Blogs"
        ? "Blog"
        : entry.category === "FMGE Data"
          ? "FMGE Country"
          : entry.group === "Destinations"
            ? "Country Page"
            : "Page";

    records.push(
      createRecord(
        entry,
        dataType,
        entry.subType === "section"
          ? "ILMALINK MEDIGO page section"
          : "ILMALINK MEDIGO website data",
        entry.subType === "section"
          ? {
              keyFacts: ["Specific page section", `Open: ${entry.url}`],
              data: {
                kind: "page-section",
              },
            }
          : undefined
      )
    );
  }

  return records;
}

function getSearchableText(record: SiteSearchRecord) {
  return normalizeSiteSearchText(
    [
      record.title,
      record.description,
      record.category,
      record.group,
      record.type,
      record.tags.join(" "),
      record.content,
      record.url,
      record.matchedDataType,
      record.sourceLabel,
      record.keyFacts?.join(" ") ?? "",
    ].join(" ")
  );
}

function scoreRecord(
  record: SiteSearchRecord,
  normalizedQuery: string,
  queryTerms: string[],
  intent: SiteQuestionIntent,
  profile: InternalSearchQueryProfile
) {
  const searchableText = getSearchableText(record);
  const classification = classifyInternalSearchRecord(record);

  if (!passesInternalSearchRegionFilter(profile, classification)) {
    return 0;
  }

  const title = normalizeSiteSearchText(record.title);
  const description = normalizeSiteSearchText(record.description);
  const tags = normalizeSiteSearchText(record.tags.join(" "));
  const content = normalizeSiteSearchText(record.content);
  const matchedTerms = queryTerms.filter((term) =>
    searchableText.includes(term)
  );
  const requiredMatches =
    queryTerms.length <= 2
      ? queryTerms.length
      : queryTerms.length <= 4
        ? Math.min(3, queryTerms.length)
        : Math.ceil(queryTerms.length * 0.45);

  if (queryTerms.length > 0 && matchedTerms.length < requiredMatches) {
    return 0;
  }

  let score =
    record.priority +
    matchedTerms.length * 18 +
    getInternalSearchRankingBoost(
      profile,
      classification,
      record,
      searchableText
    );

  if (title === normalizedQuery) score += 520;
  if (title.includes(normalizedQuery)) score += 220;
  if (tags.includes(normalizedQuery)) score += 160;
  if (description.includes(normalizedQuery)) score += 90;
  if (content.includes(normalizedQuery)) score += 35;

  for (const term of queryTerms) {
    if (title.split(" ").includes(term)) score += 95;
    else if (title.includes(term)) score += 60;

    if (tags.includes(term)) score += 38;
    if (description.includes(term)) score += 28;
    if (content.includes(term)) score += 10;
  }

  const queryAsksFmge =
    normalizedQuery.includes("fmge") ||
    normalizedQuery.includes("nbems") ||
    normalizedQuery.includes("appeared") ||
    normalizedQuery.includes("pass rate") ||
    normalizedQuery.includes("result");
  const queryWantsVolumeRanking =
    normalizedQuery.includes("most appeared") ||
    normalizedQuery.includes("highest appeared") ||
    normalizedQuery.includes("maximum appeared") ||
    normalizedQuery.includes("most number") ||
    normalizedQuery.includes("highest number") ||
    normalizedQuery.includes("largest number") ||
    normalizedQuery.includes("has most") ||
    normalizedQuery.includes("most student") ||
    normalizedQuery.includes("highest student") ||
    normalizedQuery.includes("best country") ||
    normalizedQuery.includes("best countries") ||
    normalizedQuery.includes("best college") ||
    normalizedQuery.includes("best university");
  const queryAsksCollege =
    normalizedQuery.includes("college") ||
    normalizedQuery.includes("university") ||
    normalizedQuery.includes("institute") ||
    normalizedQuery.includes("institution");
  const queryAsksCountry =
    normalizedQuery.includes("country") ||
    normalizedQuery.includes("countries") ||
    normalizedQuery.includes("abroad");

  if (
    !queryAsksFmge &&
    !queryWantsVolumeRanking &&
    (record.data?.kind === "fmge-country" ||
      record.data?.kind === "fmge-college")
  ) {
    score -= 180;
  }

  if (
    intent === "mbbs-india-cutoff" &&
    record.data?.kind === "mbbs-india-college"
  ) {
    score += 320;

    if (record.data.counselling2025) {
      score += 260;
    }
  }

  if (
    intent === "mbbs-india-cutoff" &&
    record.data?.kind === "mbbs-india-state"
  ) {
    score -= 120;
  }

  if (
    intent === "university-fee" &&
    ["mbbs-india-college", "kyrgyz-university", "georgia-university"].includes(
      String(record.data?.kind)
    )
  ) {
    score += 260;
  }

  if (
    queryWantsVolumeRanking &&
    record.data?.kind === "fmge-country" &&
    !queryAsksCollege
  ) {
    const appeared =
      typeof record.data.appeared === "number" ? record.data.appeared : 0;

    score += Math.min(appeared / 2, 7000);
  }

  if (
    queryWantsVolumeRanking &&
    record.data?.kind === "fmge-college" &&
    queryAsksCollege
  ) {
    const appeared =
      typeof record.data.appeared === "number" ? record.data.appeared : 0;

    score += Math.min(appeared, 6000);
  }

  if (queryAsksCollege && record.data?.kind === "fmge-country") {
    score -= 260;
  }

  if (queryAsksCountry && record.data?.kind === "fmge-college") {
    score -= 260;
  }

  if (
    (intent === "fmge-data" ||
      intent === "mbbs-abroad-country-comparison") &&
    record.data?.kind === "fmge-country"
  ) {
    const appeared =
      typeof record.data.appeared === "number" ? record.data.appeared : 0;
    const passRate =
      typeof record.data.passRate === "string"
        ? Number.parseFloat(record.data.passRate)
        : 0;

    if (appeared >= 1000) score += passRate * 6 + 80;
    else if (appeared >= 100) score += passRate * 5 + 50;
    else if (appeared >= 20) score += passRate * 3 + 10;
    else score += passRate * 0.5;
  }

  return score;
}

function getRecordKind(record: SiteSearchRecord) {
  return typeof record.data?.kind === "string" ? record.data.kind : "";
}

function getRecordString(record: SiteSearchRecord, key: string) {
  const value = record.data?.[key];
  return typeof value === "string" ? value : undefined;
}

function getRecordNumber(record: SiteSearchRecord, key: string) {
  const value = record.data?.[key];
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}

function getPassRateNumber(record: SiteSearchRecord) {
  const value = record.data?.passRate;

  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function matchesCity(record: SiteSearchRecord, city: string) {
  const normalizedTitle = normalizeSiteSearchText(record.title);
  const cityOptions =
    city === "kolkata" || city === "calcutta"
      ? ["kolkata", "calcutta"]
      : city === "bengaluru" || city === "Bengaluru"
        ? ["bengaluru", "Bengaluru"]
        : [city];

  return cityOptions.some((option) =>
    includesPhrase(normalizedTitle, option)
  );
}

function matchesEntity(record: SiteSearchRecord, entity: string) {
  const title = normalizeSiteSearchText(record.title);
  const aliases: Record<string, string[]> = {
    "kyrgyz state medical academy": [
      "kyrgyz state medical academy",
      "i k akhunbaev kyrgyz state medical academy",
    ],
    "international higher school of medicine": [
      "international higher school of medicine",
    ],
    "east european university": ["east european university"],
    "georgian american university": ["georgian american university"],
    "tbilisi state medical university": [
      "tbilisi state medical university",
    ],
    "green life medical college and hospital": [
      "green life medical college",
    ],
    "jahurul islam medical college and hospital": [
      "jahurul islam medical college",
    ],
    "alte university": ["alte university"],
  };
  const normalizedEntity = normalizeSiteSearchText(entity);

  return (aliases[normalizedEntity] ?? [normalizedEntity]).some((alias) =>
    title.includes(alias)
  );
}

function filterCounsellingRecords(
  records: SiteSearchRecord[],
  intent: CounsellingSearchIntent
) {
  if (intent.greeting || intent.ambiguousBest) return [];

  if (intent.region === "india") {
    if (intent.course === "BDS") return [];

    return records.filter((record) => {
      const kind = getRecordKind(record);
      const isIndiaResult =
        kind === "mbbs-india-college" ||
        kind === "mbbs-india-state" ||
        record.id === "ask-mbbs-india-directory";

      if (!isIndiaResult) return false;

      if (intent.state) {
        const state = getRecordString(record, "state");
        if (state !== intent.state) return false;
      }

      if (intent.city) {
        if (
          kind !== "mbbs-india-college" ||
          !matchesCity(record, intent.city)
        ) {
          return false;
        }
      }

      if (intent.collegeType) {
        if (kind !== "mbbs-india-college") return false;
        const institutionType =
          getRecordString(record, "institutionType") ??
          getRecordString(record, "category");

        if (institutionType !== intent.collegeType) return false;
      }

      return true;
    });
  }

  if (intent.country) {
    let countryRecords = records.filter((record) => {
      const classification = classifyInternalSearchRecord(record);
      const kind = getRecordKind(record);
      const isInstitution =
        kind === "kyrgyz-university" ||
        kind === "georgia-university" ||
        kind === "bangladesh-university" ||
        kind === "fmge-college";
      const isCountryGuide =
        kind === "country-page" || kind === "fmge-country";

      if (
        classification.regionType !== "abroad" ||
        classification.country !== intent.country ||
        (!isInstitution && !isCountryGuide)
      ) {
        return false;
      }

      if (intent.best && !isInstitution) return false;

      return true;
    });
    const richInstitutionTitles = new Set(
      countryRecords
        .filter((record) =>
          [
            "kyrgyz-university",
            "georgia-university",
            "bangladesh-university",
          ].includes(getRecordKind(record))
        )
        .map((record) => normalizeSiteSearchText(record.title))
    );

    countryRecords = countryRecords.filter(
      (record) =>
        getRecordKind(record) !== "fmge-college" ||
        !richInstitutionTitles.has(normalizeSiteSearchText(record.title))
    );

    if (intent.entity) {
      const entityRecords = countryRecords.filter((record) =>
        matchesEntity(record, intent.entity!)
      );
      const richEntityRecords = entityRecords.filter((record) =>
        [
          "kyrgyz-university",
          "georgia-university",
          "bangladesh-university",
        ].includes(getRecordKind(record))
      );

      countryRecords = richEntityRecords.length
        ? richEntityRecords
        : entityRecords;
    }

    return countryRecords;
  }

  return records;
}

function indiaPremiumPriority(record: SiteSearchRecord) {
  const title = normalizeSiteSearchText(record.title);

  if (title.includes("all india institute of medical sciences")) {
    return title.includes("new delhi") ? 0 : 1;
  }

  if (
    title.includes(
      "jawaharlal institute of postgraduate medical education and research"
    )
  ) {
    return 2;
  }

  if (title.includes("institute of medical sciences bhu")) {
    return 3;
  }

  return 4;
}

function isMedicalCollegeKolkata(record: SiteSearchRecord) {
  const title = normalizeSiteSearchText(record.title);
  return (
    title === "govt medical college kolkata" ||
    title === "medical college kolkata" ||
    title === "kolkata medical college"
  );
}

function compareIndiaRecords(
  a: SiteSearchRecord,
  b: SiteSearchRecord,
  intent: CounsellingSearchIntent
) {
  const aKind = getRecordKind(a);
  const bKind = getRecordKind(b);
  const prefersCollegeFirst = Boolean(
    intent.best ||
      intent.state ||
      intent.city ||
      intent.collegeType ||
      intent.oldCollege ||
      intent.seatPreference
  );
  const kindRank = (record: SiteSearchRecord) => {
    const kind = getRecordKind(record);
    if (prefersCollegeFirst) {
      return kind === "mbbs-india-college"
        ? 0
        : kind === "mbbs-india-state"
          ? 1
          : 2;
    }

    return record.id === "ask-mbbs-india-directory"
      ? 0
      : kind === "mbbs-india-college"
        ? 1
        : 2;
  };
  const kindDifference = kindRank(a) - kindRank(b);
  if (kindDifference !== 0) return kindDifference;

  if (
    intent.best &&
    (intent.state === "West Bengal" || intent.city === "kolkata")
  ) {
    const kolkataDifference =
      Number(isMedicalCollegeKolkata(b)) -
      Number(isMedicalCollegeKolkata(a));
    if (kolkataDifference !== 0) return kolkataDifference;
  }

  if (intent.best && !intent.state && !intent.city) {
    const premiumDifference =
      indiaPremiumPriority(a) - indiaPremiumPriority(b);
    if (premiumDifference !== 0) return premiumDifference;
  }

  const categoryRank = (record: SiteSearchRecord) =>
    getRecordString(record, "category") === "Government" ? 0 : 1;
  const categoryDifference = categoryRank(a) - categoryRank(b);
  if (
    categoryDifference !== 0 &&
    aKind === "mbbs-india-college" &&
    bKind === "mbbs-india-college"
  ) {
    return categoryDifference;
  }

  const aYear = getRecordNumber(a, "establishmentYear") ?? 9999;
  const bYear = getRecordNumber(b, "establishmentYear") ?? 9999;
  const aSeats = getRecordNumber(a, "seatCapacity") ?? 0;
  const bSeats = getRecordNumber(b, "seatCapacity") ?? 0;

  if (intent.seatPreference && bSeats !== aSeats) return bSeats - aSeats;
  if (aYear !== bYear) return aYear - bYear;
  if (bSeats !== aSeats) return bSeats - aSeats;

  const completenessDifference =
    (getRecordNumber(b, "dataCompleteness") ?? 0) -
    (getRecordNumber(a, "dataCompleteness") ?? 0);

  return completenessDifference || a.title.localeCompare(b.title);
}

function abroadCustomPriority(
  record: SiteSearchRecord,
  intent: CounsellingSearchIntent
) {
  if (!intent.best || !intent.country) return 99;
  const title = normalizeSiteSearchText(record.title);

  if (intent.country === "Kyrgyzstan") {
    if (title === "kyrgyz state medical academy") return 0;
    if (title === "international higher school of medicine ihsm") return 1;
    if (title.includes("international higher school of medicine")) return 2;
  }

  if (intent.country === "Georgia") {
    if (title === "georgian american university") return 0;
    if (title === "east european university") return 1;
    if (title === "alte university") return 2;
  }

  if (intent.country === "Bangladesh") {
    if (title.includes("green life medical college")) return 0;
    if (title.includes("jahurul islam medical college")) return 1;
  }

  return 99;
}

function compareAbroadRecords(
  a: SiteSearchRecord,
  b: SiteSearchRecord,
  intent: CounsellingSearchIntent
) {
  if (intent.entity) {
    const normalizedEntity = normalizeSiteSearchText(intent.entity);
    const exactEntityRank = (record: SiteSearchRecord) => {
      const title = normalizeSiteSearchText(record.title);

      if (title === normalizedEntity) return 0;
      if (
        normalizedEntity === "international higher school of medicine" &&
        title.startsWith(normalizedEntity) &&
        !title.includes("campus")
      ) {
        return 0;
      }

      return matchesEntity(record, intent.entity!) ? 1 : 2;
    };
    const entityDifference =
      exactEntityRank(a) - exactEntityRank(b);
    if (entityDifference !== 0) return entityDifference;
  }

  if (
    !intent.best &&
    !intent.entity &&
    !intent.fmgePreference
  ) {
    const countryGuideRank = (record: SiteSearchRecord) =>
      getRecordKind(record) === "country-page" ? 0 : 1;
    const countryGuideDifference =
      countryGuideRank(a) - countryGuideRank(b);
    if (countryGuideDifference !== 0) return countryGuideDifference;
  }

  if (intent.fmgePreference) {
    const fmgeCountryRank = (record: SiteSearchRecord) =>
      getRecordKind(record) === "fmge-country" ? 0 : 1;
    const fmgeCountryDifference =
      fmgeCountryRank(a) - fmgeCountryRank(b);
    if (fmgeCountryDifference !== 0) return fmgeCountryDifference;
  }

  const customDifference =
    abroadCustomPriority(a, intent) - abroadCustomPriority(b, intent);
  if (customDifference !== 0) return customDifference;

  const appearedDifference =
    (getRecordNumber(b, "appeared") ?? 0) -
    (getRecordNumber(a, "appeared") ?? 0);
  if (appearedDifference !== 0) return appearedDifference;

  const passRateDifference =
    getPassRateNumber(b) - getPassRateNumber(a);
  if (passRateDifference !== 0) return passRateDifference;

  const recommendedRank = (record: SiteSearchRecord) => {
    const recommendation = normalizeSiteSearchText(
      getRecordString(record, "recommendationLevel") ??
        getRecordString(record, "recommendationLabel") ??
        ""
    );
    return recommendation.startsWith("recommended") ||
      recommendation.includes("featured")
      ? 0
      : 1;
  };
  const recommendedDifference =
    recommendedRank(a) - recommendedRank(b);
  if (recommendedDifference !== 0) return recommendedDifference;

  const pageDifference =
    Number(Boolean(b.data?.pageExists)) -
    Number(Boolean(a.data?.pageExists));
  if (pageDifference !== 0) return pageDifference;

  const featuredDifference =
    Number(Boolean(b.data?.featured)) -
    Number(Boolean(a.data?.featured));
  if (featuredDifference !== 0) return featuredDifference;

  const completenessDifference =
    (getRecordNumber(b, "dataCompleteness") ?? 0) -
    (getRecordNumber(a, "dataCompleteness") ?? 0);
  if (completenessDifference !== 0) return completenessDifference;

  const projectOrderDifference =
    (getRecordNumber(a, "projectOrder") ?? 9999) -
    (getRecordNumber(b, "projectOrder") ?? 9999);

  return projectOrderDifference || a.title.localeCompare(b.title);
}

function getWhySuggested(
  record: SiteSearchRecord,
  intent: CounsellingSearchIntent
) {
  const kind = getRecordKind(record);

  if (kind === "country-page") {
    return `Official ILMALINK ${intent.country ?? "MBBS Abroad"} country guide.`;
  }

  if (kind === "fmge-country") {
    return "Country-level FMGE volume and pass-rate reference from the current ILMALINK dataset.";
  }

  if (kind === "mbbs-india-state") {
    return "State counselling overview with college counts, seats and admission-access guidance.";
  }

  if (record.id === "ask-mbbs-india-directory") {
    return "Starting point for the state-wise ILMALINK MBBS India college directory.";
  }

  if (isMedicalCollegeKolkata(record)) {
    return "Old government medical college with strong legacy value and West Bengal counselling relevance.";
  }

  const premium = indiaPremiumPriority(record);
  if (intent.best && premium < 4) {
    return "Premium government institution prioritised by ILMALINK’s India ranking logic.";
  }

  if (kind === "mbbs-india-college") {
    const category =
      getRecordString(record, "institutionType") ??
      getRecordString(record, "category") ??
      "Medical";
    return `${category} college ordered by location fit, established year, seat count and available data.`;
  }

  const customPriority = abroadCustomPriority(record, intent);
  if (customPriority < 99) {
    return `${intent.country} priority option in ILMALINK’s counselling ranking logic.`;
  }

  const appeared = getRecordNumber(record, "appeared") ?? 0;
  if (appeared > 0) {
    return "Suggested using FMGE appearance volume, pass-rate reference and available university data.";
  }

  return "Suggested from the available ILMALINK country and university dataset.";
}

function toCounsellingSuggestedLink(
  item: SiteSearchMatch,
  intent: CounsellingSearchIntent
): SuggestedSiteLink {
  const kind = getRecordKind(item);
  const details: string[] = [];

  if (kind === "mbbs-india-college") {
    const type =
      getRecordString(item, "institutionType") ??
      getRecordString(item, "category");
    const state = getRecordString(item, "state");
    const year = getRecordNumber(item, "establishmentYear");
    const seats = getRecordNumber(item, "seatCapacity");

    if (type || state) {
      details.push([type, state].filter(Boolean).join(" | "));
    }
    if (year) details.push(`Established: ${year}`);
    if (seats) details.push(`MBBS seats: ${seats.toLocaleString("en-IN")}`);
  } else {
    const institutionType = getRecordString(item, "institutionType");
    const location =
      getRecordString(item, "location") ??
      [
        getRecordString(item, "city"),
        getRecordString(item, "country"),
      ]
        .filter(Boolean)
        .join(", ");
    const appeared = getRecordNumber(item, "appeared") ?? 0;
    const passed = getRecordNumber(item, "passed") ?? 0;
    const passRate =
      typeof item.data?.passRate === "string"
        ? item.data.passRate
        : undefined;

    if (institutionType || location) {
      details.push(
        [institutionType, location].filter(Boolean).join(" | ")
      );
    }
    if (appeared > 0) {
      details.push(
        `FMGE: ${appeared.toLocaleString("en-IN")} appeared, ${passed.toLocaleString(
          "en-IN"
        )} passed${passRate ? `, ${passRate} pass rate` : ""}`
      );
    }
  }

  return {
    title: item.title,
    description: details[0] ?? item.description,
    url: item.url,
    sourceLabel: item.sourceLabel,
    dataType: item.matchedDataType,
    lastUpdated: item.lastUpdated,
    details,
    whySuggested: getWhySuggested(item, intent),
  };
}

function getConfidence(topScore: number, matchedCount: number) {
  if (topScore >= 360 || matchedCount >= 5) return "high";
  if (topScore >= 180 || matchedCount >= 2) return "medium";
  return "low";
}

function dedupeRecords(records: SiteSearchRecord[]) {
  const byId = new Map<string, SiteSearchRecord>();

  for (const record of records) {
    const existing = byId.get(record.id);

    if (!existing || record.priority > existing.priority) {
      byId.set(record.id, record);
    }
  }

  return Array.from(byId.values());
}

let baseRecordsCache: SiteSearchRecord[] | null = null;

export function buildInternalSiteSearchIndex(
  extraRecords: SiteSearchRecord[] = []
) {
  if (!baseRecordsCache) {
    baseRecordsCache = dedupeRecords(buildBaseRecords());
  }

  if (extraRecords.length === 0) {
    return baseRecordsCache;
  }

  return dedupeRecords([...baseRecordsCache, ...extraRecords]);
}

export function searchInternalSiteData(
  query: string,
  options: {
    limit?: number;
    extraRecords?: SiteSearchRecord[];
  } = {}
): SiteDataSearchResponse {
  const normalizedQuery = normalizeSearchQueryWithCorrections(query);
  const profile = buildInternalSearchQueryProfile(query);
  const counsellingIntent = detectCounsellingSearchIntent(query);
  const queryTerms = getImportantQueryTerms(query);
  const limit = options.limit ?? 12;
  const intent = detectSiteQuestionIntent(query);
  const allRecords = buildInternalSiteSearchIndex(options.extraRecords);
  const candidateRecords = counsellingIntent.directed
    ? filterCounsellingRecords(allRecords, counsellingIntent)
    : allRecords;
  const scored = candidateRecords
    .map((record) => ({
      ...record,
      score: normalizedQuery
        ? scoreRecord(record, normalizedQuery, queryTerms, intent, profile)
        : record.priority,
    }))
    .filter((record) =>
      counsellingIntent.directed ? true : record.score > 0
    )
    .sort((a, b) => {
      if (counsellingIntent.directed) {
        return counsellingIntent.region === "india"
          ? compareIndiaRecords(a, b, counsellingIntent)
          : compareAbroadRecords(a, b, counsellingIntent);
      }

      return (
        b.score -
          a.score ||
        b.priority -
          a.priority ||
        a.title.localeCompare(b.title)
      );
    })
    .slice(0, limit)
    .map((record, index) =>
      counsellingIntent.directed
        ? {
            ...record,
            score: Math.max(1, 1_000 - index),
          }
        : record
    );
  const matchedDataType = Array.from(
    new Set(scored.map((item) => item.matchedDataType))
  );
  const sourceLabels = Array.from(
    new Set(scored.map((item) => item.sourceLabel))
  );
  const suggestedLinks = scored.slice(0, 6).map((item) =>
    counsellingIntent.directed
      ? toCounsellingSuggestedLink(item, counsellingIntent)
      : {
          title: item.title,
          description: item.description,
          url: item.url,
          sourceLabel: item.sourceLabel,
          dataType: item.matchedDataType,
          lastUpdated: item.lastUpdated,
        }
  );
  const lastUpdated =
    scored.find((item) => item.lastUpdated)?.lastUpdated ?? null;

  return {
    query,
    intent,
    counsellingIntent,
    detectedFilters: counsellingIntent.detectedFilters,
    matchedItems: scored,
    matchedPages: scored.filter((item) =>
      ["page", "destination", "blog"].includes(item.type)
    ),
    matchedDataType,
    confidence:
      counsellingIntent.greeting || counsellingIntent.ambiguousBest
        ? "high"
        : counsellingIntent.directed && scored.length > 0
          ? "high"
          : getConfidence(scored[0]?.score ?? 0, scored.length),
    suggestedLinks,
    sourceLabels,
    lastUpdated,
  };
}
