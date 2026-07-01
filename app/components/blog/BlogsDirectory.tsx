"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Filter,
  RotateCcw,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import BlogCard from "./BlogCard";
import type { BlogSort, BlogSummaryPost } from "@/app/lib/blog/types";
import { BLOGS_PAGE_SIZE } from "@/app/lib/blog/pagination";

const visibleStep = BLOGS_PAGE_SIZE;

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
          [
            post.title,
            post.shortDescription,
            post.category,
            post.country,
            ...post.tags,
          ]
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

  function clearAll() {
    setQuery("");
    clearFilters();
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-2 sm:px-6 md:pb-12 lg:px-8">
      <div className="overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white/90 p-4 shadow-[0_20px_60px_rgba(8,27,53,0.08)] backdrop-blur-xl sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF1FF] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#0F4CFF]">
              <ShieldCheck size={14} />
              Find updates
            </div>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#061733] sm:text-3xl">
              Search MBBS &amp; NEET Blogs
            </h2>

            <p className="mt-1 max-w-2xl text-sm font-semibold leading-6 text-[#50617A]">
              Filter admission news, NEET alerts, college guidance,
              scholarships, loans and medical education updates.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-black text-[#50617A] shadow-sm">
            <BookOpen size={14} className="text-[#0F4CFF]" />
            Showing latest {visiblePosts.length} updates
          </div>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0F4CFF]"
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
              placeholder="Search NEET update, MBBS admission, counselling, college..."
              className="h-14 w-full rounded-2xl border border-slate-200 bg-[#F8FBFF] pl-12 pr-11 text-sm font-bold text-[#061733] outline-none transition placeholder:text-slate-400 focus:border-[#0F4CFF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(15,76,255,0.08)]"
            />

            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("");
                  setVisible(visibleStep);
                }}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-[#061733]"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setFiltersOpen((current) => !current)}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#061733] px-5 text-xs font-black uppercase tracking-[0.08em] text-white shadow-[0_16px_34px_rgba(8,27,53,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0F4CFF]"
            aria-expanded={filtersOpen}
            aria-label="Toggle blog filters"
          >
            <Filter size={16} />
            Filters
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
          <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 md:grid-cols-[1fr_1fr_1fr_auto]">
            <select
              id="blog-directory-category"
              name="blogDirectoryCategory"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setVisible(visibleStep);
              }}
              className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-[#061733] outline-none transition focus:border-[#0F4CFF] focus:shadow-[0_0_0_4px_rgba(15,76,255,0.08)]"
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
              className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-[#061733] outline-none transition focus:border-[#0F4CFF] focus:shadow-[0_0_0_4px_rgba(15,76,255,0.08)]"
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
              className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-[#061733] outline-none transition focus:border-[#0F4CFF] focus:shadow-[0_0_0_4px_rgba(15,76,255,0.08)]"
            >
              <option value="latest">Latest first</option>
              <option value="oldest">Oldest first</option>
              <option value="most-viewed">Most viewed</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black uppercase tracking-[0.08em] text-[#50617A] transition hover:border-[#0F4CFF]/30 hover:text-[#0F4CFF]"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 px-1 text-sm font-bold text-[#50617A]">
        <span>
          {query
            ? `Results for “${query}”`
            : "Latest MBBS admission & NEET updates"}
        </span>

        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#0F4CFF] shadow-sm">
          {sort === "latest"
            ? "Latest first"
            : sort === "oldest"
              ? "Oldest first"
              : "Most viewed"}
        </span>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visiblePosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="mt-8 rounded-[1.35rem] border border-slate-200 bg-white p-8 text-center shadow-[0_18px_52px_rgba(8,27,53,0.07)]">
          <p className="text-lg font-black text-[#061733]">
            No matching blogs found
          </p>
          <p className="mt-2 text-sm font-semibold text-[#50617A]">
            Try searching NEET, MBBS, counselling, scholarship, loan or college.
          </p>

          <button
            type="button"
            onClick={clearAll}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F4CFF] px-5 py-3 text-sm font-black text-white"
          >
            Clear Search
            <X size={15} />
          </button>
        </div>
      )}

      {visible < filteredPosts.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((current) => current + visibleStep)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F4CFF] px-7 py-3 text-sm font-black text-white shadow-[0_16px_34px_rgba(15,76,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#061733]"
          >
            Load More Blogs
            <ChevronDown size={16} />
          </button>
        </div>
      )}
    </section>
  );
}