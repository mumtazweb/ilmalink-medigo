import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "../components/JsonLd";
import Navbar from "../components/navbar";
import {
  ilmaLinkEntityData,
  ilmaLinkOrganizationSchema,
  ilmaLinkWebsiteSchema,
} from "../data/geo";
import { buildBreadcrumbSchema, buildFAQSchema } from "../lib/schema";

const pageUrl = "https://www.ilmalink.com/about/";
const mainOffice =
  ilmaLinkEntityData.offices.find(
    (office) => office.addressLocality === "Kolkata"
  ) ?? ilmaLinkEntityData.offices[0];

const aboutFaqs = [
  {
    question: "What is ilmalink?",
    answer:
      "ilmalink is the official entity name. ilmaLink is the public display style used on the website and public-facing materials.",
  },
  {
    question: "Which services does ilmaLink cover?",
    answer:
      "ilmaLink helps with MBBS India counselling support, MBBS Abroad guidance, eligibility review, documentation, scholarships, education loans and transparent college or university comparison.",
  },
  {
    question: "Where is the main office?",
    answer:
      "The main office is in Kolkata - Kamrbari, Basina, Rajarhat-Newtown, Kolkata-135.",
  },
];

const serviceCards = [
  {
    title: "MBBS India",
    text: "NEET counselling support, route planning, document checks and college comparison.",
  },
  {
    title: "MBBS Abroad",
    text: "Country comparison, university verification and admission guidance for Indian students.",
  },
  {
    title: "Eligibility Review",
    text: "Clear checks for NEET, documents, fees and official admission rules before moving ahead.",
  },
  {
    title: "Scholarships and Loans",
    text: "Support for scholarship options, education loans and financial planning.",
  },
  {
    title: "Documentation",
    text: "Help with forms, records, application documents and verification steps.",
  },
  {
    title: "Transparent Comparison",
    text: "Simple side-by-side college and university comparison without hype.",
  },
];

const workingSteps = [
  "Review the student's NEET score, budget and preferred destination.",
  "Compare India and abroad routes using official college or university information.",
  "Move forward only after checking eligibility, documents, fees and counselling rules.",
];

const profileFacts = [
  {
    label: "Official entity name",
    value: "ilmalink",
  },
  {
    label: "Public display style",
    value: "ilmaLink",
  },
  {
    label: "Domain",
    value: "www.ilmalink.com",
  },
  {
    label: "Main office",
    value: "Kolkata - Kamrbari, Basina, Rajarhat-Newtown, Kolkata-135",
  },
];

export const metadata: Metadata = {
  title: "About ilmaLink | Official MBBS Admission Guidance",
  description:
    "ilmaLink is the public display style of ilmalink, an MBBS admission guidance platform for India and abroad. It helps NEET aspirants, parents and education partners with MBBS India counselling support, MBBS Abroad guidance, eligibility review, documentation, scholarships, education loans and transparent college or university comparison.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "About ilmaLink | Official MBBS Admission Guidance",
    description:
      "ilmaLink is the public display style of ilmalink, an MBBS admission guidance platform for India and abroad.",
    url: pageUrl,
    siteName: "ilmaLink",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "About ilmaLink | Official MBBS Admission Guidance",
    description:
      "ilmaLink is the public display style of ilmalink, an MBBS admission guidance platform for India and abroad.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#F8FBFF_0%,#EEF6FF_40%,#FFFFFF_100%)] text-[#0F172A]">
      <JsonLd
        data={[
          ilmaLinkOrganizationSchema,
          ilmaLinkWebsiteSchema,
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About ilmaLink", url: "/about/" },
          ]),
          buildFAQSchema(aboutFaqs),
        ]}
      />

      <Navbar />

      <section className="relative overflow-hidden px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(15,76,255,0.12),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(0,200,150,0.12),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="inline-flex rounded-full border border-sky-200 bg-white px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-sky-700 shadow-sm">
            Official brand page
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#061733] md:text-6xl">
            About ilmaLink
          </h1>

          <p className="mt-5 max-w-4xl text-lg font-medium leading-8 text-[#334766]">
            ilmaLink is the public display style of ilmalink, an MBBS admission
            guidance platform for India and abroad. We help NEET aspirants,
            parents and education partners with clear counselling support,
            eligibility review, documentation, scholarships, education loans
            and transparent college or university comparison.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {profileFacts.map((fact) => (
              <article
                key={fact.label}
                className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_18px_52px_rgba(8,27,53,0.06)]"
              >
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0F4CFF]">
                  {fact.label}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                  {fact.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <article className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_18px_52px_rgba(8,27,53,0.06)]">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#047857]">
              What we help with
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#061733]">
              Practical guidance for students and parents
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {serviceCards.map((service) => (
                <div
                  key={service.title}
                  className="rounded-2xl border border-slate-200 bg-[#F8FBFF] p-4"
                >
                  <h3 className="text-sm font-black text-[#061733]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                    {service.text}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-[1.35rem] border border-[#CDE8E2] bg-[#F0FBF8] p-6 shadow-[0_18px_52px_rgba(8,27,53,0.05)]">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#008A73]">
              How we work
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#061733]">
              A simple and transparent process
            </h2>

            <ol className="mt-5 space-y-3">
              {workingSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-3 rounded-2xl border border-white bg-white px-4 py-3 shadow-[0_10px_24px_rgba(8,27,53,0.04)]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0F4CFF] text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-6 text-slate-700">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <article className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_18px_52px_rgba(8,27,53,0.06)]">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0F4CFF]">
              Official office
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#061733]">
              Primary contact location
            </h2>

            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              {mainOffice.addressLocality} - {mainOffice.streetAddress}
            </p>

            <div className="mt-5 grid gap-3 text-sm">
              <div className="rounded-2xl border border-slate-200 bg-[#F8FBFF] px-4 py-3">
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
                  Call
                </p>
                <a
                  className="mt-1 inline-block font-semibold text-[#0F4CFF] hover:underline"
                  href={`tel:${ilmaLinkEntityData.contact.call.replace(/\s+/g, "")}`}
                >
                  {ilmaLinkEntityData.contact.call}
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-[#F8FBFF] px-4 py-3">
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
                  WhatsApp
                </p>
                <a
                  className="mt-1 inline-block font-semibold text-[#0F4CFF] hover:underline"
                  href={ilmaLinkEntityData.contact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ilmaLinkEntityData.contact.whatsapp}
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-[#F8FBFF] px-4 py-3">
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
                  Email
                </p>
                <a
                  className="mt-1 inline-block font-semibold text-[#0F4CFF] hover:underline"
                  href={`mailto:${ilmaLinkEntityData.contact.email}`}
                >
                  {ilmaLinkEntityData.contact.email}
                </a>
              </div>
            </div>
          </article>

          <article className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_18px_52px_rgba(8,27,53,0.06)]">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0F4CFF]">
              FAQ
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#061733]">
              Frequently asked questions
            </h2>

            <div className="mt-5 grid gap-3">
              {aboutFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-slate-200 bg-[#F8FBFF] p-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-black text-[#061733]">
                    <span>{faq.question}</span>
                    <span className="text-[#0F4CFF] transition group-open:rotate-180">
                      v
                    </span>
                  </summary>
                  <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[1.35rem] border border-[#0F4CFF]/12 bg-[#061733] p-6 text-white shadow-[0_18px_52px_rgba(8,27,53,0.12)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
                Quick links
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight">
                Continue exploring ilmaLink
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/official-links/"
                className="rounded-full bg-white px-4 py-2.5 text-sm font-black text-[#061733] transition hover:bg-[#EAF3FF]"
              >
                Official links
              </Link>
              <Link
                href="/mbbs-abroad/"
                className="rounded-full border border-white/20 px-4 py-2.5 text-sm font-black text-white transition hover:bg-white/10"
              >
                MBBS abroad
              </Link>
              <Link
                href="/neet/"
                className="rounded-full border border-white/20 px-4 py-2.5 text-sm font-black text-white transition hover:bg-white/10"
              >
                NEET hub
              </Link>
              <Link
                href="/scholarships-loans/"
                className="rounded-full border border-white/20 px-4 py-2.5 text-sm font-black text-white transition hover:bg-white/10"
              >
                Scholarships and loans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



