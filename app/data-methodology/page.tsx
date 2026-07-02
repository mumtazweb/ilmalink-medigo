import type { Metadata } from "next";
import Navbar from "../components/navbar";

const pageUrl = "https://www.ilmalink.com/data-methodology/";

export const metadata: Metadata = {
  title: "Data Methodology | ilmaLink",
  description:
    "Understand how ilmaLink compiles country, university, seat and counselling statistics, and how to verify official eligibility and compliance.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Data Methodology | ilmaLink",
    description:
      "How ilmaLink compiles educational data and what students should verify before admission.",
    url: pageUrl,
    type: "article",
  },
};

export default function DataMethodologyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.ilmalink.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Data Methodology | ilmaLink",
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F5F8FC] text-[#0F172A]">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <section className="border-b border-[#0B2244]/15 bg-[#061733] px-4 py-9 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-black tracking-normal md:text-5xl">
            Data Methodology
          </h1>
          <p className="mt-4 max-w-4xl text-sm font-semibold leading-7 text-slate-200 md:text-base">
            This page explains how ilmaLink presents public-reference education data and
            internal counselling activity figures.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#081B35]">Public and regulatory data references</h2>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
              Country, university, college and seat figures are compiled for student information from
              publicly available official or regulatory sources.
            </p>
            <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
              Sources may include NMC, WDOMS, MCC, state counselling authorities and other competent
              public sources.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#081B35]">ilmaLink counselling activity figures</h2>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
              Application, offer-letter and visa figures, where shown, refer to ilmaLink internal
              counselling records and student-support activity.
            </p>
            <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
              These figures are informational and do not guarantee admission, visa approval,
              counselling result, seat allotment or any final outcome.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#081B35]">Important verification cautions</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-medium leading-7 text-slate-700">
              <li>WDOMS listing is not the same as approval.</li>
              <li>
                Indian students must verify NMC/FMGL compliance, eligibility, duration, internship,
                licence pathway and official rules before admission.
              </li>
              <li>
                Rules and recognition status may change; students should always verify current official
                documents before making payment.
              </li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}



