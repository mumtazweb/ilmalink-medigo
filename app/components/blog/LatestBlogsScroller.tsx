import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  ClipboardList,
  Clock3,
  FileText,
  GraduationCap,
  Globe2,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import type { BlogCardPost } from "./BlogCard";

const BLOG_HERO_IMAGE = "/blog/blog-hero-mbbs-neet-doctor.webp";

type Accent = {
  pill: string;
  iconBg: string;
  iconText: string;
  top: string;
  link: string;
  Icon: typeof ShieldCheck;
};

function getAccent(category: string): Accent {
  const value = category.toLowerCase();

  if (value.includes("neet")) {
    return {
      pill: "bg-[#DFFAF3] text-[#008A73]",
      iconBg: "bg-[#DFFAF3]",
      iconText: "text-[#008A73]",
      top: "from-[#00C896] to-[#0F4CFF]",
      link: "text-[#008A73]",
      Icon: ClipboardList,
    };
  }

  if (value.includes("abroad")) {
    return {
      pill: "bg-[#E7F7FF] text-[#0F4CFF]",
      iconBg: "bg-[#E7F7FF]",
      iconText: "text-[#0F4CFF]",
      top: "from-[#0F4CFF] to-[#00C896]",
      link: "text-[#0F4CFF]",
      Icon: Globe2,
    };
  }

  if (value.includes("college")) {
    return {
      pill: "bg-[#F0E8FF] text-[#6D28D9]",
      iconBg: "bg-[#F0E8FF]",
      iconText: "text-[#6D28D9]",
      top: "from-[#7C3AED] to-[#0F4CFF]",
      link: "text-[#6D28D9]",
      Icon: Building2,
    };
  }

  if (value.includes("scholarship") || value.includes("loan")) {
    return {
      pill: "bg-[#FFF4D8] text-[#B7791F]",
      iconBg: "bg-[#FFF4D8]",
      iconText: "text-[#B7791F]",
      top: "from-[#F59E0B] to-[#00A986]",
      link: "text-[#B7791F]",
      Icon: GraduationCap,
    };
  }

  return {
    pill: "bg-[#EAF1FF] text-[#0F4CFF]",
    iconBg: "bg-[#EAF1FF]",
    iconText: "text-[#0F4CFF]",
    top: "from-[#0F4CFF] to-[#64D7FF]",
    link: "text-[#0F4CFF]",
    Icon: ShieldCheck,
  };
}

export default function LatestBlogsScroller({
  posts,
}: {
  posts: BlogCardPost[];
}) {
  const latestPosts = posts.slice(0, 4);

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F8FBFF_0%,#EEF8FF_54%,#FFFFFF_100%)] px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(15,76,255,0.12),transparent_28%),radial-gradient(circle_at_88%_5%,rgba(0,200,150,0.16),transparent_30%)]" />
      <div className="pointer-events-none absolute right-0 top-0 hidden h-[420px] w-[520px] rounded-bl-[12rem] bg-[linear-gradient(135deg,rgba(15,76,255,0.12),rgba(0,200,150,0.20))] lg:block" />
      <div className="pointer-events-none absolute left-4 top-6 hidden text-[#0F4CFF]/10 md:block">
        <Stethoscope size={92} />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-[#0F4CFF]/20 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#0F4CFF] shadow-sm">
              <ShieldCheck size={15} />
              ILMALINK MEDIGO Updates
            </div>

            <h2 className="mt-5 whitespace-nowrap text-[1.9rem] font-black leading-[0.98] tracking-tight text-[#061733] min-[390px]:text-[2.15rem] sm:text-5xl lg:text-[4.15rem]">
              MBBS &amp; NEET{" "}
              <span className="bg-[linear-gradient(90deg,#0F4CFF,#00A986)] bg-clip-text text-transparent">
                Aspirants News Blogs
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-[#344766] sm:text-lg sm:leading-8">
              Latest MBBS admission news, NEET updates, counselling alerts,
              college guidance, scholarships, loans and medical education
              insights for students and parents.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/blogs/"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-[#0F4CFF] px-6 text-base font-black text-white shadow-[0_20px_40px_rgba(15,76,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#061733]"
              >
                <BookOpen size={20} />
                Explore All Blogs
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/neet/"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-[#00A986]/35 bg-white px-6 text-base font-black text-[#008A73] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#EFFFFA]"
              >
                <Bell size={18} />
                Stay Updated
              </Link>
            </div>
          </div>

          <div className="relative hidden min-h-[350px] lg:block">
            <div className="absolute right-0 top-0 h-[350px] w-[460px] overflow-hidden rounded-bl-[8rem] rounded-tl-[8rem] bg-[linear-gradient(135deg,#EAF3FF,#CFF8F0)] shadow-[0_30px_90px_rgba(8,27,53,0.12)]">
              <Image
                src={BLOG_HERO_IMAGE}
                alt="MBBS and NEET aspirants news blog by ILMALINK MEDIGO"
                fill
                priority
                sizes="460px"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(248,251,255,0.10)_0%,rgba(255,255,255,0)_45%)]" />
            </div>

            <div className="absolute bottom-8 right-8 rounded-3xl bg-white p-5 text-center shadow-[0_20px_55px_rgba(8,27,53,0.14)]">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0F4CFF]">
                Trusted by
              </p>
              <p className="text-5xl font-black text-[#061733]">1M+</p>
              <p className="text-xs font-bold text-slate-600">
                Students &amp; Parents
              </p>
              <p className="mt-2 text-[#00A986]">★★★★★</p>
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-3 rounded-[1.6rem] border border-slate-200/80 bg-white/90 p-4 shadow-[0_20px_60px_rgba(8,27,53,0.08)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 lg:p-5">
          {[
            {
              title: "Latest Updates",
              text: "NEET, counselling & admission news",
              Icon: GraduationCap,
              bg: "bg-[#EAF1FF]",
              color: "text-[#0F4CFF]",
            },
            {
              title: "College Guidance",
              text: "Find the best medical colleges",
              Icon: Building2,
              bg: "bg-[#DFFAF3]",
              color: "text-[#008A73]",
            },
            {
              title: "Counselling Alerts",
              text: "Dates, documents & process updates",
              Icon: ClipboardList,
              bg: "bg-[#F0E8FF]",
              color: "text-[#6D28D9]",
            },
            {
              title: "Scholarships & Loans",
              text: "Explore financial support",
              Icon: GraduationCap,
              bg: "bg-[#FFF4D8]",
              color: "text-[#B7791F]",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
              >
                <item.Icon size={26} />
              </span>
              <div>
                <p className="text-base font-black text-[#061733]">
                  {item.title}
                </p>
                <p className="mt-1 text-sm font-semibold leading-5 text-slate-600">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-4">
          {latestPosts.map((post, index) => {
            const accent = getAccent(post.category);
            const Icon = accent.Icon;

            return (
              <article
                key={post.id}
                className="group relative overflow-hidden rounded-[1.35rem] border border-slate-200/90 bg-white p-5 shadow-[0_18px_52px_rgba(8,27,53,0.075)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(8,27,53,0.13)]"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accent.top}`}
                />

                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`inline-flex max-w-[72%] rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] ${accent.pill}`}
                  >
                    <span className="truncate">{post.category}</span>
                  </span>

                  {index === 0 && (
                    <span className="rounded-full bg-[#DFFAE8] px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] text-[#14823B]">
                      New
                    </span>
                  )}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-[76px_1fr] lg:block">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${accent.iconBg} ${accent.iconText} shadow-sm lg:h-20 lg:w-20`}
                  >
                    <Icon size={34} />
                  </div>

                  <div>
                    <Link href={`/blogs/${post.slug}/`} className="block">
                      <h3 className="line-clamp-2 text-xl font-black leading-7 text-[#061733] transition group-hover:text-[#0F4CFF]">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="mt-3 line-clamp-3 text-base font-medium leading-7 text-[#344766] lg:min-h-[84px]">
                      {post.shortDescription}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#50617A]">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5">
                        <CalendarDays size={14} />
                        {new Date(post.publishDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>

                      {post.readTime && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5">
                          <Clock3 size={14} />
                          {post.readTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <Link
                    href={`/blogs/${post.slug}/`}
                    className={`inline-flex items-center gap-2 text-base font-black ${accent.link} transition group-hover:gap-3`}
                  >
                    Read Article
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-5 overflow-hidden rounded-[1.35rem] bg-[linear-gradient(100deg,#073BCE_0%,#061733_48%,#00A986_100%)] p-5 text-white shadow-[0_22px_60px_rgba(15,76,255,0.18)] sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                <Bell size={25} />
              </span>
              <div>
                <h3 className="text-2xl font-black leading-tight">
                  Need MBBS or NEET Guidance?
                </h3>
                <p className="mt-1 max-w-2xl text-sm font-semibold leading-6 text-white/85">
                  Get admission updates, counselling support and college
                  guidance from ILMALINK MEDIGO.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/portal/signup/"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#061733] transition hover:-translate-y-0.5"
              >
                Get Free Guidance
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/neet/"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Open NEET Hub
                <FileText size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}