"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Search, X, FileText, MapPin, BookOpen } from "lucide-react";
import {
  globalSearchIndex,
  type GlobalSearchEntry,
} from "../data/searchIndex";
import { mbbsIndiaColleges, mbbsIndiaCollegesByState } from "../data/mbbsIndiaColleges";
import { getMBBSIndiaAdmissionAccess } from "../data/mbbsIndiaAdmissionAccess";
import { navbarCountryDestinations } from "../data/navbarDestinations";
import { kyrgyzstanUniversities } from "../data/kyrgyzstanUniversities";

type SearchResult = GlobalSearchEntry & {
  score: number;
};

const categories = [
  "All",
  "Pages",
  "Destinations",
  "Kyrgyzstan",
  "MBBS India",
  "FMGE Data",
  "Blogs",
];
const RECENT_SEARCH_KEY = "ilmalink-search-recent";
const MAX_RESULTS = 30;
const OPEN_COUNSELLING_EVENT = "ilmalink:open-counselling";
const OPEN_FMGE_EVENT = "ilmalink:open-fmge-explorer";
const PENDING_FMGE_KEY = "ilmalink-pending-fmge-explorer";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (value: string) =>
  normalize(value)
    .split(/[^a-z0-9%]+/)
    .filter((term) => term.length > 0);

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
  content: "Study MBBS in India full NMC medical college list state-wise government private colleges seats fees counselling",
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
  const collegeNames = [...group.governmentColleges, ...group.privateColleges]
    .map((college) => college.collegeName)
    .join(" ");

  return {
    id: `mbbs-india-state-${slugifySearchId(group.state)}`,
    title: `MBBS Colleges in ${group.state}`,
    description: `${access.label}: ${group.privateCount} private, ${group.governmentCount} government, and ${group.totalSeats.toLocaleString("en-IN")} MBBS seats in ${group.state}.`,
    url: "/mbbs-india/",
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
    ],
    content: [
      `Study MBBS in ${group.state}`,
      `MBBS colleges in ${group.state}`,
      `${group.governmentCount} government colleges`,
      `${group.privateCount} private colleges`,
      `${group.totalSeats} seats`,
      access.detail,
      collegeNames,
    ].join(" "),
    priority: 96,
  };
});

const mbbsIndiaCollegeSearchEntries: GlobalSearchEntry[] = mbbsIndiaColleges.map((college) => {
  const access = getMBBSIndiaAdmissionAccess(college.state);

  return {
    id: `mbbs-india-college-${slugifySearchId(`${college.state}-${college.collegeName}`)}`,
    title: college.collegeName,
    description: `${college.category} medical college in ${college.state} with ${college.seatCapacity.toLocaleString("en-IN")} MBBS seats. ${access.label}.`,
    url: "/mbbs-india/",
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
    ],
    content: [
      college.collegeName,
      college.state,
      college.category,
      access.detail,
      `${college.seatCapacity} MBBS seats`,
      `established ${college.establishmentYear}`,
      "fees ##",
      `Study MBBS in ${college.state}`,
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
            firstCampusFee.totalCost !== "Not specified in brochure"
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
      : `/mbbs-abroad/kyrgyzstan/?q=${encodeURIComponent(university.name)}#universities`,
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

const siteSearchIndex: GlobalSearchEntry[] = [
  mbbsIndiaDirectorySearchEntry,
  ...navbarDropdownSearchEntries,
  ...kyrgyzstanUniversitySearchEntries,
  ...mbbsIndiaStateSearchEntries,
  ...mbbsIndiaCollegeSearchEntries,
  ...globalSearchIndex,
];

const isMBBSIndiaCollegeResult = (entry: GlobalSearchEntry) => entry.id.startsWith("mbbs-india-college-");

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

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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

  const searchTerms = useMemo(() => normalize(query), [query]);
  const queryTokens = useMemo(() => tokenize(query), [query]);

  const filteredResults = useMemo<SearchResult[]>(() => {
    let filtered = siteSearchIndex;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((result) => {
        if (selectedCategory === "Pages") return result.group === "Pages";
        if (selectedCategory === "Destinations") return result.group === "Destinations";
        if (selectedCategory === "Blogs") return result.group === "Blogs";
        if (selectedCategory === "Kyrgyzstan") return result.category === "Kyrgyzstan Universities";
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

  const browseSuggestions = useMemo(() => {
    if (searchTerms || selectedCategory !== "All") return [];

    const byId = (id: string) => siteSearchIndex.find((item) => item.id === id);
    const byUrl = (url: string) => siteSearchIndex.find((item) => item.url === url);

    return [
      byId("mbbs-india-state-west-bengal"),
      byId("mbbs-india-state-karnataka"),
      byId("mbbs-india-state-jharkhand"),
      byUrl("/blogs"),
      byUrl("/mbbs-abroad/kyrgyzstan"),
      siteSearchIndex.find((item) => item.group === "Blogs"),
    ].filter(Boolean) as GlobalSearchEntry[];
  }, [searchTerms, selectedCategory]);

  const handleSelectResult = useCallback(
    (result: GlobalSearchEntry) => {
      if (!result) return;

      storeRecentSearch(query || result.title);

      if (typeof window !== "undefined") {
        if (isMBBSIndiaCollegeResult(result)) {
          onClose();
          window.dispatchEvent(new Event(OPEN_COUNSELLING_EVENT));
          return;
        }

        if (result.url.includes("fmge=explorer")) {
          window.sessionStorage.setItem(PENDING_FMGE_KEY, "1");
          window.dispatchEvent(new Event(OPEN_FMGE_EVENT));
        }

        if (result.url.includes("counselling=open")) {
          window.dispatchEvent(new Event(OPEN_COUNSELLING_EVENT));
        }
      }

      onClose();

      if (/^https?:\/\//.test(result.url)) {
        window.location.href = result.url;
        return;
      }

      router.push(result.url);
    },
    [onClose, query, router, storeRecentSearch]
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(0);
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

      if (event.key === "Enter" && filteredResults[selectedResultIndex]) {
        event.preventDefault();
        handleSelectResult(filteredResults[selectedResultIndex]);
      }

      if (event.key === "Escape") {
        onClose();
      }
    },
    [filteredResults, handleSelectResult, isOpen, onClose, selectedResultIndex]
  );

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, isOpen]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-start justify-center bg-slate-950/40 pt-4 sm:pt-8 animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl mx-auto px-4 sm:px-6 animate-in slide-in-from-top-2 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00C896]/10 text-[#0E766A]">
              <Search size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-slate-900">Search ILMALINK MEDIGO</h2>
              <p className="text-xs text-slate-500">Search pages, dropdowns, countries, MBBS India colleges, FMGE data, and blogs instantly.</p>
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
                  placeholder="Search pages, countries, states, colleges..."
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]/20"
                />
              </div>
              <div className="flex flex-wrap gap-2">
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
            </div>
          </div>

          {query ? (
            <div className="px-5 pb-4 text-xs text-slate-500">
              Showing results for <span className="font-semibold text-slate-900">{query}</span>
            </div>
          ) : (
            <div className="px-5 pb-4 text-xs text-slate-500 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Try searching for <span className="font-semibold text-slate-900">Kyrgyzstan</span>,{" "}
                <span className="font-semibold text-slate-900">MBBS India</span>,{" "}
                <span className="font-semibold text-slate-900">West Bengal</span>, or{" "}
                <span className="font-semibold text-slate-900">FMGE</span>.
              </span>
              <span className="text-slate-400">Use Up/Down and Enter to select</span>
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
                <p className="text-sm font-medium text-slate-800">No matches found</p>
                <p className="mt-2 text-sm">
                  Try different keywords like <span className="font-semibold">MBBS</span>,{" "}
                  <span className="font-semibold">NEET</span> or{" "}
                  <span className="font-semibold">Kyrgyzstan</span>.
                </p>
              </div>
            )}
          </div>

          <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center">
            <span>Improved on-site search for better user experience and quick content discovery.</span>
            <span className="font-medium text-slate-700">Press ESC to close</span>
          </div>
        </div>
      </div>
      <button type="button" className="fixed inset-0 -z-10" onClick={onClose} aria-label="Close search" />
    </div>,
    document.body
  );
}
