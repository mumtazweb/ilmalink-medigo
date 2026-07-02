import type { Metadata } from "next";
import Link from "next/link";

import {
  getKyrgyzUniversityBySlug,
  type KyrgyzUniversityPageData,
} from "../../../data/kyrgyzstanUniversities";

const ksmaUniversity = getKyrgyzUniversityBySlug("kyrgyz-state-medical-academy");

if (!ksmaUniversity) {
  throw new Error("KSMA university data is missing.");
}

const university: KyrgyzUniversityPageData = ksmaUniversity;

const counsellingHref =
  "/mbbs-abroad/kyrgyzstan/kyrgyz-state-medical-academy?counselling=open";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title:
    "Kyrgyz State Medical Academy Fee Structure 2026 | KSMA MBBS Admission | ilmaLink",
  description:
    "KSMA MBBS Admission for Indian Students with brochure-provided fee structure, admission requirements, documents, accreditation guidance, clinical training, facilities, and disclaimer.",
  keywords: [
    "Kyrgyz State Medical Academy Fee Structure 2026",
    "KSMA MBBS Admission for Indian Students",
    "Kyrgyz State Medical Academy",
    "KSMA Kyrgyzstan MBBS",
    "MBBS in Kyrgyzstan 2026",
  ],
  alternates: {
    canonical:
      "https://www.ilmalink.com/mbbs-abroad/kyrgyzstan/kyrgyz-state-medical-academy/",
  },
};

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

function SourceBadge() {
  return (
    <span className="inline-flex rounded-lg bg-[#ecfdf5] px-2.5 py-1 text-xs font-extrabold text-[#047857] ring-1 ring-emerald-200">
      Brochure-provided information
    </span>
  );
}

function Section({
  title,
  children,
  source = true,
}: {
  title: string;
  children: React.ReactNode;
  source?: boolean;
}) {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-extrabold tracking-normal text-[#031525] md:text-3xl">
            {title}
          </h2>
          {source ? <SourceBadge /> : null}
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
}

function CompactList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-700"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function FeeStructure({ data }: { data: KyrgyzUniversityPageData }) {
  return (
    <Section title="Kyrgyz State Medical Academy Fee Structure 2026">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-extrabold text-[#047857]">
            {data.intake} | Duration of course: As per NMC guidelines
          </p>
          <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
            Course includes clinical rotatory internship.
          </p>
        </div>
        <LetsConnectButton />
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[900px] border-separate border-spacing-0 overflow-hidden rounded-lg text-left text-sm">
          <thead>
            <tr className="bg-[#0b3158] text-white">
              {[
                "Fee Component",
                "Semester",
                "Tuition Fees ($)",
                "Hostel & Accommodation",
                "Mess ($)",
                "Total Cost ($)",
              ].map((heading) => (
                <th key={heading} className="px-4 py-3 font-extrabold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.feeRows.map((row, index) => (
              <tr
                key={`${row.year}-${row.semester}`}
                className={index % 2 === 0 ? "bg-slate-50" : "bg-white"}
              >
                <td className="px-4 py-3 font-extrabold text-slate-950">{row.year}</td>
                <td className="px-4 py-3 font-semibold text-slate-700">{row.semester}</td>
                <td className="px-4 py-3 font-semibold text-slate-700">{row.tuitionFee}</td>
                <td className="px-4 py-3 font-semibold text-slate-700">
                  {row.hostelAccommodation}
                </td>
                <td className="px-4 py-3 font-semibold text-slate-700">{row.mess}</td>
                <td className="px-4 py-3 font-extrabold text-[#047857]">{row.totalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {data.feeRows.map((row) => (
          <div
            key={`${row.year}-${row.semester}`}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-extrabold text-slate-950">{row.year}</h3>
              <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-600">
                {row.semester}
              </span>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase text-slate-500">Tuition</dt>
                <dd className="font-semibold text-slate-800">{row.tuitionFee}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase text-slate-500">Hostel</dt>
                <dd className="font-semibold text-slate-800">{row.hostelAccommodation}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase text-slate-500">Mess</dt>
                <dd className="font-semibold text-slate-800">{row.mess}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase text-slate-500">Total</dt>
                <dd className="font-extrabold text-[#047857]">{row.totalCost}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {data.additionalFees.map((fee) => (
          <div key={fee.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-extrabold uppercase text-slate-500">{fee.label}</p>
            <p className="mt-1 text-xl font-extrabold text-[#031525]">{fee.amount}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-extrabold text-[#031525]">Fee notes</h3>
          <ul className="mt-3 space-y-2 text-sm font-medium leading-6 text-slate-700">
            {data.feeNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-[#031525]">
            Fee payment terms and conditions
          </h3>
          <ul className="mt-3 space-y-2 text-sm font-medium leading-6 text-slate-700">
            {data.paymentTerms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function FactsGrid({ data }: { data: KyrgyzUniversityPageData }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {data.facts.map((fact) => (
        <div key={`${fact.label}-${fact.value}`} className="rounded-lg bg-slate-50 p-4">
          <p className="text-2xl font-extrabold text-[#047857]">{fact.value}</p>
          <p className="mt-1 text-xs font-bold uppercase leading-5 text-slate-500">
            {fact.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function KyrgyzStateMedicalAcademyPage() {
  const data = university;

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <CounsellingBridgeScript />

      <section className="bg-[#031525] px-4 pb-8 pt-28 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/mbbs-abroad/kyrgyzstan"
            className="inline-flex rounded-lg border border-white/15 px-3 py-2 text-xs font-extrabold text-slate-200 transition hover:border-[#00C896] hover:text-[#00C896]"
          >
            Explore other Kyrgyzstan universities
          </Link>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <SourceBadge />
              <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-normal md:text-5xl">
                Kyrgyz State Medical Academy (KSMA)
              </h1>
              <p className="mt-3 text-lg font-extrabold text-[#00C896]">
                KSMA MBBS Admission for Indian Students
              </p>
              <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-200 md:text-base">
                {data.program} | {data.location} | {data.intake}
              </p>
            </div>

            <div className="rounded-lg border border-[#00C896]/30 bg-white/10 p-5">
              <p className="text-xs font-extrabold uppercase text-[#00C896]">
                May 2026 state accreditation position:
              </p>
              <p className="mt-2 text-lg font-extrabold text-white">
                {data.accreditationStatus}
              </p>
              <p className="mt-4 text-xs font-extrabold uppercase text-[#00C896]">
                Recommendation:
              </p>
              <p className="mt-2 text-lg font-extrabold text-white">
                {data.recommendationLevel}
              </p>
              <p className="mt-4 text-sm font-medium leading-6 text-slate-200">
                The Kyrgyz Ministry of Health reported that KSMA was legally
                not subject to the May 2026 state accreditation procedure
                because of its special status. This is not a failed
                accreditation result. Students must still verify the exact
                medical program, course duration, internship structure, WDOMS
                listing, local licence eligibility, and NMC/FMGL compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FeeStructure data={data} />

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-extrabold tracking-normal text-[#031525]">
                Admission / Entry Requirements
              </h2>
              <SourceBadge />
            </div>
            <div className="mt-5">
              <CompactList items={data.entryRequirements} />
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-extrabold tracking-normal text-[#031525]">
                Required Documents
              </h2>
              <SourceBadge />
            </div>
            <div className="mt-5">
              <CompactList items={data.documentChecklist} />
            </div>
          </div>
        </div>
      </section>

      <Section title="About Program / University Overview">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4">
            <h3 className="text-lg font-extrabold text-[#031525]">About program</h3>
            <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
              The brochure describes training for the General Practitioner
              program. Training takes place at clinical bases of 56 departments
              with more than 500 staff involved. Graduates may undergo
              postgraduate training as general practitioners or choose narrow
              specialties such as therapist, surgeon, neuropathologist,
              obstetrician-gynecologist, traumatologist, otolaryngologist,
              oculist, oncologist and others.
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <h3 className="text-lg font-extrabold text-[#031525]">Mission</h3>
            <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
              KSMA&apos;s mission in the brochure is to enhance public health and
              improve quality of life by providing high-quality, continuous
              training for medical and pharmaceutical professionals through
              education, research, and clinical practice.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Course Highlights">
        <CompactList items={data.highlights} />
      </Section>

      <Section title="Facts and Figures">
        <FactsGrid data={data} />
      </Section>

      {data.fmgePerformance?.length ? (
        <Section title="Matched FMGE 2025 Data">
          <div className="grid gap-3 md:grid-cols-2">
            {data.fmgePerformance.map((item) => (
              <div key={item.sourceName} className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-extrabold uppercase text-slate-500">
                  FMGE source name
                </p>
                <h3 className="mt-1 text-base font-extrabold leading-6 text-[#031525]">
                  {item.sourceName}
                </h3>
                <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <dt className="text-xs font-bold uppercase text-slate-500">Appeared</dt>
                    <dd className="font-extrabold text-slate-800">
                      {item.appeared.toLocaleString("en-IN")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase text-slate-500">Passed</dt>
                    <dd className="font-extrabold text-slate-800">
                      {item.passed.toLocaleString("en-IN")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase text-slate-500">Pass rate</dt>
                    <dd className="font-extrabold text-[#047857]">{item.passRate}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium leading-6 text-slate-600">
            FMGE performance data is for reference only. It does not indicate
            NMC approval, university recognition, admission suitability, or
            current regulatory compliance.
          </p>
        </Section>
      ) : null}

      <Section title="Clinical Training / Hospitals / Academic Clinics">
        <div className="grid gap-3 md:grid-cols-2">
          {data.clinicalCenters?.map((center) => (
            <div key={center} className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm font-semibold leading-7 text-slate-700">{center}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Campus, Hostel, Mess, and Facilities">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <CompactList items={data.facilities} />
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <h3 className="text-lg font-extrabold text-[#031525]">
              Hostel and mess note
            </h3>
            <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
              The brochure shows hostel rooms, study spaces, Indian food, gym,
              sports ground, campus buildings, and mess facilities. It also
              states that hostel stay is compulsory for the 1st and 2nd
              semester and must be paid before arriving in the destination
              country.
            </p>
          </div>
        </div>
      </Section>

      <Section title="History / Recognition / Memberships">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-3">
            {data.history.map((item) => (
              <div key={`${item.year}-${item.text}`} className="rounded-lg bg-slate-50 p-4">
                <p className="text-xl font-extrabold text-[#047857]">{item.year}</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <h3 className="text-lg font-extrabold text-[#031525]">
              International cooperation
            </h3>
            <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
              The brochure states that KSMA has partners across CIS countries,
              South Korea, Japan, India, Pakistan, Saudi Arabia, Turkey, the
              United Kingdom and EU states including Poland, Germany, France,
              Spain, Romania, Lithuania and Finland. It mentions Erasmus+
              mobility, joint scientific and capacity-building projects, and
              interaction with international organizations such as the World
              Federation of Medical Education, European Association of Medical
              Education AMEE, International Association of Universities and
              others.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "168 interinstitutional agreements",
                "Partners from 30 countries",
                "Membership in 12 international organizations",
                "3744 international students from 26 countries",
                "200 outgoing academic mobilities of students and staff",
                "KSMA ranked 1st among medical institutions of the country and recognized by IAAR in the brochure.",
              ].map((item) => (
                <p key={item} className="rounded-lg bg-white px-3 py-2 text-sm font-bold text-slate-700">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Student Life">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "5 student organizations",
              "8 creative clubs",
              "35 scientific clubs",
              "Sport events",
              "Annual ceremonial events",
              "Volunteering",
            ].map((item) => (
              <p key={item} className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                {item}
              </p>
            ))}
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-medium leading-7 text-slate-700">
              The brochure describes student life at KSMA as a friendly,
              educational, and motivating environment where students organize
              creative events, charity evenings and fairs. It mentions students
              from 27 countries, annual scientific and practical Olympiads,
              pediatrician games, sports competitions, international education
              and sports participation, creative clubs, dance groups, ensembles,
              vocal collectives, and events such as Dedication to students,
              Golden Mean, Mr. and Miss KSMA, and solemn graduation parties.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Current Students / FMGE Passed Examples">
        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-extrabold text-[#031525]">
              Some of Our Current Students
            </h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {data.studentExamples?.map((student) => (
                <p key={student} className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">
                  {student}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#031525]">
              Some of Our FMGE Passed Students
            </h3>
            <div className="mt-3 grid gap-2">
              {data.fmgePassedExamples?.map((student) => (
                <p key={student} className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">
                  {student}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <section className="px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-normal text-[#031525]">
              Disclaimer
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
              Fee, accreditation, recognition, course duration, internship,
              English medium instruction, WDOMS listing, local licence
              eligibility, and NMC/FMGL compliance may change. Students must
              verify the latest official university and regulatory information
              before admission.
            </p>
          </div>
          <div className="rounded-lg border border-[#00C896]/30 bg-[#05233d] p-5 text-white shadow-[0_14px_40px_rgba(0,0,0,0.16)]">
            <h2 className="text-2xl font-extrabold tracking-normal">
              Need help choosing a suitable Kyrgyzstan MBBS university?
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-200">
              Our counsellors can help you compare accreditation status, fees,
              course duration, internship, English medium, WDOMS listing, local
              licence eligibility, and NMC/FMGL compliance before admission.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <LetsConnectButton />
              <Link
                href="/mbbs-abroad/kyrgyzstan"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 px-4 py-2.5 text-sm font-extrabold text-white transition hover:border-[#00C896] hover:text-[#00C896]"
              >
                Explore other Kyrgyzstan universities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



