import type { Metadata } from "next";

import {
  kyrgyzAccreditationStats,
  kyrgyzEvaluationCriteria,
  kyrgyzFinalDisclaimer,
  kyrgyzstanUniversities,
} from "../../data/kyrgyzstanUniversities";
import KyrgyzstanUniversityExplorer from "./KyrgyzstanUniversityExplorer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title:
    "MBBS in Kyrgyzstan 2026 | Medical University Accreditation Update | ILMALINK MEDIGO",
  description:
    "Study MBBS in Kyrgyzstan with 2026 accreditation guidance, recommendation badges, fee overview, NMC/FMGL compliance checklist, and university-wise counselling support.",
  keywords: [
    "MBBS in Kyrgyzstan 2026",
    "Kyrgyzstan Medical University Accreditation 2026",
    "Recommended Medical Universities in Kyrgyzstan for Indian Students",
    "Kyrgyzstan MBBS Fee Structure",
    "NMC FMGL Compliance Checklist for Kyrgyzstan MBBS",
    "Kyrgyz State Medical Academy Fee Structure 2026",
    "KSMA MBBS Admission for Indian Students",
  ],
  alternates: {
    canonical: "https://ilmalink.com/mbbs-abroad/kyrgyzstan",
  },
};

const counsellingHref = "/mbbs-abroad/kyrgyzstan?counselling=open";

function LetsConnectButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={counsellingHref}
      data-open-counselling
      className={`inline-flex items-center justify-center rounded-lg bg-[#00C896] px-4 py-2.5 text-sm font-extrabold text-[#042033] transition hover:bg-[#12dda9] ${className}`}
    >
      Let&apos;s Connect
    </a>
  );
}

function CounsellingBridgeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function () {
            if (window.__ilmalinkCounsellingBridge) return;
            window.__ilmalinkCounsellingBridge = true;
            document.addEventListener("click", function (event) {
              var target = event.target instanceof Element ? event.target.closest("[data-open-counselling]") : null;
              if (!target) return;
              event.preventDefault();
              window.dispatchEvent(new Event("ilmalink:open-counselling"));
            });
          })();
        `,
      }}
    />
  );
}

function GuidanceCta({
  title = "Need help choosing a suitable Kyrgyzstan MBBS university?",
}: {
  title?: string;
}) {
  return (
    <div className="rounded-lg border border-[#00C896]/30 bg-[#05233d] p-5 text-white shadow-[0_14px_40px_rgba(0,0,0,0.16)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-xl font-extrabold tracking-normal">{title}</h3>
          <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-200">
            Our counsellors can help you compare accreditation status, fees,
            course duration, internship, English medium, WDOMS listing, local
            licence eligibility, and NMC/FMGL compliance before admission.
          </p>
        </div>
        <LetsConnectButton className="shrink-0" />
      </div>
    </div>
  );
}

export default function KyrgyzstanPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <CounsellingBridgeScript />

      <section className="bg-[#031525] px-4 pb-12 pt-28 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-extrabold uppercase text-[#00C896]">
            MBBS Abroad Guidance
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-normal md:text-6xl">
            MBBS in Kyrgyzstan 2026
          </h1>
          <p className="mt-5 max-w-4xl text-base font-medium leading-7 text-slate-200 md:text-lg md:leading-8">
            Kyrgyzstan remains a popular MBBS abroad destination for Indian
            students because of affordable education pathways, English-medium
            options, established student communities, and accessible admission
            processes. The 2026 accreditation update now makes university
            shortlisting more transparent.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <p className="text-xs font-extrabold uppercase text-[#047857]">
              Kyrgyzstan Medical University Accreditation 2026
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-normal text-[#031525] md:text-4xl">
              Kyrgyzstan Medical University Accreditation Update 2026
            </h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-700 md:text-base">
              The Kyrgyz Ministry of Health summarized the results of state
              accreditation of medical educational institutions in May 2026,
              conducted in accordance with the presidential decree. This update
              helps students compare universities more transparently by looking
              at accreditation status, clinical facilities, faculty strength,
              infrastructure, and education quality indicators before admission.
            </p>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-700 md:text-base">
              The Kyrgyz Ministry of Health completed state accreditation of
              medical educational institutions in May 2026. Students can compare
              universities through clear guidance categories: Recommended, Not
              Recommended, and No Admission. Final shortlisting should include
              the latest accreditation position, course duration, internship
              structure, English medium, WDOMS listing, local licence eligibility,
              and NMC/FMGL compliance.
            </p>
            <div className="mt-5 rounded-lg border border-[#00C896]/30 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#031525]">
                Recommended Medical Universities in Kyrgyzstan for Indian Students
              </h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                Start with universities that have stronger official standing,
                long-term accreditation, or special government/official status.
                Universities with only 1-year
                conditional accreditation are not recommended as first-choice
                options. Institutions that did not pass accreditation or did not
                participate within the required deadline should not be considered
                for new admission unless fresh official clarification is issued.
              </p>
            </div>
          </div>

          <div className="grid content-start gap-3">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#031525]">
                Evaluation criteria
              </h3>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                State accreditation is based on:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {kyrgyzEvaluationCriteria.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-[#ecfdf5] px-3 py-1 text-xs font-extrabold text-[#047857]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <GuidanceCta title="Need help shortlisting Kyrgyzstan universities?" />
          </div>
        </div>

        <div className="mx-auto mt-6 grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {kyrgyzAccreditationStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-3xl font-extrabold text-[#031525]">{stat.value}</p>
              <p className="mt-1 text-xs font-bold uppercase text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <KyrgyzstanUniversityExplorer universities={kyrgyzstanUniversities} />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-emerald-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold tracking-normal text-[#031525] md:text-3xl">
            Why Kyrgyzstan remains a practical MBBS option
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Affordable MBBS pathways compared with many private medical college routes.",
              "English-medium programs are available in selected universities, subject to verification.",
              "A large Indian student community exists across major university destinations.",
              "FMGE/NExT preparation support may be available depending on the university and partner ecosystem.",
              "Admission is generally straightforward for eligible students with NEET qualification.",
              "Students can compare universities using the 2026 accreditation badge system above.",
            ].map((item) => (
              <p
                key={item}
                className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-700"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold tracking-normal text-[#031525] md:text-3xl">
            Climate, Travel, and Admission Support Planning
          </h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-extrabold text-[#031525]">
                Student comfort note
              </h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                Winters in Kyrgyzstan can be cold for Indian students, and
                travel schedules should be planned in advance. Many campuses and
                hostels are adapted for winter conditions, and hostel or mess
                facilities vary by university.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#031525]">
                Important admission guidance
              </h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                Kyrgyzstan has many medical education options and admission
                support channels. Students should verify university quality,
                hospital exposure, hostel facilities, English-medium delivery,
                fee terms, and post-admission support before confirming
                admission.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-[#031525] p-6 text-white shadow-sm">
          <h2 className="text-2xl font-extrabold tracking-normal md:text-3xl">
            NMC/FMGL Compliance Checklist for Kyrgyzstan MBBS
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Course duration and internship structure",
              "English medium instruction across academic and clinical phases",
              "WDOMS listing",
              "Local licence eligibility in the country of study",
              "Latest accreditation and recognition position",
              "University-wise fee structure and payment terms",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-white/10 p-4 text-sm font-semibold leading-6 text-slate-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-extrabold tracking-normal text-[#031525]">
            Frequently Asked Questions
          </h2>
          <div className="mt-5 grid gap-4">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#031525]">
                Is MBBS in Kyrgyzstan valid in India?
              </h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                Indian students should verify the latest NMC/FMGL rules,
                WDOMS listing, English medium, internship, local licence
                eligibility, and university recognition before admission.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#031525]">
                Which Kyrgyzstan medical universities are recommended in 2026?
              </h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                Start with 6-year accredited institutions and special-status
                institutions that require separate official verification.
                Conditional or unverified institutions should not be first-choice
                options unless fresh official clarification is available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-normal text-[#031525]">
              Final student guidance
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
              {kyrgyzFinalDisclaimer}
            </p>
          </div>
          <GuidanceCta />
        </div>
      </section>
    </main>
  );
}
