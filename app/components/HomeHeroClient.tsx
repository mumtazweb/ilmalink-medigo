"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CounsellingPopup from "./CounsellingPopup";

const destinationData = [
  {
    href: "/mbbs-abroad/georgia",
    label: "Georgia",
    flag: "ge",
    fee: "₹16.5L",
    universities: 28,
    language: "English",
    recognition: "NMC, WHO",
  },
  {
    href: "/mbbs-abroad/kyrgyzstan",
    label: "Kyrgyzstan",
    flag: "kg",
    fee: "₹15.2L",
    universities: 150,
    language: "English",
    recognition: "NMC, WHO",
  },
  {
    href: "/mbbs-abroad/russia",
    label: "Russia",
    flag: "ru",
    fee: "₹18.9L",
    universities: 56,
    language: "English",
    recognition: "NMC, WHO",
  },
  {
    href: "/mbbs-abroad/kazakhstan",
    label: "Kazakhstan",
    flag: "kz",
    fee: "₹14.4L",
    universities: 7,
    language: "English",
    recognition: "NMC, WHO",
  },
  {
    href: "/mbbs-abroad/uzbekistan",
    label: "Uzbekistan",
    flag: "uz",
    fee: "₹13.8L",
    universities: 16,
    language: "English",
    recognition: "NMC, WHO",
  },
  {
    href: "/mbbs-abroad/usa",
    label: "USA",
    flag: "us",
    fee: "₹45L",
    universities: 12,
    language: "English",
    recognition: "NMC, WHO",
  },
  {
    href: "/mbbs-abroad/bangladesh",
    label: "Bangladesh",
    flag: "bd",
    fee: "₹17.4L",
    universities: 15,
    language: "English",
    recognition: "NMC, WHO",
  },
];

const heroCountryCards = [
  {
    href: "/mbbs-abroad/kyrgyzstan",
    label: "Kyrgyzstan",
    flag: "kg",
    universities: 150,
  },
  {
    href: "/mbbs-abroad/georgia",
    label: "Georgia",
    flag: "ge",
    universities: 28,
  },
  {
    href: "/mbbs-abroad/bangladesh",
    label: "Bangladesh",
    flag: "bd",
    universities: 15,
  },
  {
    href: "/mbbs-abroad/russia",
    label: "Russia",
    flag: "ru",
    universities: 56,
  },
  {
    href: "/mbbs-abroad/uzbekistan",
    label: "Uzbekistan",
    flag: "uz",
    universities: 16,
  },
];

const featureBlocks = [
  {
    title: "Verified University Marketplace",
    desc: "Access NMC-approved medical universities with transparent rankings and fees.",
  },
  {
    title: "Admission Tracking SaaS",
    desc: "Track every application, offer letter, and visa milestone from one dashboard.",
  },
  {
    title: "NEET Intelligence Center",
    desc: "Get score-based pathways and scholarship recommendations for MBBS admissions.",
  },
  {
    title: "Global Student Support",
    desc: "Dedicated mentors, document guidance, and 24/7 admissions assistance.",
  },
];

const liveMetrics = [
  { label: "Applications Submitted", value: "12.6K+" },
  { label: "Offer Letters Issued", value: "4.2K+" },
  { label: "Visas Approved", value: "1.8K+" },
  { label: "Universities Active", value: "180+" },
];

const costInsights = [
  { label: "India Private", fee: "₹25L", hostel: "₹4L", living: "₹2L" },
  { label: "Georgia", fee: "₹16L", hostel: "₹3L", living: "₹2L" },
  { label: "Kyrgyzstan", fee: "₹15L", hostel: "₹3L", living: "₹2L" },
  { label: "Uzbekistan", fee: "₹14L", hostel: "₹2.5L", living: "₹2L" },
];

const journeySteps = [
  "NEET Score Analysis",
  "University Discovery",
  "Application Submission",
  "Offer Letter",
  "Visa Support",
  "Pre-Departure Prep",
];

const computeOutcome = (score: number) => {
  if (!score || score < 1) return "Enter a valid NEET score to see tailored pathways.";
  if (score >= 560) return "Top government MBBS, premium abroad universities, and scholarship pathways.";
  if (score >= 480) return "Strong private MBBS and high-consideration abroad options with mentoring.";
  if (score >= 420) return "Private MBBS and cost-efficient MBBS abroad destinations available.";
  return "AYUSH, supportive NEET coaching, and strong guidance for future medical admissions.";
};

function UniversityIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8 sm:h-10 sm:w-10"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M12 4 3 9l9 5 9-5-9-5Zm0 5 6.16-3.422M6 11.5V15c0 .8 2.4 3 6 3s6-2.2 6-3v-3.5"
      />
    </svg>
  );
}

function CountryIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8 sm:h-10 sm:w-10"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M3.055 11H5a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2 2 2 0 0 1 2 2v2.945M8 3.935V5.5A2.5 2.5 0 0 0 10.5 8h.5a2 2 0 0 1 2 2 2 2 0 1 0 4 0 2 2 0 0 1 2-2h1.064M15 20.488V18a2 2 0 0 1 2-2h3.064M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function StudentsIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8 sm:h-10 sm:w-10"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-1.5a5 5 0 0 0-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-1.5c0-.64.122-1.26.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8 sm:h-10 sm:w-10"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016Z"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function HomeHeroClient() {
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [neetScore, setNeetScore] = useState("");

  const filteredDestinations = useMemo(
    () =>
      destinationData.filter((destination) =>
        destination.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  return (
    <>
      <section className="w-full bg-[#020C23] pt-[82px] md:pt-[90px] lg:pt-[96px]">
        <div className="mx-auto max-w-[1500px] px-3 pb-16 sm:px-4 lg:px-6 lg:pb-24">
          <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#021A3D] shadow-[0_35px_120px_rgba(0,18,51,0.35)]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#021A3D] via-[#052A5B] to-[#0A356B]" />
            <div className="pointer-events-none absolute left-[-20%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#3EA7FF]/15 blur-[120px]" />
            <div className="pointer-events-none absolute right-[-14%] top-[20%] h-[350px] w-[350px] rounded-full bg-[#0D9AE5]/10 blur-[110px]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[180px] bg-[linear-gradient(180deg,rgba(2,26,61,0),rgba(2,26,61,0.88))]" />
            <div className="pointer-events-none absolute inset-0 opacity-90 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_32%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '18px 18px, 12px 12px', backgroundPosition: '0 0, 6px 6px' }} />
            <div className="pointer-events-none absolute inset-x-0 top-12 h-[420px] bg-[radial-gradient(circle_at_center,rgba(46,132,255,0.18),transparent_42%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent 28%,rgba(255,255,255,0.05) 52%,transparent 78%)]" />

            <div className="relative grid gap-10 px-6 py-8 sm:px-8 md:px-10 md:py-10 lg:grid-cols-[1.6fr_1fr_0.95fr] lg:px-12 xl:px-14 xl:py-12">
              <div className="flex flex-col justify-center">
                <div className="max-w-[720px]">
                  <p className="text-base font-medium uppercase tracking-[0.28em] text-white/85 sm:text-sm">
                    Your Gateway to
                  </p>

                  <h1 className="mt-4 text-[3.4rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] sm:text-[4.4rem] md:text-[5.6rem] lg:text-[6.4rem]">
                    <span className="block">Global Medical</span>
                    <span className="block">Education</span>
                  </h1>

                  <div className="mt-6 space-y-3 max-w-2xl text-white/80 sm:text-lg">
                    <p>Explore 150+ NMC Approved Universities in 20+ Countries.</p>
                    <p>Trusted by 50,000+ Students & Parents.</p>
                  </div>

                  <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="flex items-start gap-4 text-white">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#7EE1FF]">
                        <UniversityIcon />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold">150+</p>
                        <p className="text-sm text-white/70">Universities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 text-white">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#7EE1FF]">
                        <CountryIcon />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold">20+</p>
                        <p className="text-sm text-white/70">Countries</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 text-white">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#7EE1FF]">
                        <StudentsIcon />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold">50,000+</p>
                        <p className="text-sm text-white/70">Students Guided</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 text-white">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#7EE1FF]">
                        <ShieldIcon />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold">100%</p>
                        <p className="text-sm text-white/70">Transparency</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <Link
                      href="/mbbs-abroad"
                      className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#22C47A] to-[#0DBD75] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(34,196,122,0.28)] transition duration-300 hover:-translate-y-0.5"
                    >
                      Explore Universities
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRightIcon />
                      </span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => setShowPopup(true)}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                    >
                      NEET Rank Predictor
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="relative flex h-[420px] w-[420px] items-center justify-center rounded-full border border-white/10 bg-white/5 p-5 shadow-[0_35px_90px_rgba(0,0,0,0.28)] backdrop-blur-[2px] sm:h-[460px] sm:w-[460px] lg:h-[520px] lg:w-[520px]">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_55%)]" />
                  <div className="absolute inset-0 rounded-full border border-white/15" />
                  <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_center,rgba(6,89,157,0.72),rgba(4,31,69,0.94))] shadow-[inset_0_0_45px_rgba(0,0,0,0.35)]" />
                  <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_center,rgba(46,145,255,0.18),transparent_48%)]" />
                  <div className="absolute inset-[15%] rounded-full border border-white/10" />
                  <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_56%)]" />
                  <div className="globe-surface absolute inset-[20%] rounded-full bg-[radial-gradient(circle_at_center,rgba(12,75,158,0.9),rgba(4,20,52,0.96))] overflow-hidden shadow-[0_0_80px_rgba(33,144,255,0.2)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_35%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(255,255,255,0.05),transparent_55%)]" />
                    <div className="globe-grid absolute inset-0 opacity-30" />
                    <div className="absolute inset-0 rounded-full border border-white/10 opacity-70" />
                    <div className="absolute left-[18%] top-[22%] h-3.5 w-3.5 rounded-full bg-[#6BF0FF] shadow-[0_0_18px_rgba(107,240,255,0.45)] animate-pulse" />
                    <div className="absolute left-[62%] top-[42%] h-3.5 w-3.5 rounded-full bg-[#7CF77F] shadow-[0_0_18px_rgba(124,247,127,0.45)] animate-pulse delay-[100ms]" />
                    <div className="absolute left-[48%] top-[66%] h-3.5 w-3.5 rounded-full bg-[#FF99DB] shadow-[0_0_18px_rgba(255,153,219,0.45)] animate-pulse delay-[200ms]" />
                    <div className="absolute left-[28%] top-[72%] h-3.5 w-3.5 rounded-full bg-[#92C8FF] shadow-[0_0_18px_rgba(146,200,255,0.45)] animate-pulse delay-[300ms]" />
                    <div className="absolute left-[72%] top-[25%] h-3.5 w-3.5 rounded-full bg-[#F8FF84] shadow-[0_0_18px_rgba(248,255,132,0.35)] animate-pulse delay-[400ms]" />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-white/10 opacity-40" />
                  <div className="absolute inset-0 rounded-full border border-cyan-200/20 blur-sm animate-orbit" />
                  <div className="absolute inset-0 rounded-full border border-cyan-100/15 blur-sm animate-orbit-reverse" />
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-[32px] border border-white/15 bg-white/5 p-6 backdrop-blur-xl shadow-[0_28px_80px_rgba(0,0,0,0.18)]">
                <div className="space-y-5">
                  <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#5DE9FF]" />
                    Country Discovery
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.24em] text-white/60">Top MBBS destinations</p>
                    <h2 className="text-2xl font-semibold text-white">Choose your study country</h2>
                    <p className="text-sm leading-6 text-white/70">Premium university discovery with transparent country metrics.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {heroCountryCards.map((country) => (
                    <Link
                      key={country.href}
                      href={country.href}
                      className="group flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                        <img
                          src={`https://flagcdn.com/w80/${country.flag}.png`}
                          alt={`${country.label} flag`}
                          className="h-9 w-7 rounded-[3px] object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-semibold text-white">{country.label}</p>
                        <p className="text-sm text-white/70">{country.universities}+ Universities</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/mbbs-abroad"
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-3xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-white/15"
                >
                  View All Countries
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </section>

          <style jsx>{`
            @keyframes spin-slow {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }

            @keyframes orbit {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }

            @keyframes orbit-reverse {
              from {
                transform: rotate(360deg);
              }
              to {
                transform: rotate(0deg);
              }
            }

            @keyframes float {
              0%,
              100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-10px);
              }
            }

            .animate-spin-slow {
              animation: spin-slow 26s linear infinite;
            }

            .animate-orbit {
              animation: orbit 16s linear infinite;
            }

            .animate-orbit-reverse {
              animation: orbit-reverse 20s linear infinite;
            }

            .animate-float {
              animation: float 3.8s ease-in-out infinite;
            }

            .globe-surface {
              animation: spin-slow 20s linear infinite;
            }

            .globe-grid {
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath d='M0 20h200M0 40h200M0 60h200M0 80h200M0 100h200M0 120h200M0 140h200M0 160h200M0 180h200M20 0v200M40 0v200M60 0v200M80 0v200M100 0v200M120 0v200M140 0v200M160 0v200M180 0v200' fill='none' stroke='rgba(255,255,255,0.14)' stroke-width='0.8'/%3E%3C/svg%3E");
              background-size: cover;
            }
          `}</style>

          <div className="mt-12 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8">
              <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
                      Top destinations
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-[#081B35]">
                      Marketplace for premier MBBS countries
                    </h2>
                  </div>
                  <Link
                    href="/mbbs-abroad"
                    className="text-sm font-semibold text-[#0F4CFF] transition hover:text-[#0B1D39]"
                  >
                    View all countries →
                  </Link>
                </div>

                <div className="mt-6">
                  <label className="block">
                    <span className="sr-only">Search countries</span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search destination..."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0F4CFF] focus:ring-2 focus:ring-[#0F4CFF]/15"
                    />
                  </label>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {filteredDestinations.map((destination) => (
                    <Link
                      key={destination.href}
                      href={destination.href}
                      className="group rounded-[24px] border border-slate-200 bg-[#f8fafc] p-5 transition hover:-translate-y-1 hover:border-[#0F4CFF]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://flagcdn.com/w40/${destination.flag}.png`}
                            alt={`${destination.label} Flag`}
                            className="h-5 w-6 rounded-sm"
                            loading="lazy"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-[#081B35]">
                              {destination.label}
                            </h3>
                            <p className="text-sm text-slate-500">
                              {destination.recognition}
                            </p>
                          </div>
                        </div>
                        <span className="rounded-full bg-[#0F4CFF]/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0F4CFF]">
                          {destination.language}
                        </span>
                      </div>
                      <div className="mt-5 grid gap-3 text-sm text-slate-600">
                        <p>
                          Starting from{" "}
                          <span className="font-semibold text-[#081B35]">
                            {destination.fee}
                          </span>
                        </p>
                        <p>{destination.universities} universities</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-[32px] border border-slate-200 bg-[#0B1D39] p-6 text-white shadow-[0_18px_44px_rgba(15,23,42,0.18)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-[#7DD3FC]">
                      Why ILMALINK MEDIGO
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold">
                      Premium student-first admission support.
                    </h2>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                    Trusted globally
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {featureBlocks.map((feature) => (
                    <div key={feature.title} className="rounded-[24px] bg-slate-950/10 p-5">
                      <p className="text-lg font-semibold text-white">{feature.title}</p>
                      <p className="mt-2 text-sm text-slate-300">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-8">
              <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
                  NEET decision center
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-[#081B35]">
                  Score-based pathway guidance
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Enter your NEET score to see the most likely admission pathway across
                  India and Abroad.
                </p>
                <div className="mt-6 space-y-4">
                  <label className="space-y-2 text-sm text-slate-600">
                    NEET Score
                    <input
                      type="number"
                      min={1}
                      max={720}
                      value={neetScore}
                      onChange={(event) => setNeetScore(event.target.value)}
                      placeholder="e.g. 512"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0F4CFF] focus:ring-2 focus:ring-[#0F4CFF]/15"
                    />
                  </label>
                  <div className="rounded-[24px] bg-[#eff6ff] p-4 text-sm text-slate-700">
                    {computeOutcome(Number(neetScore))}
                  </div>
                </div>
              </section>

              <section className="rounded-[32px] border border-slate-200 bg-[#f8fafc] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
                  Live admission dashboard
                </p>
                <div className="mt-6 grid gap-4">
                  {liveMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[24px] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
                    >
                      <p className="text-3xl font-semibold text-[#081B35]">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>

          <section className="mt-12 rounded-[32px] bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
                  Admission journey
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-[#081B35]">
                  Your end-to-end MBBS application roadmap
                </h2>
              </div>
              <Link
                href="/create-account"
                className="inline-flex items-center justify-center rounded-full bg-[#0F4CFF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b3fd6]"
              >
                Start your journey
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {journeySteps.map((step, index) => (
                <div key={step} className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F4CFF]/10 font-semibold text-[#0F4CFF]">
                    {index + 1}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-[#081B35]">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[32px] border border-slate-200 bg-[#f8fafc] p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
                    Cost intelligence
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-[#081B35]">
                    Compare MBBS budgets across major destinations
                  </h2>
                </div>
                <span className="rounded-full bg-[#00C896]/10 px-3 py-2 text-sm font-semibold text-[#04653d]">
                  Student-tested
                </span>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {costInsights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
                  >
                    <p className="text-lg font-semibold text-[#081B35]">{item.label}</p>
                    <div className="mt-4 grid gap-2 text-sm text-slate-600">
                      <p>
                        Tuition: <span className="font-semibold text-[#0B1D39]">{item.fee}</span>
                      </p>
                      <p>
                        Hostel:{" "}
                        <span className="font-semibold text-[#0B1D39]">{item.hostel}</span>
                      </p>
                      <p>
                        Living cost:{" "}
                        <span className="font-semibold text-[#0B1D39]">{item.living}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
              <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
                Country intelligence
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[#081B35]">
                Insights by destination
              </h2>
              <div className="mt-6 grid gap-3">
                {destinationData.slice(0, 4).map((destination) => (
                  <div
                    key={destination.label}
                    className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://flagcdn.com/w40/${destination.flag}.png`}
                          alt={`${destination.label} Flag`}
                          className="h-5 w-6 rounded-sm"
                          loading="lazy"
                        />
                        <div>
                          <h3 className="text-base font-semibold text-[#081B35]">
                            {destination.label}
                          </h3>
                          <p className="text-sm text-slate-500">{destination.recognition}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#0F4CFF]">
                        {destination.language}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-2 text-sm text-slate-600">
                      <p>
                        Estimated fees:{" "}
                        <span className="font-semibold text-[#081B35]">{destination.fee}</span>
                      </p>
                      <p>{destination.universities} medical universities</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-12 rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
                  Ready to move faster?
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-[#081B35]">
                  Your global medical career starts here.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <Link
                  href="/about/"
                  className="inline-flex items-center justify-center rounded-full border border-[#0B1D39] px-5 py-3 text-sm font-semibold text-[#0B1D39] transition hover:bg-slate-50"
                >
                  About Us
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-[#0F4CFF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b3fd6]"
                  onClick={() => setShowPopup(true)}
                >
                  Book Counselling
                </button>
                <Link
                  href="/mbbs-abroad"
                  className="inline-flex items-center justify-center rounded-full bg-[#00C896] px-5 py-3 text-sm font-semibold text-[#081B35] transition hover:bg-[#00b07a]"
                >
                  Compare Countries
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>

      <CounsellingPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
}