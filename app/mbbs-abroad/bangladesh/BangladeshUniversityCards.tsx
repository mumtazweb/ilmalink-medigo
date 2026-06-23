"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  CircleDollarSign,
  MapPin,
  Search,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import type { BangladeshCollegeProfile } from "../../data/bangladeshUniversities";

type FilterValue = "all" | "featured" | "verify-first";

type BangladeshUniversityRailProps = {
  universities: BangladeshCollegeProfile[];
  labelledBy?: string;
};

const filterOptions: { label: string; value: FilterValue }[] = [
  { label: "All colleges", value: "all" },
  { label: "Featured", value: "featured" },
  { label: "Verify first", value: "verify-first" },
];

const cardDetails: Record<
  string,
  { name?: string; city?: string; fee?: string; accreditation?: string }
> = {
  "anwer-khan-modern-medical-college": {
    name: "Anwer Khan Modern Medical College",
    city: "Dhaka",
    fee: "Fee letter mapped",
    accreditation: "Verify BM&DC/DGME",
  },
  "green-life-medical-college": {
    name: "Green Life Medical College",
    city: "Dhaka",
    fee: "Fee letter mapped",
    accreditation: "Verify BM&DC/DGME",
  },
  "jahurul-islam-medical-college": {
    name: "Jahurul Islam Medical College",
    city: "Kishoreganj",
    fee: "$42,000 (2025-26)",
    accreditation: "University of Dhaka",
  },
  "tairunnessa-memorial-medical-college": {
    name: "Tairunnessa Memorial Medical College",
    city: "Gazipur",
    fee: "Fee letter mapped",
    accreditation: "Verify BM&DC/DGME",
  },
  "sylhet-womens-medical-college": {
    name: "Sylhet Women's Medical College",
    city: "Sylhet",
    fee: "$42,000 total",
    accreditation: "Verify BM&DC/DGME",
  },
  "ad-din-akij-medical-college": {
    name: "Ad-din Akij Medical College",
    city: "Khulna",
    fee: "$33,500 total",
    accreditation: "Verify BM&DC/DGME",
  },
  "ad-din-momin-medical-college": {
    name: "Ad-din Momin Medical College",
    city: "Dhaka",
    fee: "$35,500 total",
    accreditation: "Verify BM&DC/DGME",
  },
  "ad-din-sakina-womens-medical-college": {
    name: "Ad-din Sakina Women's Medical College",
    city: "Jashore",
    fee: "$33,500 total",
    accreditation: "Verify BM&DC/DGME",
  },
};

function collegeHref(slug: string) {
  return `/mbbs-abroad/bangladesh/${slug}/`;
}

function matchesFilter(college: BangladeshCollegeProfile, filter: FilterValue) {
  if (filter === "featured") {
    return college.recommendationLevel === "Featured";
  }

  if (filter === "verify-first") {
    return college.recommendationLevel === "Verify First";
  }

  return true;
}

function conciseAccreditation(college: BangladeshCollegeProfile) {
  const custom = cardDetails[college.slug]?.accreditation;
  if (custom) return custom;

  if (college.recommendationLevel === "Featured") {
    return "Featured option";
  }

  if (college.recommendationLevel === "Verify First") {
    return "Verify first";
  }

  return "Verify BM&DC/DGME";
}

function displayCity(college: BangladeshCollegeProfile) {
  const custom = cardDetails[college.slug]?.city;
  if (custom) return custom;

  return college.city || college.location || "Bangladesh";
}

function displayFee(college: BangladeshCollegeProfile) {
  const custom = cardDetails[college.slug]?.fee;
  if (custom) return custom;

  return college.totalCourseFeeLabel || college.fees || "Fee requires verification";
}

function displayFmge(college: BangladeshCollegeProfile) {
  if (college.fmge.appeared === null || college.fmge.passed === null) {
    return "FMGE data: verify separately";
  }

  return `${college.fmge.appeared.toLocaleString("en-IN")} appeared · ${college.fmge.passed.toLocaleString("en-IN")} passed · ${college.fmge.passRate}`;
}

export function BangladeshUniversityCard({
  university,
  motionIndex = 0,
}: {
  university: BangladeshCollegeProfile;
  motionIndex?: number;
}) {
  const displayName = cardDetails[university.slug]?.name ?? university.name;
  const liquidStyle = {
    "--liquid-delay": `${-(motionIndex % 7) * 0.8}s`,
  } as CSSProperties;

  return (
    <Link
      href={collegeHref(university.slug)}
      className="group block h-[212px] w-[calc(100vw-2rem)] min-w-[280px] max-w-[320px] flex-none snap-start sm:h-[360px]"
      aria-label={`View the full ${displayName} profile`}
    >
      <article
        style={liquidStyle}
        className="kyrgyz-liquid-university-card flex h-full w-full flex-col overflow-hidden rounded-[1.4rem] transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_68px_rgba(8,45,67,0.22)]"
      >
        <div className="relative h-16 shrink-0 overflow-hidden bg-[#082b54] sm:h-20">
          <Image
            src={university.image}
            alt={university.imageAlt}
            fill
            sizes="(max-width: 640px) calc(100vw - 2rem), 320px"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031b35]/55 via-transparent to-black/10" />
          <span className="absolute right-2 top-2 rounded-full border border-white/25 bg-[#031b35]/85 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur-md sm:right-3 sm:px-2.5 sm:py-1 sm:text-[9px]">
            Full profile
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-3.5 sm:grid sm:grid-rows-[112px_24px_28px] sm:content-between sm:gap-0 sm:p-5">
          <h3 className="line-clamp-2 overflow-hidden text-[15px] font-black leading-5 tracking-normal text-[#071f3f] sm:line-clamp-4 sm:h-28 sm:text-xl sm:leading-7">
            {displayName}
          </h3>

          <div className="flex h-5 min-w-0 flex-nowrap items-center gap-1.5 overflow-hidden text-[9px] font-bold min-[360px]:text-[10px] sm:h-6 sm:gap-3 sm:text-xs">
            <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-slate-500">
              <MapPin size={14} className="shrink-0 text-rose-500" />
              <span>{displayCity(university)}</span>
            </span>

            <span
              className={`inline-flex min-w-0 items-center gap-1 truncate whitespace-nowrap font-extrabold ${
                university.recommendationLevel === "Verify First"
                  ? "text-amber-700"
                  : "text-emerald-700"
              }`}
            >
              <ShieldCheck size={13} className="shrink-0" />
              {conciseAccreditation(university)}
            </span>
          </div>

          <p className="h-6 overflow-hidden whitespace-nowrap text-base font-black leading-6 tracking-normal text-[#00A878] sm:h-7 sm:text-xl sm:leading-7">
            {displayFee(university)}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default function BangladeshUniversityRail({
  universities,
  labelledBy,
}: BangladeshUniversityRailProps) {
  return (
    <div
      aria-labelledby={labelledBy}
      className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-7 pt-3 [scrollbar-width:thin] [scrollbar-color:#9fb3c8_transparent] sm:-mx-6 sm:px-6 lg:-mx-2 lg:px-2"
    >
      {universities.map((university, index) => (
        <BangladeshUniversityCard
          key={university.slug}
          university={university}
          motionIndex={index}
        />
      ))}
    </div>
  );
}

export function BangladeshUniversityExplorer({
  universities,
}: {
  universities: BangladeshCollegeProfile[];
}) {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [query, setQuery] = useState("");

  const filteredUniversities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return universities.filter((college) => {
      const searchableText = [
        college.name,
        college.slug,
        college.city,
        college.location,
        college.program,
        college.intake,
        college.duration,
        college.fees,
        college.totalCourseFeeLabel,
        college.recommendationLevel,
        college.fmge.sourceName,
        college.fmge.passRate,
        displayFmge(college),
        college.website ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!normalizedQuery || searchableText.includes(normalizedQuery)) &&
        matchesFilter(college, filter)
      );
    });
  }, [filter, query, universities]);

  return (
    <section className="kyrgyz-liquid-card-stage scroll-mt-24 overflow-hidden px-4 pb-3 pt-4 sm:px-6 sm:pt-5 lg:px-8">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00A878]">
                Explore Bangladesh colleges
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[#071f3f] sm:text-3xl">
                Compare Bangladesh medical colleges
              </h2>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-600">
                Search by college name, city, fee, FMGE record, intake or route note.
              </p>
            </div>

            <label className="relative block w-full lg:max-w-md">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                aria-label="Search Bangladesh medical colleges"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a Bangladesh college"
                className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8fafc] pl-11 pr-4 text-sm font-semibold text-[#071f3f] outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </label>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                className={`h-10 shrink-0 rounded-full px-4 text-xs font-extrabold transition ${
                  filter === option.value
                    ? "bg-[#062b55] text-white shadow-md"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {filteredUniversities.length > 0 ? (
          <div className="mt-2">
            <BangladeshUniversityRail
              universities={filteredUniversities}
              labelledBy="bangladesh-explorer-heading"
            />
          </div>
        ) : (
          <p className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-bold text-slate-500">
            No Bangladesh college matches this search.
          </p>
        )}
      </div>
    </section>
  );
}

export function BangladeshVerificationPills({
  university,
}: {
  university: BangladeshCollegeProfile;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {[
        ["Fee letter", university.intake, CircleDollarSign],
        ["FMGE", university.fmge.passRate, TrendingUp],
        ["Route", "Verify DGME/BM&DC", ShieldCheck],
      ].map(([label, value, Icon]) => {
        const IconComponent = Icon as typeof CheckCircle2;

        return (
          <div
            key={label as string}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <IconComponent size={18} className="text-[#00A878]" />
            <p className="mt-3 text-[10px] font-black uppercase tracking-wide text-slate-500">
              {label as string}
            </p>
            <p className="mt-1 text-sm font-black text-[#071f3f]">
              {value as string}
            </p>
          </div>
        );
      })}
    </div>
  );
}
