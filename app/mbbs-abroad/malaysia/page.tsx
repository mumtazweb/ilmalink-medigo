import type { Metadata } from "next";

import Navbar from "../../components/navbar";
import VerificationCounsellingCard from "../../components/VerificationCounsellingCard";

const pageUrl = "https://www.ilmalink.com/mbbs-abroad/malaysia/";

export const metadata: Metadata = {
  title: "MBBS in Malaysia | Eligibility, Costs, NMC/FMGL Caution | ILMALINK MEDIGO",
  description:
    "Study MBBS in Malaysia with a verification-first approach for NEET eligibility, NMC/FMGL compliance, WDOMS caution, fee and living-cost planning.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "MBBS in Malaysia | ILMALINK MEDIGO",
    description:
      "Malaysia MBBS overview with NEET, NMC/FMGL, WDOMS caution and verification guidance for Indian students.",
    url: pageUrl,
    type: "website",
  },
};

const pageFaqs = [
  {
    question: "Is NEET required for Indian students planning MBBS in Malaysia?",
    answer:
      "Indian students planning to return to India for licensing should verify and satisfy current NEET and applicable Indian regulatory requirements before admission.",
  },
  {
    question: "Is WDOMS listing equal to approval?",
    answer:
      "No. WDOMS listing is a reference listing and is not the same as approval. Students must verify current NMC/FMGL compliance and official recognition requirements.",
  },
  {
    question: "Are fees and living costs fixed for all universities in Malaysia?",
    answer:
      "No. Tuition and living costs vary by university, city, intake and year. Students should verify official fee documents and payment terms before applying.",
  },
];

export default function MalaysiaPage() {
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
        name: "MBBS Abroad",
        item: "https://www.ilmalink.com/mbbs-abroad/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "MBBS in Malaysia",
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pageFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="bg-black text-white">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black px-6 pb-20 pt-8 text-white sm:pt-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl">
              Study MBBS in Malaysia
            </h1>

            <p className="mx-auto max-w-4xl text-xl leading-9 text-gray-300">
              Malaysia offers modern infrastructure, globally connected universities, advanced
              healthcare systems and an international academic environment for medical students.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-sm">
            <h2 className="mb-8 text-3xl font-bold text-blue-300">Why Students Consider Malaysia</h2>

            <div className="grid gap-8 text-lg leading-8 text-gray-300 md:grid-cols-2">
              <div className="space-y-5">
                <p>✅ English-medium medical education</p>
                <p>✅ Advanced hospitals and modern medical facilities</p>
                <p>✅ International student-friendly environment</p>
                <p>✅ Safe and developed urban lifestyle</p>
              </div>

              <div className="space-y-5">
                <p>✅ Exposure to multicultural healthcare systems</p>
                <p>✅ Strong infrastructure and transport systems</p>
                <p>✅ International collaborations in some universities</p>
                <p>✅ Globally recognized academic ecosystem</p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-lg font-bold text-cyan-200">Program and cost planning</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Duration, medium of instruction, tuition, living costs and admission timelines vary
                  by university and year. Students should verify official documents before applying.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <h3 className="text-lg font-bold text-cyan-200">Compliance-first shortlisting</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Indian students should confirm NEET status, NMC/FMGL fit, internship structure,
                  local licence pathway and latest official recognition updates before payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-6 pb-20 text-white">
        <div className="mx-auto max-w-7xl rounded-3xl border-2 border-red-500/40 bg-red-500/10 p-8 shadow-[0_0_40px_rgba(239,68,68,0.12)]">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20 text-3xl">
              ⚠️
            </div>

            <div>
              <h2 className="text-4xl font-bold text-red-300">Important NMC Alert for Indian Students</h2>
              <p className="mt-2 text-red-200">Please read carefully before taking MBBS admission in Malaysia.</p>
            </div>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              While Malaysia offers internationally recognized medical universities and modern
              infrastructure, Indian students must carefully verify NMC Foreign Medical Graduate
              Regulations before admission.
            </p>

            <p className="font-semibold text-red-200">
              WDOMS listing alone is not the same as approval. Students must verify current NMC/FMGL
              compliance, eligibility, course structure and licensing requirements.
            </p>

            <ul className="space-y-4">
              <li>❌ Some universities may not fulfill same-country internship requirements</li>
              <li>❌ Certain programs may not match the required 54-month academic duration</li>
              <li>❌ Twinning or transfer models can create FMGL/NMC eligibility complications</li>
              <li>❌ Clinical rotations outside the primary university country may affect eligibility</li>
              <li>❌ NMC recognition status and compliance may change over time</li>
            </ul>

            <div className="mt-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
              <h3 className="mb-4 text-2xl font-bold text-yellow-300">Our Honest Guidance</h3>

              <p className="leading-8 text-gray-300">
                Students aiming to practice medicine in India should strongly verify the latest
                NMC/FMGL compliance directly before taking admission. Choosing a university solely
                based on low fees or advertisements can create future licensing risks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <VerificationCounsellingCard
        countryName="Malaysia MBBS"
        title="Check Malaysia MBBS eligibility with ILMALINK"
        buttonLabel="Get Malaysia MBBS Counselling"
      />
    </main>
  );
}
