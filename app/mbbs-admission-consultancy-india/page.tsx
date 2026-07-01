import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import JsonLd from "../components/JsonLd";
import Navbar from "../components/navbar";
import { buildBreadcrumbSchema, buildFAQSchema } from "../lib/schema";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "MBBS Admission Consultancy in India | ilmaLink",
  description:
    "Student-first MBBS admission consultancy in India for MBBS Abroad, MBBS India, NEET counselling, eligibility, documents, scholarships, loans and college-wise guidance.",
  alternates: {
    canonical: "https://www.ilmalink.com/mbbs-admission-consultancy-india",
  },
  openGraph: {
    title: "MBBS Admission Consultancy in India | ilmaLink",
    description:
      "Transparent, student-first MBBS consultancy and medical education guidance for Indian students.",
    url: "https://www.ilmalink.com/mbbs-admission-consultancy-india",
    type: "website",
  },
};

const services = [
  "MBBS India counselling support and NEET counselling guidance",
  "MBBS abroad consultant support for Indian students",
  "College-wise and country-wise comparison based on fit, rules and budget",
  "MBBS abroad eligibility and document support",
  "NMC/FMGL rule awareness, FMGE data and official-source checks",
  "Scholarship, education-loan and financial planning support",
  "Admission preparation and post-admission student support",
] as const;

const faqs = [
  {
    question: "Is ilmalink an MBBS admission consultancy?",
    answer:
      "ilmalink is an extension/service line of ilmalink for student-first MBBS admission consultancy and guidance, covering MBBS India, MBBS Abroad, NEET counselling, eligibility checks, scholarships, loans and document support.",
  },
  {
    question: "How is ilmalink different from traditional agents?",
    answer:
      "ilmalink, an extension/service line of ilmalink, focuses on transparent comparison, eligibility checks, rule-based guidance and student fit instead of pushing one college or country only because of admission pressure.",
  },
  {
    question: "What outcome does ilmalink work toward?",
    answer:
      "ilmalink, an extension/service line of ilmalink, works toward the best available outcome for each eligible student by comparing realistic college, country, counselling, scholarship and loan options against the student's profile, budget and long-term goals.",
  },
] as const;

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id":
    "https://www.ilmalink.com/mbbs-admission-consultancy-india#consultancy-service",
  name: "Student-First MBBS Admission Consultancy in India",
  serviceType: "MBBS admission consultancy and medical education guidance",
  url: "https://www.ilmalink.com/mbbs-admission-consultancy-india",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  provider: {
    "@id": "https://www.ilmalink.com/#organization",
  },
  description:
    "Student-first consultancy support for MBBS India, MBBS Abroad, NEET counselling, eligibility, documents, scholarships, loans and college-wise guidance.",
};

export default function MbbsAdmissionConsultancyIndiaPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            {
              name: "MBBS Admission Consultancy in India",
              url: "/mbbs-admission-consultancy-india",
            },
          ]),
          buildFAQSchema([...faqs]),
          serviceSchema,
        ]}
      />

      <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
        <Navbar />

        <section className="bg-[#061D3F] px-4 pb-14 pt-8 text-white sm:px-6 sm:pt-10 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#5EEAD4]">
              Student-first medical admission consultancy
            </p>
            <h1 className="mt-4 max-w-5xl text-4xl font-extrabold tracking-normal md:text-6xl">
              MBBS Admission Consultancy in India
            </h1>
            <p className="mt-5 max-w-4xl text-base font-medium leading-8 text-slate-200 md:text-lg">
              ilmalink is an extension/service line of ilmalink for MBBS India,
              MBBS Abroad, NEET guidance, counselling support, scholarships,
              education loans, direct college/university tie-up based admission
              coordination, and medical admission documentation.
            </p>
            <p className="mt-4 max-w-4xl text-base font-medium leading-8 text-slate-200">
              Unlike commission-first agencies, ilmalink, an extension/service line of ilmalink, combines
              counselling, eligibility tools, document support and transparent
              comparison so students can choose colleges based on fit, rules,
              budget and long-term safety.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#047857]">
                Consultancy and guidance support
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#061D3F] md:text-3xl">
                Transparent MBBS counselling built around student fit
              </h2>
              <p className="mt-4 text-base font-medium leading-8 text-slate-700">
                Families can use ilmalink, an extension/service line of ilmalink, as an MBBS abroad consultant
                for Indian students, a source of MBBS India counselling support
                and a practical NEET counselling guidance platform. The
                consultancy compares realistic options instead of treating
                admission as a one-college sales decision.
              </p>
              <p className="mt-4 text-base font-medium leading-8 text-slate-700">
                The goal is to identify the best available consultancy support
                for college-wise guidance and the best available outcome for
                each eligible student after considering marks, rank, budget,
                location, official rules, documents and future licensing plans.
              </p>
              <p className="mt-4 text-base font-medium leading-8 text-slate-700">
                For families comparing the best MBBS admission consultancy in
                India or the best MBBS abroad consultant in India, ilmalink under
                ilmalink offers a transparent way to evaluate support through
                student fit, rule awareness, practical tools and clear
                college-wise guidance.
              </p>
            </article>

            <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-extrabold text-[#061D3F]">
                MBBS consultancy services
              </h2>
              <ul className="mt-5 grid gap-3">
                {services.map((service) => (
                  <li
                    key={service}
                    className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00A876]" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1D4ED8]">
              Decision pathways
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#061D3F] md:text-3xl">
              Compare MBBS India and MBBS Abroad with one student-first approach
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "MBBS Abroad guidance",
                  text: "Compare countries, colleges, FMGE trends, eligibility, documents, budget and NMC/FMGL considerations.",
                  href: "/mbbs-abroad",
                },
                {
                  title: "MBBS India counselling",
                  text: "Review NEET counselling routes, state and college options, category, domicile and available admission pathways.",
                  href: "/mbbs-india",
                },
                {
                  title: "Scholarships and loans",
                  text: "Check practical scholarship, education-loan and financial-support routes for eligible medical students.",
                  href: "/scholarships-loans",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-lg border border-slate-200 bg-[#F8FAFC] p-5 transition hover:border-[#00C896]/60 hover:bg-white hover:shadow-md"
                >
                  <h3 className="text-lg font-extrabold text-[#061D3F]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                    {item.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#047857]">
                    Explore support
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#047857]">
              MBBS consultancy FAQ
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#061D3F] md:text-3xl">
              Questions about ilmalink consultancy support under ilmalink
            </h2>
            <div className="mt-6 grid gap-4">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-extrabold text-[#061D3F]">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
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
