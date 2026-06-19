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
};

export type SiteDataSearchResponse = {
  query: string;
  intent: SiteQuestionIntent;
  matchedItems: SiteSearchMatch[];
  matchedPages: SiteSearchMatch[];
  matchedDataType: SiteSearchDataType[];
  confidence: SearchConfidence;
  suggestedLinks: SuggestedSiteLink[];
  sourceLabels: string[];
  lastUpdated?: string | null;
};

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
        "ILMALINK destination pages"
      )
    ),
  ];

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
            state: college.state,
            category: college.category,
            seatCapacity: college.seatCapacity,
            establishmentYear: college.establishmentYear,
            fees: college.fees,
            counselling2025: counselling,
          },
        }
      )
    );
  }

  for (const university of kyrgyzstanUniversities) {
    const aliases = universityAliases[university.slug] ?? [];
    const firstFee = university.feeRows[0];
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
            slug: university.slug,
            name: university.name,
            location: university.location,
            accreditationLabel: university.accreditationLabel,
            recommendationLevel: university.recommendationLevel,
            recommendationMessage: university.recommendationMessage,
            feeRows: university.feeRows,
            feeNotes: university.feeNotes,
            fmgePerformance: university.fmgePerformance,
          },
        }
      )
    );
  }

  for (const university of georgiaUniversities) {
    const aliases = universityAliases[university.slug] ?? [];
    const firstFee = university.feeRows[0];
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
            slug: university.slug,
            name: university.name,
            location: university.location,
            feeSummary: university.feeSummary,
            feeRows: university.feeRows,
            feeNotes: university.feeNotes,
            fmgePerformance: university.fmgePerformance,
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
  const queryTerms = getImportantQueryTerms(query);
  const limit = options.limit ?? 12;
  const intent = detectSiteQuestionIntent(query);
  const allRecords = buildInternalSiteSearchIndex(options.extraRecords);
  const scored = allRecords
    .map((record) => ({
      ...record,
      score: normalizedQuery
        ? scoreRecord(record, normalizedQuery, queryTerms, intent, profile)
        : record.priority,
    }))
    .filter((record) => record.score > 0)
    .sort(
      (a, b) =>
        b.score -
          a.score ||
        b.priority -
          a.priority ||
        a.title.localeCompare(b.title)
    )
    .slice(0, limit);
  const matchedDataType = Array.from(
    new Set(scored.map((item) => item.matchedDataType))
  );
  const sourceLabels = Array.from(
    new Set(scored.map((item) => item.sourceLabel))
  );
  const suggestedLinks = scored.slice(0, 6).map((item) => ({
    title: item.title,
    description: item.description,
    url: item.url,
    sourceLabel: item.sourceLabel,
    dataType: item.matchedDataType,
    lastUpdated: item.lastUpdated,
  }));
  const lastUpdated =
    scored.find((item) => item.lastUpdated)?.lastUpdated ?? null;

  return {
    query,
    intent,
    matchedItems: scored,
    matchedPages: scored.filter((item) =>
      ["page", "destination", "blog"].includes(item.type)
    ),
    matchedDataType,
    confidence: getConfidence(scored[0]?.score ?? 0, scored.length),
    suggestedLinks,
    sourceLabels,
    lastUpdated,
  };
}
