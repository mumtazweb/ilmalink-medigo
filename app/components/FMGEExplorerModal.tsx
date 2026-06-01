"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  Building2,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { fmgeCountries, type FMGECollege, type FmgeCountry } from "../data/fmgeData";

type FMGEExplorerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
};

type SortOption = "appeared" | "passRate" | "az";

const headlineStats = [
  { value: "54+", label: "Countries / Territories" },
  { value: "486", label: "Foreign Institute Entries" },
  { value: "79,000", label: "FMGE Appeared" },
  { value: "20,382", label: "Passed" },
  { value: "25.80%", label: "Overall Pass Rate" },
];

const sortLabels: Record<SortOption, string> = {
  appeared: "Highest Appeared",
  passRate: "Highest Pass %",
  az: "A-Z",
};

const numberFormatter = new Intl.NumberFormat("en-IN");

function parsePassRate(passRate: string) {
  return Number(passRate.replace("%", "")) || 0;
}

function sortCountries(countries: FmgeCountry[], sortBy: SortOption) {
  return [...countries].sort((a, b) => {
    if (sortBy === "az") return a.country.localeCompare(b.country);
    if (sortBy === "passRate") {
      return parsePassRate(b.passRate) - parsePassRate(a.passRate) || a.country.localeCompare(b.country);
    }
    return b.appeared - a.appeared || a.country.localeCompare(b.country);
  });
}

function sortColleges(colleges: FMGECollege[], sortBy: SortOption) {
  return [...colleges].sort((a, b) => {
    if (sortBy === "az") return a.name.localeCompare(b.name);
    if (sortBy === "passRate") {
      return parsePassRate(b.passRate) - parsePassRate(a.passRate) || a.name.localeCompare(b.name);
    }
    return b.appeared - a.appeared || a.name.localeCompare(b.name);
  });
}

function isCollegeMatch(college: FMGECollege, query: string) {
  return query.length > 0 && college.name.toLowerCase().includes(query);
}

export default function FMGEExplorerModal({ isOpen, onClose, onConnect }: FMGEExplorerModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [countrySort, setCountrySort] = useState<SortOption>("appeared");
  const [collegeSort, setCollegeSort] = useState<SortOption>("appeared");
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchingCollegeCountrySet = useMemo(
    () =>
      new Set(
        normalizedQuery
          ? fmgeCountries
              .filter((country) =>
                country.colleges.some((college) => college.name.toLowerCase().includes(normalizedQuery))
              )
              .map((country) => country.country)
          : []
      ),
    [normalizedQuery]
  );

  const filteredCountries = useMemo(() => {
    const countries = normalizedQuery
      ? fmgeCountries.filter((country) => {
          const countryMatches = country.country.toLowerCase().includes(normalizedQuery);
          const collegeMatches = country.colleges.some((college) =>
            college.name.toLowerCase().includes(normalizedQuery)
          );

          return countryMatches || collegeMatches;
        })
      : fmgeCountries;

    return sortCountries(countries, countrySort);
  }, [countrySort, normalizedQuery]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const portalRoot = document.getElementById("modal-root") ?? document.body;

  const toggleCountry = (country: string) => {
    setExpandedCountries((current) => {
      const next = new Set(current);
      if (next.has(country)) {
        next.delete(country);
      } else {
        next.add(country);
      }

      return next;
    });
  };

  const renderCollegeSort = () => (
    <label className="relative block w-full sm:w-auto">
      <span className="sr-only">Sort colleges</span>
      <SlidersHorizontal
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
      />
      <select
        value={collegeSort}
        onChange={(event) => setCollegeSort(event.target.value as SortOption)}
        className="w-full appearance-none rounded-2xl border border-slate-200 bg-white py-2 pl-9 pr-8 text-sm font-semibold text-[#0B1D39] outline-none transition focus:border-[#16C784] focus:ring-2 focus:ring-[#16C784]/20 sm:w-[190px]"
      >
        {(Object.keys(sortLabels) as SortOption[]).map((option) => (
          <option key={option} value={option}>
            {sortLabels[option]}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
      />
    </label>
  );

  return createPortal(
    <div
      className="fixed inset-0 isolate flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-md sm:p-5"
      style={{ zIndex: 2147483647 }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="fmge-explorer-title"
        className="relative flex max-h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-[28px] bg-[#f6f9fc] shadow-2xl ring-1 ring-white/20"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-30 border-b border-white/10 bg-[#071f3f] px-4 py-4 text-white shadow-[0_12px_30px_rgba(7,31,63,0.22)] sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#16C784]">
                FMGE Explorer
              </p>
              <h2 id="fmge-explorer-title" className="mt-2 text-2xl font-bold tracking-normal sm:text-3xl">
                Explore Universities with FMGE Data
              </h2>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-200">
                Official NBEMS FMGE reference data for informed MBBS abroad selection
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close FMGE explorer"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#16C784]"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {headlineStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
              >
                <p className="text-2xl font-black tracking-normal text-[#071f3f] sm:text-3xl">{stat.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] sm:p-6">
              <p className="text-sm leading-7 text-slate-600">
                According to the NBEMS FMGE 2024 country/institute-wise performance report, Indian foreign
                medical graduates appeared across 54 country/territory categories and 486 listed foreign medical
                institute entries. Choosing the right country and university from such a large pool can be
                confusing. Students should compare FMGE performance, course duration, internship structure,
                English medium, local licence eligibility, safety, budget, and NMC/FMGL compliance before
                admission.
              </p>
            </div>

            <aside className="rounded-3xl bg-[#071f3f] p-5 text-white shadow-[0_18px_40px_rgba(7,31,63,0.22)] sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#16C784]/15 text-[#16C784]">
                <MessageCircle aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-bold tracking-normal">Need Expert Guidance?</h3>
              <p className="mt-3 text-sm leading-6 text-slate-200">
                Our counsellors can help you shortlist suitable countries and universities based on your NEET
                score, budget, preferences, and NMC/FMGL requirements.
              </p>
              <button
                type="button"
                onClick={onConnect}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#16C784] px-4 py-3 text-sm font-bold text-[#001B2E] shadow-[0_14px_30px_rgba(22,199,132,0.26)] transition hover:-translate-y-0.5 hover:bg-[#18d890] focus:outline-none focus:ring-2 focus:ring-white"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Let&apos;s Connect
              </button>
            </aside>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_16px_36px_rgba(15,23,42,0.06)] sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-normal text-[#071f3f]">
                  Country-wise FMGE 2025 Data
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Country-wise and college-wise data below is based on the uploaded NBEMS FMGE 2025 performance
                  report.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-[minmax(220px,1fr)_210px] lg:min-w-[560px]">
                <label className="relative block">
                  <span className="sr-only">Search country or college</span>
                  <Search
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search country or college..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-[#0B1D39] outline-none transition placeholder:text-slate-400 focus:border-[#16C784] focus:bg-white focus:ring-2 focus:ring-[#16C784]/20"
                  />
                </label>

                <label className="relative block">
                  <span className="sr-only">Sort countries</span>
                  <SlidersHorizontal
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  />
                  <select
                    value={countrySort}
                    onChange={(event) => setCountrySort(event.target.value as SortOption)}
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-8 text-sm font-semibold text-[#0B1D39] outline-none transition focus:border-[#16C784] focus:bg-white focus:ring-2 focus:ring-[#16C784]/20"
                  >
                    {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                      <option key={option} value={option}>
                        {sortLabels[option]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  />
                </label>
              </div>
            </div>

            <div className="mt-5 hidden overflow-hidden rounded-3xl border border-slate-200 lg:block">
              <table className="w-full border-collapse bg-white text-left text-sm">
                <thead className="bg-[#071f3f] text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Country</th>
                    <th className="px-4 py-3 font-semibold">FMGE Appeared</th>
                    <th className="px-4 py-3 font-semibold">Passed</th>
                    <th className="px-4 py-3 font-semibold">Pass %</th>
                    <th className="px-4 py-3 font-semibold">Colleges</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCountries.map((country) => {
                    const isExpanded =
                      expandedCountries.has(country.country) || matchingCollegeCountrySet.has(country.country);
                    const sortedColleges = sortColleges(country.colleges, collegeSort);

                    return (
                      <Fragment key={country.country}>
                        <tr className="transition hover:bg-slate-50">
                          <td className="px-4 py-4 font-bold text-[#071f3f]">{country.country}</td>
                          <td className="px-4 py-4 text-slate-700">{numberFormatter.format(country.appeared)}</td>
                          <td className="px-4 py-4 text-slate-700">{numberFormatter.format(country.passed)}</td>
                          <td className="px-4 py-4">
                            <span className="rounded-full bg-[#16C784]/10 px-3 py-1 text-sm font-bold text-[#067348]">
                              {country.passRate}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-slate-700">{country.colleges.length}</span>
                              <button
                                type="button"
                                onClick={() => toggleCountry(country.country)}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#071f3f] transition hover:border-[#16C784] hover:text-[#067348]"
                              >
                                {isExpanded ? "Hide Colleges" : "View Colleges"}
                                {isExpanded ? (
                                  <ChevronUp aria-hidden="true" className="h-4 w-4" />
                                ) : (
                                  <ChevronDown aria-hidden="true" className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>

                        {isExpanded && (
                          <tr>
                            <td colSpan={5} className="bg-slate-50 px-4 py-4">
                              <div className="rounded-3xl border border-slate-200 bg-white p-4">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2 text-sm font-bold text-[#071f3f]">
                                    <Building2 aria-hidden="true" className="h-4 w-4 text-[#16C784]" />
                                    {country.country} colleges
                                  </div>
                                  {renderCollegeSort()}
                                </div>

                                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                                  <table className="w-full border-collapse text-left text-sm">
                                    <thead className="bg-slate-100 text-xs uppercase tracking-[0.12em] text-slate-500">
                                      <tr>
                                        <th className="px-4 py-3 font-semibold">
                                          College / Institute / University
                                        </th>
                                        <th className="px-4 py-3 font-semibold">Appeared</th>
                                        <th className="px-4 py-3 font-semibold">Passed</th>
                                        <th className="px-4 py-3 font-semibold">Pass %</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                      {sortedColleges.map((college) => (
                                        <tr
                                          key={college.name}
                                          className={
                                            isCollegeMatch(college, normalizedQuery)
                                              ? "bg-[#16C784]/10"
                                              : "bg-white"
                                          }
                                        >
                                          <td className="px-4 py-3 font-semibold text-[#071f3f]">{college.name}</td>
                                          <td className="px-4 py-3 text-slate-700">
                                            {numberFormatter.format(college.appeared)}
                                          </td>
                                          <td className="px-4 py-3 text-slate-700">
                                            {numberFormatter.format(college.passed)}
                                          </td>
                                          <td className="px-4 py-3 font-bold text-[#067348]">{college.passRate}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-5 space-y-3 lg:hidden">
              {filteredCountries.map((country) => {
                const isExpanded =
                  expandedCountries.has(country.country) || matchingCollegeCountrySet.has(country.country);
                const sortedColleges = sortColleges(country.colleges, collegeSort);

                return (
                  <article key={country.country} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-base font-bold tracking-normal text-[#071f3f]">{country.country}</h4>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                          {country.colleges.length} colleges
                        </p>
                      </div>
                      <span className="rounded-full bg-[#16C784]/10 px-3 py-1 text-sm font-bold text-[#067348]">
                        {country.passRate}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl bg-white p-3">
                        <p className="text-xs uppercase tracking-[0.12em] text-slate-500">FMGE Appeared</p>
                        <p className="mt-1 font-bold text-[#071f3f]">{numberFormatter.format(country.appeared)}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-3">
                        <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Passed</p>
                        <p className="mt-1 font-bold text-[#071f3f]">{numberFormatter.format(country.passed)}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleCountry(country.country)}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#071f3f] transition hover:border-[#16C784] hover:text-[#067348]"
                    >
                      {isExpanded ? "Hide Colleges" : "View Colleges"}
                      {isExpanded ? (
                        <ChevronUp aria-hidden="true" className="h-4 w-4" />
                      ) : (
                        <ChevronDown aria-hidden="true" className="h-4 w-4" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-3">
                        <div className="mb-3">{renderCollegeSort()}</div>
                        <div className="space-y-2">
                          {sortedColleges.map((college) => (
                            <div
                              key={college.name}
                              className={`rounded-2xl border p-3 ${
                                isCollegeMatch(college, normalizedQuery)
                                  ? "border-[#16C784] bg-[#ecfdf5]"
                                  : "border-slate-200 bg-white"
                              }`}
                            >
                              <p className="text-sm font-bold leading-5 text-[#071f3f]">{college.name}</p>
                              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                                <div>
                                  <p className="text-slate-500">Appeared</p>
                                  <p className="mt-1 font-bold text-slate-800">
                                    {numberFormatter.format(college.appeared)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Passed</p>
                                  <p className="mt-1 font-bold text-slate-800">
                                    {numberFormatter.format(college.passed)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Pass %</p>
                                  <p className="mt-1 font-bold text-[#067348]">{college.passRate}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {filteredCountries.length === 0 && (
              <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm font-semibold text-slate-500">
                No matching FMGE country or college data found.
              </div>
            )}
          </section>

          <div className="mt-5 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            FMGE data shows candidate appearance and performance only. It does not mean NMC approval. Students
            must verify university-wise course duration, internship, English medium, local licence eligibility,
            WDOMS listing, and latest NMC/FMGL compliance before admission.
          </div>
        </div>
      </div>
    </div>,
    portalRoot
  );
}
