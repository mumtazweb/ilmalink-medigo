"use client";

import { useMemo, useState } from "react";
import BlogCard from "./BlogCard";
import type { BlogPost, BlogSort } from "@/app/lib/blog/types";

const visibleStep = 6;

// BLOG SYSTEM: Search, filters, sorting and load-more grid for /blogs.
export default function BlogsDirectory({
  posts,
  categories,
  countries,
}: {
  posts: BlogPost[];
  categories: string[];
  countries: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [sort, setSort] = useState<BlogSort>("latest");
  const [visible, setVisible] = useState(visibleStep);

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

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_44px_rgba(15,23,42,0.06)] md:p-5">
        <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisible(visibleStep);
            }}
            placeholder="Search blogs"
            className="min-h-12 rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm font-medium text-[#0F172A] outline-none transition focus:border-[#0F4CFF] focus:bg-white"
          />

          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setVisible(visibleStep);
            }}
            className="min-h-12 rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm font-medium text-[#0F172A] outline-none transition focus:border-[#0F4CFF] focus:bg-white"
          >
            <option value="">Category</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={country}
            onChange={(event) => {
              setCountry(event.target.value);
              setVisible(visibleStep);
            }}
            className="min-h-12 rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm font-medium text-[#0F172A] outline-none transition focus:border-[#0F4CFF] focus:bg-white"
          >
            <option value="">Country</option>
            {countries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as BlogSort)}
            className="min-h-12 rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 text-sm font-medium text-[#0F172A] outline-none transition focus:border-[#0F4CFF] focus:bg-white"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="most-viewed">Most viewed</option>
          </select>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visiblePosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
          No blogs found for the selected filters.
        </div>
      )}

      {visible < filteredPosts.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setVisible((current) => current + visibleStep)}
            className="rounded-full bg-[#0F4CFF] px-7 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(15,76,255,0.22)] transition hover:bg-[#0b3fd6]"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
