import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import type { GeorgiaUniversityPageData } from "../../data/georgiaUniversities";

function universityHref(slug: string) {
  return `/mbbs-abroad/georgia/${slug}/`;
}

function universityInitials(university: GeorgiaUniversityPageData) {
  if (university.shortName) return university.shortName;

  return university.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function cardImage(university: GeorgiaUniversityPageData) {
  return (
    university.heroImage ?? "/georgia/georgia-tbilisi-student-life.jpg"
  );
}

function feeLine(university: GeorgiaUniversityPageData) {
  if (university.annualTuition) {
    return university.annualTuition;
  }

  if (university.feeRows[0]?.tuitionFee) {
    return `${university.feeRows[0].tuitionFee} / semester`;
  }

  return "Latest fee/details to be verified before admission.";
}

function fmgeLine(university: GeorgiaUniversityPageData) {
  const fmge = university.fmgePerformance?.[0];

  if (!fmge) return "FMGE performance: verify latest data";

  return `${fmge.passRate} FMGE 2025`;
}

export function GeorgiaUniversityCard({
  university,
}: {
  university: GeorgiaUniversityPageData;
}) {
  return (
    <Link
      href={universityHref(university.slug)}
      className="group block h-full flex-none snap-start"
      aria-label={`View ${university.name} details`}
    >
      <article className="flex h-full w-[42vw] min-w-[145px] max-w-[190px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_34px_rgba(8,27,53,0.09)] transition duration-300 group-hover:-translate-y-1 group-hover:border-[#00A878]/35 group-hover:shadow-[0_20px_48px_rgba(8,27,53,0.15)] sm:w-[280px] sm:min-w-[280px] sm:max-w-[280px] lg:w-[310px] lg:min-w-[310px] lg:max-w-[310px]">
        <div className="relative h-24 overflow-hidden bg-[#082b54] sm:h-40">
          <Image
            src={cardImage(university)}
            alt={`${university.name} in ${university.city}, Georgia`}
            fill
            sizes="(max-width: 639px) 42vw, (max-width: 1023px) 280px, 310px"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031b35]/55 via-transparent to-transparent" />
          <span className="absolute right-2 top-2 rounded-full bg-[#082b54]/90 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-white backdrop-blur sm:right-3 sm:top-3 sm:px-2.5 sm:text-[10px]">
            {university.pageExists ? "Full profile" : "Verify details"}
          </span>
        </div>

        <div className="relative flex flex-1 flex-col px-3 pb-3 pt-7 sm:px-5 sm:pb-5 sm:pt-10">
          <span className="absolute -top-6 left-3 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-white text-center text-[11px] font-black leading-none text-[#082b54] shadow-md sm:-top-8 sm:left-5 sm:h-16 sm:w-16 sm:text-sm">
            {universityInitials(university)}
          </span>

          <h3 className="min-h-12 text-[13px] font-extrabold leading-[1.25] text-[#071f3f] sm:min-h-14 sm:text-lg sm:leading-6">
            {university.name}
          </h3>

          <p className="mt-2 flex items-start gap-1 text-[10px] font-semibold leading-4 text-slate-500 sm:text-xs">
            <MapPin
              size={12}
              className="mt-0.5 shrink-0 text-[#d7263d] sm:h-3.5 sm:w-3.5"
            />
            {university.location}
          </p>

          <p className="mt-3 text-[11px] font-black leading-4 text-[#00A878] sm:text-base sm:leading-6">
            {feeLine(university)}
          </p>

          <div className="mt-3 rounded-xl bg-[#f4f7fb] p-2.5 text-[9px] font-semibold leading-4 text-[#243b5a] sm:p-3 sm:text-xs sm:leading-5">
            <p>{university.totalTuition ?? university.feeSummary}</p>
            <p className="mt-1">
              {university.mandatoryHostelMess ??
                "Latest hostel details to be verified before admission."}
            </p>
          </div>

          <div className="mt-3 grid gap-1.5 text-[9px] font-bold leading-4 text-slate-600 sm:grid-cols-2 sm:text-[10px]">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck size={12} className="shrink-0 text-[#0F4CFF]" />
              WDOMS verify
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 size={12} className="shrink-0 text-[#00A878]" />
              {fmgeLine(university)}
            </span>
          </div>

          <span className="mt-auto inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#062b55] px-2 py-2 text-[10px] font-extrabold text-white transition group-hover:bg-[#00A878] sm:mt-4 sm:min-h-11 sm:gap-2 sm:px-4 sm:text-sm">
            View details
            <ArrowRight size={14} />
          </span>
        </div>
      </article>
    </Link>
  );
}

export default function GeorgiaUniversityRail({
  universities,
  labelledBy,
  compact = false,
}: {
  universities: GeorgiaUniversityPageData[];
  labelledBy: string;
  compact?: boolean;
}) {
  return (
    <div
      aria-labelledby={labelledBy}
      className={`-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-5 pt-2 [scrollbar-width:thin] [scrollbar-color:#9fb3c8_transparent] sm:-mx-6 sm:gap-4 sm:px-6 lg:-mx-2 lg:px-2 ${
        compact ? "lg:gap-3" : ""
      }`}
    >
      {universities.map((university) => (
        <GeorgiaUniversityCard
          key={university.slug}
          university={university}
        />
      ))}
    </div>
  );
}
