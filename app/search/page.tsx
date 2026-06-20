import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";

import Navbar from "../components/navbar";
import { searchInternalSiteData } from "@/lib/siteDataSearch";

export const metadata: Metadata = {
  title: "Search ILMALINK MEDIGO | MBBS, NEET, Countries, Colleges & Blogs",
  description:
    "Search ILMALINK MEDIGO for MBBS abroad countries, MBBS India colleges, FMGE data, NEET guidance, scholarships, loans, and blogs.",
  alternates: {
    canonical: "https://www.ilmalink.com/search",
  },
  robots: {
    index: false,
    follow: true,
  },
};

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string;
  }>;
};

function absoluteUrl(url: string) {
  if (/^https?:\/\//.test(url)) return url;
  return `https://www.ilmalink.com${url.startsWith("/") ? url : `/${url}`}`;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params?.q === "string" ? params.q.trim() : "";
  const search = query
    ? searchInternalSiteData(query, { limit: 30 })
    : searchInternalSiteData("MBBS", { limit: 12 });
  const results = search.matchedItems;
  const pageUrl = query
    ? `https://www.ilmalink.com/search?q=${encodeURIComponent(query)}`
    : "https://www.ilmalink.com/search";
  const searchResultsSchema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: query
      ? `ILMALINK MEDIGO search results for ${query}`
      : "ILMALINK MEDIGO search",
    url: pageUrl,
    inLanguage: "en-IN",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: results.slice(0, 20).map((result, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: result.title,
        description: result.description,
        url: absoluteUrl(result.url),
      })),
    },
  };

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#0F172A]">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(searchResultsSchema).replace(/</g, "\\u003c"),
        }}
      />

      <section className="border-b border-[#0B2244]/15 bg-[#061733] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#00C896]/30 bg-[#00C896]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#BFFFF0]">
            <Sparkles size={14} /> Site content search
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-normal md:text-5xl">
            Search ILMALINK MEDIGO
          </h1>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-200 md:text-base md:leading-7">
            Find distinct pages, country sections, MBBS India data, FMGE records, scholarships, loans, and blogs.
          </p>

          <form action="/search" className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/10 p-2 sm:flex-row">
            <label htmlFor="site-search-page-input" className="sr-only">
              Search ILMALINK MEDIGO
            </label>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                id="site-search-page-input"
                name="q"
                defaultValue={query}
                placeholder="Search Bangladesh eligibility, FMGE data, NEET blogs..."
                className="h-12 w-full rounded-xl border border-white/20 bg-white pl-11 pr-4 text-sm font-bold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#00C896] focus:ring-4 focus:ring-[#00C896]/20"
              />
            </div>
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#00C896] px-5 text-sm font-black text-[#031525] transition hover:bg-[#12dfad]">
              Search <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#047857]">
                {query ? "Search results" : "Suggested content"}
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-normal text-[#081B35]">
                {query ? `Results for "${query}"` : "Start with popular ILMALINK content"}
              </h2>
            </div>
            <p className="text-sm font-semibold text-slate-500">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="grid gap-3">
            {results.map((result) => (
              <Link
                key={result.id}
                href={result.url}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(8,27,53,0.06)] transition hover:-translate-y-0.5 hover:border-[#00C896]/50 hover:shadow-[0_18px_44px_rgba(8,27,53,0.10)]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#047857]">
                      {result.matchedDataType}
                    </p>
                    <h3 className="mt-1 text-lg font-black text-[#081B35] group-hover:text-[#047857]">
                      {result.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                      {result.description}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-black text-slate-600">
                    Open <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
