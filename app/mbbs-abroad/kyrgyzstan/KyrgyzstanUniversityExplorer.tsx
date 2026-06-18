"use client";

import { useEffect, useMemo, useState } from "react";

import type {
  KyrgyzRecommendationLevel,
  KyrgyzUniversityPageData,
} from "../../data/kyrgyzstanUniversities";

type FilterValue = "all" | "recommended" | "not-recommended" | "no-admission";

const filterOptions: { label: string; value: FilterValue }[] = [
  { label: "All", value: "all" },
  { label: "Recommended", value: "recommended" },
  { label: "Not Recommended", value: "not-recommended" },
  { label: "No Admission", value: "no-admission" },
];

const counsellingHref = "/mbbs-abroad/kyrgyzstan?counselling=open";

function firstValue(value: string | string[] | null | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeFilter(
  value: string | string[] | null | undefined,
): FilterValue {
  const filter = firstValue(value);

  if (
    filter === "recommended" ||
    filter === "not-recommended" ||
    filter === "no-admission"
  ) {
    return filter;
  }

  return "all";
}

function isRecommendedLevel(level: KyrgyzRecommendationLevel) {
  return (
    level === "Recommended" ||
    level === "Recommended — Separate Verification Required"
  );
}

function matchesFilter(university: KyrgyzUniversityPageData, filter: FilterValue) {
  if (filter === "all") return true;
  if (filter === "recommended") return isRecommendedLevel(university.recommendationLevel);
  if (filter === "not-recommended") return university.recommendationLevel === "Not Recommended";
  return university.recommendationLevel === "No Admission";
}

function matchesSearch(university: KyrgyzUniversityPageData, query: string) {
  if (!query) return true;

  const campusSearchText =
    university.campuses
      ?.map((campus) =>
        [
          campus.name,
          campus.location,
          campus.address,
          campus.program,
          campus.intake,
          ...campus.highlights,
        ].join(" "),
      )
      .join(" ") ?? "";

  const haystack = [
    university.name,
    university.location,
    university.accreditationStatus,
    university.recommendationLevel,
    campusSearchText,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function filterHref(filter: FilterValue, query: string) {
  const params = new URLSearchParams();

  if (filter !== "all") params.set("filter", filter);
  if (query) params.set("q", query);

  const queryString = params.toString();
  return queryString
    ? `/mbbs-abroad/kyrgyzstan?${queryString}#universities`
    : "/mbbs-abroad/kyrgyzstan#universities";
}

function updateExplorerUrl(filter: FilterValue, query: string) {
  window.history.replaceState(null, "", filterHref(filter, query));
}

function scrollToExplorer() {
  document.getElementById("universities")?.scrollIntoView({ block: "start" });
}

function universityHref(slug: string) {
  return `/mbbs-abroad/kyrgyzstan/${slug}`;
}

function feeSummary(university: KyrgyzUniversityPageData) {
  if (university.campuses?.length) {
    const campusFees = university.campuses
      .map((campus) => {
        const firstFee = campus.feeRows[0];
        const firstAmount =
          firstFee?.totalCost && firstFee.totalCost !== "Not specified in brochure"
            ? `first listed total ${firstFee.totalCost}`
            : firstFee?.tuitionFee
              ? `first listed tuition ${firstFee.tuitionFee}`
              : "fee table available";

        return `${campus.name}: ${firstAmount}`;
      })
      .join("; ");

    return `Campus-wise fee tables available (${campusFees})`;
  }

  const firstFee = university.feeRows[0];

  if (!firstFee || firstFee.totalCost === "To be updated") {
    return "Fees: To be updated";
  }

  return `${university.intake}: fee table available; first listed total ${firstFee.totalCost}`;
}

function fmgeSummary(university: KyrgyzUniversityPageData) {
  const firstMatch = university.fmgePerformance?.[0];

  if (!firstMatch) return "FMGE 2025 match: To be updated";

  return `FMGE 2025: ${firstMatch.appeared.toLocaleString("en-IN")} appeared, ${firstMatch.passed.toLocaleString("en-IN")} passed, ${firstMatch.passRate} pass rate`;
}

function recommendationClasses(level: KyrgyzRecommendationLevel) {
  if (level === "Not Recommended") {
    return {
      card: "border-orange-200 bg-orange-50",
      badge: "bg-orange-100 text-orange-800 ring-orange-200",
      soft: "bg-orange-100 text-orange-800",
    };
  }

  if (level === "No Admission") {
    return {
      card: "border-red-200 bg-red-50",
      badge: "bg-red-100 text-red-800 ring-red-200",
      soft: "bg-red-100 text-red-800",
    };
  }

  return {
    card: "border-emerald-200 bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-800 ring-emerald-200",
    soft: "bg-emerald-100 text-emerald-800",
  };
}

function StickyGuidanceCta() {
  return (
    <div className="sticky top-20 z-20 mt-5 rounded-2xl border border-[#00C896]/35 bg-gradient-to-r from-[#031525] via-[#06345a] to-[#0b5f73] p-4 text-white shadow-[0_22px_45px_rgba(3,21,37,0.28)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#99F6E4]">
            Premium Guidance Desk
          </p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-100 md:text-base">
            Need a verified Kyrgyzstan shortlist? Get one expert review for eligibility,
            accreditation signals, and admission risks.
          </p>
        </div>
        <a
          href={counsellingHref}
          data-open-counselling
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#00C896] to-[#2DD4BF] px-5 text-sm font-extrabold text-[#022c22] shadow-[0_14px_30px_rgba(45,212,191,0.35)] transition hover:-translate-y-0.5 hover:from-[#34D399] hover:to-[#5EEAD4]"
        >
          Get Expert Eligibility Review
        </a>
      </div>
    </div>
  );
}

function AccreditationBadge({ university }: { university: KyrgyzUniversityPageData }) {
  const tone = recommendationClasses(university.recommendationLevel);

  return (
    <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-extrabold ring-1 ${tone.badge}`}>
      {university.accreditationLabel}
    </span>
  );
}

function RecommendationBadge({ university }: { university: KyrgyzUniversityPageData }) {
  const tone = recommendationClasses(university.recommendationLevel);

  return (
    <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-extrabold ring-1 ${tone.badge}`}>
      {university.recommendationLevel}
    </span>
  );
}

function UniversityQuickView({ university }: { university: KyrgyzUniversityPageData }) {
  return (
    <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 text-slate-800">
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-extrabold text-slate-950">Accreditation status</dt>
          <dd className="mt-1 text-slate-600">{university.accreditationStatus}</dd>
        </div>
        <div>
          <dt className="font-extrabold text-slate-950">Recommendation</dt>
          <dd className="mt-1 text-slate-600">{university.recommendationLevel}</dd>
        </div>
        <div>
          <dt className="font-extrabold text-slate-950">Fee summary</dt>
          <dd className="mt-1 text-slate-600">{feeSummary(university)}</dd>
        </div>
        <div>
          <dt className="font-extrabold text-slate-950">FMGE data match</dt>
          <dd className="mt-1 text-slate-600">{fmgeSummary(university)}</dd>
        </div>
        <div>
          <dt className="font-extrabold text-slate-950">Location</dt>
          <dd className="mt-1 text-slate-600">{university.location}</dd>
        </div>
      </dl>

      {university.campuses?.length ? (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <h4 className="text-xs font-extrabold uppercase text-emerald-800">
            Campus options
          </h4>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {university.campuses.map((campus) => (
              <div key={campus.name} className="rounded-lg bg-white p-3">
                <p className="text-sm font-extrabold text-slate-950">{campus.name}</p>
                <p className="mt-1 text-xs font-bold text-slate-500">
                  {campus.location}
                </p>
                <p className="mt-2 text-sm font-semibold leading-5 text-slate-700">
                  {campus.feeRows[0]?.totalCost !== "Not specified in brochure"
                    ? `First listed total: ${campus.feeRows[0]?.totalCost}`
                    : `First listed tuition: ${campus.feeRows[0]?.tuitionFee}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <p className="mt-4 text-sm font-medium leading-6 text-slate-700">
        {university.recommendationMessage}
      </p>

      {university.recommendationLevel === "Recommended — Separate Verification Required" ? (
        <p className="mt-3 inline-flex rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          Separate official verification required
        </p>
      ) : null}

      {university.fmgePerformance?.length ? (
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <h4 className="text-xs font-extrabold uppercase text-slate-500">
            Matched FMGE 2025 college entries
          </h4>
          <div className="mt-2 grid gap-2">
            {university.fmgePerformance.map((item) => (
              <p key={item.sourceName} className="text-sm font-semibold leading-6 text-slate-700">
                {item.sourceName}: {item.appeared.toLocaleString("en-IN")} appeared,{" "}
                {item.passed.toLocaleString("en-IN")} passed, {item.passRate} pass rate.
              </p>
            ))}
          </div>
          <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
            FMGE performance data is for reference only and does not indicate
            approval, recognition, or admission suitability.
          </p>
        </div>
      ) : null}

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <div className="rounded-lg bg-slate-50 p-3">
          <h4 className="text-xs font-extrabold uppercase text-slate-500">
            Entry requirements
          </h4>
          <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
            {university.entryRequirements.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <h4 className="text-xs font-extrabold uppercase text-slate-500">
            Required documents
          </h4>
          <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
            {university.documentChecklist.slice(0, 4).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <h4 className="text-xs font-extrabold uppercase text-slate-500">
            Key highlights
          </h4>
          <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
            {university.highlights.length > 0 ? (
              university.highlights.slice(0, 4).map((item) => <li key={item}>{item}</li>)
            ) : (
              <li>Contact for latest details</li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        {university.pageExists ? (
          <a
            href={universityHref(university.slug)}
            className="inline-flex items-center justify-center rounded-lg border border-[#06345a] px-4 py-2.5 text-sm font-extrabold text-[#06345a] transition hover:border-[#00C896] hover:text-[#007e62]"
          >
            View Full Details
          </a>
        ) : null}
        {!university.pageExists ? (
          <p className="inline-flex items-center rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900">
            Detailed profile pending
          </p>
        ) : null}
      </div>
    </div>
  );
}

function UniversityCard({ university }: { university: KyrgyzUniversityPageData }) {
  const tone = recommendationClasses(university.recommendationLevel);

  return (
    <article className={`rounded-lg border p-4 shadow-sm ${tone.card}`}>
      <div className="flex h-full flex-col">
        <div className="flex flex-wrap gap-2">
          <AccreditationBadge university={university} />
          <RecommendationBadge university={university} />
        </div>

        <h3 className="mt-4 text-lg font-extrabold leading-6 text-slate-950">
          {university.name}
        </h3>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          Location: {university.location}
        </p>
        {university.campuses?.length ? (
          <p className="mt-1 text-xs font-bold text-slate-500">
            Campus options: {university.campuses.map((campus) => campus.name).join(", ")}
          </p>
        ) : null}
        <p className="mt-1 text-sm font-extrabold text-[#047857]">
          {feeSummary(university)}
        </p>
        <p className="mt-1 text-xs font-bold text-slate-500">
          {fmgeSummary(university)}
        </p>
        <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-700">
          {university.recommendationMessage}
        </p>

        {university.recommendationLevel === "Recommended — Separate Verification Required" ? (
          <p className="mt-3 text-xs font-bold text-slate-500">
            Separate official verification required
          </p>
        ) : null}

        <div className="mt-auto pt-4">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-center rounded-lg bg-[#06345a] px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#074b83]">
              Quick View
            </summary>
            <UniversityQuickView university={university} />
          </details>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {university.pageExists ? (
              <a
                href={universityHref(university.slug)}
                className="inline-flex items-center justify-center rounded-lg border border-[#06345a] bg-white px-4 py-2.5 text-sm font-extrabold text-[#06345a] transition hover:border-[#00C896] hover:text-[#007e62]"
              >
                View Full Details
              </a>
            ) : null}
            {!university.pageExists ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-center text-xs font-bold text-amber-900 sm:col-span-2">
                Detailed profile pending
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function KyrgyzstanUniversityExplorer({
  universities,
}: {
  universities: KyrgyzUniversityPageData[];
}) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextFilter = normalizeFilter(params.get("filter"));
    const nextQuery = params.get("q")?.trim() ?? "";

    const initialStateTimer = window.setTimeout(() => {
      setActiveFilter(nextFilter);
      setQuery(nextQuery);
      setSearchInput(nextQuery);
    }, 0);

    return () => window.clearTimeout(initialStateTimer);
  }, []);

  const filteredUniversities = useMemo(
    () =>
      universities.filter(
        (university) =>
          matchesFilter(university, activeFilter) &&
          matchesSearch(university, query),
      ),
    [activeFilter, query, universities],
  );

  return (
    <section id="universities" className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase text-[#047857]">
              Kyrgyzstan MBBS Fee Structure
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-normal text-[#031525] md:text-4xl">
              Kyrgyzstan Medical Universities — Accreditation & Fee Overview
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-slate-600">
              Use the badges below as a professional shortlist guide. Fee
              values are shown only where brochure-provided information is
              available; otherwise they remain marked as To be updated.
            </p>
          </div>
          <form
            action="/mbbs-abroad/kyrgyzstan"
            method="get"
            className="flex w-full flex-col gap-2 sm:flex-row lg:max-w-xl"
            onSubmit={(event) => {
              event.preventDefault();
              const nextQuery = searchInput.trim();
              setQuery(nextQuery);
              updateExplorerUrl(activeFilter, nextQuery);
              scrollToExplorer();
            }}
          >
            {activeFilter !== "all" ? (
              <input type="hidden" name="filter" value={activeFilter} />
            ) : null}
            <input
              type="search"
              name="q"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search university in Kyrgyzstan..."
              className="min-h-11 flex-1 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]/20"
            />
            <button
              type="submit"
              className="rounded-lg bg-[#031525] px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#073459]"
            >
              Search
            </button>
          </form>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <a
              key={option.value}
              href={filterHref(option.value, query)}
              onClick={(event) => {
                event.preventDefault();
                setActiveFilter(option.value);
                updateExplorerUrl(option.value, query);
                scrollToExplorer();
              }}
              className={`rounded-lg px-3 py-2 text-sm font-extrabold ring-1 transition ${
                activeFilter === option.value
                  ? "bg-[#00C896] text-[#031525] ring-[#00C896]"
                  : "bg-white text-slate-700 ring-slate-200 hover:text-[#047857] hover:ring-[#00C896]/50"
              }`}
            >
              {option.label}
            </a>
          ))}
        </div>

        <StickyGuidanceCta />

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((university) => (
              <UniversityCard key={university.slug} university={university} />
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-sm font-semibold text-slate-600 md:col-span-2 xl:col-span-3">
              No Kyrgyzstan university matches the selected search and filter.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
