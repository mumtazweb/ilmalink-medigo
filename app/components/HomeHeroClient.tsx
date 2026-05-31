"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CounsellingPopup from "./CounsellingPopup";
import HeroGlobeV2 from "./HeroGlobeV2";
import Footer from "./Footer";

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
      className="h-5 w-5 sm:h-6 sm:w-6"
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
      className="h-5 w-5 sm:h-6 sm:w-6"
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
      className="h-5 w-5 sm:h-6 sm:w-6"
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
      className="h-5 w-5 sm:h-6 sm:w-6"
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
      <section className="relative z-[60] left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] border-b border-slate-100/50 bg-white pt-0 shadow-sm overflow-visible">
        <section className="relative z-[60] w-full -mt-1.5 md:-mt-2 overflow-hidden rounded-t-[32px] md:rounded-t-[50px] border-t border-white/10 bg-[#062a55] bg-gradient-to-br from-[#061D3F] via-[#073B76] to-[#06234D] shadow-[0_35px_120px_rgba(0,18,51,0.45)] lg:min-h-[430px]">
          <div
            className="pointer-events-none absolute inset-0 rounded-t-[32px] md:rounded-t-[50px] opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="pointer-events-none absolute left-[38%] top-[12%] h-[320px] w-[320px] rounded-full bg-[#33A6FF]/20 blur-[90px]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%] rounded-t-[32px] bg-[radial-gradient(circle_at_center,rgba(65,170,255,0.20),transparent_60%)] md:rounded-t-[50px]" />

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 px-4 pt-7 pb-6 sm:px-6 md:pt-9 md:pb-9 lg:min-h-[430px] lg:grid-cols-[1.05fr_1.15fr_0.75fr] lg:gap-7 lg:px-8">
            {/* Left content */}
            <div className="relative z-20 min-h-[245px] pr-[30%] text-left md:min-h-0 md:pr-0 md:text-center lg:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/[0.85] sm:text-xs">
                Your Gateway To
              </p>

              <h1 className="mt-3 text-[1.9rem] font-extrabold leading-[0.95] tracking-[-0.05em] text-white sm:text-[2.55rem] md:text-[2.8rem] lg:text-[3.45rem] xl:text-[3.8rem]">
                <span className="block md:hidden">Global Medical</span>
                <span className="hidden md:block">Global</span>
                <span className="hidden md:block">Medical</span>
                <span className="block">Education</span>
              </h1>

              <div className="mt-4 space-y-1 text-sm text-white/[0.82] sm:text-[15px]">
                <p>Explore 150+ NMC Approved Universities in 20+ Countries.</p>
                <p className="hidden md:block">Trusted by 50,000+ Students & Parents.</p>
              </div>

              <div className="mx-auto mt-5 hidden max-w-[520px] grid-cols-2 gap-3 sm:grid-cols-4 md:grid lg:mx-0">
                <div className="flex items-start justify-center gap-2 text-white lg:justify-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                    <UniversityIcon />
                  </div>
                  <div>
                    <p className="text-base font-bold">150+</p>
                    <p className="text-[11px] text-white/70">Universities</p>
                  </div>
                </div>

                <div className="flex items-start justify-center gap-2 text-white lg:justify-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                    <CountryIcon />
                  </div>
                  <div>
                    <p className="text-base font-bold">20+</p>
                    <p className="text-[11px] text-white/70">Countries</p>
                  </div>
                </div>

                <div className="flex items-start justify-center gap-2 text-white lg:justify-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                    <StudentsIcon />
                  </div>
                  <div>
                    <p className="text-base font-bold">50,000+</p>
                    <p className="text-[11px] text-white/70">Students Guided</p>
                  </div>
                </div>

                <div className="flex items-start justify-center gap-2 text-white lg:justify-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                    <ShieldIcon />
                  </div>
                  <div>
                    <p className="text-base font-bold">100%</p>
                    <p className="text-[11px] text-white/70">Transparency</p>
                  </div>
                </div>
              </div>

              <div className="mx-0 mt-5 flex w-full max-w-[190px] flex-col items-stretch justify-center gap-2 md:mx-auto md:mt-6 md:max-w-[360px] md:flex-row md:flex-nowrap lg:mx-0 lg:max-w-none lg:justify-start lg:gap-3">
                <Link
                  href="/mbbs-abroad"
                  className="group inline-flex min-w-0 flex-none items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#16C784] px-2 py-2 text-[11px] font-bold text-[#001B2E] shadow-[0_18px_45px_rgba(22,199,132,0.32)] transition hover:-translate-y-0.5 hover:bg-[#18d890] sm:px-3 sm:text-xs md:flex-1 lg:flex-none lg:gap-2 lg:rounded-[14px] lg:px-5 lg:py-3 lg:text-sm"
                >
                  Explore Universities
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setShowPopup(true)}
                  className="inline-flex min-w-0 flex-none items-center justify-center whitespace-nowrap rounded-xl border border-white/25 bg-white/10 px-2 py-2 text-[11px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/[0.15] sm:px-3 sm:text-xs md:flex-1 lg:flex-none lg:rounded-[14px] lg:px-5 lg:py-3 lg:text-sm"
                >
                  NEET Rank Predictor
                </button>
              </div>
            </div>

            {/* Globe */}
            <div className="pointer-events-none absolute right-[-90px] top-8 z-10 flex w-[240px] max-w-none items-center justify-center opacity-90 md:pointer-events-auto md:relative md:right-auto md:top-auto md:mx-auto md:w-auto md:max-w-[300px] md:opacity-100 lg:-ml-8 lg:max-w-none">
              <div className="relative aspect-square w-full lg:h-[380px] lg:w-[380px] xl:h-[420px] xl:w-[420px]">
                <HeroGlobeV2 />
              </div>
            </div>

            <div className="relative z-20 grid grid-cols-4 gap-1.5 text-white md:hidden">
              <div className="flex flex-col items-center gap-1 text-center">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                  <UniversityIcon />
                </div>
                <p className="text-[10px] font-bold leading-none">150+</p>
                <p className="text-[8px] leading-tight text-white/70">Universities</p>
              </div>

              <div className="flex flex-col items-center gap-1 text-center">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                  <CountryIcon />
                </div>
                <p className="text-[10px] font-bold leading-none">20+</p>
                <p className="text-[8px] leading-tight text-white/70">Countries</p>
              </div>

              <div className="flex flex-col items-center gap-1 text-center">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                  <StudentsIcon />
                </div>
                <p className="text-[10px] font-bold leading-none">50,000+</p>
                <p className="text-[8px] leading-tight text-white/70">Students Guided</p>
              </div>

              <div className="flex flex-col items-center gap-1 text-center">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                  <ShieldIcon />
                </div>
                <p className="text-[10px] font-bold leading-none">100%</p>
                <p className="text-[8px] leading-tight text-white/70">Transparency</p>
              </div>
            </div>

            {/* Country card */}
            <div className="relative z-30 mx-auto w-full max-w-[320px] lg:mx-0">
              <div className="block rounded-[20px] border border-white/20 bg-[#143967]/[0.82] p-2.5 shadow-[0_35px_85px_rgba(0,0,0,0.38)] backdrop-blur-2xl md:hidden">
                <div className="grid grid-cols-2 gap-1.5">
                  {heroCountryCards.slice(0, 3).map((country) => (
                    <Link
                      key={country.href}
                      href={country.href}
                      className="group flex min-h-[56px] items-center gap-1.5 rounded-xl border border-white/[0.12] bg-white/[0.08] px-1.5 py-1.5 text-[11px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12]"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                        <img
                          src={`https://flagcdn.com/w80/${country.flag}.png`}
                          alt={`${country.label} flag`}
                          className="h-4 w-5 rounded-[3px] object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-bold leading-tight text-white">
                          {country.label}
                        </p>
                        <p className="mt-0.5 text-[9px] leading-tight text-white/70">
                          {country.universities}+ Universities
                        </p>
                      </div>
                    </Link>
                  ))}

                  <Link
                    href="/mbbs-abroad"
                    className="group flex min-h-[56px] items-center gap-1.5 rounded-xl border border-white/[0.12] bg-white/[0.08] px-1.5 py-1.5 text-[11px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12]"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#7EE1FF]">
                      <span className="text-[10px] font-bold uppercase">All</span>
                    </div>

                    <div className="min-w-0">
                      <p className="font-bold leading-tight text-white">
                        View All Countries
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="hidden w-full rounded-[22px] border border-white/20 bg-[#143967]/[0.82] p-3 shadow-[0_35px_85px_rgba(0,0,0,0.38)] backdrop-blur-2xl md:block">
                <div className="space-y-2">
                  {heroCountryCards.map((country) => (
                    <Link
                      key={country.href}
                      href={country.href}
                      className="group flex items-center gap-3 rounded-[18px] border border-white/[0.12] bg-white/[0.08] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12] md:text-xs"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                        <img
                          src={`https://flagcdn.com/w80/${country.flag}.png`}
                          alt={`${country.label} flag`}
                          className="h-5 w-6 rounded-[4px] object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold leading-tight text-white">
                          {country.label}
                        </p>
                        <p className="mt-0.5 text-[11px] text-white/75">
                          {country.universities}+ Universities
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/mbbs-abroad"
                  className="mt-4 hidden w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.12] px-4 py-2 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition hover:bg-white/[0.18] md:flex"
                >
                  View All Countries
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
        </section>
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

          <div className="relative z-20 mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
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

      {/* FOOTER - ADDED HERE */}
      <Footer />

      <CounsellingPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
}
