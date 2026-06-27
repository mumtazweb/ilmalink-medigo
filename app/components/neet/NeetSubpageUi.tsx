import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Download,
  Home,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  NEET_ANSWER_KEY_DOWNLOADS,
  type NeetAnswerKeyDownloadResource,
} from "../../data/neetAnswerKeyDownloads";
import ProtectedNeetDownloadButton from "./ProtectedNeetDownloadButton";

export function NeetBackLink({
  href = "/neet",
  label = "Back to NEET Hub",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0B4AA2] transition hover:text-[#009C95] sm:text-sm"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}

export function NeetBreadcrumb({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-w-0 items-center gap-1.5 overflow-hidden text-[11px] font-bold text-[#345179] sm:text-xs"
    >
      <Link
        href="/neet"
        aria-label="NEET Hub"
        className="shrink-0 text-[#1769E8]"
      >
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item) => (
        <span key={`${item.href ?? ""}-${item.label}`} className="contents">
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          {item.href ? (
            <Link
              href={item.href}
              className="shrink-0 text-[#1769E8] hover:text-[#009C95]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="truncate text-[#17396E]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function NeetSubpageHero({
  title,
  subtitle,
  breadcrumb,
  compact = false,
}: {
  title: ReactNode;
  subtitle: string;
  breadcrumb: Array<{ label: string; href?: string }>;
  compact?: boolean;
}) {
  return (
    <section
      className={`relative isolate overflow-hidden border-b border-cyan-100 bg-[linear-gradient(105deg,#F8FCFF_0%,#EAF6FF_58%,#CEF3F2_100%)] ${
        compact ? "min-h-[250px] sm:min-h-[270px]" : "min-h-[302px] sm:min-h-[330px]"
      }`}
    >
      <div className="absolute inset-y-0 right-0 w-[54%] overflow-hidden sm:w-[48%] lg:right-[4%] lg:w-[40%]">
        <Image
          src="/images/neet-hub-male-student.webp"
          alt="Medical student holding blue study books"
          fill
          priority
          sizes="(max-width: 640px) 54vw, (max-width: 1024px) 48vw, 40vw"
          className="object-cover object-[68%_top]"
        />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#ECF7FF] via-[#ECF7FF]/75 to-transparent sm:w-40" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(248,252,255,.98)_0%,rgba(239,248,255,.94)_48%,rgba(222,247,246,.08)_74%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[70%] opacity-35 [background-image:linear-gradient(30deg,rgba(23,105,232,.18)_1px,transparent_1px),linear-gradient(150deg,rgba(0,156,149,.15)_1px,transparent_1px),radial-gradient(circle,rgba(23,105,232,.22)_1px,transparent_1.5px)] [background-size:42px_72px,42px_72px,42px_42px] [mask-image:linear-gradient(to_left,black,transparent_88%)]" />

      <div className="relative mx-auto max-w-[1180px] px-4 pb-7 pt-4 sm:px-7 sm:pb-9 sm:pt-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <NeetBackLink />
          <NeetBreadcrumb items={breadcrumb} />
        </div>
        <div className="mt-8 max-w-[78%] sm:mt-9 sm:max-w-[68%] lg:max-w-[720px]">
          <h1 className="text-[31px] font-black leading-[1.08] tracking-[-.035em] text-[#082A62] sm:text-[43px] lg:text-[50px]">
            {title}
          </h1>
          <p className="mt-4 max-w-[590px] text-[14px] font-semibold leading-6 text-[#263F68] sm:text-base sm:leading-7">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

export function NeetSectionHeading({
  icon: Icon,
  title,
  action,
}: {
  icon: LucideIcon;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#1769E8]">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <h2 className="text-lg font-black tracking-[-.02em] text-[#082A62] sm:text-xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

export function NeetQuickActionCard({
  title,
  href,
  icon: Icon,
  iconClass,
}: {
  title: string;
  href: string;
  icon: LucideIcon;
  iconClass: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[108px] flex-col items-center justify-center border-r border-[#DFE8F2] px-2 py-3 text-center last:border-r-0 hover:bg-[#F8FBFF]"
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-xl border border-white shadow-[0_6px_14px_rgba(8,42,98,.08)] ${iconClass}`}
      >
        <Icon className="h-8 w-8 transition group-hover:scale-105" />
      </span>
      <span className="mt-2 text-[12px] font-extrabold leading-4 text-[#102F66] sm:text-sm">
        {title}
      </span>
    </Link>
  );
}

export function NeetDownloadCard({
  className = "",
  resource = "codes-50-60-70-80",
  title,
  description,
  actionLabel = "Download PDF",
}: {
  className?: string;
  resource?: NeetAnswerKeyDownloadResource;
  title?: string;
  description?: string;
  actionLabel?: string;
}) {
  const download = NEET_ANSWER_KEY_DOWNLOADS[resource];

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-[#BFD7F4] bg-[linear-gradient(110deg,#F8FCFF,#EFF8FF_58%,#E7F9F5)] shadow-[0_12px_28px_rgba(8,42,98,.08)] ${className}`}
    >
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E5F8F1] text-[#08A776] shadow-inner">
            <Download className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-base font-black leading-6 text-[#082A62] sm:text-lg">
              {title ?? download.title}
            </h2>
            <p className="mt-1 text-xs font-semibold leading-5 text-[#4A6285] sm:text-sm">
              {description ?? download.description}
            </p>
            <p className="mt-2 inline-flex rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-black text-[#31577F] shadow-sm">
              {download.sizeLabel} · Student profile required for PDF download
            </p>
          </div>
        </div>
        <ProtectedNeetDownloadButton
          resource={resource}
          fileName={download.fileName}
          label={actionLabel}
        />
      </div>
    </article>
  );
}

export function NeetBottomCta() {
  return (
    <section className="rounded-[24px] border-2 border-[#1A58A7] bg-[linear-gradient(105deg,#F8FCFF,#F1F7FF)] p-3 shadow-[0_12px_25px_rgba(8,42,98,.08)] sm:p-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#0B4AA2]">
            <ShieldCheck className="h-7 w-7" />
          </span>
          <div>
            <p className="font-black text-[#082A62]">Trusted by Students</p>
            <p className="text-xs font-semibold text-[#1769E8]">
              Clear NEET resources in one place
            </p>
          </div>
        </div>
        <Link
          href="/neet"
          className="inline-flex h-12 min-w-56 items-center justify-center gap-3 rounded-xl bg-[linear-gradient(105deg,#0B4AA2,#07377E)] px-6 text-sm font-extrabold !text-white shadow-[0_8px_18px_rgba(11,74,162,.22)]"
        >
          Explore NEET Hub
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}

export function NeetPageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[radial-gradient(circle_at_10%_28%,rgba(23,105,232,.05),transparent_25%),radial-gradient(circle_at_90%_72%,rgba(0,156,149,.06),transparent_28%),#F8FBFF] text-[#082A62]">
      <div className="mx-auto max-w-[1180px] px-3 py-5 sm:px-6 sm:py-7 lg:px-8">
        {children}
      </div>
    </div>
  );
}
