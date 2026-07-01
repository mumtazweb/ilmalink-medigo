import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import JsonLd from "../components/JsonLd";
import Navbar from "../components/navbar";
import {
  mbbsCostInsights,
  mbbsCountryInsights,
  mbbsDecisionIntelligenceDisclaimer,
  mbbsDecisionSupportSummary,
} from "../data/mbbsDecisionIntelligence";
import { buildBreadcrumbSchema, buildFAQSchema } from "../lib/schema";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title:
    "MBBS Decision Intelligence | Costs, Countries, NEET & Admission Support",
  description:
    "Compare indicative MBBS India and MBBS Abroad budgets, country checks, NEET pathways and ilmalink service-line admission support under ilmalink for Indian students.",
  keywords: [
    "MBBS cost comparison",
    "MBBS abroad country comparison",
    "MBBS India budget",
    "MBBS abroad budget",
    "NEET counselling support",
    "MBBS admission journey",
    "FMGE preparation support",
    "NExT preparation support",
    "ilmalink service line of ilmalink",
  ],
  alternates: {
    canonical: "https://www.ilmalink.com/mbbs-decision-intelligence",
  },
  openGraph: {
    title:
      "MBBS Decision Intelligence | ilmaLink",
    description:
      "Crawlable MBBS cost, country, NEET pathway and admission-support guidance for Indian students.",
    url: "https://www.ilmalink.com/mbbs-decision-intelligence",
    type: "website",
  },
};

const faqs = [
  {
    question: "What is MBBS decision intelligence?",
    answer:
      "MBBS decision intelligence combines NEET score pathways, counselling route, eligibility, country and college comparison, indicative total budget, documents, official rules and long-term licensing considerations before admission.",
  },
  {
    question: "Are the MBBS cost figures final university fees?",
    answer:
      "No. They are indicative planning estimates from the current ilmalink service-line dataset of ilmalink. Students must verify the latest written university, college or counselling fee structure, exchange rate and official charges before payment.",
  },
  {
    question: "How does ilmaLink support MBBS India admission?",
    answer:
      mbbsDecisionSupportSummary.india,
  },
  {
    question: "How does ilmaLink support MBBS Abroad admission?",
    answer:
      mbbsDecisionSupportSummary.abroad,
  },
] as const;

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "MBBS Decision Intelligence and Admission Support",
  url: "https://www.ilmalink.com/mbbs-decision-intelligence",
  serviceType:
    "NEET pathway, MBBS cost comparison, country comparison and admission guidance",
  provider: {
    "@id": "https://www.ilmalink.com/#organization",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  description: mbbsDecisionSupportSummary.description,
};

export default function MbbsDecisionIntelligencePage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            {
              name: "MBBS Decision Intelligence",
              url: "/mbbs-decision-intelligence",
            },
          ]),
          buildFAQSchema([...faqs]),
          serviceSchema,
        ]}
      />

      <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
        <Navbar />

        <section className="bg-[radial-gradient(circle_at_80%_0%,rgba(0,200,150,.2),transparent_32%),linear-gradient(145deg,#03102e,#07275a)] px-4 pb-14 pt-9 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-300">
              Crawlable MBBS planning guide
            </p>
            <h1 className="mt-4 max-w-5xl text-4xl font-extrabold tracking-normal md:text-6xl">
              MBBS Decision Intelligence for Costs, Countries, NEET Pathways
              and Admission Support
            </h1>
            <p className="mt-5 max-w-5xl text-base font-medium leading-8 text-blue-100 md:text-lg">
              {mbbsDecisionSupportSummary.description}
            </p>
          </div>
        </section>

        <section
          id="cost-intelligence"
          className="px-4 py-12 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0F4CFF]">
              MBBS cost intelligence
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#061D3F]">
              Indicative MBBS India and MBBS Abroad planning budgets
            </h2>
            <p className="mt-4 max-w-5xl text-sm font-medium leading-7 text-slate-700">
              Compare tuition, hostel, living-cost and estimated total planning
              ranges. A lower total alone does not make a route suitable:
              eligibility, recognition, course duration, internship, clinical
              exposure, licensing pathway and official rules must also be
              checked.
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {mbbsCostInsights.map((item) => (
                <article
                  key={item.id}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#047857]">
                    {item.region}
                  </p>
                  <h3 className="mt-2 text-xl font-extrabold text-[#061D3F]">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-2xl font-extrabold text-[#0F4CFF]">
                    {item.estimatedTotal}
                  </p>
                  <dl className="mt-4 grid gap-2 text-sm">
                    <div>
                      <dt className="font-bold text-slate-500">Tuition</dt>
                      <dd className="font-semibold text-slate-800">
                        {item.tuition}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-bold text-slate-500">Hostel</dt>
                      <dd className="font-semibold text-slate-800">
                        {item.hostel}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-bold text-slate-500">Living cost</dt>
                      <dd className="font-semibold text-slate-800">
                        {item.living}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-sm font-medium leading-6 text-slate-600">
                    {item.planningNote}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#0F4CFF]"
                  >
                    Open route guidance
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>

            <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-950">
              {mbbsDecisionIntelligenceDisclaimer}
            </p>
          </div>
        </section>

        <section
          id="country-intelligence"
          className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#047857]">
              MBBS Abroad country intelligence
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#061D3F]">
              Country fit, budget and verification checks
            </h2>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {mbbsCountryInsights.map((country) => (
                <article
                  key={country.id}
                  className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-6"
                >
                  <h3 className="text-2xl font-extrabold text-[#061D3F]">
                    MBBS in {country.label}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
                    {country.practicalFit}
                  </p>
                  <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                    <strong>Budget:</strong> {country.estimatedBudget}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                    <strong>Institution reference:</strong>{" "}
                    {country.medicalInstitutions}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                    <strong>FMGE comparison:</strong> {country.fmgeReference}
                  </p>
                  <h4 className="mt-5 text-sm font-extrabold text-[#061D3F]">
                    Checks before admission
                  </h4>
                  <ul className="mt-3 grid gap-2">
                    {country.checks.map((check) => (
                      <li
                        key={check}
                        className="flex items-start gap-2 text-sm font-medium leading-6 text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00A876]" />
                        {check}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={country.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#047857]"
                  >
                    Open {country.label} guide
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="admission-support"
          className="px-4 py-12 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0F4CFF]">
              India and Abroad admission support
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#061D3F]">
              Support before admission, during joining and through the course
            </h2>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              <article className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="text-2xl font-extrabold text-[#061D3F]">
                  MBBS India support pathway
                </h3>
                <p className="mt-4 text-sm font-medium leading-7 text-slate-700">
                  {mbbsDecisionSupportSummary.india}
                </p>
                <Link
                  href="/mbbs-india"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#0F4CFF]"
                >
                  Explore MBBS India
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
              <article className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
                <h3 className="text-2xl font-extrabold text-[#061D3F]">
                  MBBS Abroad support pathway
                </h3>
                <p className="mt-4 text-sm font-medium leading-7 text-slate-700">
                  {mbbsDecisionSupportSummary.abroad}
                </p>
                <Link
                  href="/mbbs-abroad"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#047857]"
                >
                  Explore MBBS Abroad
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-extrabold text-[#061D3F]">
              MBBS decision intelligence FAQ
            </h2>
            <div className="mt-6 grid gap-4">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-5"
                >
                  <h3 className="text-lg font-extrabold text-[#061D3F]">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
