import type { Metadata } from "next";
import Link from "next/link";

import CounsellingActionButton from "../components/CounsellingActionButton";
import Navbar from "../components/navbar";
import { fmgeCountries } from "../data/fmgeCountries";
import {
  getFmgeCountryDisplayName,
  getFmgeCountryHref,
} from "../data/exploreLinks";
import { navbarCountryDestinations } from "../data/navbarDestinations";
import { getOverallFmgeTotals } from "../lib/fmge";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "MBBS Abroad Consultant for Indian Students | ilmaLink",
  description:
    "Student-first MBBS abroad consultancy for Indian students with country comparison, FMGE data, eligibility, document support and transparent counselling.",
  alternates: {
    canonical: "https://www.ilmalink.com/mbbs-abroad",
  },
};

const numberFormatter = new Intl.NumberFormat("en-IN");
const fmgeTotals = getOverallFmgeTotals();

function parsePassRate(passRate: string) {
  return Number(passRate.replace("%", "")) || 0;
}

const topDestinations = navbarCountryDestinations.slice(0, 8);
const fmgeCountryRows = [...fmgeCountries].sort(
  (a, b) => b.appeared - a.appeared || a.country.localeCompare(b.country)
);
const bestPassRateRows = [...fmgeCountries]
  .filter((country) => country.appeared >= 20)
  .sort((a, b) => parsePassRate(b.passRate) - parsePassRate(a.passRate))
  .slice(0, 6);

export default function MBBSAbroadPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <Navbar />

      <section className="bg-[#031525] px-4 pb-14 pt-8 text-white sm:px-6 sm:pt-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#5EEAD4]">
            MBBS Abroad Directory
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-normal md:text-6xl">
            Explore MBBS Abroad Countries with FMGE Data
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-200 md:text-lg md:leading-8">
            Medigo, an extension/service line of ilmalink, works as a student-first MBBS abroad consultant for
            Indian students, combining country-wise and college-wise comparison,
            FMGE data, NMC/FMGL rule checks, eligibility, document support,
            scholarships, loans and transparent counselling before shortlisting
            a medical university.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["FMGE countries", `${fmgeTotals.countries}+`],
              ["Institute entries", numberFormatter.format(fmgeTotals.colleges)],
              ["FMGE appeared", numberFormatter.format(fmgeTotals.appeared)],
              ["FMGE passed", numberFormatter.format(fmgeTotals.passed)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/15 bg-white/10 p-4">
                <p className="text-2xl font-extrabold text-white">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-300">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#047857]">
                Popular destinations
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-normal md:text-3xl">
                Start with active ilmaLink country pages
              </h2>
            </div>
            <Link
              href="/mbbs-abroad/explorer"
              className="inline-flex items-center justify-center rounded-lg bg-[#00C896] px-4 py-2.5 text-sm font-extrabold text-[#031525] transition hover:bg-[#12dfad]"
            >
              Open FMGE Explorer
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {topDestinations.map((destination) => (
              <Link
                key={destination.href}
                href={destination.href}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#00C896]/60 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://flagcdn.com/w40/${destination.flag}.png`}
                    alt={`${destination.label} flag`}
                    className="h-5 w-6 rounded-sm object-cover"
                  />
                  <h3 className="text-base font-extrabold text-slate-950">
                    {destination.label}
                  </h3>
                </div>
                <p className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-slate-600">
                  {destination.insight}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-[#F1F5F9] px-4 py-4 sm:px-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1D4ED8]">
                Country-wise FMGE data
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-normal">
                All FMGE countries and territories
              </h2>
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-[#071f3f] text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Country</th>
                    <th className="px-4 py-3 font-semibold">Appeared</th>
                    <th className="px-4 py-3 font-semibold">Passed</th>
                    <th className="px-4 py-3 font-semibold">Pass %</th>
                    <th className="px-4 py-3 font-semibold">Colleges</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fmgeCountryRows.map((country) => (
                    <tr key={country.country} className="transition hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <Link
                          href={getFmgeCountryHref(country.country)}
                          className="font-extrabold text-[#071f3f] transition hover:text-[#047857]"
                        >
                          {getFmgeCountryDisplayName(country.country)}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {numberFormatter.format(country.appeared)}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {numberFormatter.format(country.passed)}
                      </td>
                      <td className="px-4 py-3 font-extrabold text-[#047857]">
                        {country.passRate}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {country.colleges.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-3 p-3 lg:hidden">
              {fmgeCountryRows.map((country) => (
                <Link
                  key={country.country}
                  href={getFmgeCountryHref(country.country)}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-[#00C896]/60 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold text-[#071f3f]">
                        {getFmgeCountryDisplayName(country.country)}
                      </h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                        {country.colleges.length} colleges
                      </p>
                    </div>
                    <span className="rounded-full bg-[#ECFDF5] px-2.5 py-1 text-xs font-extrabold text-[#047857]">
                      {country.passRate}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-600">
                    {numberFormatter.format(country.appeared)} appeared,{" "}
                    {numberFormatter.format(country.passed)} passed
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <aside className="grid content-start gap-4">
            <div className="rounded-lg border border-emerald-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#047857]">
                FMGE pass-performance snapshot
              </p>
              <div className="mt-4 grid gap-3">
                {bestPassRateRows.map((country) => (
                  <Link
                    key={country.country}
                    href={getFmgeCountryHref(country.country)}
                    className="rounded-lg bg-emerald-50 p-3 transition hover:bg-emerald-100"
                  >
                    <p className="font-extrabold text-slate-950">
                      {getFmgeCountryDisplayName(country.country)}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#047857]">
                      {country.passRate} pass rate
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-[#05233d] p-5 text-white shadow-sm">
              <h2 className="text-xl font-extrabold">Need country guidance?</h2>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-200">
                Compare fees, course duration, FMGE trends, internship rules,
                English medium, and admission fit before choosing a country.
              </p>
              <CounsellingActionButton
                className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-[#00C896] px-4 py-3 text-sm font-extrabold text-[#031525] transition hover:bg-[#12dfad]"
              >
                Connect for Counselling
              </CounsellingActionButton>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
