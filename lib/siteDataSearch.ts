import {
  globalSearchIndex,
  type GlobalSearchEntry,
} from "@/app/data/searchIndex";
import {
  mbbsIndiaColleges,
  mbbsIndiaCollegesByState,
} from "@/app/data/mbbsIndiaColleges";
import { getMBBSIndiaAdmissionAccess } from "@/app/data/mbbsIndiaAdmissionAccess";
import { navbarCountryDestinations } from "@/app/data/navbarDestinations";
import { kyrgyzstanUniversities } from "@/app/data/kyrgyzstanUniversities";
import { fmgeCountries } from "@/app/data/fmgeData";
import {
  getFmgeCollegeDetailHref,
  getFmgeCountryHref,
  getMBBSIndiaCollegeHref,
  getMBBSIndiaStateAnchor,
} from "@/app/data/exploreLinks";

export type SearchConfidence = "high" | "medium" | "low";

export type SiteQuestionIntent =
  | "mbbs-india-cutoff"
  | "mbbs-india-state-counselling"
  | "seat-matrix-round-update"
  | "mbbs-india-college-search"
  | "mbbs-abroad-country-comparison"
  | "university-fee"
  | "accreditation-status"
  | "fmge-data"
  | "nmc-fmgl-rules"
  | "official-advisory"
  | "general-counselling";

export type SiteSearchDataType =
  | "Page"
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
  "of",
  "on",
  "or",
  "please",
  "show",
  "tell",
  "the",
  "to",
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
  ["fmge", "nbems", "pass", "passed", "result", "performance"],
  ["nmc", "fmgl", "wdoms", "internship", "licence", "license"],
  ["seat", "matrix", "allotment", "round", "mop", "stray"],
  ["counselling", "counseling", "quota", "domicile", "reporting"],
  ["accreditation", "recognition", "recommended", "verified"],
  ["advisory", "official", "embassy", "notice", "update"],
  ["college", "colleges", "university", "universities", "institute"],
];

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

function tokenize(value: string) {
  return normalizeSiteSearchText(value)
    .split(" ")
    .filter((term) => term.length > 0);
}

function slugify(value: string) {
  return normalizeSiteSearchText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getImportantQueryTerms(query: string) {
  const normalizedQuery = normalizeSiteSearchText(query);
  const terms = new Set(
    tokenize(query).filter(
      (term) => term.length > 1 && !stopWords.has(term)
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

  return Array.from(terms);
}

export function detectSiteQuestionIntent(
  query: string
): SiteQuestionIntent {
  const text = normalizeSiteSearchText(query);

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
    text.includes("cutoff") ||
    text.includes("cut off") ||
    text.includes("lowest cutoff") ||
    text.includes("closing rank")
  ) {
    return "mbbs-india-cutoff";
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
          "MBBS India colleges NMC medical college list state counselling cutoff closing rank government private seats quota domicile fees admission",
        priority: 105,
      },
      "Page",
      "ILMALINK MBBS India dataset"
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

    records.push(
      createRecord(
        {
          id: `ask-mbbs-india-state-${slugify(group.state)}`,
          title: `MBBS Colleges in ${group.state}`,
          description: `${access.label}: ${group.privateCount} private, ${group.governmentCount} government, and ${group.totalSeats.toLocaleString(
            "en-IN"
          )} MBBS seats in ${group.state}.`,
          url: `/mbbs-india/#${getMBBSIndiaStateAnchor(group.state)}`,
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
          ],
          content: [
            group.state,
            `${group.totalSeats} seats`,
            `${group.governmentCount} government colleges`,
            `${group.privateCount} private colleges`,
            access.detail,
            access.sourceLabel,
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
          ],
          data: {
            kind: "mbbs-india-state",
            state: group.state,
            governmentCount: group.governmentCount,
            privateCount: group.privateCount,
            totalSeats: group.totalSeats,
            accessLabel: access.label,
            accessDetail: access.detail,
          },
        }
      )
    );
  }

  for (const college of mbbsIndiaColleges) {
    const access = getMBBSIndiaAdmissionAccess(college.state);

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
          ],
          content: [
            college.collegeName,
            college.state,
            college.category,
            `${college.seatCapacity} seats`,
            `established ${college.establishmentYear}`,
            access.detail,
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
          ],
          data: {
            kind: "mbbs-india-college",
            state: college.state,
            category: college.category,
            seatCapacity: college.seatCapacity,
            establishmentYear: college.establishmentYear,
            fees: college.fees,
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
            : "/?counselling=open",
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

  for (const country of fmgeCountries) {
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
            "FMGE",
            "NBEMS",
            "country-wise FMGE",
            "pass rate",
          ],
          content: [
            country.country,
            country.appeared,
            country.passed,
            country.passRate,
            "FMGE NBEMS country wise institute wise pass rate better result comparison",
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
              college.name,
              "FMGE",
              "NBEMS",
              "college-wise FMGE",
            ],
            content: [
              college.name,
              country.country,
              college.appeared,
              college.passed,
              college.passRate,
              "FMGE NBEMS institute wise pass rate result",
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
      entry.group === "Blogs"
        ? "Blog"
        : entry.category === "FMGE Data"
          ? "FMGE Country"
          : entry.group === "Destinations"
            ? "Country Page"
            : "Page";

    records.push(
      createRecord(entry, dataType, "ILMALINK MEDIGO website data")
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
  intent: SiteQuestionIntent
) {
  const searchableText = getSearchableText(record);
  const title = normalizeSiteSearchText(record.title);
  const description = normalizeSiteSearchText(record.description);
  const tags = normalizeSiteSearchText(record.tags.join(" "));
  const content = normalizeSiteSearchText(record.content);
  const matchedTerms = queryTerms.filter((term) =>
    searchableText.includes(term)
  );
  const requiredMatches =
    queryTerms.length <= 2 ? queryTerms.length : Math.min(2, queryTerms.length);

  if (queryTerms.length > 0 && matchedTerms.length < requiredMatches) {
    return 0;
  }

  let score = record.priority + matchedTerms.length * 18;

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

export function buildInternalSiteSearchIndex(
  extraRecords: SiteSearchRecord[] = []
) {
  return dedupeRecords([...buildBaseRecords(), ...extraRecords]);
}

export function searchInternalSiteData(
  query: string,
  options: {
    limit?: number;
    extraRecords?: SiteSearchRecord[];
  } = {}
): SiteDataSearchResponse {
  const normalizedQuery = normalizeSiteSearchText(query);
  const queryTerms = getImportantQueryTerms(query);
  const limit = options.limit ?? 12;
  const intent = detectSiteQuestionIntent(query);
  const allRecords = buildInternalSiteSearchIndex(options.extraRecords);
  const scored = allRecords
    .map((record) => ({
      ...record,
      score: normalizedQuery
        ? scoreRecord(record, normalizedQuery, queryTerms, intent)
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
