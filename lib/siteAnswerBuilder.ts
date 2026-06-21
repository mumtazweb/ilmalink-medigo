import {
  searchInternalSiteData,
  normalizeSiteSearchText,
  normalizeSearchQueryWithCorrections,
  type SearchConfidence,
  type SiteDataSearchResponse,
  type SiteSearchMatch,
  type SuggestedSiteLink,
} from "./siteDataSearch";
import { fmgeCountries } from "@/app/data/fmgeCountries";
import type {
  MBBSIndiaCollegeCutoff,
  MBBSIndiaCutoffCategory,
} from "@/app/data/mbbsIndiaCounselling";
import { getMBBSIndiaCollegeCounselling2025 } from "@/app/data/mbbsIndiaCounselling";
import {
  mbbsIndiaColleges,
  type MBBSIndiaCollege,
} from "@/app/data/mbbsIndiaColleges";
import {
  getMBBSIndiaCollegeHref,
} from "@/app/data/exploreLinks";
import {
  kyrgyzstanUniversities,
  type KyrgyzUniversityPageData,
} from "@/app/data/kyrgyzstanUniversities";
import {
  georgiaUniversities,
  type GeorgiaUniversityPageData,
} from "@/app/data/georgiaUniversities";

export type AskIlmalinkAnswer = {
  answer: string;
  confidence: SearchConfidence;
  detectedFilters: string[];
  matchedItems: SiteSearchMatch[];
  suggestedLinks: SuggestedSiteLink[];
  shouldShowConnectCTA: true;
  shouldAutoOpenCounselling?: boolean;
  notFound: boolean;
};

type BuiltAnswer = {
  answer: string;
  suggestedLinks?: SuggestedSiteLink[];
  shouldAutoOpenCounselling?: boolean;
};

const fallbackAnswer =
  "I could not find a confident match in ILMALINK data. You can ask in another way or connect with ILMALINK MEDIGO for counselling support.";

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : null;
}

function asString(value: unknown) {
  return typeof value === "string" ? value : null;
}

function getTopByKind(search: SiteDataSearchResponse, kind: string) {
  return search.matchedItems.find((item) => item.data?.kind === kind);
}

function getItemsByKind(search: SiteDataSearchResponse, kind: string) {
  return search.matchedItems.filter((item) => item.data?.kind === kind);
}

function toDirectLink(
  item: SiteSearchMatch,
  description = item.description
): SuggestedSiteLink {
  return {
    title: item.title,
    description,
    url: item.url,
    sourceLabel: item.sourceLabel,
    dataType: item.matchedDataType,
    lastUpdated: item.lastUpdated,
  };
}

function buildIntentBasedCounsellingAnswer(
  search: SiteDataSearchResponse
): BuiltAnswer | null {
  const intent = search.counsellingIntent;

  if (intent.greeting === "greeting") {
    return {
      answer:
        "Hello! I can help you search MBBS India colleges, MBBS Abroad countries, FMGE data, fees, official advisories and counselling options. What are you looking for?",
      suggestedLinks: [],
    };
  }

  if (intent.greeting === "islamic-greeting") {
    return {
      answer:
        "Wa Alaikum Assalam. I can help you with MBBS India, MBBS Abroad, NEET counselling, FMGE data, fees and admission guidance. What would you like to search?",
      suggestedLinks: [],
    };
  }

  if (intent.greeting === "thanks") {
    return {
      answer:
        "You’re welcome. Ask me anytime about MBBS India, MBBS Abroad, NEET counselling, FMGE data or university selection.",
      suggestedLinks: [],
    };
  }

  if (intent.ambiguousBest) {
    return {
      answer:
        "Which location should I use for the comparison? Choose MBBS India, MBBS Abroad countries, Kyrgyzstan, Georgia or Bangladesh so I can apply the right counselling filters before ranking.",
      suggestedLinks: [
        {
          title: "Best MBBS India",
          description:
            "Compare Indian medical colleges using institution type, established year, seats and available counselling data.",
          url: "/mbbs-india",
          sourceLabel: "ILMALINK MBBS India dataset",
          dataType: "MBBS India College",
        },
        {
          title: "Best MBBS Abroad countries",
          description:
            "Start with country-wise MBBS Abroad comparison and guidance.",
          url: "/mbbs-abroad",
          sourceLabel: "ILMALINK destination pages",
          dataType: "Country Page",
        },
        {
          title: "Best Kyrgyzstan universities",
          description:
            "Compare Kyrgyzstan options using ILMALINK counselling priority and FMGE references.",
          url: "/mbbs-abroad/kyrgyzstan",
          sourceLabel: "ILMALINK Kyrgyzstan university data",
          dataType: "University",
        },
        {
          title: "Best Georgia universities",
          description:
            "Compare Georgia options using ILMALINK counselling priority and available university data.",
          url: "/mbbs-abroad/georgia",
          sourceLabel: "ILMALINK Georgia university data",
          dataType: "University",
        },
        {
          title: "Best Bangladesh colleges",
          description:
            "Compare featured Bangladesh medical colleges and FMGE references.",
          url: "/mbbs-abroad/bangladesh",
          sourceLabel: "ILMALINK Bangladesh university data",
          dataType: "University",
        },
      ],
    };
  }

  if (!intent.directed || search.matchedItems.length === 0) {
    return null;
  }

  if (intent.region === "india") {
    const location =
      (intent.city
        ? intent.city.replace(/\b\w/g, (character) =>
            character.toUpperCase()
          )
        : undefined) ??
      intent.state ??
      "India";
    const filterText = [
      intent.collegeType,
      intent.course,
      location,
    ]
      .filter(Boolean)
      .join(" ");

    return {
      answer: intent.best
        ? `Suggested order based on ILMALINK data for ${filterText}. Location and college-type filters were applied before ranking, followed by institution priority, established year, seat count and available data. Verify official counselling data; final admission depends on official rules.`
        : `Showing only ${filterText} results from the current ILMALINK dataset. Results are ordered by location fit, requested college type, established year, seats and available counselling data. Verify official counselling data before choice filling.`,
      suggestedLinks: search.suggestedLinks,
    };
  }

  if (intent.country) {
    const subject = intent.entity ?? `${intent.country} institutions`;

    return {
      answer: intent.best
        ? `Suggested order based on ILMALINK ranking logic, FMGE appearance volume, available data and counselling priority for ${intent.country}. This is indicative guidance, not an absolute “best” claim.`
        : intent.fmgePreference
          ? `Based on ILMALINK data, these are the closest ${intent.country} FMGE and institution matches, ordered using country-level relevance and available FMGE appearance volume.`
          : `Showing only ${subject} from the current ILMALINK dataset. Country filtering was applied before ranking; compare FMGE references, recognition, fees, course structure and NMC/FMGL requirements before admission.`,
      suggestedLinks: search.suggestedLinks,
    };
  }

  return null;
}

function formatNumber(value: number) {
  return value.toLocaleString("en-IN");
}

const genericInstitutionWords = new Set([
  "and",
  "college",
  "faculty",
  "hospital",
  "institute",
  "international",
  "medical",
  "medicine",
  "of",
  "school",
  "state",
  "the",
  "university",
]);

function getInstitutionAliases(name: string) {
  const uppercaseAliases = (name.match(/\b[A-Z][A-Z0-9-]{1,}\b/g) ?? [])
    .filter(
      (alias) =>
        !genericInstitutionWords.has(normalizeSiteSearchText(alias))
    );

  return [name, ...uppercaseAliases];
}

function getInstitutionMatchScore(query: string, aliases: string[]) {
  const normalizedQuery = normalizeSiteSearchText(query);
  const queryTerms = normalizedQuery.split(" ");
  let bestScore = 0;

  for (const alias of aliases) {
    const normalizedAlias = normalizeSiteSearchText(alias);
    if (!normalizedAlias) continue;

    const aliasTerms = normalizedAlias.split(" ");
    const isShortAlias = aliasTerms.length === 1;
    const hasExactAlias = isShortAlias
      ? queryTerms.includes(normalizedAlias)
      : normalizedQuery.includes(normalizedAlias);

    if (hasExactAlias) {
      bestScore = Math.max(
        bestScore,
        isShortAlias ? 1_200 + normalizedAlias.length : 2_000 + normalizedAlias.length
      );
      continue;
    }

    const significantTerms = normalizedAlias
      .split(" ")
      .filter(
        (term) =>
          term.length > 1 &&
          !genericInstitutionWords.has(term)
      );
    if (significantTerms.length === 0) continue;

    const matchedTerms = significantTerms.filter((term) =>
      queryTerms.includes(term)
    );
    const ratio = matchedTerms.length / significantTerms.length;

    if (matchedTerms.length >= 2 || ratio >= 0.6) {
      bestScore = Math.max(
        bestScore,
        Math.round(ratio * 800) + matchedTerms.length * 80
      );
    }
  }

  return bestScore;
}

function resolveIndiaCollege(query: string): MBBSIndiaCollege | null {
  let best:
    | {
        college: MBBSIndiaCollege;
        score: number;
      }
    | undefined;

  for (const college of mbbsIndiaColleges) {
    const score = getInstitutionMatchScore(
      query,
      getInstitutionAliases(college.collegeName)
    );

    if (score > 0 && (!best || score > best.score)) {
      best = { college, score };
    }
  }

  return best?.college ?? null;
}

function resolveKyrgyzUniversity(
  query: string
): KyrgyzUniversityPageData | null {
  const extraAliases: Record<string, string[]> = {
    "kyrgyz-state-medical-academy": ["KSMA"],
    "international-higher-school-of-medicine": ["IHSM"],
    "international-higher-school-of-medicine-central": ["IHSM Central"],
    "international-higher-school-of-medicine-elite": ["IHSM Elite"],
  };
  let best:
    | {
        university: KyrgyzUniversityPageData;
        score: number;
      }
    | undefined;

  for (const university of kyrgyzstanUniversities) {
    let score = getInstitutionMatchScore(query, [
      ...getInstitutionAliases(university.name),
      ...(extraAliases[university.slug] ?? []),
    ]);

    if (
      normalizeSiteSearchText(query).split(" ").includes("ihsm") &&
      university.slug === "international-higher-school-of-medicine"
    ) {
      score += 500;
    }

    if (score > 0 && (!best || score > best.score)) {
      best = { university, score };
    }
  }

  return best?.university ?? null;
}

function resolveGeorgiaUniversity(
  query: string
): GeorgiaUniversityPageData | null {
  let best:
    | {
        university: GeorgiaUniversityPageData;
        score: number;
      }
    | undefined;

  for (const university of georgiaUniversities) {
    const score = getInstitutionMatchScore(query, [
      ...getInstitutionAliases(university.name),
      ...(university.shortName ? [university.shortName] : []),
    ]);

    if (score > 0 && (!best || score > best.score)) {
      best = { university, score };
    }
  }

  return best?.university ?? null;
}

function indiaCollegeLink(
  college: MBBSIndiaCollege,
  description: string
): SuggestedSiteLink {
  return {
    title: college.collegeName,
    description,
    url: getMBBSIndiaCollegeHref(college),
    sourceLabel: "ILMALINK MBBS India college data",
    dataType: "MBBS India College",
  };
}

function getFirstNumericQueryValue(query: string) {
  const values = query.match(/\b\d[\d,]*\b/g) ?? [];

  for (const value of values) {
    const parsed = Number(value.replace(/,/g, ""));

    if (
      Number.isFinite(parsed) &&
      parsed > 10 &&
      !(parsed >= 2020 && parsed <= 2035)
    ) {
      return parsed;
    }
  }

  return null;
}

function getRequestedCutoffCategory(
  query: string,
  rows: MBBSIndiaCutoffCategory[]
) {
  const normalized = normalizeSiteSearchText(query);
  const aliases: Array<[string[], string]> = [
    [["management", "management quota", "private quota"], "Management"],
    [["gen ews", "general ews", "ews"], "GEN-EWS"],
    [["obc a", "obca"], "OBC-A"],
    [["obc b", "obcb"], "OBC-B"],
    [["general", "gen", "ur"], "GEN"],
    [["sc", "scheduled caste"], "SC"],
    [["st", "scheduled tribe"], "ST"],
  ];

  const matched = aliases.find(([terms]) =>
    terms.some((term) => normalized.includes(term))
  )?.[1];

  return matched
    ? rows.find((row) => row.category === matched) ?? null
    : null;
}

function getRequestedRound(query: string) {
  const normalized = normalizeSiteSearchText(query);

  if (normalized.includes("stray")) return "stray" as const;
  if (/\bround 3\b|\br3\b/.test(normalized)) return "round3" as const;
  if (/\bround 2\b|\br2\b/.test(normalized)) return "round2" as const;
  if (/\bround 1\b|\br1\b/.test(normalized)) return "round1" as const;

  return null;
}

const cutoffRoundFields = [
  {
    key: "round1",
    label: "Round 1",
    score: "round1Score",
    rank: "round1Rank",
  },
  {
    key: "round2",
    label: "Round 2",
    score: "round2Score",
    rank: "round2Rank",
  },
  {
    key: "round3",
    label: "Round 3",
    score: "round3Score",
    rank: "round3Rank",
  },
  {
    key: "stray",
    label: "Stray round",
    score: "strayScore",
    rank: "strayRank",
  },
] as const;

function formatCutoffRow(
  row: MBBSIndiaCutoffCategory,
  requestedRound: ReturnType<typeof getRequestedRound>
) {
  const rounds = requestedRound
    ? cutoffRoundFields.filter((round) => round.key === requestedRound)
    : cutoffRoundFields;
  const details = rounds.flatMap((round) => {
    const score = row[round.score];
    const rank = row[round.rank];

    if (score === null && rank === null) return [];

    return [
      `${round.label}: ${score ?? "score unavailable"}${
        rank !== null ? `, rank ${formatNumber(rank)}` : ""
      }`,
    ];
  });

  return `${row.category} — ${details.join("; ")}`;
}

function formatFacts(item: SiteSearchMatch) {
  return item.keyFacts?.length ? ` Key points: ${item.keyFacts.join("; ")}.` : "";
}

function getSourceText() {
  return "";
}

function getLastUpdatedText(search: SiteDataSearchResponse) {
  return search.lastUpdated ? ` Last updated: ${search.lastUpdated}.` : "";
}

function getTopFmgeCountriesByAppeared(limit = 5) {
  return [...fmgeCountries]
    .sort((first, second) => second.appeared - first.appeared)
    .slice(0, limit);
}

function getTopFmgeCollegesByAppeared(limit = 5) {
  return fmgeCountries
    .flatMap((country) =>
      country.colleges.map((college) => ({
        country: country.country,
        name: college.name,
        appeared: college.appeared,
        passed: college.passed,
        passRate: college.passRate,
      }))
    )
    .sort((first, second) => second.appeared - first.appeared)
    .slice(0, limit);
}

function wantsFmgeVolumeRanking(normalizedQuery: string) {
  return (
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
    normalizedQuery.includes("best university")
  );
}

function formatCountryName(country: string) {
  if (country === "RUSSIAN FEDERATION") return "Russia";
  if (country === "UNITED ARAB EMIRATES") return "UAE";
  if (country === "UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND") {
    return "United Kingdom";
  }

  return country
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildFmgeCountryVolumeAnswer() {
  const topCountries = getTopFmgeCountriesByAppeared(5);
  const leader = topCountries[0];
  const countryList = topCountries
    .map(
      (country, index) =>
        `${index + 1}. ${formatCountryName(country.country)} - ${country.appeared.toLocaleString("en-IN")} appeared, ${country.passed.toLocaleString("en-IN")} passed, ${country.passRate} pass rate`
    )
    .join("\n");

  return [
    `By FMGE appeared count, ${formatCountryName(leader.country)} has the strongest student-volume signal in the current ILMALINK FMGE dataset.`,
    `Top countries by appeared count:\n${countryList}`,
    "Use appeared count as a demand/experience signal, then compare pass rate, university recognition, budget, safety, course duration, internship, English medium, and NMC/FMGL compliance before choosing.",
  ].join("\n\n");
}

function buildFmgeCollegeVolumeAnswer() {
  const topColleges = getTopFmgeCollegesByAppeared(5);
  const leader = topColleges[0];
  const collegeList = topColleges
    .map(
      (college, index) =>
        `${index + 1}. ${college.name} (${formatCountryName(college.country)}) - ${college.appeared.toLocaleString("en-IN")} appeared, ${college.passed.toLocaleString("en-IN")} passed, ${college.passRate} pass rate`
    )
    .join("\n");

  return [
    `By FMGE appeared count, ${leader.name} has the strongest college/university volume signal in the current ILMALINK FMGE dataset.`,
    `Top colleges/universities by appeared count:\n${collegeList}`,
    "Appeared count can suggest student volume and past Indian-student presence, but it is not an admission guarantee. Compare pass rate, accreditation, fees, safety, course duration, internship, English medium, and NMC/FMGL compliance before final admission.",
  ].join("\n\n");
}

function buildCutoffAnswer(search: SiteDataSearchResponse): BuiltAnswer {
  const resolvedCollege = resolveIndiaCollege(search.query);
  const numericValue = getFirstNumericQueryValue(search.query);
  const normalizedQuery = normalizeSiteSearchText(search.query);
  const isGenericRankOrMarksQuery =
    !resolvedCollege &&
    numericValue !== null &&
    (normalizedQuery.includes("neet") ||
      normalizedQuery.includes("rank") ||
      normalizedQuery.includes("mark") ||
      normalizedQuery.includes("score"));

  if (isGenericRankOrMarksQuery) {
    const rankPredictor = getTopByKind(search, "rank-predictor");
    const directory = search.matchedItems.find(
      (item) => item.url === "/mbbs-india/"
    );
    const suggestedLinks = [rankPredictor, directory]
      .filter((item): item is SiteSearchMatch => Boolean(item))
      .map((item) => toDirectLink(item));

    return {
      answer: `For ${
        normalizedQuery.includes("rank")
          ? `rank ${formatNumber(numericValue)}`
          : `${numericValue} marks`
      }, ILMALINK does not select one college without category, quota, domicile and counselling round. Use the NEET Rank Predictor and compare the India counselling/cutoff results listed below.`,
      suggestedLinks,
      shouldAutoOpenCounselling: false,
    };
  }

  const matchedCollege = getTopByKind(search, "mbbs-india-college");
  const collegeName = resolvedCollege?.collegeName ?? matchedCollege?.title;

  if (collegeName) {
    const counselling = resolvedCollege
      ? getMBBSIndiaCollegeCounselling2025(resolvedCollege.collegeName)
      : (matchedCollege?.data?.counselling2025 as
          | {
              year?: number;
              cutoff?: MBBSIndiaCollegeCutoff | null;
            }
          | null
          | undefined);
    const cutoff = counselling?.cutoff;
    const pageLink = resolvedCollege
      ? indiaCollegeLink(
          resolvedCollege,
          `Open the full ${collegeName} counselling page with the 2025 seat matrix and round-wise cutoff table.`
        )
      : toDirectLink(
          matchedCollege!,
          `Open the full ${collegeName} counselling page with the 2025 seat matrix and round-wise cutoff table.`
        );

    if (!cutoff?.categories?.length) {
      return {
        answer: `I found ${collegeName}, but this website does not yet have a verified college-specific cutoff table for it. Cutoff depends on category, quota and round, so an expert should check the latest counselling source.`,
        suggestedLinks: [pageLink],
        shouldAutoOpenCounselling: true,
      };
    }

    const requestedCategory = getRequestedCutoffCategory(
      search.query,
      cutoff.categories
    );
    const requestedRound = getRequestedRound(search.query);
    const isRankQuery =
      normalizedQuery.includes("rank") ||
      (numericValue !== null && numericValue > 720);

    if (numericValue !== null) {
      const comparisons = cutoff.categories.flatMap((row) =>
        cutoffRoundFields.flatMap((round) => {
          if (requestedRound && round.key !== requestedRound) return [];
          if (requestedCategory && row.category !== requestedCategory.category) {
            return [];
          }

          const score = row[round.score];
          const rank = row[round.rank];
          const threshold = isRankQuery ? rank : score;
          if (threshold === null) return [];

          const meets = isRankQuery
            ? numericValue <= threshold
            : numericValue >= threshold;

          return [
            {
              category: row.category,
              round: round.label,
              score,
              rank,
              threshold,
              meets,
              distance: Math.abs(numericValue - threshold),
            },
          ];
        })
      );
      const reachable = comparisons
        .filter((item) => item.meets)
        .sort((first, second) => first.distance - second.distance)
        .slice(0, 5);
      const closestMisses = comparisons
        .filter((item) => !item.meets)
        .sort((first, second) => first.distance - second.distance)
        .slice(0, 2);
      const valueLabel = isRankQuery
        ? `rank ${formatNumber(numericValue)}`
        : `${numericValue} marks`;
      const reachableText = reachable.length
        ? reachable
            .map(
              (item) =>
                `${item.category} ${item.round} (${item.score ?? "score unavailable"} marks${
                  item.rank !== null ? ` / rank ${formatNumber(item.rank)}` : ""
                })`
            )
            .join("; ")
        : "none of the matched 2025 category/round rows";
      const missesText = closestMisses.length
        ? ` Closest higher cutoffs were ${closestMisses
            .map(
              (item) =>
                `${item.category} ${item.round} (${item.score ?? "score unavailable"} marks${
                  item.rank !== null ? ` / rank ${formatNumber(item.rank)}` : ""
                })`
            )
            .join("; ")}.`
        : "";

      return {
        answer: `For ${collegeName}, your ${valueLabel} matched these 2025 closing points: ${reachableText}.${missesText} This is a prior-year comparison, not an admission guarantee—category, quota, domicile and the current counselling round still decide eligibility.`,
        suggestedLinks: [pageLink],
      };
    }

    const rowsToShow = requestedCategory
      ? [requestedCategory]
      : [
          cutoff.categories.find((row) => row.category === "GEN"),
          cutoff.categories.find((row) => row.category === "Management"),
        ].filter(Boolean) as MBBSIndiaCutoffCategory[];
    const details = rowsToShow
      .map((row) => formatCutoffRow(row, requestedRound))
      .join("\n");

    return {
      answer: `${collegeName} has exact 2025 prior-year cutoff data on this website:\n${details}\nTell me your category, quota, round, score or rank for a more specific comparison.`,
      suggestedLinks: [pageLink],
    };
  }

  const bestState = getTopByKind(search, "mbbs-india-state");

  if (!bestState) {
    return {
      answer:
        "Please include the college name plus your NEET score or rank and category. I can then compare it against the exact cutoff numbers available on this website.",
      shouldAutoOpenCounselling: true,
    };
  }

  const state = asString(bestState.data?.state) ?? bestState.title;
  const accessLabel = asString(bestState.data?.accessLabel);
  const privateCount = asNumber(bestState.data?.privateCount);
  const totalSeats = asNumber(bestState.data?.totalSeats);

  return {
    answer: `${state} is the closest counselling match. It is tagged as ${
      accessLabel ?? "a state counselling route"
    }${privateCount !== null ? ` with ${privateCount} private colleges` : ""}${
      totalSeats !== null ? ` and ${formatNumber(totalSeats)} MBBS seats` : ""
    }. Add a college name, category and score/rank for an exact cutoff answer.`,
    suggestedLinks: [toDirectLink(bestState)],
  };
}

function buildStateCounsellingAnswer(search: SiteDataSearchResponse) {
  const state = getTopByKind(search, "mbbs-india-state");

  if (!state) {
    return "Counselling rules depend on domicile, quota, round, seat type, documents, and reporting instructions. Connect ILMALINK for personalised guidance on this question.";
  }

  const accessDetail = asString(state.data?.accessDetail);

  return `${state.title} is the closest counselling match. ${state.description}${accessDetail ? ` ${accessDetail}` : ""} Verify the latest state counselling notice, quota rules, document list, seat matrix, and reporting instructions before choice filling.${getSourceText()}${getLastUpdatedText(search)}`;
}

function buildSeatMatrixAnswer(search: SiteDataSearchResponse) {
  const advisory = search.matchedItems.find(
    (item) => item.matchedDataType === "Official Advisory"
  );
  const state = getTopByKind(search, "mbbs-india-state");

  if (advisory) {
    return `The closest seat matrix or round update is "${advisory.title}". ${advisory.description} Use Connect ILMALINK for a round-wise counselling review before choice filling.${getSourceText()}${getLastUpdatedText(search)}`;
  }

  if (state) {
    return `For ${state.title}, seat matrix details can change round-wise. Verify the latest official counselling notice before choice filling, especially if the question is about a current round.`;
  }

  return "Seat matrix updates are round-wise and time-sensitive. This question can be answered better by our experts after checking the exact state, round and quota. Connect ILMALINK for a personalised review.";
}

function buildCollegeAnswer(search: SiteDataSearchResponse) {
  const college = getTopByKind(search, "mbbs-india-college");

  if (!college) {
    return "For college shortlisting, the college/state name, NEET score, category, domicile and budget matter together. Connect ILMALINK for personalised college shortlisting.";
  }

  return `${college.title} is listed as ${college.description}${formatFacts(college)} Cutoff, fee, quota, and admission chances must be verified with NEET score, category, domicile, and counselling round.`;
}

function buildCountryComparisonAnswer(search: SiteDataSearchResponse) {
  const countries = getItemsByKind(search, "fmge-country").slice(0, 3);
  const normalizedQuery = normalizeSearchQueryWithCorrections(search.query);
  const isGenericBestCountryQuestion =
    normalizedQuery.includes("best country") ||
    normalizedQuery.includes("best countries") ||
    normalizedQuery.includes("country to study") ||
    normalizedQuery.includes("countries to study");

  if (isGenericBestCountryQuestion || wantsFmgeVolumeRanking(normalizedQuery)) {
    return buildFmgeCountryVolumeAnswer();
  }

  if (countries.length > 0) {
    const summary = countries
      .map((country) => `${country.title}: ${country.description}`)
      .join(" ");

    return `Here are the closest FMGE country matches. ${summary} FMGE result alone should not decide admission; compare course duration, internship, English medium, licence eligibility, safety, budget, and NMC/FMGL compliance.`;
  }

  const countryPage = search.matchedItems.find(
    (item) => item.matchedDataType === "Country Page"
  );

  if (countryPage) {
    return `${countryPage.title} is a relevant country page. ${countryPage.description} Compare fees, university recognition, FMGE trends, safety, internship, and NMC/FMGL compliance before final admission.`;
  }

  return fallbackAnswer;
}

function buildUniversityRecommendationAnswer(): BuiltAnswer {
  return {
    answer: [
      "Based on the verified university data currently available on ILMALINK, my first shortlist would be International Higher School of Medicine (IHSM) and Kyrgyz State Medical Academy (KSMA).",
      "If you want one default starting option, IHSM is the cleaner first recommendation because its listed campuses have 6-year accreditation, structured fee tables and a dedicated Indian-student pathway. KSMA is also marked Recommended and is a strong public-academy option, but its special regulatory status still needs separate current verification.",
      "The final choice should depend on your budget, preferred campus, course/internship structure, hostel plan and latest NMC/FMGL checks.",
    ].join("\n\n"),
    suggestedLinks: [
      {
        title: "International Higher School of Medicine (IHSM)",
        description:
          "Open the full IHSM page with Central and Elite campus fees, accreditation, documents and FMGE references.",
        url: "/mbbs-abroad/kyrgyzstan/international-higher-school-of-medicine/",
        sourceLabel: "ILMALINK Kyrgyzstan university data",
        dataType: "University",
      },
      {
        title: "Kyrgyz State Medical Academy (KSMA)",
        description:
          "Open the full KSMA page with its 2026 fee structure, requirements, accreditation position and admission details.",
        url: "/mbbs-abroad/kyrgyzstan/kyrgyz-state-medical-academy/",
        sourceLabel: "ILMALINK Kyrgyzstan university data",
        dataType: "University",
      },
    ],
  };
}

function buildFeeAnswer(search: SiteDataSearchResponse): BuiltAnswer {
  const resolvedIndiaCollege = resolveIndiaCollege(search.query);

  if (resolvedIndiaCollege) {
    const unavailable =
      !resolvedIndiaCollege.fees ||
      normalizeSiteSearchText(resolvedIndiaCollege.fees).includes(
        "to be updated"
      );
    const targetLink = indiaCollegeLink(
      resolvedIndiaCollege,
      `Open the full ${resolvedIndiaCollege.collegeName} page for its available fee status, seats and counselling data.`
    );

    if (unavailable) {
      return {
        answer: `The verified 2026 fee for ${resolvedIndiaCollege.collegeName} has not yet been updated on this website. Please contact an ILMALINK expert for the latest official fee structure.`,
        suggestedLinks: [targetLink],
        shouldAutoOpenCounselling: true,
      };
    }

    return {
      answer: `${resolvedIndiaCollege.collegeName} fee: ${resolvedIndiaCollege.fees}. Open the college page below for the complete available record.`,
      suggestedLinks: [targetLink],
    };
  }

  const resolvedKyrgyzUniversity = resolveKyrgyzUniversity(search.query);

  if (resolvedKyrgyzUniversity) {
    const feeNotesText = normalizeSiteSearchText(
      resolvedKyrgyzUniversity.feeNotes.join(" ")
    );
    const explicitlyUnverified =
      feeNotesText.includes("no official") ||
      feeNotesText.includes("not yet published") ||
      feeNotesText.includes("not yet confirmed") ||
      feeNotesText.includes("to be updated");
    const validRows = resolvedKyrgyzUniversity.feeRows.filter(
      (row) =>
        !normalizeSiteSearchText(
          Object.values(row).join(" ")
        ).includes("to be updated")
    );
    const firstFee = validRows[0];
    const targetLink: SuggestedSiteLink = {
      title: resolvedKyrgyzUniversity.name,
      description: `Open the full ${resolvedKyrgyzUniversity.name} page for the complete semester-wise fee structure and admission details.`,
      url: `/mbbs-abroad/kyrgyzstan/${resolvedKyrgyzUniversity.slug}/`,
      sourceLabel: "ILMALINK Kyrgyzstan university data",
      dataType: "University Fee",
    };

    if (
      !explicitlyUnverified &&
      !firstFee &&
      resolvedKyrgyzUniversity.campuses?.length
    ) {
      const campusFees = resolvedKyrgyzUniversity.campuses
        .flatMap((campus) => {
          const row = campus.feeRows.find(
            (feeRow) =>
              !normalizeSiteSearchText(Object.values(feeRow).join(" ")).includes(
                "to be updated"
              )
          );

          return row
            ? [
                `${campus.name}: ${row.year} ${row.semester}, tuition ${row.tuitionFee}, hostel ${row.hostelAccommodation}, mess ${row.mess}, total ${row.totalCost}`,
              ]
            : [];
        })
        .slice(0, 2);

      if (campusFees.length) {
        return {
          answer: `${resolvedKyrgyzUniversity.name} has separate campus fee tables. ${campusFees.join(
            ". "
          )}. Open the fee page below for the complete campus-wise semester breakdown.`,
          suggestedLinks: [targetLink],
        };
      }
    }

    if (explicitlyUnverified || !firstFee) {
      return {
        answer: `The verified 2026 fee for ${resolvedKyrgyzUniversity.name} has not yet been updated on this website. Please contact an ILMALINK expert for the latest university-issued fee structure.`,
        suggestedLinks: [targetLink],
        shouldAutoOpenCounselling: true,
      };
    }

    return {
      answer: `${resolvedKyrgyzUniversity.name} — ${firstFee.year} ${firstFee.semester}: tuition ${firstFee.tuitionFee}, hostel ${firstFee.hostelAccommodation}, mess ${firstFee.mess}, total ${firstFee.totalCost}. Open the fee page below for the full semester-wise structure and notes.`,
      suggestedLinks: [targetLink],
    };
  }

  const resolvedGeorgiaUniversity = resolveGeorgiaUniversity(search.query);

  if (resolvedGeorgiaUniversity) {
    const targetLink: SuggestedSiteLink = {
      title: resolvedGeorgiaUniversity.name,
      description: `Open the full ${resolvedGeorgiaUniversity.name} page for the complete available fee structure and admission details.`,
      url: resolvedGeorgiaUniversity.pageExists
        ? `/mbbs-abroad/georgia/${resolvedGeorgiaUniversity.slug}/`
        : `/mbbs-abroad/georgia/?q=${encodeURIComponent(
            resolvedGeorgiaUniversity.name
          )}#georgia-universities`,
      sourceLabel: "ILMALINK Georgia university data",
      dataType: "University Fee",
    };

    if (
      !resolvedGeorgiaUniversity.feeSummary &&
      resolvedGeorgiaUniversity.feeRows.length === 0
    ) {
      return {
        answer: `The verified 2026 fee for ${resolvedGeorgiaUniversity.name} has not yet been updated on this website. Please contact an ILMALINK expert for the latest university-issued fee structure.`,
        suggestedLinks: [targetLink],
        shouldAutoOpenCounselling: true,
      };
    }

    return {
      answer: `${resolvedGeorgiaUniversity.name}: ${
        resolvedGeorgiaUniversity.feeSummary ||
        "A detailed fee table is available on the university page."
      } Open the fee page below for the complete year/semester breakdown.`,
      suggestedLinks: [targetLink],
    };
  }

  const target = search.matchedItems.find((item) =>
    ["mbbs-india-college", "kyrgyz-university", "georgia-university"].includes(
      String(item.data?.kind)
    )
  );

  if (!target) {
    return {
      answer:
        "I could not identify the exact college or university from the question. Please type its full name or common short name so I can check whether a verified fee is available.",
      shouldAutoOpenCounselling: true,
    };
  }

  const targetLink = toDirectLink(
    target,
    `Open the full ${target.title} page for the available fee details and admission information.`
  );

  if (target.data?.kind === "mbbs-india-college") {
    const fees = asString(target.data.fees);
    const unavailable =
      !fees || normalizeSiteSearchText(fees).includes("to be updated");

    if (unavailable) {
      return {
        answer: `The verified 2026 fee for ${target.title} has not yet been updated on this website. Please contact an ILMALINK expert for the latest official fee structure.`,
        suggestedLinks: [targetLink],
        shouldAutoOpenCounselling: true,
      };
    }

    return {
      answer: `${target.title} fee: ${fees}. Open the college page below for the complete available record.`,
      suggestedLinks: [targetLink],
    };
  }

  if (target.data?.kind === "georgia-university") {
    const feeSummary = asString(target.data.feeSummary);
    const feeRows = Array.isArray(target.data.feeRows)
      ? target.data.feeRows
      : [];

    if (!feeSummary && feeRows.length === 0) {
      return {
        answer: `The verified 2026 fee for ${target.title} has not yet been updated on this website. Please contact an ILMALINK expert for the latest university-issued fee structure.`,
        suggestedLinks: [targetLink],
        shouldAutoOpenCounselling: true,
      };
    }

    return {
      answer: `${target.title}: ${
        feeSummary ?? "A detailed fee table is available on the university page."
      } Open the fee page below for the complete year/semester breakdown.`,
      suggestedLinks: [targetLink],
    };
  }

  const feeRows = Array.isArray(target.data?.feeRows)
    ? target.data.feeRows
    : [];
  const validRows = feeRows.filter((row) => {
    if (!row || typeof row !== "object") return false;
    const values = Object.values(row as Record<string, unknown>)
      .filter((value): value is string => typeof value === "string")
      .join(" ");

    return !normalizeSiteSearchText(values).includes("to be updated");
  }) as Array<{
    year?: string;
    semester?: string;
    tuitionFee?: string;
    hostelAccommodation?: string;
    mess?: string;
    totalCost?: string;
  }>;
  const firstFee = validRows[0];

  if (!firstFee) {
    return {
      answer: `The verified 2026 fee for ${target.title} has not yet been updated on this website. Please contact an ILMALINK expert for the latest university-issued fee structure.`,
      suggestedLinks: [targetLink],
      shouldAutoOpenCounselling: true,
    };
  }

  const feeLine = `${firstFee.year ?? "First listed year"} ${
    firstFee.semester ?? ""
  }: tuition ${firstFee.tuitionFee ?? "not specified"}, hostel ${
    firstFee.hostelAccommodation ?? "not specified"
  }, mess ${firstFee.mess ?? "not specified"}, total ${
    firstFee.totalCost ?? "not specified"
  }.`;

  return {
    answer: `${target.title} — ${feeLine} Open the fee page below for the full semester-wise structure and notes.`,
    suggestedLinks: [targetLink],
  };
}

function buildAccreditationAnswer(search: SiteDataSearchResponse) {
  const university = getTopByKind(search, "kyrgyz-university");

  if (!university) {
    return "Accreditation, recognition, WDOMS listing, and NMC/FMGL compliance must be checked carefully before admission. Connect ILMALINK if you want this institution checked by name.";
  }

  const label = asString(university.data?.accreditationLabel);
  const recommendation = asString(university.data?.recommendationLevel);
  const message = asString(university.data?.recommendationMessage);

  return `${university.title} is marked as "${label ?? university.description}". Recommendation status: ${recommendation ?? "needs expert review before admission"}. ${message ?? ""} Use Connect ILMALINK to check latest accreditation, course duration, internship, WDOMS, local licence eligibility, and NMC/FMGL compliance.`;
}

function buildFmgeAnswer(search: SiteDataSearchResponse) {
  const normalizedQuery = normalizeSearchQueryWithCorrections(search.query);
  const asksForCollegeVolume =
    wantsFmgeVolumeRanking(normalizedQuery) &&
    (normalizedQuery.includes("college") ||
      normalizedQuery.includes("university") ||
      normalizedQuery.includes("institute"));
  const asksForCountryVolume =
    wantsFmgeVolumeRanking(normalizedQuery) &&
    (normalizedQuery.includes("country") ||
      normalizedQuery.includes("countries"));

  if (asksForCollegeVolume) {
    return buildFmgeCollegeVolumeAnswer();
  }

  if (asksForCountryVolume) {
    return buildFmgeCountryVolumeAnswer();
  }

  const fmgeItem =
    getTopByKind(search, "fmge-country") ??
    getTopByKind(search, "fmge-college");

  if (!fmgeItem) {
    return "For FMGE comparison, enter a country or university name. Connect ILMALINK for a personalised country/university comparison.";
  }

  return `${fmgeItem.title}: ${fmgeItem.description}${formatFacts(fmgeItem)} FMGE data is only one planning indicator and does not mean NMC approval or admission suitability.`;
}

function buildNmcFmglAnswer(search: SiteDataSearchResponse) {
  const matches = search.matchedItems.slice(0, 3);
  const matchedText = matches.length
    ? ` Relevant pages found: ${matches.map((item) => item.title).join("; ")}.`
    : "";

  return `For NMC/FMGL planning, students should verify course duration, internship structure, English-medium instruction, WDOMS listing, local licence eligibility, and latest NMC/FMGL compliance before admission.${matchedText} I will not treat this as guaranteed eligibility without official verification.`;
}

function buildAdvisoryAnswer(search: SiteDataSearchResponse) {
  const advisory = search.matchedItems.find(
    (item) => item.matchedDataType === "Official Advisory"
  );

  if (advisory) {
    return `The closest advisory match is "${advisory.title}". ${advisory.description}${getLastUpdatedText(search)} Use Connect ILMALINK if you want an expert to review this advisory before you act.`;
  }

  return "Official advisories can be time-sensitive. Connect ILMALINK and our experts can review the exact country, university, counselling body or advisory topic with you.";
}

function buildGeneralAnswer(search: SiteDataSearchResponse) {
  const top = search.matchedItems[0];

  if (!top) {
    return fallbackAnswer;
  }

  return `The closest match is "${top.title}". ${top.description}${formatFacts(top)}${getSourceText()} Use Connect ILMALINK for latest rules, fees, cutoffs, accreditation, and counselling-instruction review before final admission.`;
}

export function buildSiteAnswerFromSearch(
  search: SiteDataSearchResponse
): AskIlmalinkAnswer {
  const intentBasedAnswer = buildIntentBasedCounsellingAnswer(search);

  if (intentBasedAnswer) {
    return {
      answer: intentBasedAnswer.answer,
      confidence: search.confidence,
      detectedFilters: search.detectedFilters,
      matchedItems: search.matchedItems,
      suggestedLinks:
        intentBasedAnswer.suggestedLinks ?? search.suggestedLinks,
      shouldShowConnectCTA: true,
      shouldAutoOpenCounselling: false,
      notFound: false,
    };
  }

  if (
    search.counsellingIntent.directed &&
    search.matchedItems.length === 0
  ) {
    return {
      answer: fallbackAnswer,
      confidence: "low",
      detectedFilters: search.detectedFilters,
      matchedItems: [],
      suggestedLinks: [],
      shouldShowConnectCTA: true,
      shouldAutoOpenCounselling: false,
      notFound: true,
    };
  }

  if (search.intent === "mbbs-abroad-university-recommendation") {
    const built = buildUniversityRecommendationAnswer();

    return {
      answer: built.answer,
      confidence: "high",
      detectedFilters: search.detectedFilters,
      matchedItems: search.matchedItems,
      suggestedLinks: built.suggestedLinks ?? [],
      shouldShowConnectCTA: true,
      shouldAutoOpenCounselling: false,
      notFound: false,
    };
  }

  if (
    search.intent === "mbbs-india-cutoff" ||
    search.intent === "university-fee"
  ) {
    const built =
      search.intent === "mbbs-india-cutoff"
        ? buildCutoffAnswer(search)
        : buildFeeAnswer(search);

    return {
      answer: built.answer,
      confidence:
        search.matchedItems.length > 0 ? search.confidence : "medium",
      detectedFilters: search.detectedFilters,
      matchedItems: search.matchedItems,
      suggestedLinks: built.suggestedLinks ?? search.suggestedLinks,
      shouldShowConnectCTA: true,
      shouldAutoOpenCounselling:
        built.shouldAutoOpenCounselling ?? false,
      notFound: false,
    };
  }

  const notFound =
    search.matchedItems.length === 0 || search.confidence === "low";

  if (notFound) {
    return {
      answer: fallbackAnswer,
      confidence: search.confidence,
      detectedFilters: search.detectedFilters,
      matchedItems: search.matchedItems,
      suggestedLinks: search.suggestedLinks,
      shouldShowConnectCTA: true,
      shouldAutoOpenCounselling: false,
      notFound: true,
    };
  }

  const built: BuiltAnswer =
    search.intent === "mbbs-india-state-counselling"
        ? { answer: buildStateCounsellingAnswer(search) }
        : search.intent === "seat-matrix-round-update"
          ? { answer: buildSeatMatrixAnswer(search) }
          : search.intent === "mbbs-india-college-search"
            ? { answer: buildCollegeAnswer(search) }
            : search.intent === "mbbs-abroad-country-comparison"
              ? { answer: buildCountryComparisonAnswer(search) }
              : search.intent === "accreditation-status"
                  ? { answer: buildAccreditationAnswer(search) }
                  : search.intent === "fmge-data"
                    ? { answer: buildFmgeAnswer(search) }
                    : search.intent === "nmc-fmgl-rules"
                      ? { answer: buildNmcFmglAnswer(search) }
                      : search.intent === "official-advisory"
                        ? { answer: buildAdvisoryAnswer(search) }
                        : { answer: buildGeneralAnswer(search) };

  return {
    answer: built.answer,
    confidence: search.confidence,
    detectedFilters: search.detectedFilters,
    matchedItems: search.matchedItems,
    suggestedLinks: built.suggestedLinks ?? search.suggestedLinks,
    shouldShowConnectCTA: true,
    shouldAutoOpenCounselling:
      built.shouldAutoOpenCounselling ?? false,
    notFound: false,
  };
}

export function answerSiteQuestion(question: string) {
  const search = searchInternalSiteData(question);

  return buildSiteAnswerFromSearch(search);
}
