"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BlogCard, { type BlogCardPost } from "./BlogCard";

// BLOG SYSTEM: Homepage latest blogs strip with smooth auto-scroll and hover pause.
// SEO note: renders each blog only once to avoid duplicate visible/DOM content.
export default function LatestBlogsScroller({ posts }: { posts: BlogCardPost[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller || paused || posts.length === 0) {
      return;
    }

    let frame = 0;

    const scroll = () => {
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

      if (maxScrollLeft <= 0) {
        return;
      }

      scroller.scrollLeft += 0.45;

      if (scroller.scrollLeft >= maxScrollLeft - 2) {
        scroller.scrollLeft = 0;
      }

      frame = requestAnimationFrame(scroll);
    };

    frame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(frame);
  }, [paused, posts.length]);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-normal text-[#0F172A] md:text-4xl">
              Latest Medical Updates &amp; Blogs
            </h2>
            <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-600">
              Explore recent MBBS, NEET, admission and medical education insights
            </p>
          </div>

          <Link
            href="/blogs"
            className="inline-flex w-fit items-center rounded-full border border-[#0F4CFF]/20 bg-[#F8FAFC] px-5 py-2.5 text-sm font-bold text-[#0F4CFF] transition hover:border-[#0F4CFF] hover:bg-white"
          >
            View All Blogs →
          </Link>
        </div>

        <div
          ref={scrollerRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((post) => (
            <div
              key={post.id}
              className="w-[86vw] flex-none snap-start sm:w-[390px]"
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
