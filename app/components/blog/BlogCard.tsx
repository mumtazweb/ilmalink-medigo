import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ClipboardList,
  Clock3,
  FileText,
  Globe2,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import type { BlogSummaryPost } from "@/app/lib/blog/types";
import { isImageFile, isVideoFile } from "@/app/lib/blog/imageValidation";

export type BlogCardPost = Pick<
  BlogSummaryPost,
  | "id"
  | "title"
  | "slug"
  | "featuredImage"
  | "imageAlt"
  | "shortDescription"
  | "category"
  | "tags"
  | "publishDate"
  | "readTime"
>;

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

export default function BlogCard({ post }: { post: BlogCardPost }) {
  const featuredImage = post.featuredImage?.trim();
  const hasFeaturedVideo = featuredImage ? isVideoFile(featuredImage) : false;
  const hasFeaturedImage = featuredImage ? isImageFile(featuredImage) : false;
  const hasValidFeaturedMedia = Boolean(
    featuredImage && (hasFeaturedImage || hasFeaturedVideo)
  );

  const accent = getAccent(post.category);
  const Icon = accent.Icon;
  const articleHref = `/blogs/${post.slug}/`;

  return (
    <article className="group relative flex h-full min-h-[330px] flex-col overflow-hidden rounded-[1.35rem] border border-slate-200/90 bg-white p-5 shadow-[0_18px_52px_rgba(8,27,53,0.075)] transition duration-200 hover:-translate-y-1 hover:border-[#0F4CFF]/20 hover:shadow-[0_26px_70px_rgba(8,27,53,0.13)]">
      <div
        className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accent.top}`}
      />

      {hasValidFeaturedMedia && (
        <div className="-mx-5 -mt-5 mb-5 h-40 overflow-hidden bg-[#061733]">
          {hasFeaturedVideo ? (
            <video
              src={featuredImage}
              className="h-full w-full object-cover"
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <div className="relative h-full w-full">
              <Image
                src={featuredImage}
                alt={post.imageAlt || post.title}
                fill
                sizes="(min-width: 1280px) 390px, (min-width: 768px) 50vw, 92vw"
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,23,51,0.02)_0%,rgba(6,23,51,0.52)_100%)]" />
            </div>
          )}
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex max-w-[72%] rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] ${accent.pill}`}
        >
          <span className="truncate">{post.category}</span>
        </span>

        <span className="rounded-full bg-[#DFFAE8] px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] text-[#14823B]">
          New
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-[76px_1fr] lg:block">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full ${accent.iconBg} ${accent.iconText} shadow-sm lg:h-20 lg:w-20`}
        >
          {hasValidFeaturedMedia ? <FileText size={32} /> : <Icon size={34} />}
        </div>

        <div>
          <Link href={articleHref} className="block">
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
              {new Date(post.publishDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
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

      <div className="mt-auto border-t border-slate-100 pt-4">
        <Link
          href={articleHref}
          className={`inline-flex items-center gap-2 text-base font-black ${accent.link} transition group-hover:gap-3`}
        >
          Read Article
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}