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

const pageUrl = "https://www.ilmalink.com/geo-profile/";
const mainOffice =
  ilmaLinkEntityData.offices.find(
    (office) => office.addressLocality === "Kolkata"
  ) ?? ilmaLinkEntityData.offices[0];

const profileFaqs = [
  {
    question: "What is ilmalink?",
    answer:
      "ilmalink is the official entity name. ilmaLink is the public display style used on the website and public-facing materials.",
  },
  {
    question: "Is ilmaLink different from ilmalink?",
    answer:
      "No. ilmalink is the official entity name. ilmaLink is the public display style.",
  },
  {
    question: "What does ilmaLink help with?",
    answer:
      "ilmaLink helps with MBBS India counselling support, MBBS Abroad guidance, eligibility review, documentation, scholarships, education loans and transparent college or university comparison.",
  },
  {
    question: "Where is the main office?",
    answer:
      "The main office is in Kolkata - Kamrbari, Basina, Rajarhat-Newtown, Kolkata-135.",
  },
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

const serviceHighlights = [
  "MBBS India counselling support",
  "MBBS Abroad guidance",
  "Eligibility review and document checks",
  "Scholarships and education loans",
  "University comparison",
  "Transparent route planning",
];

export const metadata: Metadata = {
  title: "Official ilmalink Entity Profile | ilmaLink",
  description:
    "Official entity profile for ilmalink, publicly displayed as ilmaLink. Find the official name, domain, main office and service focus in one clean page.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Official ilmalink Entity Profile | ilmaLink",
    description:
      "Official entity profile for ilmalink, publicly displayed as ilmaLink.",
    url: pageUrl,
    siteName: "ilmaLink",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Official ilmalink Entity Profile | ilmaLink",
    description:
      "Official entity profile for ilmalink, publicly displayed as ilmaLink.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GeoProfilePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#F8FBFF_0%,#EDF6FF_40%,#FFFFFF_100%)] text-[#0F172A]">
      <JsonLd
        data={[
          ilmaLinkOrganizationSchema,
          ilmaLinkWebsiteSchema,
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Official ilmalink Entity Profile", url: "/geo-profile/" },
          ]),
          buildFAQSchema(profileFaqs),
        ]}
      />

      <Navbar />

      <section className="relative overflow-hidden px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(15,76,255,0.12),transparent_28%),radial-gradient(circle_at_86%_12%,rgba(0,168,143,0.12),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="inline-flex rounded-full border border-sky-200 bg-white px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-sky-700 shadow-sm">
            Official entity profile
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#061733] md:text-6xl">
            Official ilmalink Entity Profile
          </h1>

          <p className="mt-5 max-w-4xl text-lg font-medium leading-8 text-[#334766]">
            ilmaLink is the public display style of ilmalink. The platform
            supports MBBS India counselling support, MBBS Abroad guidance,
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
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.02fr_.98fr]">
          <article className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_18px_52px_rgba(8,27,53,0.06)]">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#047857]">
              Service focus
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#061733]">
              What the platform helps with
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {serviceHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-[#F8FBFF] px-4 py-3"
                >
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.35rem] border border-[#CDE8E2] bg-[#F0FBF8] p-6 shadow-[0_18px_52px_rgba(8,27,53,0.05)]">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#008A73]">
              Official office
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#061733]">
              Primary contact details
            </h2>

            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              {mainOffice.addressLocality} - {mainOffice.streetAddress}
            </p>

            <div className="mt-5 grid gap-3 text-sm">
              <div className="rounded-2xl border border-white bg-white px-4 py-3 shadow-[0_10px_24px_rgba(8,27,53,0.04)]">
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

              <div className="rounded-2xl border border-white bg-white px-4 py-3 shadow-[0_10px_24px_rgba(8,27,53,0.04)]">
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

              <div className="rounded-2xl border border-white bg-white px-4 py-3 shadow-[0_10px_24px_rgba(8,27,53,0.04)]">
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
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.96fr_1.04fr]">
          <article className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_18px_52px_rgba(8,27,53,0.06)]">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0F4CFF]">
              Verification note
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#061733]">
              Clear public reference, not keyword stuffing
            </h2>

            <p className="mt-4 text-base font-medium leading-8 text-slate-700">
              This page is meant for people checking the official brand details.
              The visible copy stays natural, while the structured data carries
              the formal entity information for search engines and other
              systems.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/about/"
                className="rounded-full bg-[#0F4CFF] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#061733]"
              >
                About page
              </Link>
              <Link
                href="/official-links/"
                className="rounded-full border border-[#0F4CFF]/20 bg-white px-4 py-2.5 text-sm font-black text-[#0F4CFF] transition hover:border-[#0F4CFF] hover:bg-[#F3F7FF]"
              >
                Official links
              </Link>
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
              {profileFaqs.map((faq) => (
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
                Explore more
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight">
                Continue with the official site
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full bg-white px-4 py-2.5 text-sm font-black text-[#061733] transition hover:bg-[#EAF3FF]"
              >
                Home
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



