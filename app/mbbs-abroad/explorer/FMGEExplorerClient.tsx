"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import CounsellingActionButton from "../../components/CounsellingActionButton";
import Navbar from "../../components/navbar";
import { fmgeCountries } from "../../data/fmgeData";
import { getFmgeCountryDisplayName, getFmgeCountryHref } from "../../data/exploreLinks";

const numberFormatter = new Intl.NumberFormat("en-IN");

type SortOption = "appeared" | "passRate" | "az";

const sortLabels: Record<SortOption, string> = {
  appeared: "Highest Appeared",
  passRate: "Highest Pass %",
  az: "A-Z",
};

const PAGE_SIZE = 10;

function parsePassRate(passRate: string) {
  return Number(passRate.replace("%", "")) || 0;
}

function sortCountries(countries: typeof fmgeCountries, sortBy: SortOption) {
  return [...countries].sort((a, b) => {
    if (sortBy === "az") return a.country.localeCompare(b.country);
    if (sortBy === "passRate") {
      return parsePassRate(b.passRate) - parsePassRate(a.passRate) || a.country.localeCompare(b.country);
    }

    return b.appeared - a.appeared || a.country.localeCompare(b.country);
  });
}

export default function FMGEExplorerPage() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("appeared");
  const [page, setPage] = useState(1);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredCountries = useMemo(() => {
    const rows = normalizedQuery
      ? fmgeCountries.filter((country) => {
          const countryMatches = country.country.toLowerCase().includes(normalizedQuery);
          const collegeMatches = country.colleges.some((college) =>
            college.name.toLowerCase().includes(normalizedQuery)
          );
          return countryMatches || collegeMatches;
        })
      : fmgeCountries;

    return sortCountries(rows, sortBy);
  }, [normalizedQuery, sortBy]);

  const pageCount = Math.max(1, Math.ceil(filteredCountries.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [normalizedQuery, sortBy]);

  const pageCountries = filteredCountries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <Navbar />

      <section className="bg-[#031525] px-4 pb-14 pt-28 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#5EEAD4]">
            FMGE Country Explorer
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-normal md:text-6xl">
            Full FMGE Explorer for MBBS Abroad
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-200 md:text-lg md:leading-8">
            Browse the complete NBEMS FMGE country and college dataset with search,
            country filters, and pagination. Use it to shortlist countries and then
            open the country page for a quick college preview.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["FMGE countries", `${fmgeCountries.length}+`],
              [
                "Institute entries",
                numberFormatter.format(
                  fmgeCountries.reduce((sum, country) => sum + country.colleges.length, 0)
                ),
              ],
              [
                "FMGE appeared",
                numberFormatter.format(
                  fmgeCountries.reduce((sum, country) => sum + country.appeared, 0)
                ),
              ],
              [
                "FMGE passed",
                numberFormatter.format(
                  fmgeCountries.reduce((sum, country) => sum + country.passed, 0)
                ),
              ],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/15 bg-white/10 p-4">
                <p className="text-2xl font-extrabold text-white">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-300">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <CounsellingActionButton className="inline-flex items-center justify-center rounded-lg bg-[#00C896] px-5 py-3 text-sm font-extrabold text-[#031525] transition hover:bg-[#12dfad]">
              Need Counselling?
            </CounsellingActionButton>
            <Link
              href="/mbbs-abroad"
              className="inline-flex items-center justify-center rounded-lg border border-white/25 px-5 py-3 text-sm font-extrabold text-white transition hover:border-[#00C896]"
            >
              Browse Country Pages
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#047857]">
                  FMGE dataset filters
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-[#071f3f] md:text-3xl">
                  Find countries or colleges fast
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Search by country or college name, sort by highest appeared, highest pass rate, or A-Z, and paginate through the full dataset.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <label className="block">
                  <span className="sr-only">Search countries and colleges</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search country or college"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#16C784] focus:ring-2 focus:ring-[#16C784]/20"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Sort FMGE data</span>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as SortOption)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#16C784] focus:ring-2 focus:ring-[#16C784]/20"
                  >
                    {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                      <option key={option} value={option}>
                        {sortLabels[option]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 shadow-sm">
              <p>
                Showing {filteredCountries.length} country results{normalizedQuery ? " for your search" : ""}.
                Use search or filters to narrow the dataset, then open a country page for a compact college preview.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-[#071f3f] text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Country</th>
                    <th className="px-4 py-3 font-semibold">Appeared</th>
                    <th className="px-4 py-3 font-semibold">Passed</th>
                    <th className="px-4 py-3 font-semibold">Pass %</th>
                    <th className="px-4 py-3 font-semibold">Colleges</th>
                    <th className="px-4 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pageCountries.map((country) => (
                    <tr key={country.country} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-4">
                        <Link
                          href={getFmgeCountryHref(country.country)}
                          className="font-extrabold text-[#071f3f] transition hover:text-[#047857]"
                        >
                          {getFmgeCountryDisplayName(country.country)}
                        </Link>
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {numberFormatter.format(country.appeared)}
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {numberFormatter.format(country.passed)}
                      </td>
                      <td className="px-4 py-4 font-extrabold text-[#047857]">
                        {country.passRate}
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {country.colleges.length}
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          href={getFmgeCountryHref(country.country)}
                          className="inline-flex items-center justify-center rounded-lg border border-[#06345a] bg-white px-3 py-2 text-xs font-extrabold text-[#06345a] transition hover:border-[#00C896] hover:text-[#047857]"
                        >
                          View Country
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                Page {page} of {pageCount}.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#00C896]"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={page >= pageCount}
                  onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#00C896]"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold tracking-normal text-[#071f3f]">
                How to use the FMGE explorer
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>
                  Search by country or college name to narrow the full dataset.
                </li>
                <li>
                  Sort countries by appeared, pass rate, or alphabetical order.
                </li>
                <li>
                  Click a country to open its compact FMGE page with a top college preview.
                </li>
                <li>
                  Contact an expert for counselling before choosing a university.
                </li>
              </ul>
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-[#071f3f] p-6 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#16C784]">
                Data note
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-200">
                FMGE data shows candidate appearance and performance only. It does not
                guarantee university recognition, current NMC/FMGL compliance, or
                admission suitability. Use it as one part of your country and university
                shortlisting process.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
