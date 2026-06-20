import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import JsonLd from "../components/JsonLd";
import Navbar from "../components/navbar";
import { neetPathwayBands } from "../data/neetPathwayGuide";
import { buildBreadcrumbSchema, buildFAQSchema } from "../lib/schema";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title:
    "NEET Pathway Guide 2026 | MBBS India, Abroad, BDS, AYUSH & Repeat Strategy",
  description:
    "Check NEET score-wise MBBS admission possibilities across AIIMS, government MBBS, state quota, private MBBS, deemed universities, BDS, AYUSH, MBBS Abroad, paramedical and repeat NEET planning.",
  keywords: [
    "NEET pathway guide",
    "NEET score MBBS admission",
    "MBBS India counselling",
    "MCC counselling",
    "state medical counselling",
    "MBBS abroad after NEET",
    "BDS admission",
    "AYUSH admission",
    "NEET repeat strategy",
    "paramedical after NEET",
    "ILMALINK MEDIGO",
  ],
  alternates: {
    canonical: "https://ilmalink.com/neet-pathway-guide",
  },
};

const faqs = [
  {
    question: "What can I do after NEET 700+?",
    answer:
      "A 700+ score is a priority zone for AIIMS, top government medical colleges, central institutes and high-demand state government colleges. Students should participate in MCC central counselling and state medical counselling with a carefully ordered choice list.",
  },
  {
    question: "Is MBBS India possible below 300 NEET score?",
    answer:
      "Government and semi-government MBBS are generally not realistic for most students below 300. High-budget private management or deemed options may need analysis, while MBBS Abroad, BDS, AYUSH and repeat NEET can be more practical depending on eligibility and budget.",
  },
  {
    question: "What if my NEET score is below the qualifying cutoff?",
    answer:
      "Normal NEET-based MBBS, BDS and AYUSH counselling routes are not available below the qualifying cutoff for that admission year. Students can repeat NEET or explore eligible paramedical, allied health, B.Sc and other science-based courses.",
  },
  {
    question: "Is MBBS Abroad possible after NEET?",
    answer:
      "MBBS Abroad can be considered after checking NEET qualification, Class 12 PCB eligibility, university recognition, course duration, internship, teaching language, local licence eligibility, WDOMS listing and current NMC/FMGL requirements.",
  },
  {
    question: "Should I repeat NEET or choose MBBS Abroad?",
    answer:
      "The choice depends on score, budget, academic readiness, willingness to study abroad, university quality, licensing plans and the realistic India counselling route. Students should compare both paths before paying any admission amount.",
  },
] as const;

const offices = [
  {
    name: "Bengaluru Headquarters",
    address: "Near Lalbagh Main Gate, Hosur Road, Bengaluru-27",
  },
  {
    name: "Kolkata Main Office",
    address:
      "MUMTAZ Campus, Kamrbari, Basina, Rajarhat-Newtown, Kolkata-135",
  },
  {
    name: "Mumbai R&D Branch",
    address: "M.A.K Azad Road, Sector 8B, Belapur, Mumbai - 400614",
  },
] as const;

const pathwayFields = [
  ["Likely India Route", "indiaRoute"],
  ["Abroad / Backup Route", "abroadBackup"],
  ["Budget Advice", "budgetAdvice"],
  ["Recommended Next Step", "nextStep"],
  ["Warning / Disclaimer", "warning"],
] as const;

export default function NeetPathwayGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "NEET Pathway Guide", url: "/neet-pathway-guide" },
          ]),
          buildFAQSchema([...faqs]),
        ]}
      />

      <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
        <Navbar />

        <section className="bg-[#061D3F] px-4 pb-12 pt-8 text-white sm:px-6 sm:pt-10 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#5EEAD4]">
              Score-wise counselling guidance
            </p>
            <h1 className="mt-3 max-w-5xl text-4xl font-extrabold tracking-normal md:text-6xl">
              NEET Pathway Guide for MBBS India, Abroad, BDS, AYUSH and Repeat
              Strategy
            </h1>
            <p className="mt-5 max-w-4xl text-base font-medium leading-8 text-slate-200 md:text-lg">
              This guide helps NEET-appeared students with Class 12 Science/PCB
              eligibility understand possible admission pathways based on NEET
              score, counselling route, category, domicile, budget and career
              goal. Students should verify the applicable PCB percentage,
              including minimum 50% requirements where relevant.
            </p>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-950">
              <strong>Guidance disclaimer:</strong> This is guidance only, not
              admission guarantee. Final admission depends on NEET rank,
              category, domicile, counselling round, official seat matrix,
              document eligibility, fee structure and updated rules of
              MCC/state counselling authorities.
            </div>

            <div className="mt-8 grid gap-5">
              {neetPathwayBands.map((band) => (
                <article
                  key={`${band.minScore}-${band.bandLabel}`}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0F4CFF]">
                    Score Band: {band.bandLabel}
                  </p>
                  <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
                    Pathway Headline
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold text-[#061D3F]">
                    {band.headline}
                  </h2>
                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    {pathwayFields.map(([label, field]) => (
                      <div
                        key={field}
                        className={`rounded-lg border p-4 ${
                          field === "warning"
                            ? "border-amber-200 bg-amber-50 lg:col-span-2"
                            : "border-slate-200 bg-[#F8FAFC]"
                        }`}
                      >
                        <h3 className="text-sm font-extrabold text-[#061D3F]">
                          {label}
                        </h3>
                        <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                          {band[field]}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-extrabold text-[#061D3F]">
              Continue your NEET and medical admission research
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                ["MBBS India", "/mbbs-india"],
                ["MBBS Abroad", "/mbbs-abroad"],
                ["Blogs", "/blogs"],
                ["Official Advisories", "/official-advisories"],
                ["Counselling Support", "/?counselling=open"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="group inline-flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm font-extrabold text-[#061D3F] transition hover:border-[#00C896]/60 hover:bg-white"
                >
                  {label}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-extrabold text-[#061D3F]">
              ILMALINK MEDIGO counselling support across India
            </h2>
            <p className="mt-3 max-w-4xl text-sm font-medium leading-7 text-slate-700">
              Students can request score, counselling, budget, MBBS India,
              MBBS Abroad, BDS, AYUSH, repeat-NEET and allied-health pathway
              guidance through ILMALINK MEDIGO contact points.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {offices.map((office) => (
                <article
                  key={office.name}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-extrabold text-[#061D3F]">
                    {office.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                    {office.address}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#047857]">
              NEET pathway FAQ
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#061D3F]">
              Common questions after NEET
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
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
