"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Search, X, FileText, MapPin, BookOpen, Loader2, MessageCircle, Sparkles } from "lucide-react";
import {
  globalSearchIndex,
  type GlobalSearchEntry,
} from "../data/searchIndex";
import {
  getMBBSIndiaCollegeCounselling2025,
  getMBBSIndiaStateCounselling2025,
} from "../data/mbbsIndiaCounselling";
import { mbbsIndiaColleges, mbbsIndiaCollegesByState } from "../data/mbbsIndiaColleges";
import { getMBBSIndiaAdmissionAccess } from "../data/mbbsIndiaAdmissionAccess";
import { navbarCountryDestinations } from "../data/navbarDestinations";
import { kyrgyzstanUniversities } from "../data/kyrgyzstanUniversities";
import { georgiaUniversities } from "../data/georgiaUniversities";
import { getMBBSIndiaCollegeHref, getMBBSIndiaStateHref } from "../data/exploreLinks";

type SearchResult = GlobalSearchEntry & {
  score: number;
};

type AskSuggestedLink = {
  title: string;
  description: string;
  url: string;
  sourceLabel: string;
  dataType: string;
  lastUpdated?: string | null;
};

type AskIlmalinkResponse = {
  answer: string;
  confidence: "high" | "medium" | "low";
  matchedItems: unknown[];
  suggestedLinks: AskSuggestedLink[];
  shouldShowConnectCTA: true;
  notFound: boolean;
};

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenCounselling?: () => void;
};

const categories = [
  "All",
  "Pages",
  "Destinations",
  "Kyrgyzstan",
  "Georgia",
  "MBBS India",
  "FMGE Data",
  "Blogs",
];
const RECENT_SEARCH_KEY = "ilmalink-search-recent";
const MAX_RESULTS = 30;
const OPEN_COUNSELLING_EVENT = "ilmalink:open-counselling";
const OPEN_FMGE_EVENT = "ilmalink:open-fmge-explorer";
const PENDING_FMGE_KEY = "ilmalink-pending-fmge-explorer";
const answerDisclaimer =
  "Cutoffs, fees, counselling rules, accreditation, FMGE/NExT outcomes, and NMC/FMGL compliance can change. Use Connect ILMALINK for a personalised eligibility review before final admission.";
const aspirantTopics = [
  "best country to study MBBS",
  "total fees and budget",
  "NMC/FMGL rules",
  "FMGE result trends",
  "low-cost private MBBS options",
];
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

const mbbsIndiaDirectorySearchEntry: GlobalSearchEntry = {
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

const mbbsIndiaCollegeSearchEntries: GlobalSearchEntry[] = mbbsIndiaColleges.map((college) => {
  const access = getMBBSIndiaAdmissionAccess(college.state);
  const counselling = getMBBSIndiaCollegeCounselling2025(college.collegeName);
  const seatMatrixText =
    counselling?.seatMatrix
      .map(
        (row) =>
          `${row.quota} ${row.totalSeats ?? "total unavailable"} seats ${Object.entries(
            row.categorySeats
          )
            .map(([category, seats]) => `${category} ${seats ?? "unavailable"}`)
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

  return {
    id: `mbbs-india-college-${slugifySearchId(`${college.state}-${college.collegeName}`)}`,
    title: college.collegeName,
    description: `${college.category} medical college in ${college.state} with ${college.seatCapacity.toLocaleString("en-IN")} MBBS seats. ${access.label}.${counselling ? " Includes 2025 prior-year counselling data." : ""}`,
    url: getMBBSIndiaCollegeHref(college),
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
      ...(counselling ? ["2025 counselling", "cutoff", "closing rank", "seat matrix"] : []),
    ],
    content: [
      college.collegeName,
      college.state,
      college.category,
      access.detail,
      `${college.seatCapacity} MBBS seats`,
      `established ${college.establishmentYear}`,
      "fees to be updated",
      `Study MBBS in ${college.state}`,
      seatMatrixText,
      cutoffText,
    ].join(" "),
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

const siteSearchIndex: GlobalSearchEntry[] = [
  mbbsIndiaDirectorySearchEntry,
  ...navbarDropdownSearchEntries,
  ...kyrgyzstanUniversitySearchEntries,
  ...georgiaUniversitySearchEntries,
  ...mbbsIndiaStateSearchEntries,
  ...mbbsIndiaCollegeSearchEntries,
  ...globalSearchIndex,
];

const textIncludesAllTerms = (text: string, terms: string[]) =>
  terms.every((term) => text.includes(term));

const tokenScore = (tokens: string[], term: string, startsWithScore: number, includesScore: number) => {
  if (tokens.some((token) => token === term)) return startsWithScore + includesScore;
  if (tokens.some((token) => token.startsWith(term))) return startsWithScore;
  if (tokens.some((token) => token.includes(term))) return includesScore;
  return 0;
};

const scoreResult = (entry: GlobalSearchEntry, normalizedQuery: string, queryTerms: string[]) => {
  const title = normalize(entry.title);
  const description = normalize(entry.description);
  const category = normalize(entry.category);
  const tags = normalize(entry.tags.join(" "));
  const content = normalize(entry.content);
  const url = normalize(entry.url);
  const searchableText = [title, description, category, tags, content, url].join(" ");

  if (!textIncludesAllTerms(searchableText, queryTerms)) return 0;

  const titleTokens = tokenize(entry.title);
  const descriptionTokens = tokenize(entry.description);
  const tagTokens = tokenize(entry.tags.join(" "));
  let score = entry.priority;

  if (title === normalizedQuery) score += 500;
  if (title.includes(normalizedQuery)) score += 220;
  if (tags.includes(normalizedQuery)) score += 180;
  if (description.includes(normalizedQuery)) score += 120;
  if (category.includes(normalizedQuery)) score += 90;
  if (url.includes(normalizedQuery)) score += 60;
  if (content.includes(normalizedQuery)) score += 25;

  queryTerms.forEach((term) => {
    score += tokenScore(titleTokens, term, 90, 55);
    score += tokenScore(tagTokens, term, 70, 40);
    score += tokenScore(descriptionTokens, term, 45, 25);
    if (content.includes(term)) score += 10;
  });

  return score;
};

const getIcon = (type: string) => {
  switch (type) {
    case "page":
      return <FileText size={16} className="text-slate-400" />;
    case "destination":
      return <MapPin size={16} className="text-slate-400" />;
    case "blog":
      return <BookOpen size={16} className="text-slate-400" />;
    default:
      return <Search size={16} className="text-slate-400" />;
  }
};

export default function SearchModal({ isOpen, onClose, onOpenCounselling }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
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
  const [askAnswer, setAskAnswer] = useState<AskIlmalinkResponse | null>(null);
  const [askLoading, setAskLoading] = useState(false);
  const [askError, setAskError] = useState("");
  const [hasAsked, setHasAsked] = useState(false);

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

  const searchTerms = useMemo(() => normalizeQueryForSearch(query), [query]);
  const queryTokens = useMemo(() => tokenize(query), [query]);
  const trimmedQuery = query.trim();

  const filteredResults = useMemo<SearchResult[]>(() => {
    let filtered = siteSearchIndex;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((result) => {
        if (selectedCategory === "Pages") return result.group === "Pages";
        if (selectedCategory === "Destinations") return result.group === "Destinations";
        if (selectedCategory === "Blogs") return result.group === "Blogs";
        if (selectedCategory === "Kyrgyzstan") return result.category === "Kyrgyzstan Universities";
        if (selectedCategory === "Georgia") {
          return (
            result.category === "Georgia Universities" ||
            result.url.startsWith("/mbbs-abroad/georgia")
          );
        }
        return result.category === selectedCategory;
      });
    }

    if (!searchTerms) {
      return [...filtered]
        .sort((a, b) => b.priority - a.priority || a.title.localeCompare(b.title))
        .slice(0, MAX_RESULTS)
        .map((result) => ({ ...result, score: result.priority }));
    }

    return filtered
      .map((result) => ({
        ...result,
        score: scoreResult(result, searchTerms, queryTokens),
      }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || b.priority - a.priority || a.title.localeCompare(b.title))
      .slice(0, MAX_RESULTS);
  }, [queryTokens, searchTerms, selectedCategory]);

  const selectedResultIndex =
    filteredResults.length > 0 ? Math.min(selectedIndex, filteredResults.length - 1) : -1;

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
    storeRecentSearch(query || "Ask ILMALINK counselling");
    openCounselling();
  }, [openCounselling, query, storeRecentSearch]);

  const runAskSearch = useCallback(async () => {
    if (!trimmedQuery) return;

    storeRecentSearch(trimmedQuery);
    setHasAsked(true);
    setAskAnswer(null);
    setAskLoading(true);
    setAskError("");

    try {
      const response = await fetch("/api/ask-ilmalink/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmedQuery }),
      });
      const data = (await response.json()) as AskIlmalinkResponse;

      setAskAnswer(data);

      if (data.notFound) {
        window.setTimeout(() => {
          openCounselling();
        }, 250);
      }
    } catch {
      setAskError(
        "This question can be answered better by our experts. Connect ILMALINK for a personalised reply."
      );
      setAskAnswer(null);
      window.setTimeout(() => {
        openCounselling();
      }, 250);
    } finally {
      setAskLoading(false);
    }
  }, [openCounselling, storeRecentSearch, trimmedQuery]);

  const browseSuggestions = useMemo(() => {
    if (searchTerms || selectedCategory !== "All") return [];

    const byId = (id: string) => siteSearchIndex.find((item) => item.id === id);
    const byUrl = (url: string) => siteSearchIndex.find((item) => item.url === url);

    return [
      byId("mbbs-india-state-west-bengal"),
      byId("mbbs-india-state-karnataka"),
      byUrl("/mbbs-abroad/georgia/east-european-university/") ??
        byUrl("/mbbs-abroad/georgia/east-european-university"),
      byUrl("/blogs"),
      byUrl("/mbbs-abroad/kyrgyzstan"),
      byUrl("/mbbs-abroad/georgia"),
      siteSearchIndex.find((item) => item.group === "Blogs"),
    ].filter(Boolean) as GlobalSearchEntry[];
  }, [searchTerms, selectedCategory]);

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
    setQuery(value);
    setSelectedIndex(0);
    setHasAsked(false);
    setAskAnswer(null);
    setAskLoading(false);
    setAskError("");
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedIndex(0);
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
        event.preventDefault();
        void runAskSearch();
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
    [filteredResults, handleSelectResult, isOpen, onClose, runAskSearch, selectedResultIndex]
  );

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, isOpen]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-start justify-center bg-slate-950/50 px-2 pt-3 backdrop-blur-sm sm:pt-8 animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl mx-auto px-1 sm:px-6 animate-in slide-in-from-top-2 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-h-[calc(100vh-1rem)] overflow-y-auto overflow-x-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-[0_30px_90px_rgba(8,27,53,0.28)]">
          <div className="flex items-center gap-3 border-b border-slate-200 bg-gradient-to-br from-white via-[#f3fffb] to-slate-50 px-5 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00C896]/12 text-[#0E766A] shadow-inner">
              <Search size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0E766A]">Search keywords or ask questions</p>
              <h2 className="mt-0.5 text-lg font-extrabold text-slate-950">Ask ILMALINK</h2>
              <p className="text-xs text-slate-500">Find pages, colleges, countries, fees, FMGE data, blogs, or ask directly.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-5 py-4">
            <form
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
              onSubmit={(event) => {
                event.preventDefault();
                void runAskSearch();
              }}
            >
              <label className="sr-only" htmlFor="site-search-input">
                Search query
              </label>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  id="site-search-input"
                  autoFocus
                  value={query}
                  onChange={(event) => handleQueryChange(event.target.value)}
                  placeholder="Search keywords or ask questions..."
                  className="min-h-14 w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-base font-semibold text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.06)] outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-[#00C896] focus:ring-4 focus:ring-[#00C896]/15"
                />
              </div>
              <button
                type="submit"
                disabled={!trimmedQuery || askLoading}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00C896] to-[#0EA5A4] px-5 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(0,200,150,0.30)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(0,200,150,0.34)] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Search or ask"
              >
                {askLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                <span>Search</span>
              </button>
            </form>

            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded-2xl border px-3 py-2 text-xs font-semibold transition ${
                    selectedCategory === category
                      ? "border-[#00C896] bg-[#00C896]/10 text-[#0E766A]"
                      : "border-slate-200 bg-slate-100 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {!query && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-6 text-slate-600">
                <span className="font-bold text-slate-800">Students often ask about: </span>
                {aspirantTopics.join(", ")}.
              </div>
            )}
          </div>

          {query ? (
            <div className="px-5 pb-4 text-xs text-slate-500">
              Showing results for <span className="font-semibold text-slate-900">{query}</span>
            </div>
          ) : (
            <div className="px-5 pb-4 text-xs text-slate-500 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Try searching for <span className="font-semibold text-slate-900">Kyrgyzstan</span>,{" "}
                <span className="font-semibold text-slate-900">EEU Georgia</span>,{" "}
                <span className="font-semibold text-slate-900">MBBS India</span>,{" "}
                <span className="font-semibold text-slate-900">West Bengal</span>, or{" "}
                <span className="font-semibold text-slate-900">FMGE</span>.
              </span>
              <span className="text-slate-400">Use Up/Down and Enter to select</span>
            </div>
          )}

          {(hasAsked || askLoading || askError || askAnswer) && (
            <div className="px-5 pb-4">
              <div className={`rounded-2xl border p-4 ${
                askAnswer?.notFound
                  ? "border-amber-200 bg-amber-50"
                  : "border-[#00C896]/20 bg-[#f3fffb]"
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      askAnswer?.notFound
                        ? "bg-amber-100 text-amber-800"
                        : "bg-[#00C896]/15 text-[#0E766A]"
                    }`}>
                      {askAnswer?.notFound ? <MessageCircle size={17} /> : <Sparkles size={17} />}
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">
                        {askAnswer?.notFound ? "Connect ILMALINK" : "Answer"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {askAnswer?.notFound
                          ? "This question deserves a personal expert reply."
                          : "Here is a quick answer for your MBBS question."}
                      </p>
                    </div>
                  </div>
                </div>

                {askLoading ? (
                  <div className="mt-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-600">
                    <Loader2 size={16} className="animate-spin text-[#0E766A]" />
                    Preparing your answer...
                  </div>
                ) : askError ? (
                  <div className="mt-4 rounded-xl bg-white px-4 py-3 text-sm leading-6 text-slate-700">
                    {askError}
                  </div>
                ) : askAnswer ? (
                  <>
                    <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-800">
                      {askAnswer.answer}
                    </p>

                    <p className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs leading-5 text-slate-500">
                      {answerDisclaimer}
                    </p>

                    {askAnswer.suggestedLinks.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                          Related pages/data
                        </p>
                        <div className="mt-2 grid gap-2 sm:grid-cols-2">
                          {askAnswer.suggestedLinks.slice(0, 4).map((link) => (
                            <button
                              key={`${link.url}-${link.title}`}
                              type="button"
                              onClick={() => handleSelectSuggestedLink(link)}
                              className="min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-left transition hover:border-[#00C896]/60 hover:bg-white"
                            >
                              <span className="block truncate text-sm font-bold text-slate-900">
                                {link.title}
                              </span>
                              <span className="mt-1 line-clamp-2 block text-xs leading-5 text-slate-500">
                                {link.description}
                              </span>
                              <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                                {link.dataType}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : null}

                <button
                  type="button"
                  onClick={handleConnectClick}
                  className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00C896] to-[#0EA5A4] px-4 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(0,200,150,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,200,150,0.28)] sm:w-auto"
                >
                  <MessageCircle size={16} />
                  Connect ILMALINK
                </button>
              </div>
            </div>
          )}

          {browseSuggestions.length > 0 && !query ? (
            <div className="px-5 pb-4">
              <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Quick Browse</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {browseSuggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectResult(item)}
                    className="group flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-[#00C896]/60 hover:bg-[#f0fdf9]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00C896]/10 text-[#0E766A]">
                      {getIcon(item.type)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500">{item.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="divide-y divide-slate-100 max-h-[36rem] overflow-y-auto">
            {filteredResults.length > 0 ? (
              filteredResults.map((result, index) => (
                <button
                  key={result.id}
                  type="button"
                  onClick={() => handleSelectResult(result)}
                  className={`group flex w-full items-start gap-4 px-5 py-4 text-left transition ${
                    index === selectedResultIndex ? "bg-[#effaf5]" : "hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`mt-1 flex h-11 w-11 items-center justify-center rounded-2xl ${
                      index === selectedResultIndex
                        ? "bg-[#00C896]/15 text-[#0E766A]"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {getIcon(result.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-900">{result.title}</h3>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                        {result.category}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-5 text-slate-600 line-clamp-2">{result.description}</p>
                    {result.tags && result.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {result.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="rounded-full bg-[#ecfdf5] px-2 py-0.5 text-[10px] font-medium text-[#0E766A]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-5 py-12 text-center text-slate-500">
                <Search size={36} className="mx-auto mb-4" />
                <p className="text-sm font-medium text-slate-800">Need a sharper answer?</p>
                <p className="mt-2 text-sm">
                  This question can be answered better by our experts.
                </p>
                <button
                  type="button"
                  onClick={handleConnectClick}
                  className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00C896] to-[#0EA5A4] px-5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(0,200,150,0.24)] transition hover:-translate-y-0.5"
                >
                  <MessageCircle size={16} />
                  Connect ILMALINK
                </button>
              </div>
            )}
          </div>

          <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
            <button
              type="button"
              onClick={handleConnectClick}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#00C896]/30 bg-white px-4 text-xs font-extrabold text-[#0E766A] transition hover:bg-[#ecfdf5]"
            >
              <MessageCircle size={14} />
              Connect ILMALINK
            </button>
            <span className="font-medium text-slate-700">Press ESC to close</span>
          </div>
        </div>
      </div>
      <button type="button" className="fixed inset-0 -z-10" onClick={onClose} aria-label="Close search" />
    </div>,
    document.body
  );
}
