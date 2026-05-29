"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, FileText, MapPin, BookOpen } from "lucide-react";
import blogDatabase from "@/data/blog-db.json";

interface BlogEntry {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  category: string;
  country: string;
  tags: string[];
  publishDate: string;
  status: string;
  views: number;
  seoTitle?: string;
  metaDescription?: string;
  content?: string;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  type: "blog" | "page" | "destination";
  tags?: string[];
  flag?: string;
  popularity?: number;
}

const navigationPages: SearchResult[] = [
  {
    id: "home",
    title: "Home",
    description: "Main landing page",
    url: "/",
    category: "Pages",
    type: "page",
  },
  {
    id: "about",
    title: "About Us",
    description: "Learn about ILMALINK MEDIGO",
    url: "/about",
    category: "Pages",
    type: "page",
  },
  {
    id: "blogs",
    title: "Blogs",
    description: "Read latest medical education articles",
    url: "/blogs",
    category: "Pages",
    type: "page",
  },
  {
    id: "alert",
    title: "Alerts",
    description: "Important updates and announcements",
    url: "/alert",
    category: "Pages",
    type: "page",
  },
  {
    id: "neet",
    title: "NEET",
    description: "NEET preparation resources",
    url: "https://www.mumtazeducation.com",
    category: "Pages",
    type: "page",
  },
];

const destinations: SearchResult[] = [
  { id: "kyrgyzstan", title: "Kyrgyzstan", description: "MBBS in Kyrgyzstan", url: "/mbbs-abroad/kyrgyzstan", category: "Destinations", type: "destination", flag: "kg", popularity: 92 },
  { id: "georgia", title: "Georgia", description: "MBBS in Georgia", url: "/mbbs-abroad/georgia", category: "Destinations", type: "destination", flag: "ge", popularity: 84 },
  { id: "bangladesh", title: "Bangladesh", description: "MBBS in Bangladesh", url: "/mbbs-abroad/bangladesh", category: "Destinations", type: "destination", flag: "bd", popularity: 78 },
  { id: "russia", title: "Russia", description: "MBBS in Russia", url: "/mbbs-abroad/russia", category: "Destinations", type: "destination", flag: "ru", popularity: 88 },
  { id: "kazakhstan", title: "Kazakhstan", description: "MBBS in Kazakhstan", url: "/mbbs-abroad/kazakhstan", category: "Destinations", type: "destination", flag: "kz", popularity: 80 },
  { id: "uzbekistan", title: "Uzbekistan", description: "MBBS in Uzbekistan", url: "/mbbs-abroad/uzbekistan", category: "Destinations", type: "destination", flag: "uz", popularity: 74 },
  { id: "tajikistan", title: "Tajikistan", description: "MBBS in Tajikistan", url: "/mbbs-abroad/tajikistan", category: "Destinations", type: "destination", flag: "tj", popularity: 66 },
  { id: "malaysia", title: "Malaysia", description: "MBBS in Malaysia", url: "/mbbs-abroad/malaysia", category: "Destinations", type: "destination", flag: "my", popularity: 72 },
  { id: "egypt", title: "Egypt", description: "MBBS in Egypt", url: "/mbbs-abroad/egypt", category: "Destinations", type: "destination", flag: "eg", popularity: 70 },
  { id: "saudi-arabia", title: "Saudi Arabia", description: "MBBS in Saudi Arabia", url: "/mbbs-abroad/saudi-arabia", category: "Destinations", type: "destination", flag: "sa", popularity: 68 },
  { id: "qatar", title: "Qatar", description: "MBBS in Qatar", url: "/mbbs-abroad/qatar", category: "Destinations", type: "destination", flag: "qa", popularity: 64 },
  { id: "uae", title: "UAE", description: "MBBS in UAE", url: "/mbbs-abroad/uae", category: "Destinations", type: "destination", flag: "ae", popularity: 76 },
  { id: "iran", title: "Iran", description: "MBBS in Iran", url: "/mbbs-abroad/iran", category: "Destinations", type: "destination", flag: "ir", popularity: 60 },
  { id: "usa", title: "USA", description: "MBBS in USA", url: "/mbbs-abroad/usa", category: "Destinations", type: "destination", flag: "us", popularity: 82 },
  { id: "canada", title: "Canada", description: "MBBS in Canada", url: "/mbbs-abroad/canada", category: "Destinations", type: "destination", flag: "ca", popularity: 79 },
  { id: "australia", title: "Australia", description: "MBBS in Australia", url: "/mbbs-abroad/australia", category: "Destinations", type: "destination", flag: "au", popularity: 86 },
  { id: "new-zealand", title: "New Zealand", description: "MBBS in New Zealand", url: "/mbbs-abroad/new-zealand", category: "Destinations", type: "destination", flag: "nz", popularity: 65 },
  { id: "uk", title: "UK", description: "MBBS in UK", url: "/mbbs-abroad/uk", category: "Destinations", type: "destination", flag: "gb", popularity: 81 },
];

const categories = ["All", "Pages", "Destinations", "Blogs"];
const RECENT_SEARCH_KEY = "ilmalink-search-recent";

const normalize = (value: string) => value.trim().toLowerCase();

const buildResult = (blog: BlogEntry): SearchResult => ({
  id: blog.id,
  title: blog.title,
  description: blog.metaDescription || blog.shortDescription || blog.title,
  url: `/blogs/${blog.slug}`,
  category: "Blogs",
  type: "blog",
  tags: blog.tags,
  popularity: blog.views,
});

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
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const stored = window.localStorage.getItem(RECENT_SEARCH_KEY);
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        setRecentSearches([]);
      }
    }
  }, [mounted]);

  const blogResults = useMemo<SearchResult[]>(() => {
    const blogs = Array.isArray(blogDatabase.blogs) ? blogDatabase.blogs : [];
    return blogs
      .filter((blog) => blog.status === "published")
      .map(buildResult);
  }, []);

  const allResults = useMemo<SearchResult[]>(() => [...navigationPages, ...destinations, ...blogResults], [blogResults]);

  const storeRecentSearch = useCallback(
    (term: string) => {
      const trimmed = term.trim();
      if (!trimmed) return;
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

  const filteredResults = useMemo(() => {
    const normalizedQuery = searchTerms;
    let filtered = allResults;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((result) => result.category === selectedCategory);
    }

    if (normalizedQuery) {
      filtered = filtered
        .filter((result) => {
          const searchableText = [
            result.title,
            result.description,
            result.category,
            ...(result.tags || []),
          ]
            .join(" ")
            .toLowerCase();
          return searchableText.includes(normalizedQuery);
        })
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else {
      filtered = filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    return filtered.slice(0, 20);
  }, [allResults, selectedCategory, searchTerms]);

  const browseSuggestions = useMemo(() => {
    if (searchTerms || selectedCategory !== "All") return [];
    return [
      navigationPages[2],
      destinations.find((item) => item.id === "kyrgyzstan"!)!,
      destinations.find((item) => item.id === "russia"!)!,
      blogResults[0],
    ].filter(Boolean);
  }, [searchTerms, selectedCategory, blogResults]);

  const handleSelectResult = useCallback(
    (result: SearchResult) => {
      if (!result) return;
      storeRecentSearch(query || result.title);
      onClose();
      router.push(result.url);
    },
    [onClose, query, router, storeRecentSearch]
  );

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
      if (event.key === "Enter" && filteredResults[selectedIndex]) {
        event.preventDefault();
        handleSelectResult(filteredResults[selectedIndex]);
      }
      if (event.key === "Escape") {
        onClose();
      }
    },
    [filteredResults, handleSelectResult, isOpen, onClose, selectedIndex]
  );

  useEffect(() => {
    if (!mounted) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, mounted]);

  useEffect(() => {
    if (filteredResults.length > 0) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(-1);
    }
  }, [filteredResults]);

  if (!mounted || !isOpen) return null;

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
              <p className="text-xs text-slate-500">Search pages, countries, and published blogs instantly.</p>
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
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search blogs, pages & destinations…"
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
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
            <div className="px-5 pb-4 text-xs text-slate-500">Showing results for <span className="font-semibold text-slate-900">{query}</span></div>
          ) : (
            <div className="px-5 pb-4 text-xs text-slate-500 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span>Try searching for <span className="font-semibold text-slate-900">Kyrgyzstan</span>, <span className="font-semibold text-slate-900">NEET</span>, or <span className="font-semibold text-slate-900">MBBS India</span>.</span>
              <span className="text-slate-400">Use ↑/↓ and Enter to select</span>
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
                    index === selectedIndex ? "bg-[#effaf5]" : "hover:bg-slate-50"
                  }`}
                >
                  <div className={`mt-1 flex h-11 w-11 items-center justify-center rounded-2xl ${
                    index === selectedIndex ? "bg-[#00C896]/15 text-[#0E766A]" : "bg-slate-100 text-slate-500"
                  }`}>
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
                <p className="mt-2 text-sm">Try different keywords like <span className="font-semibold">MBBS</span>, <span className="font-semibold">NEET</span> or <span className="font-semibold">Kyrgyzstan</span>.</p>
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
