"use client";

import { useMemo, useState } from "react";
import { BookOpen, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import BlogCard from "./BlogCard";
import type { BlogSort, BlogSummaryPost } from "@/app/lib/blog/types";
import { BLOGS_PAGE_SIZE } from "@/app/lib/blog/pagination";

const visibleStep = BLOGS_PAGE_SIZE;

// BLOG SYSTEM: Search, filters, sorting and load-more grid for /blogs.
export default function BlogsDirectory({
  posts,
  categories,
  countries,
}: {
  posts: BlogSummaryPost[];
  categories: string[];
  countries: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [sort, setSort] = useState<BlogSort>("latest");
  const [visible, setVisible] = useState(visibleStep);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts
      .filter((post) => {
        const matchesQuery =
          !normalizedQuery ||
          [post.title, post.shortDescription, post.category, post.country, ...post.tags]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesCategory = !category || post.category === category;
        const matchesCountry = !country || post.country === country;

        return matchesQuery && matchesCategory && matchesCountry;
      })
      .sort((a, b) => {
        if (sort === "oldest") {
          return Date.parse(a.publishDate) - Date.parse(b.publishDate);
        }

        if (sort === "most-viewed") {
          return b.views - a.views;
        }

        return Date.parse(b.publishDate) - Date.parse(a.publishDate);
      });
  }, [category, country, posts, query, sort]);

  const visiblePosts = filteredPosts.slice(0, visible);
  const activeFilterCount =
    Number(Boolean(category)) +
    Number(Boolean(country)) +
    Number(sort !== "latest");

  function clearFilters() {
    setCategory("");
    setCountry("");
    setSort("latest");
    setVisible(visibleStep);
  }

  return (
    <section className="mx-auto max-w-7xl px-3 py-5 sm:px-6 md:py-7 lg:px-8">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_18px_46px_rgba(8,27,53,0.08)] ring-1 ring-white">
        <div className="flex items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="blog-directory-search"
              name="blogDirectorySearch"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setVisible(visibleStep);
              }}
              placeholder="Search blogs"
              className="h-11 w-full rounded-xl border border-slate-200 bg-[#F6F9FC] pl-10 pr-9 text-sm font-semibold text-[#0F172A] outline-none transition focus:border-[#0F4CFF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(15,76,255,0.08)]"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("");
                  setVisible(visibleStep);
                }}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setFiltersOpen((current) => !current)}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#0C2A55] bg-[#061733] px-3 text-xs font-black uppercase tracking-[0.08em] text-white shadow-[0_12px_24px_rgba(8,27,53,0.18)] transition hover:border-[#0F4CFF] hover:bg-[#0F4CFF] sm:px-4"
            aria-expanded={filtersOpen}
            aria-label="Toggle blog filters"
          >
            <SlidersHorizontal size={15} />
            Filter
            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#00C896] px-1.5 text-[10px] text-[#041528]">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown
              size={15}
              className={`transition ${filtersOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {filtersOpen && (
          <div className="mt-2 grid gap-2 border-t border-slate-100 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FBFF_100%)] pt-2 md:grid-cols-[1fr_1fr_1fr_auto]">
            <select
              id="blog-directory-category"
              name="blogDirectoryCategory"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setVisible(visibleStep);
              }}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-[#0F172A] outline-none transition focus:border-[#0F4CFF] focus:shadow-[0_0_0_4px_rgba(15,76,255,0.08)]"
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              id="blog-directory-country"
              name="blogDirectoryCountry"
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
                setVisible(visibleStep);
              }}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-[#0F172A] outline-none transition focus:border-[#0F4CFF] focus:shadow-[0_0_0_4px_rgba(15,76,255,0.08)]"
            >
              <option value="">All countries</option>
              {countries.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              id="blog-directory-sort"
              name="blogDirectorySort"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as BlogSort);
                setVisible(visibleStep);
              }}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-[#0F172A] outline-none transition focus:border-[#0F4CFF] focus:shadow-[0_0_0_4px_rgba(15,76,255,0.08)]"
            >
              <option value="latest">Latest first</option>
              <option value="oldest">Oldest first</option>
              <option value="most-viewed">Most viewed</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black uppercase tracking-[0.08em] text-slate-600 transition hover:border-[#0F4CFF]/30 hover:text-[#0F4CFF]"
            >
              <X size={14} />
              Clear
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1 text-xs font-bold text-slate-500">
        <span className="inline-flex items-center gap-2">
          <BookOpen size={14} className="text-[#0F4CFF]" />
          Showing {visiblePosts.length} of {filteredPosts.length} blogs
        </span>
        <span>
          {sort === "latest" ? "Latest updates first" : sort === "oldest" ? "Oldest updates first" : "Most viewed first"}
        </span>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visiblePosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-600 shadow-sm">
          No blogs found for the selected filters.
        </div>
      )}

      {visible < filteredPosts.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisible((current) => current + visibleStep)}
            className="rounded-full bg-[#0F4CFF] px-7 py-3 text-sm font-black text-white shadow-[0_14px_28px_rgba(15,76,255,0.22)] transition hover:bg-[#0b3fd6]"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
