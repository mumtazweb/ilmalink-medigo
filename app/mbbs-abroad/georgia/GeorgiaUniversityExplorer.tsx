"use client";

import { ArrowRight, MessageCircle, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import CounsellingActionButton from "../../components/CounsellingActionButton";
import type { GeorgiaUniversityPageData } from "../../data/georgiaUniversities";

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function universityHref(slug: string) {
  return `/mbbs-abroad/georgia/${slug}`;
}

function firstFmgeLine(university: GeorgiaUniversityPageData) {
  const fmge = university.fmgePerformance?.[0];

  if (!fmge) return "FMGE 2025 match: verify with latest data";

  return `FMGE 2025: ${fmge.appeared.toLocaleString("en-IN")} appeared, ${fmge.passed.toLocaleString("en-IN")} passed, ${fmge.passRate} pass rate`;
}

function matchesSearch(university: GeorgiaUniversityPageData, query: string) {
  if (!query) return true;

  const searchText = normalize(
    [
      university.name,
      university.shortName ?? "",
      university.city,
      university.location,
      university.program,
      university.feeSummary,
      university.accreditationLabel,
      university.recommendationLabel,
      university.summary,
      ...university.highlights,
      ...(university.fmgePerformance?.map((item) => item.sourceName) ?? []),
    ].join(" "),
  );

  return normalize(query)
    .split(" ")
    .filter(Boolean)
    .every((term) => searchText.includes(term));
}

function updateExplorerUrl(query: string) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);

  const queryString = params.toString();
  window.history.replaceState(
    null,
    "",
    queryString
      ? `/mbbs-abroad/georgia?${queryString}#georgia-universities`
      : "/mbbs-abroad/georgia#georgia-universities",
  );
}

function scrollToExplorer() {
  document
    .getElementById("georgia-universities")
    ?.scrollIntoView({ block: "start" });
}

function UniversityCard({
  university,
}: {
  university: GeorgiaUniversityPageData;
}) {
  const hasFullPage = Boolean(university.pageExists);

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#8f2118]/35 hover:shadow-md">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-lg bg-[#fff1ed] px-2.5 py-1 text-xs font-extrabold text-[#8f2118] ring-1 ring-[#f5c7be]">
          {university.recommendationLabel}
        </span>
        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-extrabold text-slate-700 ring-1 ring-slate-200">
          {university.city}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-extrabold leading-7 text-[#24110f]">
        {university.name}
      </h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
        {university.summary}
      </p>

      <dl className="mt-4 grid gap-2 text-sm">
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <dt className="text-xs font-bold uppercase text-slate-500">
            Fee status
          </dt>
          <dd className="mt-1 font-extrabold text-[#047857]">
            {university.feeSummary}
          </dd>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <dt className="text-xs font-bold uppercase text-slate-500">
            FMGE reference
          </dt>
          <dd className="mt-1 font-semibold text-slate-700">
            {firstFmgeLine(university)}
          </dd>
        </div>
      </dl>

      <div className="mt-auto grid gap-2 pt-4 sm:grid-cols-2">
        {hasFullPage ? (
          <a
            href={universityHref(university.slug)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#24110f] px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#4b1812]"
          >
            View Details
            <ArrowRight size={16} />
          </a>
        ) : null}
        <CounsellingActionButton
          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#8f2118]/25 bg-white px-4 py-2.5 text-sm font-extrabold text-[#8f2118] transition hover:border-[#8f2118]/60 hover:bg-[#fff7f4] ${
            hasFullPage ? "" : "sm:col-span-2"
          }`}
        >
          <MessageCircle size={16} />
          Verify Now
        </CounsellingActionButton>
      </div>
    </article>
  );
}

export default function GeorgiaUniversityExplorer({
  universities,
}: {
  universities: GeorgiaUniversityPageData[];
}) {
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q")?.trim() ?? "";

    window.setTimeout(() => {
      setQuery(initialQuery);
      setSearchInput(initialQuery);
    }, 0);
  }, []);

  const filteredUniversities = useMemo(
    () =>
      universities.filter((university) => matchesSearch(university, query)),
    [query, universities],
  );

  return (
    <section id="georgia-universities" className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#8f2118]">
              Georgia university search
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-normal text-[#24110f] md:text-4xl">
              Compare Georgia medical universities and fees
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-slate-600">
              Search by university, city, fee, FMGE data, or program details.
              ALTE University and East European University have full
              fee-structure pages.
            </p>
          </div>

          <form
            action="/mbbs-abroad/georgia"
            method="get"
            className="flex w-full flex-col gap-2 sm:flex-row lg:max-w-xl"
            onSubmit={(event) => {
              event.preventDefault();
              const nextQuery = searchInput.trim();
              setQuery(nextQuery);
              updateExplorerUrl(nextQuery);
              scrollToExplorer();
            }}
          >
            <label className="sr-only" htmlFor="georgia-university-search">
              Search Georgia universities
            </label>
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="georgia-university-search"
                type="search"
                name="q"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search ALTE, EEU, Tbilisi, fees..."
                className="min-h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#8f2118] focus:ring-2 focus:ring-[#8f2118]/15"
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#8f2118] px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#6f1711]"
            >
              <Search size={16} />
              Search
            </button>
          </form>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((university) => (
              <UniversityCard key={university.slug} university={university} />
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-sm font-semibold text-slate-600 md:col-span-2 xl:col-span-3">
              No Georgia university matches this search. Try East European
              University, Tbilisi, fee, hostel, or FMGE.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
