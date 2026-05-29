"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CounsellingPopup from "./CounsellingPopup";
import HeroTyping from "./HeroTyping";

const destinationData = [
  {
    href: "/mbbs-abroad/georgia",
    label: "Georgia",
    flag: "ge",
    fee: "₹16.5L",
    universities: 8,
    language: "English",
    recognition: "NMC, WHO",
  },
  {
    href: "/mbbs-abroad/kyrgyzstan",
    label: "Kyrgyzstan",
    flag: "kg",
    fee: "₹15.2L",
    universities: 6,
    language: "English",
    recognition: "NMC, WHO",
  },
  {
    href: "/mbbs-abroad/russia",
    label: "Russia",
    flag: "ru",
    fee: "₹18.9L",
    universities: 10,
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
    universities: 5,
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

const faqItems = [
  {
    question: "How do I choose the best MBBS destination?",
    answer: "We compare fees, recognition, language, and student safety so you can select the right country without guesswork.",
  },
  {
    question: "Can ILMALINK MEDIGO help with NEET strategy?",
    answer: "Yes. Our platform blends NEET pathways with MBBS abroad admissions, enabling score-based recommendations and counselling.",
  },
  {
    question: "Is the counselling form the same across the site?",
    answer: "Yes. Your existing popup counselling form remains unchanged and continues to capture all required fields and country preferences.",
  },
];

const computeOutcome = (score: number) => {
  if (!score || score < 1) return "Enter a valid NEET score to see tailored pathways.";
  if (score >= 560) return "Top government MBBS, premium abroad universities, and scholarship pathways.";
  if (score >= 480) return "Strong private MBBS and high-consideration abroad options with mentoring.";
  if (score >= 420) return "Private MBBS and cost-efficient MBBS abroad destinations available.";
  return "AYUSH, supportive NEET coaching, and strong guidance for future medical admissions.";
};

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
      <section className="w-full bg-[#f8fafc] pt-[88px] md:pt-[96px] lg:pt-[112px]">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="grid gap-12 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0B1D39] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(11,29,57,0.16)]">
                <span className="rounded-full bg-[#00C896] px-2 py-1 text-[11px] uppercase tracking-[0.24em] text-[#081B35]">
                  Platform Live
                </span>
                Gateway to global medical education and student admissions
              </div>

              <div className="space-y-6">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[#081B35] sm:text-5xl lg:text-6xl">
                  Discover the world’s top MBBS universities, compare countries, and manage admissions from one premium platform.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
                  ILMALINK MEDIGO blends university discovery, admission tracking, NEET intelligence, and global student support into a modern education ecosystem.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:items-center">
                <button
                  type="button"
                  onClick={() => setShowPopup(true)}
                  className="inline-flex items-center justify-center rounded-full bg-[#0B1D39] px-7 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(11,29,57,0.18)] transition hover:-translate-y-0.5 hover:bg-[#081b35]"
                >
                  Book Free Counselling
                </button>
                <Link
                  href="/mbbs-abroad/georgia"
                  className="inline-flex items-center justify-center rounded-full border border-[#0B1D39] bg-white px-7 py-3 text-sm font-semibold text-[#0B1D39] transition hover:bg-slate-50"
                >
                  Explore Top Universities
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { value: "18+", label: "Countries" },
                  { value: "180+", label: "Universities" },
                  { value: "12.6K+", label: "Applications" },
                  { value: "4.2K+", label: "Offer Letters" },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
                    <p className="text-3xl font-semibold text-[#081B35]">{metric.value}</p>
                    <p className="mt-2 text-sm font-medium text-slate-500">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0B1D39]">Global Discover</p>
                    <h2 className="mt-2 text-2xl font-semibold text-[#081B35]">Search by country, university, ranking and cost.</h2>
                  </div>
                  <div className="rounded-2xl bg-[#eff6ff] px-3 py-2 text-sm font-semibold text-[#0F4CFF]">
                    Marketplace
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="space-y-2 text-sm text-slate-600">
                        University
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                          placeholder="Search university or country"
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0F4CFF] focus:ring-2 focus:ring-[#0F4CFF]/15"
                        />
                      </label>
                      <label className="space-y-2 text-sm text-slate-600">
                        Annual Budget
                        <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0F4CFF] focus:ring-2 focus:ring-[#0F4CFF]/15">
                          <option>Any budget</option>
                          <option>₹10L - ₹15L</option>
                          <option>₹15L - ₹20L</option>
                          <option>₹20L+</option>
                        </select>
                      </label>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button className="rounded-3xl bg-[#00C896] px-5 py-4 text-left text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0,200,150,0.18)] transition hover:bg-[#00b07a]">
                      Admissions open now
                      <p className="mt-1 text-xs font-medium text-white/80">Review visas, fees, and NMC recognition.</p>
                    </button>
                    <button className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-left text-sm font-semibold text-slate-700 transition hover:border-[#0F4CFF] hover:bg-[#f8fbff]">
                      Compare countries
                      <p className="mt-1 text-xs font-medium text-slate-500">Explore living cost, language, and student support.</p>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 rounded-[28px] bg-[#f8fbff] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#0B1D39]">Next-level admission intelligence</p>
                    <p className="mt-1 text-sm text-slate-500">Live data from our global MBBS ecosystem.</p>
                  </div>
                  <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F4CFF]">
                    Verified
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {liveMetrics.slice(0, 2).map((metric) => (
                    <div key={metric.label} className="rounded-3xl border border-slate-200 bg-white p-4">
                      <p className="text-2xl font-semibold text-[#081B35]">{metric.value}</p>
                      <p className="mt-2 text-sm text-slate-500">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8">
              <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">Top destinations</p>
                    <h2 className="mt-3 text-2xl font-semibold text-[#081B35]">Marketplace for premier MBBS countries</h2>
                  </div>
                  <Link href="/mbbs-abroad/georgia" className="text-sm font-semibold text-[#0F4CFF] transition hover:text-[#0B1D39]">
                    View all countries →
                  </Link>
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
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-[#081B35]">{destination.label}</h3>
                            <p className="text-sm text-slate-500">{destination.recognition}</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-[#0F4CFF]/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0F4CFF]">
                          {destination.language}
                        </span>
                      </div>
                      <div className="mt-5 grid gap-3 text-sm text-slate-600">
                        <p>Starting from <span className="font-semibold text-[#081B35]">{destination.fee}</span></p>
                        <p>{destination.universities} universities</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-[32px] border border-slate-200 bg-[#0B1D39] p-6 text-white shadow-[0_18px_44px_rgba(15,23,42,0.18)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-[#7DD3FC]">Why ILMALINK MEDIGO</p>
                    <h2 className="mt-3 text-2xl font-semibold">Premium student-first admission support.</h2>
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
                <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">NEET decision center</p>
                <h3 className="mt-3 text-2xl font-semibold text-[#081B35]">Score-based pathway guidance</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Enter your NEET score to see the most likely admission pathway across India and Abroad.
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
                <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">Live admission dashboard</p>
                <div className="mt-6 grid gap-4">
                  {liveMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-[24px] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
                      <p className="text-3xl font-semibold text-[#081B35]">{metric.value}</p>
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
                <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">Admission journey</p>
                <h2 className="mt-3 text-3xl font-semibold text-[#081B35]">Your end-to-end MBBS application roadmap</h2>
              </div>
              <Link href="/create-account" className="inline-flex items-center justify-center rounded-full bg-[#0F4CFF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b3fd6]">
                Start your journey
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {journeySteps.map((step, index) => (
                <div key={step} className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F4CFF]/10 text-[#0F4CFF] font-semibold">
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
                  <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">Cost intelligence</p>
                  <h2 className="mt-3 text-2xl font-semibold text-[#081B35]">Compare MBBS budgets across major destinations</h2>
                </div>
                <span className="rounded-full bg-[#00C896]/10 px-3 py-2 text-sm font-semibold text-[#04653d]">
                  Student-tested
                </span>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {costInsights.map((item) => (
                  <div key={item.label} className="rounded-[24px] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
                    <p className="text-lg font-semibold text-[#081B35]">{item.label}</p>
                    <div className="mt-4 grid gap-2 text-sm text-slate-600">
                      <p>Tuition: <span className="font-semibold text-[#0B1D39]">{item.fee}</span></p>
                      <p>Hostel: <span className="font-semibold text-[#0B1D39]">{item.hostel}</span></p>
                      <p>Living cost: <span className="font-semibold text-[#0B1D39]">{item.living}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
              <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">Country intelligence</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#081B35]">Insights by destination</h2>
              <div className="mt-6 grid gap-3">
                {destinationData.slice(0, 4).map((destination) => (
                  <div key={destination.label} className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={`https://flagcdn.com/w40/${destination.flag}.png`} alt={`${destination.label} Flag`} className="h-5 w-6 rounded-sm" />
                        <div>
                          <h3 className="text-base font-semibold text-[#081B35]">{destination.label}</h3>
                          <p className="text-sm text-slate-500">{destination.recognition}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#0F4CFF]">{destination.language}</span>
                    </div>
                    <div className="mt-4 grid gap-2 text-sm text-slate-600">
                      <p>Estimated fees: <span className="font-semibold text-[#081B35]">{destination.fee}</span></p>
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
                <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">Ready to move faster?</p>
                <h2 className="mt-3 text-3xl font-semibold text-[#081B35]">Your global medical career starts here.</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <Link href="/about/" className="inline-flex items-center justify-center rounded-full border border-[#0B1D39] px-5 py-3 text-sm font-semibold text-[#0B1D39] transition hover:bg-slate-50">
                  About Us
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-[#0F4CFF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b3fd6]"
                  onClick={() => setShowPopup(true)}
                >
                  Book Counselling
                </button>
                <Link href="/mbbs-abroad/georgia" className="inline-flex items-center justify-center rounded-full bg-[#00C896] px-5 py-3 text-sm font-semibold text-[#081B35] transition hover:bg-[#00b07a]">
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
