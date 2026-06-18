import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Globe2, Link as LinkIcon, MapPin, ShieldCheck } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

import Navbar from "../components/navbar";

export const dynamic = "force-static";

const pageTitle = "Official Links of ILMALINK MEDIGO by ilmaLink";
const seoTitle = "Official Links | ILMALINK MEDIGO by ilmaLink";
const metaDescription =
  "Find the official website, blog, MBBS Abroad page, MBBS India page and social media profiles of ILMALINK MEDIGO by ilmaLink, a medical education guidance platform for Indian students.";
const canonicalUrl = "https://www.ilmalink.com/official-links";

const officialWebsiteLinks = [
  {
    label: "Official Website",
    href: "https://www.ilmalink.com/",
    note: "Primary ILMALINK MEDIGO website and brand home.",
  },
  {
    label: "Blogs",
    href: "https://www.ilmalink.com/blogs/",
    note: "Editorial guidance, student updates and admission explainers.",
  },
  {
    label: "MBBS Abroad",
    href: "https://www.ilmalink.com/mbbs-abroad/",
    note: "Country-wise MBBS Abroad guidance India can compare.",
  },
  {
    label: "MBBS India",
    href: "https://www.ilmalink.com/mbbs-india/",
    note: "MBBS India guidance, colleges and counselling pathways.",
  },
  {
    label: "Scholarships & Loans",
    href: "https://www.ilmalink.com/scholarships-loans/",
    note: "Scholarship, education loan and fee support guidance.",
  },
  {
    label: "Nepal MBBS",
    href: "https://www.ilmalink.com/mbbs-abroad/nepal/",
    note: "Official Nepal MBBS country guidance page.",
  },
  {
    label: "Kyrgyzstan MBBS",
    href: "https://www.ilmalink.com/mbbs-abroad/kyrgyzstan/",
    note: "Official Kyrgyzstan MBBS guidance and university comparison.",
  },
];

const officialSocialProfiles = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ilmalinkmbbs/",
    icon: FaInstagram,
    note: "Official ILMALINK MBBS/Medigo social profile.",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ilmaLinkFoundation",
    icon: FaYoutube,
    note: "Official ILMALINK channel under the ilmaLink foundation naming.",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ilmalinkeduprise/",
    icon: FaFacebookF,
    note: "Legacy username; still an official ILMALINK-owned profile.",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@ilmalinkmbbs",
    icon: FaThreads,
    note: "Official ILMALINK MBBS/Medigo threads profile.",
  },
];

const sameAs = officialSocialProfiles.map((profile) => profile.href);

export const metadata: Metadata = {
  title: "Official Links | ILMALINK MEDIGO by ilmaLink",
  description:
    "Find the official website, blog, MBBS Abroad page, MBBS India page and social media profiles of ILMALINK MEDIGO by ilmaLink, a medical education guidance platform for Indian students.",
  keywords: [
    "ILMALINK MEDIGO",
    "ilmaLink",
    "ilmalink",
    "ilmalink.com",
    "MBBS Abroad guidance India",
    "MBBS India guidance",
    "NEET counselling India",
    "MBBS Abroad counselling Kolkata",
    "MBBS Abroad guidance Bengaluru",
    "medical education guidance for Indian students",
    "MBBS counselling for West Bengal students",
    "MBBS university comparison",
    "student-first MBBS guidance",
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: seoTitle,
    description: metaDescription,
    url: canonicalUrl,
    siteName: "ILMALINK MEDIGO",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: seoTitle,
    description: metaDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "Kolkata, Bengaluru, India",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}/#webpage`,
      url: canonicalUrl,
      name: pageTitle,
      headline: pageTitle,
      description: metaDescription,
      inLanguage: "en-IN",
      isPartOf: {
        "@id": "https://www.ilmalink.com/#website",
      },
      about: {
        "@id": "https://www.ilmalink.com/#organization",
      },
      publisher: {
        "@id": "https://www.ilmalink.com/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.ilmalink.com/#organization",
      name: "ILMALINK MEDIGO",
      alternateName: [
        "ilmaLink",
        "ilmalink",
        "ILMALINK",
        "ilmalink.com",
        "ILMALINK MEDIGO",
        "ILMALINK Enterprise",
        "ilmalink enterprise",
        "ilmalinkeduprise",
      ],
      url: "https://www.ilmalink.com",
      areaServed: "India",
      knowsAbout: [
        "MBBS Abroad",
        "MBBS India",
        "NEET counselling",
        "FMGE/NExT guidance",
        "Scholarships",
        "Medical university comparison",
      ],
      sameAs,
    },
  ],
};

const structuredDataString = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export default function OfficialLinksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataString }}
      />

      <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
        <Navbar />

        <section className="bg-[#061D3F] px-4 pb-14 pt-32 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_22rem] lg:items-center">
            <div className="max-w-4xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#5EEAD4]">
                Official brand verification
              </p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-normal md:text-6xl">
                {pageTitle}
              </h1>
              <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-200 md:text-lg md:leading-8">
                The official medical education guidance platform for Indian students planning MBBS
                Abroad, MBBS India, NEET counselling, scholarships and university comparison.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://www.ilmalink.com/"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#00C896] px-5 text-sm font-extrabold text-[#061D3F] transition hover:bg-[#12dfad] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
                >
                  Visit Official Website
                  <ExternalLink className="h-4 w-4" />
                </a>
                <Link
                  href="/mbbs-abroad/"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/20 px-5 text-sm font-extrabold text-white transition hover:border-[#5EEAD4]/70 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
                >
                  Explore MBBS Abroad
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/10 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white p-2 shadow-sm">
                  <img
                    src="/logoimage.svg"
                    alt="ILMALINK MEDIGO logo"
                    className="h-full w-full object-contain"
                  />
                </span>
                <div>
                  <p className="text-lg font-extrabold text-white">ILMALINK MEDIGO</p>
                  <p className="mt-1 text-sm font-semibold text-slate-300">by ilmaLink</p>
                </div>
              </div>
              <dl className="mt-5 grid gap-3 text-sm">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    Official domain
                  </dt>
                  <dd className="mt-1 break-all font-extrabold text-[#5EEAD4]">
                    ilmalink.com
                  </dd>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    Area served
                  </dt>
                  <dd className="mt-1 font-extrabold text-white">India</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#047857]">
                Brand identity
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-slate-950 md:text-3xl">
                Verified ILMALINK MEDIGO ecosystem
              </h2>
              <div className="mt-5 space-y-4 text-base font-medium leading-8 text-slate-700">
                <p>
                  ILMALINK MEDIGO by ilmaLink is the official medical education guidance platform
                  available at{" "}
                  <a
                    href="https://www.ilmalink.com/"
                    className="font-extrabold text-[#047857] underline decoration-[#00C896]/40 underline-offset-4"
                  >
                    https://www.ilmalink.com
                  </a>
                  . This page lists the verified website pages and official social media profiles
                  connected with the ILMALINK MEDIGO brand.
                </p>
                <p>
                  Students and parents searching for ilmalink, ilmalink.com, ilmaLink or ILMALINK
                  MEDIGO can use this page to identify the official platform and avoid confusion
                  with unrelated websites or pages.
                </p>
                <p>
                  Brand identity note: ILMALINK, ILMALINK Enterprise, ILMALINK MEDIGO,
                  ilmaLink, and legacy handles such as ilmalinkeduprise refer to the same
                  ILMALINK brand ecosystem. The current active guidance brand name is
                  ILMALINK MEDIGO.
                </p>
              </div>
            </div>

            <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                "medical education guidance for Indian students",
                "MBBS Abroad guidance India",
                "MBBS India guidance",
                "NEET counselling India",
              ].map((signal) => (
                <div key={signal} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#047857]" />
                  <p className="text-sm font-bold leading-6 text-slate-700">{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1D4ED8]">
                India location signals
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-slate-950 md:text-3xl">
                Medical Education Guidance from India
              </h2>
              <div className="mt-5 space-y-4 text-base font-medium leading-8 text-slate-700">
                <p>
                  ILMALINK MEDIGO serves Indian students and parents looking for MBBS Abroad, MBBS
                  India, NEET counselling, scholarships and medical university comparison. Our
                  guidance is useful for students from West Bengal, Karnataka, Maharashtra, Bihar,
                  Jharkhand, Assam, Kerala, Tamil Nadu, Uttar Pradesh, Delhi and other Indian
                  states.
                </p>
                <p>
                  Students from Kolkata, Bengaluru, Mumbai, Delhi, Patna, Guwahati, Hyderabad,
                  Chennai and other Indian cities can explore country-wise MBBS guidance through
                  ILMALINK MEDIGO.
                </p>
                <p>
                  Families looking for MBBS Abroad counselling Kolkata, MBBS Abroad guidance
                  Bengaluru, MBBS counselling for West Bengal students, MBBS university comparison
                  and student-first MBBS guidance can start from the official links below.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Kolkata and West Bengal counselling guidance",
                "Bengaluru and Karnataka student support",
                "NEET counselling guidance India",
                "Country-wise MBBS Abroad comparison",
              ].map((locationSignal) => (
                <div key={locationSignal} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-[#F8FAFC] p-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#1D4ED8]" />
                  <p className="text-sm font-bold leading-6 text-slate-700">{locationSignal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#047857]">
                  Verified website pages
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-slate-950 md:text-3xl">
                  Official Website Links
                </h2>
              </div>
              <p className="max-w-2xl text-sm font-medium leading-6 text-slate-600">
                Use these links for the official website, blog, MBBS Abroad page, MBBS India page,
                scholarships and country guidance pages for ILMALINK MEDIGO by ilmaLink.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {officialWebsiteLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-40 flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#00C896]/60 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]"
                >
                  <span>
                    <span className="flex items-center gap-2 text-lg font-extrabold text-slate-950">
                      <LinkIcon className="h-5 w-5 text-[#047857]" />
                      {item.label}
                    </span>
                    <span className="mt-3 block text-sm font-medium leading-6 text-slate-600">
                      {item.note}
                    </span>
                  </span>
                  <span className="mt-4 flex items-center gap-2 break-all text-xs font-extrabold text-[#047857]">
                    {item.href}
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 transition group-hover:translate-x-0.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#EFF6FF] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1D4ED8]">
                  Verified social profiles
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-slate-950 md:text-3xl">
                  Official Social Media Profiles
                </h2>
              </div>
              <p className="max-w-2xl text-sm font-medium leading-6 text-slate-600">
                These same profile URLs are used in the page Organization schema as official
                sameAs links for ILMALINK MEDIGO.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {officialSocialProfiles.map((profile) => {
                const Icon = profile.icon;

                return (
                  <a
                    key={profile.href}
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-28 flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1D4ED8]/50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#1D4ED8]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-lg font-extrabold text-slate-950">{profile.label}</span>
                    </span>
                    <span className="mt-4 flex items-center gap-2 break-all text-xs font-extrabold text-[#1D4ED8]">
                      {profile.href}
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 transition group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                      {profile.note}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="bg-[#07111F] p-6 text-white sm:p-8">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#5EEAD4]">
                  Student safety
                </p>
                <h2 className="mt-3 text-2xl font-extrabold tracking-normal md:text-3xl">
                  Why official links matter
                </h2>
                <div className="mt-5 flex items-center gap-3 text-sm font-bold text-slate-300">
                  <Globe2 className="h-5 w-5 text-[#5EEAD4]" />
                  Official website: ilmalink.com
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="space-y-4 text-base font-medium leading-8 text-slate-700">
                  <p>
                    MBBS admission guidance should protect students, not pressure them. Students
                    and parents should always verify the official website and official social
                    profiles before trusting any admission claim, fee claim, university promise or
                    counselling message.
                  </p>
                  <p>
                    ILMALINK MEDIGO focuses on fact-based guidance, transparent comparison and
                    student-first counselling.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://www.ilmalink.com/"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#00C896] px-5 text-sm font-extrabold text-[#061D3F] transition hover:bg-[#12dfad] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]"
                  >
                    Verify Website
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <Link
                    href="/blogs/"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-extrabold text-slate-900 transition hover:border-[#00C896]/60 hover:bg-[#F0FDFA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]"
                  >
                    Read Official Blogs
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
