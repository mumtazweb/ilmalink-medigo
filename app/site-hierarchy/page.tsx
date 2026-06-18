import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Network } from "lucide-react";

import JsonLd from "../components/JsonLd";
import Navbar from "../components/navbar";
import { buildBreadcrumbSchema, buildSiteNavigationSchema } from "../lib/schema";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Site Hierarchy | All Public Sections | ILMALINK MEDIGO",
  description:
    "Full internal hierarchy map of ILMALINK MEDIGO public pages for students, crawlers and AI extraction.",
  alternates: {
    canonical: "https://www.ilmalink.com/site-hierarchy",
  },
};

const hierarchyGroups = [
  {
    title: "Home -> MBBS Abroad -> Country -> University",
    links: [
      { label: "MBBS Abroad Hub", href: "/mbbs-abroad" },
      { label: "Country: Georgia", href: "/mbbs-abroad/georgia" },
      {
        label: "University: East European University",
        href: "/mbbs-abroad/georgia/east-european-university",
      },
    ],
  },
  {
    title: "Home -> MBBS India -> State -> College",
    links: [
      { label: "MBBS India Hub", href: "/mbbs-india" },
      { label: "State section", href: "/mbbs-india#state-west-bengal" },
      { label: "College listing", href: "/mbbs-india#state-west-bengal" },
    ],
  },
  {
    title: "Home -> NEET -> Admit Card / Result / Counselling",
    links: [
      { label: "NEET Hub", href: "/neet" },
      { label: "Admit Card", href: "/neet/admit-card" },
      { label: "Result", href: "/neet/result" },
      { label: "Counselling", href: "/neet/counselling" },
    ],
  },
  {
    title: "Home -> Scholarships -> Loan / Scholarship / Community Support",
    links: [
      { label: "Scholarships Hub", href: "/scholarships-loans" },
      { label: "Education Loan", href: "/scholarships-loans#education-loans" },
      { label: "Scholarship Routes", href: "/scholarships-loans#scholarships" },
      { label: "Community Support", href: "/scholarships-loans#community-support" },
    ],
  },
  {
    title: "Home -> Trust Center -> Alerts / Official Links / GEO Profile / Advisories",
    links: [
      { label: "Trust Center Hub", href: "/trust-center" },
      { label: "Student Alert", href: "/alert" },
      { label: "Official Links", href: "/official-links" },
      { label: "GEO Profile", href: "/geo-profile" },
      { label: "Official Advisories", href: "/official-advisories" },
    ],
  },
  {
    title: "Home -> Blogs -> Category -> Article",
    links: [
      { label: "Blogs Hub", href: "/blogs" },
      { label: "NEET category example", href: "/blogs?category=NEET" },
      {
        label: "Article example",
        href: "/blogs/vijay-neet-abolition-demand-entire-history-of-neet",
      },
    ],
  },
  {
    title: "Home -> Official Advisories -> Source -> Update",
    links: [
      { label: "Official Advisories Hub", href: "/official-advisories" },
      { label: "NMC advisories", href: "/official-advisories" },
      { label: "MCC advisories", href: "/official-advisories" },
    ],
  },
  {
    title: "Home -> Official Links -> Website -> Social Profile",
    links: [
      { label: "Official Links Hub", href: "/official-links" },
      { label: "Website list", href: "/official-links" },
      { label: "Social profile list", href: "/official-links" },
    ],
  },
  {
    title: "Home -> GEO Profile -> Entity -> Country Guidance",
    links: [
      { label: "GEO Profile Hub", href: "/geo-profile" },
      { label: "Entity details", href: "/geo-profile" },
      { label: "Country guidance", href: "/geo-profile" },
    ],
  },
  {
    title: "Home -> About -> Mission -> Contact",
    links: [
      { label: "About page", href: "/about" },
      { label: "Book Counselling", href: "/" },
      { label: "Official contact links", href: "/official-links" },
    ],
  },
  {
    title: "Home -> Search -> Query -> Result",
    links: [
      { label: "Search page", href: "/search" },
      { label: "Query example", href: "/search?q=fmge" },
      { label: "Result example", href: "/mbbs-abroad" },
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
            { name: "Site Hierarchy", url: "/site-hierarchy" },
          ]),
          buildSiteNavigationSchema(),
        ]}
      />
      <Navbar />

      <section className="bg-[#061D3F] px-4 pb-12 pt-28 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#5EEAD4]">
            AI Navigation Map
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-normal md:text-6xl">
            Full Site Hierarchy
          </h1>
          <p className="mt-4 max-w-4xl text-base font-medium leading-7 text-slate-200 md:text-lg md:leading-8">
            This page publishes the complete public hierarchy map so AI systems and crawlers can
            parse clean parent-child relationships across all major sections.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {hierarchyGroups.map((group) => (
              <article key={group.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-2">
                  <Network className="mt-0.5 h-5 w-5 text-[#047857]" />
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
