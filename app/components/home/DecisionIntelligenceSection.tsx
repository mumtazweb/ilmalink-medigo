"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeIndianRupee,
  BarChart3,
  CheckCircle2,
  Globe2,
  MapPin,
  WalletCards,
} from "lucide-react";

import {
  mbbsBudgetFilters,
  mbbsCostInsights,
  mbbsCountryInsights,
  mbbsDecisionIntelligenceDisclaimer,
  type MbbsBudgetBand,
} from "../../data/mbbsDecisionIntelligence";

export default function DecisionIntelligenceSection() {
  const [budgetFilter, setBudgetFilter] = useState<MbbsBudgetBand>("all");
  const [selectedCountryId, setSelectedCountryId] = useState(
    mbbsCountryInsights[0].id
  );
  const filteredCosts = useMemo(
    () =>
      budgetFilter === "all"
        ? mbbsCostInsights
        : mbbsCostInsights.filter((item) => item.budgetBand === budgetFilter),
    [budgetFilter]
  );
  const selectedCountry =
    mbbsCountryInsights.find((country) => country.id === selectedCountryId) ??
    mbbsCountryInsights[0];

  return (
    <section
      id="mbbs-decision-intelligence"
      className="mt-10 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]"
    >
      <article className="relative isolate overflow-hidden rounded-[30px] border border-blue-200/70 bg-[radial-gradient(circle_at_0%_0%,rgba(15,76,255,.18),transparent_28%),linear-gradient(145deg,#f5f9ff,#ffffff_48%,#effcff)] p-4 shadow-[0_28px_65px_rgba(15,45,91,.14),inset_0_1px_0_white] sm:p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-200/35 blur-3xl" />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#0F4CFF]">
              <BadgeIndianRupee className="h-4 w-4" />
              Cost intelligence
            </p>
            <h2 className="mt-2 max-w-xl text-2xl font-black tracking-[-0.035em] text-[#071B44] sm:text-3xl">
              Compare complete MBBS planning budgets.
            </h2>
            <p className="mt-2 max-w-2xl text-[11px] font-medium leading-5 text-slate-600 sm:text-xs">
              Filter indicative tuition, hostel and living-cost estimates before
              opening the relevant India or country guidance page.
            </p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#0F4CFF,#22d3ee)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.4),0_14px_28px_rgba(15,76,255,.28)]">
            <BarChart3 className="h-5 w-5" />
          </span>
        </div>

        <div className="relative mt-4 flex gap-2 overflow-x-auto pb-1">
          {mbbsBudgetFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={budgetFilter === filter.id}
              onClick={() => setBudgetFilter(filter.id)}
              className={`shrink-0 rounded-full border px-3 py-2 text-[9px] font-black uppercase tracking-[0.08em] transition ${
                budgetFilter === filter.id
                  ? "border-[#0F4CFF] bg-[#0F4CFF] text-white shadow-[0_10px_22px_rgba(15,76,255,.25)]"
                  : "border-blue-100 bg-white/85 text-slate-600 hover:border-blue-300"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="relative mt-4 grid gap-3 sm:grid-cols-2">
          {filteredCosts.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className={`group relative overflow-hidden rounded-[21px] border border-white/95 bg-white/82 p-3.5 shadow-[inset_0_1px_0_white,0_14px_30px_rgba(15,45,91,.1)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_22px_40px_rgba(15,76,255,.17)] ${
                index % 2 === 0
                  ? "[transform:perspective(700px)_rotateY(-1.2deg)]"
                  : "[transform:perspective(700px)_rotateY(1.2deg)]"
              }`}
            >
              <span className="pointer-events-none absolute -right-7 -top-7 h-20 w-20 rounded-full bg-blue-300/18 blur-2xl" />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-[#071B44]">{item.label}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.09em] text-[#0F4CFF]">
                    {item.region}
                  </p>
                </div>
                <WalletCards className="h-5 w-5 text-[#00A876]" />
              </div>
              <p className="relative mt-3 text-xl font-black tracking-[-0.04em] text-[#071B44]">
                {item.estimatedTotal}
              </p>
              <div className="relative mt-3 grid grid-cols-3 gap-1.5 text-[8px] font-semibold text-slate-500">
                <span className="rounded-lg bg-blue-50 px-2 py-1.5">
                  Tuition
                  <strong className="block text-[#071B44]">{item.tuition}</strong>
                </span>
                <span className="rounded-lg bg-cyan-50 px-2 py-1.5">
                  Hostel
                  <strong className="block text-[#071B44]">{item.hostel}</strong>
                </span>
                <span className="rounded-lg bg-emerald-50 px-2 py-1.5">
                  Living
                  <strong className="block text-[#071B44]">{item.living}</strong>
                </span>
              </div>
              <p className="relative mt-3 line-clamp-2 text-[9px] font-medium leading-4 text-slate-500">
                {item.planningNote}
              </p>
              <span className="relative mt-3 inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.08em] text-[#0F4CFF]">
                Open guidance
                <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        {filteredCosts.length === 0 && (
          <div className="relative mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-semibold text-amber-900">
            No planning estimate currently matches this filter. Select another
            range or request personalised budget guidance.
          </div>
        )}

        <p className="relative mt-4 text-[9px] font-medium leading-4 text-slate-500">
          {mbbsDecisionIntelligenceDisclaimer}
        </p>
        <Link
          href="/mbbs-decision-intelligence#cost-intelligence"
          className="relative mt-3 inline-flex items-center gap-1 text-[10px] font-black text-[#0F4CFF]"
        >
          Read the crawlable MBBS cost guide
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </article>

      <article className="relative isolate overflow-hidden rounded-[30px] border border-emerald-200/70 bg-[radial-gradient(circle_at_100%_0%,rgba(0,200,150,.18),transparent_30%),linear-gradient(145deg,#f2fff9,#ffffff_52%,#f1f7ff)] p-4 shadow-[0_28px_65px_rgba(15,45,91,.13),inset_0_1px_0_white] sm:p-6">
        <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-emerald-200/28 blur-3xl" />
        <div className="relative">
          <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#047857]">
            <Globe2 className="h-4 w-4" />
            Country intelligence
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#071B44] sm:text-3xl">
            Explore destination fit and checks.
          </h2>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {mbbsCountryInsights.map((country) => (
              <button
                key={country.id}
                type="button"
                aria-pressed={selectedCountry.id === country.id}
                onClick={() => setSelectedCountryId(country.id)}
                className={`rounded-[15px] border p-2 text-center transition ${
                  selectedCountry.id === country.id
                    ? "border-emerald-400 bg-white shadow-[0_12px_25px_rgba(0,168,118,.18)]"
                    : "border-white bg-white/60 hover:border-emerald-200"
                }`}
              >
                <img
                  src={`https://flagcdn.com/w80/${country.flag}.png`}
                  alt={`${country.label} flag`}
                  className="mx-auto h-5 w-7 rounded object-cover shadow-sm"
                  loading="lazy"
                />
                <span className="mt-1.5 block truncate text-[8px] font-black text-[#071B44]">
                  {country.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-[23px] border border-white/95 bg-white/82 p-4 shadow-[inset_0_1px_0_white,0_16px_35px_rgba(15,45,91,.1)] backdrop-blur-xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={`https://flagcdn.com/w80/${selectedCountry.flag}.png`}
                  alt={`${selectedCountry.label} flag`}
                  className="h-8 w-11 rounded-md object-cover shadow-md"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-lg font-black text-[#071B44]">
                    MBBS in {selectedCountry.label}
                  </h3>
                  <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#047857]">
                    Current ILMALINK planning view
                  </p>
                </div>
              </div>
              <MapPin className="h-5 w-5 text-[#0F4CFF]" />
            </div>

            <div className="mt-4 grid gap-2">
              {[
                ["Indicative budget", selectedCountry.estimatedBudget],
                ["Institution reference", selectedCountry.medicalInstitutions],
                ["Practical fit", selectedCountry.practicalFit],
                ["FMGE reference", selectedCountry.fmgeReference],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-100 bg-[#F8FAFC] px-3 py-2.5"
                >
                  <p className="text-[8px] font-black uppercase tracking-[0.09em] text-slate-400">
                    {label}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-700">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[9px] font-black uppercase tracking-[0.1em] text-[#071B44]">
              Verify before admission
            </p>
            <ul className="mt-2 grid gap-2">
              {selectedCountry.checks.map((check) => (
                <li
                  key={check}
                  className="flex items-start gap-2 text-[9px] font-medium leading-4 text-slate-600"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00A876]" />
                  {check}
                </li>
              ))}
            </ul>

            <Link
              href={selectedCountry.href}
              className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(135deg,#00A876,#00C896)] px-4 py-3 text-[10px] font-black text-white shadow-[0_12px_25px_rgba(0,168,118,.24)] transition hover:-translate-y-0.5"
            >
              Open {selectedCountry.label} guidance
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <Link
            href="/mbbs-decision-intelligence#country-intelligence"
            className="mt-3 inline-flex items-center gap-1 text-[10px] font-black text-[#047857]"
          >
            Read the crawlable country intelligence guide
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </article>
    </section>
  );
}
