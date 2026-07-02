import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import JsonLd from "../components/JsonLd";
import Navbar from "../components/navbar";
import { buildBreadcrumbSchema, buildSiteNavigationSchema } from "../lib/schema";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Explore Study and Support Pages | ilmaLink",
  description:
    "Explore ilmaLink study destinations, NEET guidance, scholarships, official updates and student-support pages.",
  alternates: {
    canonical: "https://www.ilmalink.com/site-hierarchy/",
  },
};

const hierarchyGroups = [
  {
    title: "MBBS Abroad",
    links: [
      { label: "MBBS Abroad Hub", href: "/mbbs-abroad" },
      { label: "Study MBBS in Georgia", href: "/mbbs-abroad/georgia" },
      {
        label: "East European University",
        href: "/mbbs-abroad/georgia/east-european-university",
      },
    ],
  },
  {
    title: "MBBS India",
    links: [
      { label: "MBBS India Hub", href: "/mbbs-india" },
      { label: "West Bengal medical colleges", href: "/mbbs-india#west-bengal" },
      { label: "Medical college directory", href: "/mbbs-india" },
    ],
  },
  {
    title: "NEET Guidance",
    links: [
      { label: "NEET Hub", href: "/neet" },
      { label: "Admit Card", href: "/neet/admit-card" },
      { label: "Result", href: "/neet/result" },
      { label: "Counselling", href: "/neet/counselling" },
    ],
  },
  {
    title: "Scholarships & Financial Support",
    links: [
      { label: "Scholarships Hub", href: "/scholarships-loans" },
      { label: "Education Loan", href: "/scholarships-loans#education-loans" },
      { label: "Scholarship Routes", href: "/scholarships-loans#scholarships" },
      { label: "Community Support", href: "/scholarships-loans#community-support" },
    ],
  },
  {
    title: "Trust & Official Updates",
    links: [
      { label: "Trust Center Hub", href: "/trust-center" },
      { label: "Student Alert", href: "/alert" },
      { label: "Official Links", href: "/official-links" },
      { label: "Official Advisories", href: "/official-advisories" },
    ],
  },
  {
    title: "Blogs & Student Guides",
    links: [
      { label: "Blogs Hub", href: "/blogs" },
      { label: "NEET articles", href: "/blogs?category=NEET" },
      {
        label: "Featured NEET article",
        href: "/blogs/vijay-neet-abolition-demand-entire-history-of-neet",
      },
    ],
  },
  {
    title: "Official Advisories",
    links: [
      { label: "Official Advisories Hub", href: "/official-advisories" },
      { label: "NMC updates", href: "/official-advisories" },
      { label: "MCC updates", href: "/official-advisories" },
    ],
  },
  {
    title: "Official Links",
    links: [
      { label: "Official Links Hub", href: "/official-links" },
      { label: "Official websites", href: "/official-links" },
      { label: "Verified social profiles", href: "/official-links" },
    ],
  },
  {
    title: "About ilmaLink",
    links: [
      { label: "About ilmaLink", href: "/about" },
      { label: "Official Links", href: "/official-links" },
      { label: "Data methodology", href: "/data-methodology" },
    ],
  },
  {
    title: "About & Contact",
    links: [
      { label: "About ilmaLink", href: "/about" },
      { label: "Book Counselling", href: "/" },
      { label: "Official contact links", href: "/official-links" },
    ],
  },
  {
    title: "Search & Explore",
    links: [
      { label: "Search page", href: "/search" },
      { label: "Search FMGE guidance", href: "/search?q=fmge" },
      { label: "Explore MBBS Abroad", href: "/mbbs-abroad" },
    ],
  },
] as const;

export default function SiteHierarchyPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Explore All Pages", url: "/site-hierarchy" },
          ]),
          buildSiteNavigationSchema(),
        ]}
      />
      <Navbar />

      <section className="bg-[#061D3F] px-4 pb-12 pt-8 text-white sm:px-6 sm:pt-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#5EEAD4]">
            Explore ilmaLink
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-normal md:text-6xl">
            Study and Support Directory
          </h1>
          <p className="mt-4 max-w-4xl text-base font-medium leading-7 text-slate-200 md:text-lg md:leading-8">
            Find study destinations, university guides, NEET resources, financial support,
            official updates and ways to connect with our counselling team.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {hierarchyGroups.map((group) => (
              <article key={group.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-2">
                  <Compass className="mt-0.5 h-5 w-5 text-[#047857]" />
                  <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-slate-900">
                    {group.title}
                  </h2>
                </div>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#047857] hover:underline"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}



