"use client";

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useDeferredValue,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Loader2, MessageCircle, Sparkles } from "lucide-react";
import {
  globalSearchIndex,
  type GlobalSearchEntry,
} from "../data/searchIndex";
import neetSearchEntries from "../data/neetSearchEntries.json";
import {
  getMBBSIndiaStateCounselling2025,
} from "../data/mbbsIndiaCounselling";
import { mbbsIndiaCollegesByState } from "../data/mbbsIndiaColleges";
import { getAllMBBSIndiaCollegeFacts } from "../data/mbbsIndiaCollegeFacts";
import { getMBBSIndiaAdmissionAccess } from "../data/mbbsIndiaAdmissionAccess";
import { navbarCountryDestinations } from "../data/navbarDestinations";
import { kyrgyzstanUniversities } from "../data/kyrgyzstanUniversities";
import { georgiaUniversities } from "../data/georgiaUniversities";
import { getMBBSIndiaStateHref } from "../data/exploreLinks";
import { predictNeetRankRangeFromMarks } from "@/lib/neetRankPredictor";
import {
  buildInternalSearchQueryProfile,
  classifyInternalSearchRecord,
  getInternalSearchRankingBoost,
  passesInternalSearchRegionFilter,
  type InternalSearchRecordClassification,
} from "@/lib/internalSearchRanking";

type EnhancedSearchEntry = GlobalSearchEntry & {
  country?: string;
  state?: string;
  city?: string;
  course?: string;
  regionType?: "india" | "abroad" | "global";
  searchIntent?: string[];
  collegeName?: string;
  institutionName?: string;
  entityNames?: string[];
  aliases?: string[];
  feeData?: string[];
  numericalData?: string[];
  counsellingIndex?: string[];
  exam?: string;
  quota?: string;
  categoryType?: string;
  budgetLevel?: "low" | "medium" | "high";
  dataSource?: "page" | "blog" | "fmge" | "manual" | "database";
  canonicalKey?: string;
};

type SearchResult = EnhancedSearchEntry & {
  score: number;
};

type PreparedSearchEntry = {
  entry: EnhancedSearchEntry;
  classification: InternalSearchRecordClassification;
  title: string;
  description: string;
  category: string;
  tags: string;
  content: string;
  url: string;
  metadataText: string;
  searchableText: string;
  titleTokens: string[];
  descriptionTokens: string[];
  tagTokens: string[];
  categoryTokens: string[];
  metadataTokens: string[];
  closingRanks: number[];
};

type AskSuggestedLink = {
  title: string;
  description: string;
  url: string;
  sourceLabel: string;
  dataType: string;
  lastUpdated?: string | null;
  details?: string[];
  whySuggested?: string;
};

type AskSource = {
  title: string;
  description?: string;
  url: string;
  category?: string;
};

type AskAnswerMode = "strong_answer" | "direct_page_answer" | "no_answer";

type AskilmaLinkResponse = {
  answer: string;
  mode?: AskAnswerMode;
  confidence: "high" | "medium" | "low";
  sources?: AskSource[];
  dataAvailable?: boolean;
  partialData?: boolean;
  needsCounselling?: boolean;
  openCounsellingPopup?: boolean;
  detectedFilters?: string[];
  matchedItems?: unknown[];
  suggestedLinks?: AskSuggestedLink[];
  shouldShowConnectCTA?: boolean;
  shouldAutoOpenCounselling?: boolean;
  notFound?: boolean;
};

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenCounselling?: () => void;
};

const RECENT_SEARCH_KEY = "ilmalink-search-recent";
const MAX_RESULTS = 16;
const OPEN_COUNSELLING_EVENT = "ilmalink:open-counselling";
const OPEN_RANK_PREDICTOR_EVENT = "ilmalink:open-rank-predictor";
const noMatchAnswer =
  "Search is taking longer than expected. Please try again or chat with an ilmaLink expert.";

const isColdNoMatchAnswer = (answer: string) =>
  /not available|not yet available|no exact|no data|no result|information is not/i.test(answer);
const answerDisclaimer =
  "Cutoffs, fees, counselling rules, accreditation, FMGE/NExT outcomes, and NMC/FMGL compliance can change. Use Connect ilmaLink for a personalised eligibility review before final admission.";
const searchSpellingAliases: Record<string, string> = {
  collage: "college",
  colage: "college",
  colleg: "college",
  collge: "college",
  colloge: "college",
  counceling: "counselling",
  councling: "counselling",
  counselng: "counselling",
  cutof: "cutoff",
  cuttoff: "cutoff",
  fgme: "fmge",
  fmg: "fmge",
  fmgee: "fmge",
  kirgistan: "kyrgyzstan",
  kirgigystan: "kyrgyzstan",
  kirgizstan: "kyrgyzstan",
  kirgystan: "kyrgyzstan",
  kyrgistan: "kyrgyzstan",
  kyrgyzsthan: "kyrgyzstan",
  kyrgyztan: "kyrgyzstan",
  kyrgyzystan: "kyrgyzstan",
  mbb: "mbbs",
  mbbsindia: "mbbs",
  phillipines: "philippines",
  philipines: "philippines",
  universitys: "universities",
  univercity: "university",
  unversity: "university",
  uzbakistan: "uzbekistan",
  uzbekstan: "uzbekistan",
    clg: "college",
  cllge: "college",
  cllege: "college",
  medicle: "medical",
  medicl: "medical",
  universiti: "university",
  univeristy: "university",
  univesity: "university",
  westbengal: "west bengal",
  bangal: "bengal",
  bengol: "bengal",
  kalkata: "kolkata",
  kalkutta: "kolkata",
  calcutta: "kolkata",
  maharastra: "maharashtra",
  maharashta: "maharashtra",
  karnatka: "karnataka",
  tamilnadu: "tamil nadu",
  telengana: "telangana",
  uttarpradesh: "uttar pradesh",
  madhyapradesh: "madhya pradesh",
  andhrapradesh: "andhra pradesh",
  chattisgarh: "chhattisgarh",
  odissa: "odisha",
  rajastan: "rajasthan",
  gujrat: "gujarat",
  uttrakhand: "uttarakhand",
  bangaldesh: "bangladesh",
  bangladeshmbbs: "bangladesh mbbs",
  geogia: "georgia",
  gerogia: "georgia",
  russiaa: "russia",
  kazakstan: "kazakhstan",
  tajikstan: "tajikistan",
  saudiarabia: "saudi arabia",
  counsiling: "counselling",
  councelling: "counselling",
  eligiblity: "eligibility",
  eligibilty: "eligibility",
};
const searchCorrectionVocabulary = [
  "abroad",
  "academy",
  "accreditation",
  "admission",
  "advisory",
  "appeared",
  "budget",
  "college",
  "colleges",
  "counselling",
  "country",
  "cutoff",
  "fee",
  "fees",
  "fmge",
  "fmgl",
  "georgia",
  "hostel",
  "india",
  "institute",
  "internship",
  "kyrgyzstan",
  "matrix",
  "mbbs",
  "medical",
  "neet",
  "nmc",
  "private",
  "quota",
  "result",
  "round",
  "seat",
  "state",
  "study",
  "tbilisi",
  "tuition",
  "university",
  "universities",
  "uzbekistan",
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const levenshteinDistance = (first: string, second: string) => {
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
};

const correctSearchToken = (term: string) => {
  const aliased = searchSpellingAliases[term];
  if (aliased) return aliased;
  if (term.length <= 3 || searchCorrectionVocabulary.includes(term)) return term;

  const allowedDistance = term.length <= 5 ? 1 : term.length <= 8 ? 2 : 3;
  let bestTerm = term;
  let bestDistance = Number.POSITIVE_INFINITY;

  searchCorrectionVocabulary.forEach((candidate) => {
    if (Math.abs(candidate.length - term.length) > allowedDistance) return;

    const distance = levenshteinDistance(term, candidate);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestTerm = candidate;
    }
  });

  return bestDistance <= allowedDistance ? bestTerm : term;
};

const tokenize = (value: string) =>
  normalize(value)
    .split(/[^a-z0-9%]+/)
    .filter((term) => term.length > 0)
    .map(correctSearchToken);

const normalizeQueryForSearch = (value: string) => tokenize(value).join(" ");

const slugifySearchId = (value: string) =>
  normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const mbbsIndiaDirectorySearchEntry: EnhancedSearchEntry = {
  id: "mbbs-india-directory",
  title: "Study MBBS in India - Full NMC Medical College List",
  description: "Open the complete state-wise MBBS India directory with government, private, seat intake, and college details.",
  url: "/mbbs-india/",
  category: "MBBS India",
  group: "Pages",
  type: "page",
  tags: ["MBBS India", "Study MBBS in India", "NMC college list", "Medical colleges in India"],
  content:
    "Study MBBS in India full NMC medical college list state-wise government private colleges seats fees counselling 2025 prior-year data 5.5 year course 4.5 year academic study 1 year internship NEET 180 questions 720 marks Physics Chemistry Biology",
  priority: 100,
  country: "India",
  regionType: "india",
  course: "MBBS",
  searchIntent: ["college-search", "counselling", "rank-predictor"],
  counsellingIndex: [
    "neet",
    "rank predictor",
    "closing rank",
    "cutoff",
    "aiq",
    "mcc",
    "state quota",
  ],
  dataSource: "manual",
};
const neetRankPredictorSearchEntry: EnhancedSearchEntry = {
  id: "neet-rank-predictor-search-entry",
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
    "government medical college",
    "private medical college",
  ],
  content:
    "NEET marks score rank predictor MBBS India college options government medical college private medical college previous year counselling cutoff closing rank category quota state domicile AIQ MCC state quota",
  priority: 125,
  country: "India",
  regionType: "india",
  course: "MBBS",
  searchIntent: ["rank-predictor", "counselling", "college-search"],
  counsellingIndex: [
    "neet",
    "rank predictor",
    "closing rank",
    "cutoff",
    "aiq",
    "mcc",
    "state quota",
  ],
  dataSource: "manual",
};

const navbarDropdownSearchEntries: GlobalSearchEntry[] = navbarCountryDestinations.map((destination) => ({
  id: `navbar-destination-${slugifySearchId(destination.label)}`,
  title: `Study MBBS in ${destination.label}`,
  description: destination.insight,
  url: destination.href,
  category: "MBBS Abroad",
  group: "Destinations",
  type: "destination",
  tags: [
    destination.label,
    `Study MBBS in ${destination.label}`,
    "MBBS Abroad",
    "Navbar destination",
    destination.badge === "Top" ? "Top destination" : "Destination",
  ],
  content: [
    `Study MBBS in ${destination.label}`,
    destination.label,
    destination.insight,
    "universities fees eligibility FMGE admission counselling",
  ].join(" "),
  priority: destination.badge === "Top" ? 99 : 94,
}));

const mbbsIndiaStateSearchEntries: GlobalSearchEntry[] = mbbsIndiaCollegesByState.map((group) => {
  const access = getMBBSIndiaAdmissionAccess(group.state, group.privateCount);
  const counselling = getMBBSIndiaStateCounselling2025(group.state);
  const collegeNames = [...group.governmentColleges, ...group.privateColleges]
    .map((college) => college.collegeName)
    .join(" ");
  const counsellingSummary = counselling
    ? `${counselling.seatMatrix.length} seat-matrix rows and ${counselling.cutoffs.length} colleges with 2025 cutoff data.`
    : "";

  return {
    id: `mbbs-india-state-${slugifySearchId(group.state)}`,
    title: `MBBS Colleges in ${group.state}`,
    description: `${access.label}: ${group.privateCount} private, ${group.governmentCount} government, and ${group.totalSeats.toLocaleString("en-IN")} MBBS seats in ${group.state}. ${counsellingSummary}`.trim(),
    url: getMBBSIndiaStateHref(group.state),
    category: "MBBS India",
    group: "Pages",
    type: "page",
    tags: [
      group.state,
      `Study MBBS in ${group.state}`,
      access.label,
      "MBBS India",
      "Medical colleges in India",
      "NMC college list",
      ...(counselling ? ["2025 counselling", "seat matrix", "closing rank", "closing score"] : []),
    ],
    content: [
      `Study MBBS in ${group.state}`,
      `MBBS colleges in ${group.state}`,
      `${group.governmentCount} government colleges`,
      `${group.privateCount} private colleges`,
      `${group.totalSeats} seats`,
      access.detail,
      counsellingSummary,
      counselling?.stateFacts
        ? `${counselling.stateFacts.governmentStateQuotaPercent}% government state quota ${counselling.stateFacts.privateStateQuotaPercent}% private state quota management quota all India`
        : "",
      collegeNames,
    ].join(" "),
    priority: 96,
  };
});

const mbbsIndiaCollegeSearchEntries: EnhancedSearchEntry[] = getAllMBBSIndiaCollegeFacts().map((facts) => {
  const { college, counselling } = facts;
  const access = getMBBSIndiaAdmissionAccess(college.state);
  const feeLabel = facts.hasFee ? `Fees: ${facts.feeText}` : "Fees to be updated";
  const feeTags = facts.hasFee ? [facts.feeText] : [];

  return {
    id: `mbbs-india-college-${slugifySearchId(`${college.state}-${college.collegeName}`)}`,
    title: college.collegeName,
    description: `${college.category} medical college in ${college.state} with ${college.seatCapacity.toLocaleString("en-IN")} MBBS seats. ${feeLabel}. ${access.label}.${counselling ? " Includes 2025 prior-year counselling data." : ""}`,
    url: facts.href,
    category: "MBBS India",
    group: "Pages",
    type: "page",
    tags: [
      college.state,
      college.category,
      access.label,
      "MBBS India",
      "Medical college",
      "NMC college list",
      `Study MBBS in ${college.state}`,
      "fees",
      "fee structure",
      "seat matrix",
      "cutoff",
      "closing rank",
      "last rank",
      ...feeTags,
      ...(counselling ? ["2025 counselling", "closing score"] : []),
    ],
    content: [
      facts.searchableText,
      access.detail,
      facts.seatText,
      feeLabel,
      `Study MBBS in ${college.state}`,
      facts.seatMatrixText,
      facts.cutoffText,
    ].join(" "),
    country: "India",
    state: college.state,
    collegeName: college.collegeName,
    regionType: "india",
    course: "MBBS",
    searchIntent: ["college-search", "counselling", "fees", "cutoff"],
    feeData: [facts.feeText, feeLabel].filter(Boolean),
    numericalData: [
      `${college.seatCapacity} seats`,
      `established ${college.establishmentYear}`,
      facts.seatMatrixText,
      facts.cutoffText,
    ],
    counsellingIndex: [
      "NEET",
      "state quota",
      "management quota",
      "seat matrix",
      "cutoff",
      "closing rank",
      "last rank",
      facts.hasSeatMatrix ? "2025 seat matrix available" : "seat matrix to be updated",
      facts.hasCutoff ? "2025 cutoff available" : "cutoff to be updated",
    ],
    dataSource: "database",
    data: {
      kind: "mbbs-india-college",
      country: "India",
      state: college.state,
      category: college.category,
      collegeName: college.collegeName,
      seatCapacity: college.seatCapacity,
      establishmentYear: college.establishmentYear,
      fees: facts.feeText,
      hasFee: facts.hasFee,
      hasSeatMatrix: facts.hasSeatMatrix,
      hasCutoff: facts.hasCutoff,
    },
    priority: college.category === "Private" && access.status === "open" ? 94 : college.category === "Government" ? 92 : 90,
  };
});

const kyrgyzstanUniversitySearchEntries: GlobalSearchEntry[] = kyrgyzstanUniversities.map((university) => {
  const firstFee = university.feeRows[0];
  const campusSummary = university.campuses?.length
    ? university.campuses
        .map((campus) => {
          const firstCampusFee = campus.feeRows[0];
          const feeText =
            firstCampusFee?.totalCost &&
            firstCampusFee.totalCost !== "Not specified"
              ? `first listed total ${firstCampusFee.totalCost}`
              : firstCampusFee?.tuitionFee
                ? `first listed tuition ${firstCampusFee.tuitionFee}`
                : "fee table available";

          return [
            campus.name,
            campus.location,
            campus.address,
            campus.program,
            campus.intake,
            feeText,
            ...campus.highlights,
            ...campus.entryRequirements,
            ...campus.documentChecklist,
          ].join(" ");
        })
        .join(" ")
    : "";
  const feeSummary = university.campuses?.length
    ? `Campus-wise fee tables available for ${university.campuses
        .map((campus) => campus.name)
        .join(" and ")}`
    : firstFee && firstFee.totalCost !== "To be updated"
      ? `${university.intake}: first listed total ${firstFee.totalCost}`
      : "Fees: To be updated";
  const fmgeSummary = university.fmgePerformance?.length
    ? university.fmgePerformance
        .map(
          (item) =>
            `${item.sourceName}: ${item.appeared} appeared, ${item.passed} passed, ${item.passRate} pass rate`
        )
        .join(" ")
    : "FMGE 2025 match to be updated";

  return {
    id: `kyrgyzstan-university-${slugifySearchId(university.slug)}`,
    title: university.name,
    description: `${university.recommendationLevel}: ${university.accreditationLabel}. ${feeSummary}.`,
    url: university.pageExists
      ? `/mbbs-abroad/kyrgyzstan/${university.slug}/`
      : `/`,
    category: "Kyrgyzstan Universities",
    group: "Destinations",
    type: "destination",
    tags: [
      "Kyrgyzstan",
      "MBBS in Kyrgyzstan",
      university.recommendationLevel,
      university.accreditationLabel,
      university.location,
      ...(university.campuses?.map((campus) => campus.name) ?? []),
      ...(university.campuses?.map((campus) => campus.location) ?? []),
    ],
    content: [
      university.name,
      university.location,
      university.program,
      university.intake,
      university.accreditationStatus,
      university.recommendationLevel,
      university.recommendationMessage,
      feeSummary,
      campusSummary,
      fmgeSummary,
      ...university.highlights,
      ...university.entryRequirements,
      ...university.documentChecklist,
    ].join(" "),
    priority: university.pageExists ? 101 : university.recommendationLevel.includes("Recommended") ? 98 : 91,
  };
});

const georgiaUniversitySearchEntries: GlobalSearchEntry[] = georgiaUniversities.map((university) => {
  const firstFee = university.feeRows[0];
  const feeRowsText = university.feeRows
    .map(
      (row) =>
        `${row.year} ${row.semester} tuition ${row.tuitionFee} hostel mess ${row.hostelAndMess} total ${row.semesterTotal}`
    )
    .join(" ");
  const additionalFeeText = university.additionalFees
    .map((fee) => `${fee.label} ${fee.amount} ${fee.note ?? ""}`)
    .join(" ");
  const fmgeSummary = university.fmgePerformance?.length
    ? university.fmgePerformance
        .map(
          (item) =>
            `${item.sourceName}: ${item.appeared} appeared, ${item.passed} passed, ${item.passRate} pass rate`
        )
        .join(" ")
    : "FMGE 2025 match to be verified";

  return {
    id: `georgia-university-${slugifySearchId(university.slug)}`,
    title: university.name,
    description: `${university.recommendationLabel}. ${university.feeSummary}`,
    url: university.pageExists
      ? `/mbbs-abroad/georgia/${university.slug}/`
      : `/mbbs-abroad/georgia?q=${encodeURIComponent(university.name)}#georgia-universities`,
    category: "Georgia Universities",
    group: "Destinations",
    type: "destination",
    tags: [
      "Georgia",
      "MBBS in Georgia",
      "Tbilisi",
      university.name,
      university.shortName ?? "",
      university.city,
      university.recommendationLabel,
      university.accreditationLabel,
      university.totalTuition ?? "",
      university.annualTuition ?? "",
    ].filter(Boolean),
    content: [
      university.name,
      university.shortName ?? "",
      university.city,
      university.location,
      university.program,
      university.intake,
      university.duration,
      university.medium,
      university.summary,
      university.feeSummary,
      university.totalTuition ?? "",
      university.annualTuition ?? "",
      university.mandatoryHostelMess ?? "",
      university.livingCost ?? "",
      firstFee
        ? `${firstFee.year} ${firstFee.semester} tuition ${firstFee.tuitionFee} hostel ${firstFee.hostelAndMess} total ${firstFee.semesterTotal}`
        : "",
      feeRowsText,
      additionalFeeText,
      ...university.highlights,
      ...university.feeNotes,
      ...university.entryRequirements,
      ...university.documentChecklist,
      ...university.facilities,
      fmgeSummary,
      "EEU East European University Georgia Tbilisi fees fee structure hostel mess tuition MBBS MD FMGE NMC FMGL WDOMS admission documents",
    ].join(" "),
    priority: university.pageExists ? 103 : 94,
  };
});

const neetSectionSearchEntries = neetSearchEntries as GlobalSearchEntry[];

const siteSearchIndex: EnhancedSearchEntry[] = Array.from(
  new Map(
    [
      neetRankPredictorSearchEntry,
      mbbsIndiaDirectorySearchEntry,
      ...neetSectionSearchEntries,
      ...navbarDropdownSearchEntries,
      ...kyrgyzstanUniversitySearchEntries,
      ...georgiaUniversitySearchEntries,
      ...mbbsIndiaStateSearchEntries,
      ...mbbsIndiaCollegeSearchEntries,
      ...globalSearchIndex,
    ].map((entry) => [`${entry.id}|${entry.url}`, entry])
  ).values()
);

const noiseSearchTerms = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "best",
  "better",
  "for",
  "from",
  "good",
  "in",
  "is",
  "me",
  "my",
  "near",
  "of",
  "please",
  "show",
  "tell",
  "the",
  "to",
  "top",
  "what",
  "which",
  "with",
]);

const normalizeSearchText = (value: string) =>
  normalizeQueryForSearch(value)
    .replace(/[^a-z0-9%]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const normalizeIndexedText = (value: string) =>
  normalize(value)
    .replace(/[^a-z0-9%]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenizeIndexedText = (value: string) => {
  const normalized = normalizeIndexedText(value);
  return normalized ? normalized.split(" ") : [];
};

type PredictedRankRange = {
  source: "direct-rank" | "marks-prediction";
  marks?: number;
  estimatedRank?: number;
  minRank: number;
  maxRank: number;
  label?: string;
};

const extractNumberValue = (value: string) => {
  const clean = value.replace(/,/g, "");
  const number = Number(clean);
  return Number.isFinite(number) ? number : null;
};

const extractDirectNeetRank = (queryText: string) => {
  const rankMatch =
    queryText.match(/\brank\s+([0-9][0-9,]*)\b/i) ??
    queryText.match(/\b([0-9][0-9,]*)\s+rank\b/i);

  if (!rankMatch?.[1]) return null;

  const rank = extractNumberValue(rankMatch[1]);
  return rank && rank > 0 ? rank : null;
};

const extractNeetMarks = (queryText: string) => {
  const hasMarksSignal = /\b(mark|marks|score|scored|neet)\b/i.test(queryText);

  if (!hasMarksSignal) return null;

  const matches = [...queryText.matchAll(/\b([0-9]{2,3})\b/g)]
    .map((match) => Number(match[1]))
    .filter((value) => value >= 0 && value <= 720);

  return matches[0] ?? null;
};

const getQueryRankRange = (queryText: string): PredictedRankRange | null => {
  const directRank = extractDirectNeetRank(queryText);

  if (directRank) {
    return {
      source: "direct-rank",
      minRank: Math.max(1, Math.floor(directRank * 0.9)),
      maxRank: Math.ceil(directRank * 1.1),
      label: `Direct rank query around ${directRank.toLocaleString("en-IN")}`,
    };
  }

  const marks = extractNeetMarks(queryText);

  if (marks === null) return null;

  const prediction = predictNeetRankRangeFromMarks(marks);

  if (!prediction) return null;

  return {
    source: "marks-prediction",
    marks,
    estimatedRank: prediction.estimatedRank,
    minRank: prediction.minRank,
    maxRank: prediction.maxRank,
    label: prediction.rankZoneLabel,
  };
};

const extractClosingRanksFromEntry = (entry: EnhancedSearchEntry) => {
  const raw = [entry.description, entry.content, ...(entry.numericalData ?? [])]
    .filter(Boolean)
    .join(" ");

  return [...raw.matchAll(/\brank\s+([0-9][0-9,]*)\b/gi)]
    .map((match) => extractNumberValue(match[1]))
    .filter((rank): rank is number => Boolean(rank && rank > 0));
};

const rankMatchScore = (
  preparedEntry: PreparedSearchEntry,
  rankRange: PredictedRankRange | null
) => {
  if (!rankRange) return 0;

  const { entry, searchableText, closingRanks: ranks } = preparedEntry;

  if (entry.id === "neet-rank-predictor-search-entry") {
    return 700;
  }

  if (!/mbbs india|medical college|counselling|closing rank|cutoff|seat matrix|state quota|aiq|mcc/i.test(searchableText)) {
    return 0;
  }

  if (!ranks.length) {
    return /mbbs india|counselling|college predictor|rank predictor/i.test(searchableText)
      ? 140
      : 0;
  }

  const mostOpenClosingRank = Math.max(...ranks);
  const bestClosingRank = Math.min(...ranks);

  if (mostOpenClosingRank >= rankRange.maxRank) return 360;
  if (mostOpenClosingRank >= rankRange.minRank) return 250;

  if (bestClosingRank <= rankRange.maxRank && mostOpenClosingRank >= rankRange.minRank) {
    return 220;
  }

  if (mostOpenClosingRank >= Math.floor(rankRange.minRank * 0.75)) return 100;

  return -100;
};
const analyseSearchQuery = (
  rawQuery: string,
  normalizedQuery: string,
  terms: string[]
) => {
  const queryText = normalizeSearchText(`${rawQuery} ${normalizedQuery} ${terms.join(" ")}`);
  const internalProfile = buildInternalSearchQueryProfile(rawQuery);

  const intents = {
    fees: internalProfile.intents.fees,
    eligibility: internalProfile.intents.eligibility,
    counselling: internalProfile.intents.counselling,
    fmge: internalProfile.intents.fmgeNmc,
    college: internalProfile.intents.college,
    scholarship: internalProfile.intents.scholarship,
    documents: internalProfile.intents.documents,
  };

  const numbers = internalProfile.numbers.map((number) => number.raw);
  const rankRange = getQueryRankRange(queryText);
  const meaningfulTerms = terms.filter(
    (term) =>
      term.length > 1 &&
      !noiseSearchTerms.has(term) &&
      !["mbbs", "medical", "study"].includes(term)
  );

  return {
    queryText,
    state: internalProfile.state ?? "",
    abroadCountry: internalProfile.country ?? "",
    isIndiaIntent: internalProfile.regionIntent === "india",
    isAbroadIntent: internalProfile.regionIntent === "abroad",
    intents,
    numbers,
    rankRange,
    meaningfulTerms,
    hasComparisonIntent: internalProfile.comparison,
    internalProfile,
  };
};

const tokenScore = (tokens: string[], term: string, exactScore: number, startsWithScore: number, includesScore: number) => {
  if (tokens.some((token) => token === term)) return exactScore;
  if (tokens.some((token) => token.startsWith(term))) return startsWithScore;
  if (tokens.some((token) => token.includes(term))) return includesScore;
  return 0;
};

const prepareSearchEntry = (entry: EnhancedSearchEntry): PreparedSearchEntry => {
  const title = normalizeIndexedText(entry.title);
  const description = normalizeIndexedText(entry.description);
  const category = normalizeIndexedText(entry.category);
  const tags = normalizeIndexedText(entry.tags.join(" "));
  const content = normalizeIndexedText(entry.content);
  const url = normalizeIndexedText(entry.url);
  const metadataText = normalizeIndexedText(
    [
      entry.country,
      entry.state,
      entry.city,
      entry.course,
      entry.regionType,
      ...(entry.searchIntent ?? []),
      entry.collegeName,
      entry.institutionName,
      ...(entry.entityNames ?? []),
      ...(entry.aliases ?? []),
      ...(entry.feeData ?? []),
      ...(entry.numericalData ?? []),
      ...(entry.counsellingIndex ?? []),
      entry.exam,
      entry.quota,
      entry.categoryType,
      entry.budgetLevel,
    ]
      .filter(Boolean)
      .join(" ")
  );

  return {
    entry,
    classification: classifyInternalSearchRecord(entry),
    title,
    description,
    category,
    tags,
    content,
    url,
    metadataText,
    searchableText: [
      title,
      description,
      category,
      tags,
      content,
      url,
      metadataText,
    ].join(" "),
    titleTokens: tokenizeIndexedText(entry.title),
    descriptionTokens: tokenizeIndexedText(entry.description),
    tagTokens: tokenizeIndexedText(entry.tags.join(" ")),
    categoryTokens: tokenizeIndexedText(entry.category),
    metadataTokens: metadataText ? metadataText.split(" ") : [],
    closingRanks: extractClosingRanksFromEntry(entry),
  };
};

const preparedSiteSearchIndex = siteSearchIndex.map(prepareSearchEntry);

type SearchQueryProfile = ReturnType<typeof analyseSearchQuery>;

const scoreResult = (
  preparedEntry: PreparedSearchEntry,
  queryProfile: SearchQueryProfile,
  normalizedQuery: string,
  queryTerms: string[]
) => {
  const {
    entry,
    classification: entryRegion,
    title,
    description,
    category,
    tags,
    content,
    url,
    metadataText,
    searchableText,
    titleTokens,
    descriptionTokens,
    tagTokens,
    categoryTokens,
    metadataTokens,
  } = preparedEntry;

  if (
    !passesInternalSearchRegionFilter(
      queryProfile.internalProfile,
      entryRegion
    )
  ) {
    return 0;
  }

  if (queryProfile.state && entryRegion.regionType === "abroad" && !queryProfile.hasComparisonIntent) {
    return 0;
  }

  if (
    queryProfile.isIndiaIntent &&
    !queryProfile.isAbroadIntent &&
    entryRegion.regionType === "abroad" &&
    !queryProfile.hasComparisonIntent
  ) {
    return 0;
  }

  if (
    queryProfile.abroadCountry &&
    entryRegion.country &&
    entryRegion.country !== queryProfile.abroadCountry &&
    !queryProfile.hasComparisonIntent
  ) {
    return 0;
  }

  const usefulTerms = queryProfile.meaningfulTerms.length
    ? queryProfile.meaningfulTerms
    : queryTerms.filter((term) => !noiseSearchTerms.has(term));

  const matchedUsefulTerms = usefulTerms.filter((term) => searchableText.includes(term));

  if (usefulTerms.length >= 3 && matchedUsefulTerms.length < 2) return 0;
  if (usefulTerms.length > 0 && matchedUsefulTerms.length === 0) return 0;

  let score = Number(entry.priority || 0);
  score += getInternalSearchRankingBoost(
    queryProfile.internalProfile,
    entryRegion,
    entry,
    searchableText
  );

  if (title === normalizedQuery) score += 700;
  if (title.includes(normalizedQuery)) score += 280;
  if (tags.includes(normalizedQuery)) score += 220;
  if (metadataText.includes(normalizedQuery)) score += 210;
  if (description.includes(normalizedQuery)) score += 140;
  if (category.includes(normalizedQuery)) score += 100;
  if (url.includes(normalizedQuery)) score += 70;
  if (content.includes(normalizedQuery)) score += 30;

  usefulTerms.forEach((term) => {
    score += tokenScore(titleTokens, term, 140, 95, 65);
    score += tokenScore(metadataTokens, term, 130, 85, 55);
    score += tokenScore(tagTokens, term, 100, 70, 45);
    score += tokenScore(categoryTokens, term, 75, 50, 30);
    score += tokenScore(descriptionTokens, term, 55, 35, 22);
    if (content.includes(term)) score += 12;
  });

  if (queryProfile.state && entryRegion.state === queryProfile.state) score += 450;
  if (queryProfile.state && entryRegion.country === "India") score += 180;
  if (queryProfile.isIndiaIntent && entryRegion.regionType === "india") score += 260;
  if (queryProfile.abroadCountry && entryRegion.country === queryProfile.abroadCountry) score += 450;
  if (queryProfile.isAbroadIntent && entryRegion.regionType === "abroad") score += 180;

  if (queryProfile.intents.college && /college|university|institute|academy/i.test(entry.title)) score += 140;
  if (queryProfile.intents.fees && /fee|fees|tuition|cost|budget|hostel|mess|usd|inr|lakh/i.test(searchableText)) score += 170;
  if (queryProfile.intents.eligibility && /eligibility|eligible|neet|gpa|pcb|marks|percentage|requirement/i.test(searchableText)) score += 160;
  if (queryProfile.intents.counselling && /counselling|seat matrix|closing rank|cutoff|quota|round|gmr|pmr|wbjee|mcc|aiq/i.test(searchableText)) score += 180;
  if (queryProfile.intents.fmge && /fmge|nmc|fmgl|wdoms|appeared|passed|pass rate/i.test(searchableText)) score += 170;
  if (queryProfile.intents.scholarship && /scholarship|loan|financial aid|education loan/i.test(searchableText)) score += 160;
  if (queryProfile.intents.documents && /document|documents|passport|scorecard|admit card/i.test(searchableText)) score += 140;

  if (queryProfile.rankRange) {
  score += rankMatchScore(preparedEntry, queryProfile.rankRange);

  if (entryRegion.regionType === "india") score += 220;
  if (entry.category === "MBBS India") score += 220;
  if (entry.url.startsWith("/mbbs-india")) score += 220;

  if (/government/i.test(searchableText)) score += 45;
  if (/private/i.test(searchableText)) score += 45;

  if (/closing rank|cutoff|seat matrix|round|quota/i.test(searchableText)) {
    score += 120;
  }
} else if (queryProfile.numbers.length > 0 && /\d/.test(searchableText)) {
  score += 60;
}

  if (queryProfile.isIndiaIntent && entry.category === "MBBS India") score += 220;
  if (queryProfile.isIndiaIntent && entry.url.startsWith("/mbbs-india")) score += 220;

  if (
    queryProfile.isIndiaIntent &&
    !queryProfile.isAbroadIntent &&
    /FMGE Data|Kyrgyzstan Universities|Georgia Universities|MBBS Abroad/i.test(entry.category)
  ) {
    score -= 500;
  }

  if (
    queryProfile.abroadCountry &&
    entryRegion.country &&
    entryRegion.country !== queryProfile.abroadCountry
  ) {
    score -= 500;
  }

  return Math.max(0, score);
};

export default function SearchModal({ isOpen, onClose, onOpenCounselling }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const stored = window.localStorage.getItem(RECENT_SEARCH_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [askAnswer, setAskAnswer] = useState<AskilmaLinkResponse | null>(null);
  const [askLoading, setAskLoading] = useState(false);
  const [askError, setAskError] = useState("");
  const [hasAsked, setHasAsked] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState("");
  const requestControllerRef = useRef<AbortController | null>(null);

  const storeRecentSearch = useCallback(
    (term: string) => {
      const trimmed = term.trim();
      if (!trimmed || typeof window === "undefined") return;

      const updated = [
        trimmed,
        ...recentSearches.filter((item) => item.toLowerCase() !== trimmed.toLowerCase()),
      ].slice(0, 5);

      setRecentSearches(updated);
      window.localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
    },
    [recentSearches]
  );

  const deferredQuery = useDeferredValue(query);
  const searchTerms = useMemo(() => normalizeQueryForSearch(deferredQuery), [deferredQuery]);
  const queryTokens = useMemo(() => tokenize(deferredQuery), [deferredQuery]);
  const queryProfile = useMemo(
    () => analyseSearchQuery(deferredQuery, searchTerms, queryTokens),
    [deferredQuery, queryTokens, searchTerms]
  );
  const trimmedQuery = query.trim();
  const filteredResults = useMemo<SearchResult[]>(() => {
    if (!searchTerms) {
      return [...siteSearchIndex]
        .sort((a, b) => b.priority - a.priority || a.title.localeCompare(b.title))
        .slice(0, MAX_RESULTS)
        .map((result) => ({ ...result, score: result.priority }));
    }

    return preparedSiteSearchIndex
      .map((preparedEntry) => ({
        ...preparedEntry.entry,
        score: scoreResult(preparedEntry, queryProfile, searchTerms, queryTokens),
      }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || b.priority - a.priority || a.title.localeCompare(b.title))
      .slice(0, MAX_RESULTS);
  }, [queryProfile, queryTokens, searchTerms]);

  const selectedResultIndex =
    filteredResults.length > 0 ? Math.min(selectedIndex, filteredResults.length - 1) : -1;
      const isNoAnswerMode =
  askAnswer?.mode === "no_answer" ||
  Boolean(askAnswer?.notFound && !askAnswer?.mode);

  const answerHeading = isNoAnswerMode ? "Expert support" : "Answer";
  const displayedAskAnswer = askAnswer?.answer;

  const displayedDetectedFilters = (askAnswer?.detectedFilters ?? []).slice(0, 3);

  const displayedSuggestedLinks: AskSuggestedLink[] = (
    askAnswer?.suggestedLinks?.length
      ? askAnswer.suggestedLinks
      : askAnswer?.sources?.map((source) => ({
          title: source.title,
          description: source.description || "",
          url: source.url,
          sourceLabel: "ilmaLink local source",
          dataType: source.category || "Page",
        })) ?? []
  ).slice(0, 3);

  const openCounselling = useCallback(() => {
    onClose();

    if (onOpenCounselling) {
      onOpenCounselling();
      return;
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(OPEN_COUNSELLING_EVENT));
    }
  }, [onClose, onOpenCounselling]);

  const handleConnectClick = useCallback(() => {
    storeRecentSearch(query || "Ask ilmaLink counselling");
    openCounselling();
  }, [openCounselling, query, storeRecentSearch]);

  const runAskSearch = useCallback(async (questionOverride?: string) => {
    const question = (questionOverride ?? query).trim();
    if (!question) return;

    requestControllerRef.current?.abort();
    const controller = new AbortController();
    requestControllerRef.current = controller;

    storeRecentSearch(question);
    setHasAsked(true);
    setActiveQuestion(question);
    setAskAnswer(null);
    setAskLoading(true);
    setAskError("");

    try {
     const response = await fetch("/api/ask-ilmalink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Ask ilmaLink API failed: ${response.status}`);
      }

      const data = (await response.json()) as AskilmaLinkResponse;

      if (controller.signal.aborted) return;
      setAskAnswer(data);
      if (data.openCounsellingPopup && data.mode === "no_answer") {
        window.dispatchEvent(new Event(OPEN_COUNSELLING_EVENT));
      } else if (data.shouldAutoOpenCounselling && data.mode === "no_answer") {
        window.setTimeout(() => {
          if (!controller.signal.aborted) {
            openCounselling();
          }
        }, 2_800);
      }
    } catch (error) {
      if (
        controller.signal.aborted ||
        (error instanceof DOMException && error.name === "AbortError")
      ) {
        return;
      }

      setAskError(noMatchAnswer);
      setAskAnswer(null);
    } finally {
      if (requestControllerRef.current === controller) {
        requestControllerRef.current = null;
        setAskLoading(false);
      }
    }
  }, [openCounselling, query, storeRecentSearch]);

  useEffect(() => {
  if (!isOpen) return;
  if (trimmedQuery.length < 3) return;
  if (askLoading) return;
  if (trimmedQuery === activeQuestion) return;

  const timer = window.setTimeout(() => {
    void runAskSearch(trimmedQuery);
  }, 5_000);

  return () => window.clearTimeout(timer);
}, [activeQuestion, askLoading, isOpen, runAskSearch, trimmedQuery]);
  useEffect(() => {
    if (isOpen) return;

    requestControllerRef.current?.abort();
    requestControllerRef.current = null;
  }, [isOpen]);

  const handleSelectResult = useCallback(
    (result: GlobalSearchEntry) => {
      if (!result) return;

      storeRecentSearch(query || result.title);

      if (typeof window !== "undefined") {
        if (result.url.includes("fmge=explorer")) {
          onClose();
          router.push("/mbbs-abroad/explorer");
          return;
        }

        if (result.url.includes("counselling=open")) {
          openCounselling();
          return;
        }
        if (result.url.includes("rank-predictor=open")) {
          onClose();

          if (window.location.pathname === "/") {
            window.dispatchEvent(new Event(OPEN_RANK_PREDICTOR_EVENT));
            return;
          }

          router.push("/?rank-predictor=open");
          return;
        }
      }

      onClose();

      if (/^https?:\/\//.test(result.url)) {
        window.location.href = result.url;
        return;
      }

      router.push(result.url);
    },
    [onClose, openCounselling, query, router, storeRecentSearch]
  );

  const handleSelectSuggestedLink = useCallback(
    (link: AskSuggestedLink) => {
      storeRecentSearch(query || link.title);

      if (link.url.includes("counselling=open")) {
        openCounselling();
        return;
      }

      onClose();

      if (/^https?:\/\//.test(link.url)) {
        window.location.href = link.url;
        return;
      }

      router.push(link.url);
    },
    [onClose, openCounselling, query, router, storeRecentSearch]
  );

  const handleQueryChange = (value: string) => {
    requestControllerRef.current?.abort();
    requestControllerRef.current = null;
    setQuery(value);
    setSelectedIndex(0);
    setAskLoading(false);
    setAskError("");
    setAskAnswer(null);
    setHasAsked(false);
    setActiveQuestion("");
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((current) => Math.min(current + 1, filteredResults.length - 1));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) => Math.max(current - 1, 0));
      }

      if (
        event.key === "Enter" &&
        document.activeElement instanceof HTMLElement &&
        document.activeElement.id === "site-search-input"
      ) {
        return;
      }

      if (event.key === "Enter" && filteredResults[selectedResultIndex]) {
        event.preventDefault();
        handleSelectResult(filteredResults[selectedResultIndex]);
      }

      if (event.key === "Escape") {
        onClose();
      }
    },
    [
      filteredResults,
      handleSelectResult,
      isOpen,
      onClose,
      selectedResultIndex,
    ]
  );

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.documentElement.classList.add("search-modal-open");
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.classList.remove("search-modal-open");
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 isolate z-[2147483647] flex items-end justify-center bg-transparent sm:items-start sm:px-4 sm:pt-8 animate-in fade-in duration-200">
      <button
        type="button"
        className="absolute inset-0 z-0 cursor-default"
        onClick={onClose}
        aria-label="Close search"
        tabIndex={-1}
      />
      <div
        className="relative z-10 w-full max-w-3xl animate-in slide-in-from-bottom-3 duration-300 sm:px-6 sm:slide-in-from-top-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative flex max-h-[92dvh] min-h-[54dvh] flex-col overflow-hidden rounded-t-[1.75rem] border border-white/55 bg-white/88 shadow-[0_-24px_80px_rgba(3,18,37,0.35)] backdrop-blur-2xl sm:max-h-[calc(100dvh-4rem)] sm:min-h-0 sm:rounded-[1.75rem] sm:shadow-[0_30px_90px_rgba(8,27,53,0.3)]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ask-ilmalink-title"
        >
          <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#00C896]/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 top-1/3 h-44 w-44 rounded-full bg-sky-300/20 blur-3xl" />

          <div className="relative order-1 flex shrink-0 items-center gap-2.5 border-b border-white/70 bg-white/50 px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/80 bg-gradient-to-br from-[#d9fff4] to-white text-[#087a6a] shadow-[0_8px_24px_rgba(0,168,120,0.14)] sm:h-12 sm:w-12">
              <Sparkles size={19} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2
                  id="ask-ilmalink-title"
                  className="text-base font-black tracking-tight text-[#071f3f] sm:text-lg"
                >
                  Ask ilmaLink
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  Ready
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 sm:text-xs">
                AI search across verified ilmaLink data
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/80 bg-white/65 text-slate-500 shadow-sm transition hover:bg-white hover:text-slate-800 sm:h-11 sm:w-11"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>

          <div className="relative order-3 shrink-0 border-t border-white/80 bg-white/65 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-14px_34px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:px-5 sm:py-4">
            <form
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                void runAskSearch(trimmedQuery);
              }}
            >
              <label className="sr-only" htmlFor="site-search-input">
                Search query
              </label>
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={17}
                />
                <input
                  id="site-search-input"
                  autoFocus
                  value={query}
                  onChange={(event) => handleQueryChange(event.currentTarget.value)}
                  placeholder="Search MBBS India, Georgia fees, NEET rank..."
                  className="relative min-h-12 w-full rounded-2xl border border-white/90 bg-white py-2.5 pl-10 pr-3 text-sm font-semibold text-[#0f172a] caret-[#00C896] shadow-[0_10px_30px_rgba(15,23,42,0.08)] outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-[#00C896] focus:bg-white focus:ring-4 focus:ring-[#00C896]/15 sm:min-h-14 sm:pl-11 sm:pr-4 sm:text-base"
                />
              </div>
              <button
                type="submit"
                disabled={!trimmedQuery || askLoading}
                className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#00C896] to-[#098f91] px-3 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(0,168,120,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(0,168,120,0.34)] disabled:cursor-not-allowed disabled:opacity-45 sm:min-h-14 sm:min-w-[7.25rem] sm:px-5"
                aria-label="Search or ask"
              >
                {askLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                <span className="hidden min-[370px]:inline">
                  {askLoading ? "Thinking" : "Search"}
                </span>
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between gap-3 px-1">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-[10px]">
                <span className={`h-1.5 w-1.5 rounded-full ${
                  askLoading ? "animate-pulse bg-amber-400" : "bg-emerald-500"
                }`} />
                {askLoading
                  ? "Analysing verified data"
                  : trimmedQuery && trimmedQuery !== activeQuestion
                    ? "Answer appears after 4 seconds or Search"
                    : "Ready for your next question"}
              </span>
              <span className="hidden text-[10px] font-semibold text-slate-400 sm:inline">
                Enter to send / Esc to close
              </span>
            </div>
          </div>

          <div
            className="relative order-2 min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 sm:px-5 sm:py-4"
            role="log"
            aria-live="polite"
            aria-label="Ask ilmaLink conversation"
          >
            {!query && !hasAsked && (
              <div className="mx-auto max-w-xl py-3 sm:py-6">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#00C896]/15 text-[#087a6a]">
                    <Sparkles size={15} />
                  </span>
                  <div className="rounded-[1.25rem] rounded-tl-md border border-white/90 bg-white/70 px-3.5 py-3 shadow-[0_10px_28px_rgba(15,23,42,0.07)]">
                    <p className="text-sm font-bold text-[#071f3f]">
                      Hi! What would you like to know?
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Ask about fees, universities, FMGE, eligibility or counselling. I will answer after you pause typing.
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5 pl-10">
                  {[
                    "Kyrgyzstan fees",
                    "Best MBBS country",
                    "FMGE results",
                    "NMC/FMGL rules",
                  ].map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => handleQueryChange(topic)}
                        className="rounded-full border border-white/90 bg-white/65 px-3 py-1.5 text-[11px] font-bold text-[#176b62] shadow-sm transition hover:border-[#00C896]/50 hover:bg-white"
                      >
                        {topic}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {(hasAsked || askLoading || askError || askAnswer) && (
              <div className="mx-auto max-w-2xl">
                {hasAsked && (
                  <div className="mb-3 flex justify-end">
                    <div className="max-w-[86%] rounded-[1.25rem] rounded-tr-md bg-gradient-to-br from-[#0b806f] to-[#087477] px-3.5 py-2.5 text-sm font-semibold leading-5 text-white shadow-[0_10px_24px_rgba(8,116,119,0.2)]">
                      {activeQuestion}
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2.5">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
  isNoAnswerMode || askError
    ? "bg-amber-100 text-amber-800"
    : "bg-[#00C896]/15 text-[#087a6a]"
}`}>
  {isNoAnswerMode || askError ? <MessageCircle size={15} /> : <Sparkles size={15} />}
</span>
                  <div className={`min-w-0 flex-1 rounded-[1.35rem] rounded-tl-md border p-3.5 shadow-[0_12px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-4 ${
  isNoAnswerMode || askError
    ? "border-amber-200/80 bg-amber-50/85"
    : "border-white/90 bg-white/80"
}`}>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#087a6a]">
  {askLoading ? "Searching most authentic Answer" : answerHeading}
</p>
                      {askAnswer && !isNoAnswerMode && (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-700">
                          {askAnswer.confidence} confidence
                        </span>
                      )}
                    </div>

                    {askLoading ? (
                      <div className="mt-3 flex items-center gap-2.5 text-sm font-semibold text-slate-600">
                        <span className="flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[#00C896] [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[#00C896] [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[#00C896]" />
                        </span>
                        Finding the best answer...
                      </div>
                    ) : askError ? (
                      <p className="mt-3 text-sm leading-6 text-slate-700">{askError}</p>
                    ) : askAnswer ? (
                      <>
                        {displayedDetectedFilters.length > 0 && (
                          <div className="mt-3 flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                              Detected:
                            </span>
                            {displayedDetectedFilters.map((filter) => (
                              <span
                                key={filter}
                                className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-800"
                              >
                                {filter}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-800">
                          {displayedAskAnswer}
                        </p>
{displayedSuggestedLinks.length > 0 && !isNoAnswerMode && (
  <div className="mt-3 space-y-2">
    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
      Sources
    </p>

    <div className="grid gap-2 sm:grid-cols-3">
      {displayedSuggestedLinks.map((link) => (
        <button
          key={`${link.url}-${link.title}`}
          type="button"
          onClick={() => handleSelectSuggestedLink(link)}
          className="min-w-0 rounded-xl border border-slate-200/80 bg-white/85 px-3 py-2.5 text-left shadow-sm transition hover:border-[#00C896]/60 hover:bg-white hover:shadow-md"
        >
          <span className="line-clamp-2 block text-xs font-extrabold leading-4 text-slate-900">
            {link.title}
          </span>

          <span className="mt-1.5 line-clamp-2 block text-[10px] leading-4 text-slate-500">
            {link.description}
          </span>

          <span className="mt-2 inline-flex text-[10px] font-black uppercase tracking-[0.12em] text-[#087a6a]">
            Open page
          </span>
        </button>
      ))}
    </div>
  </div>
)}

                        <p className="mt-3 border-t border-slate-200/80 pt-2.5 text-[10px] leading-4 text-slate-500">
                          {answerDisclaimer}
                        </p>
                      </>
                    ) : null}

                    {(isNoAnswerMode || askError) && (
  <Link
    href="/?counselling=open"
    data-open-counselling
    onClick={(event) => {
      event.preventDefault();
      handleConnectClick();
    }}
    className="mt-3 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C896] to-[#098f91] px-4 text-xs font-extrabold text-white shadow-[0_10px_24px_rgba(0,168,120,0.22)] transition hover:-translate-y-0.5"
  >
    <MessageCircle size={15} />
    Chat with expert
  </Link>
)}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}
