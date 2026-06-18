"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { GeorgiaUniversityPageData } from "../../data/georgiaUniversities";
import { GeorgiaUniversityCard } from "./GeorgiaUniversityCards";

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
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
              Georgian American University, ALTE University and East European
              University have full fee-and-admission pages.
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
                placeholder="Search GAU, ALTE, EEU, Tbilisi, fees..."
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

        <div className="mt-6 grid justify-items-center gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((university) => (
              <GeorgiaUniversityCard
                key={university.slug}
                university={university}
              />
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-sm font-semibold text-slate-600 md:col-span-2 xl:col-span-3">
              No Georgia university matches this search. Try GAU, ALTE, East
              European University, Tbilisi, fee, hostel, or FMGE.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
