"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import type {
  KyrgyzRecommendationLevel,
  KyrgyzUniversityPageData,
} from "../../data/kyrgyzstanUniversities";
import { KyrgyzstanUniversityCard } from "./KyrgyzstanUniversityCards";

type FilterValue = "all" | "recommended" | "not-recommended" | "no-admission";

const filterOptions: { label: string; value: FilterValue }[] = [
  { label: "All universities", value: "all" },
  { label: "Recommended", value: "recommended" },
  { label: "Not recommended", value: "not-recommended" },
  { label: "No admission", value: "no-admission" },
];

function isRecommended(level: KyrgyzRecommendationLevel) {
  return (
    level === "Recommended" ||
    level === "Recommended - Separate Verification Required"
  );
}

function matchesFilter(
  university: KyrgyzUniversityPageData,
  filter: FilterValue,
) {
  if (filter === "recommended") {
    return isRecommended(university.recommendationLevel);
  }
  if (filter === "not-recommended") {
    return university.recommendationLevel === "Not Recommended";
  }
  if (filter === "no-admission") {
    return university.recommendationLevel === "No Admission";
  }
  return true;
}

export default function KyrgyzstanUniversityExplorer({
  universities,
}: {
  universities: KyrgyzUniversityPageData[];
}) {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [query, setQuery] = useState("");

  const filteredUniversities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return universities.filter((university) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          university.name,
          university.location,
          university.accreditationLabel,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesQuery && matchesFilter(university, filter);
    });
  }, [filter, query, universities]);

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00A878]">
                Explore the complete directory
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[#071f3f] sm:text-3xl">
                Compare Kyrgyzstan medical universities
              </h2>
            </div>

            <label className="relative block w-full lg:max-w-md">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a university"
                className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8fafc] pl-11 pr-4 text-sm font-semibold text-[#071f3f] outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </label>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
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

        <div className="mt-7 grid justify-items-center gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredUniversities.map((university, index) => (
            <KyrgyzstanUniversityCard
              key={university.slug}
              university={university}
              motionIndex={index}
            />
          ))}
        </div>

        {filteredUniversities.length === 0 ? (
          <p className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-bold text-slate-500">
            No university matches this search.
          </p>
        ) : null}
      </div>
    </section>
  );
}
