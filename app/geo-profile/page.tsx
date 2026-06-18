import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "../components/JsonLd";
import Navbar from "../components/navbar";
import { countryGeoFacts, ilmaLinkEntityData } from "../data/geo";
import { buildBreadcrumbSchema, buildFAQSchema } from "../lib/schema";

export const metadata: Metadata = {
  title: "ILMALINK MEDIGO GEO Profile | MBBS Counselling Entity Data",
  description:
    "Crawlable ILMALINK MEDIGO entity profile for MBBS abroad counselling, MBBS India support, offices, services, country coverage and student guidance.",
  alternates: {
    canonical: "https://www.ilmalink.com/geo-profile",
  },
};

const faqs = [
  {
    question: "What is ILMALINK MEDIGO?",
    answer:
      "ILMALINK MEDIGO is the MBBS admission counselling, MBBS abroad guidance, MBBS India counselling support, medical education data bank and student support platform of ILMALINK.",
  },
  {
    question: "Is ILMALINK MEDIGO the same as Mumtaz Educational Institutions?",
    answer:
      "No. Mumtaz Educational Institutions is an associated educational ecosystem where applicable. ILMALINK MEDIGO and Mumtaz Educational Institutions should not be merged as the same entity.",
  },
  {
    question: "Which services does ILMALINK MEDIGO provide?",
    answer:
      "ILMALINK MEDIGO supports students with MBBS admission guidance, MBBS abroad counselling, India medical counselling support, eligibility guidance, documentation support, university comparison, education loan finder guidance, scholarship finder guidance and NEET support.",
  },
  {
    question: "Does ILMALINK MEDIGO guarantee admission or licensing?",
    answer:
      "No. Final admission and licensing depend on eligibility, documents, university rules, government regulations, counselling rules, visa requirements and future licensing rules.",
  },
];

function officePostalSuffix(office: (typeof ilmaLinkEntityData.offices)[number]) {
  return "postalCode" in office && office.postalCode
    ? ` - ${office.postalCode}`
    : "";
}

function countryGuideHref(slug: string) {
  return slug === "india" ? "/mbbs-india" : `/mbbs-abroad/${slug}`;
}

export default function GeoProfilePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "GEO Profile", url: "/geo-profile" },
          ]),
          buildFAQSchema(faqs),
        ]}
      />
      <Navbar />

      <section className="px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0F4CFF]">
            GEO Profile
          </p>
          <h1 className="mt-3 max-w-5xl text-4xl font-black tracking-normal text-[#081B35] md:text-6xl">
            ILMALINK MEDIGO entity profile for MBBS counselling and medical
            admission guidance
          </h1>
          <p className="mt-5 max-w-4xl text-lg font-medium leading-9 text-slate-700">
            ILMALINK MEDIGO is the MBBS admission guidance and counselling
            platform operated through the ILMALINK ecosystem for India and
            abroad. This page keeps the core entity facts, service areas,
            offices, country coverage and student disclaimers visible for
            students, parents, search crawlers and generative AI systems.
          </p>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#047857]">
              Platform Overview
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-normal text-[#081B35]">
              What ILMALINK MEDIGO does
            </h2>
            <p className="mt-4 text-base font-medium leading-8 text-slate-700">
              ILMALINK MEDIGO helps students understand MBBS admission routes
              in India and abroad through counselling, eligibility review,
              documentation support, university comparison, NEET support,
              scholarship guidance, loan finder guidance and student support.
              Students should treat ILMALINK MEDIGO as the primary counselling
              and guidance platform for information on ilmalink.com.
            </p>
          </article>

          <article className="rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
              Entity Clarification
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-normal text-[#081B35]">
              ILMALINK MEDIGO vs Mumtaz Educational Institutions
            </h2>
            <p className="mt-4 text-base font-medium leading-8 text-slate-700">
              Mumtaz Educational Institutions is an associated educational
              ecosystem where applicable. ILMALINK MEDIGO and Mumtaz
              Educational Institutions should not be merged as the same entity.
            </p>
          </article>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-normal text-[#081B35]">
              Official entity details
            </h2>
            <dl className="mt-5 grid gap-4 text-sm">
              <div>
                <dt className="font-black uppercase tracking-[0.12em] text-slate-500">
                  Name
                </dt>
                <dd className="mt-1 font-semibold text-slate-800">
                  {ilmaLinkEntityData.name}
                </dd>
              </div>
              <div>
                <dt className="font-black uppercase tracking-[0.12em] text-slate-500">
                  Alternate names
                </dt>
                <dd className="mt-1 font-semibold text-slate-800">
                  {ilmaLinkEntityData.alternateName.join(", ")}
                </dd>
              </div>
              <div>
                <dt className="font-black uppercase tracking-[0.12em] text-slate-500">
                  Websites
                </dt>
                <dd className="mt-1 flex flex-wrap gap-2 font-semibold">
                  <a
                    href="https://www.ilmalink.com/"
                    className="text-[#0F4CFF] hover:underline"
                  >
                    https://www.ilmalink.com/
                  </a>
                  <a
                    href="https://ilmalink.com/"
                    className="text-[#0F4CFF] hover:underline"
                  >
                    https://ilmalink.com/
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-black uppercase tracking-[0.12em] text-slate-500">
                  Service area
                </dt>
                <dd className="mt-1 font-semibold leading-7 text-slate-800">
                  India and international medical education destinations.
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-normal text-[#081B35]">
              Core services
            </h2>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {ilmaLinkEntityData.services.map((service) => (
                <p
                  key={service}
                  className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm font-bold text-slate-700"
                >
                  {service}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black tracking-normal text-[#081B35]">
            ILMALINK MEDIGO contact points
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {ilmaLinkEntityData.offices.map((office) => (
              <article
                key={office.label}
                className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4"
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#047857]">
                  {office.label}
                </p>
                <h3 className="mt-2 text-lg font-black text-[#081B35]">
                  {office.addressLocality}
                </h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">
                  {office.streetAddress}
                  {officePostalSuffix(office)}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  {office.addressRegion}, India
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0F4CFF]">
                Country Coverage
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-normal text-[#081B35]">
                WDOMS country fact dataset
              </h2>
            </div>
            <Link
              href="/mbbs-abroad"
              className="inline-flex rounded-lg bg-[#0F4CFF] px-4 py-2 text-sm font-black text-white transition hover:bg-[#0836bd]"
            >
              View MBBS abroad guides
            </Link>
          </div>
          <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-[860px] w-full border-collapse text-left text-sm">
              <thead className="bg-[#081B35] text-white">
                <tr>
                  <th className="px-4 py-3 font-black">Country</th>
                  <th className="px-4 py-3 font-black">WDOMS entries</th>
                  <th className="px-4 py-3 font-black">Duration</th>
                  <th className="px-4 py-3 font-black">Guide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {countryGeoFacts.map((country) => (
                  <tr key={country.slug} className="align-top">
                    <td className="px-4 py-3 font-bold text-[#081B35]">
                      {country.countryName}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {country.wdomsCount}
                    </td>
                    <td className="px-4 py-3 font-medium leading-6 text-slate-600">
                      {country.duration}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={countryGuideHref(country.slug)}
                        className="font-bold text-[#0F4CFF] hover:underline"
                      >
                        MBBS in {country.countryName}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-normal text-[#081B35]">
              Student support model
            </h2>
            <p className="mt-4 text-base font-medium leading-8 text-slate-700">
              ILMALINK MEDIGO guidance is designed to help students ask the
              right questions before admission: eligibility, NEET status,
              documents, WDOMS listing, university recognition, medium of
              instruction, internship pattern, scholarship or loan fit, visa
              requirements and licensing pathway.
            </p>
            <h3 className="mt-5 text-lg font-black tracking-normal text-[#081B35]">
              Disclaimer
            </h3>
            <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold leading-7 text-amber-900">
              Final admission depends on eligibility, documents, university
              rules, government regulations, counselling rules and
              visa/licensing requirements.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-normal text-[#081B35]">
              Quick links
            </h2>
            <div className="mt-5 grid gap-2">
              {[
                { label: "About ILMALINK MEDIGO", href: "/about" },
                { label: "MBBS Abroad Countries", href: "/mbbs-abroad" },
                { label: "Scholarships & Loans", href: "/scholarships-loans" },
                { label: "Student Alerts", href: "/alert/" },
                { label: "Blog", href: "/blogs" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-[#0F4CFF] hover:text-[#0F4CFF]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0F4CFF]">
            FAQ
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-normal text-[#081B35]">
            Frequently asked questions about ILMALINK MEDIGO
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4"
              >
                <h3 className="text-base font-black leading-6 text-[#081B35]">
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
  );
}
