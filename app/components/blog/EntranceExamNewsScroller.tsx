"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, ShieldCheck } from "lucide-react";
import type { BlogCardPost } from "./BlogCard";

type Accent = {
  pill: string;
  top: string;
  link: string;
};

const accentMap: Record<string, Accent> = {
  wbjee:     { pill: "bg-[#FFEDD5] text-[#9A3412]", top: "from-[#F59E0B] to-[#EF4444]", link: "text-[#9A3412]" },
  jee:       { pill: "bg-[#E0F2FE] text-[#075985]", top: "from-[#0EA5E9] to-[#6366F1]", link: "text-[#075985]" },
  pharmacy:  { pill: "bg-[#F3E8FF] text-[#6B21A8]", top: "from-[#9333EA] to-[#0F4CFF]", link: "text-[#6B21A8]" },
  default:   { pill: "bg-[#EAF1FF] text-[#0F4CFF]", top: "from-[#0F4CFF] to-[#64D7FF]", link: "text-[#0F4CFF]" },
};

function getAccent(category: string, title: string): Accent {
  const v = `${category} ${title}`.toLowerCase();
  if (v.includes("wbjee")) return accentMap.wbjee;
  if (v.includes("jee") || v.includes("engineering") || v.includes("btech") || v.includes("b.tech")) return accentMap.jee;
  if (v.includes("pharmacy") || v.includes("bpharm") || v.includes("b.pharm") || v.includes("pharm")) return accentMap.pharmacy;
  return accentMap.default;
}

export default function EntranceExamNewsScroller({
  posts,
}: {
  posts: BlogCardPost[];
}) {
  const visiblePosts = posts.slice(0, 6);

  if (visiblePosts.length === 0) return null;

  const openCounselling = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("ilmalink:open-counselling"));
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-cyan-100 bg-[radial-gradient(circle_at_top_left,rgba(15,76,255,0.10),transparent_32%),radial-gradient(circle_at_top_right,rgba(0,168,120,0.12),transparent_30%),linear-gradient(180deg,#f8fcff_0%,#eef8ff_100%)] shadow-[0_24px_70px_rgba(8,45,67,0.08)] px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-cyan-100 bg-white/80 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#071f3f]">
            Exam News
          </span>
        </div>

        <h2 className="mt-3 text-[1.25rem] font-black leading-snug tracking-tight text-[#071f3f] min-[360px]:text-[1.4rem] sm:text-[1.6rem] lg:text-[1.8rem]">
          Stay current on WBJEE and other non-MBBS{" "}
          <span className="bg-gradient-to-r from-[#0F4CFF] to-[#00A878] bg-clip-text text-transparent drop-shadow-[0_0_26px_rgba(15,76,255,0.55)]">
            entrance exam news
          </span>
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {["Exam Alerts", "Counselling Dates", "Result Updates", "Rank & Cut-off"].map((chip) => (
            <div
              key={chip}
              className="rounded-2xl border border-cyan-100 bg-white/80 p-3 text-center text-[11px] font-black text-[#071f3f] shadow-sm"
            >
              {chip}
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {visiblePosts.map((post) => {
            const accent = getAccent(post.category, post.title);

            return (
              <article
                key={post.id}
                className="group w-[82vw] min-w-[82vw] snap-center overflow-hidden rounded-3xl border border-cyan-100 bg-white/90 p-4 shadow-[0_18px_45px_rgba(8,45,67,0.10)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(8,45,67,0.16)] sm:w-auto sm:min-w-0"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0F4CFF] via-[#00A878] to-[#51e6b3]" />

                <div className="flex items-center justify-between gap-2">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] ${accent.pill}`}>
                    {post.category}
                  </span>
                  <span className="rounded-full bg-[#CCFBF1] px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#0F766E]">
                    New
                  </span>
                </div>

                <div className="mt-3">
                  <Link href={`/blogs/${post.slug}/`} className="block">
                    <h3 className="line-clamp-2 text-[13px] font-black leading-5 text-[#071f3f] transition group-hover:text-[#0F4CFF]">
                      {post.title}
                    </h3>
                  </Link>
                </div>

                <div className="mt-3">
                  <Link
                    href={`/blogs/${post.slug}/`}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black transition hover:gap-3 ${accent.link} border-current`}
                  >
                    Read Article
                    <ArrowRight size={11} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex flex-row items-center justify-center gap-3">
          <Link
            href="/blogs/"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#0F4CFF] to-[#00A878] px-6 py-3 text-sm font-black text-white shadow-[0_16px_35px_rgba(15,76,255,0.24)] transition hover:-translate-y-0.5"
          >
            <BookOpen size={16} />
            Explore Now
            <ArrowRight size={15} />
          </Link>

          <button
            type="button"
            onClick={openCounselling}
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl border border-[#00A878]/35 bg-white/80 px-6 py-3 text-sm font-black text-[#007f66] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-[#effff9]"
          >
            <GraduationCap size={16} />
            Stay Updated
          </button>
        </div>
      </div>
    </section>
  );
}