import type { Metadata } from "next";
import Link from "next/link";

import {
  getKyrgyzUniversityBySlug,
  type KyrgyzCampusData,
  type KyrgyzUniversityPageData,
} from "../../../data/kyrgyzstanUniversities";

const ihsmUniversity = getKyrgyzUniversityBySlug(
  "international-higher-school-of-medicine",
);

if (!ihsmUniversity) {
  throw new Error("IHSM university data is missing.");
}

const university: KyrgyzUniversityPageData = ihsmUniversity;
const campuses = university.campuses ?? [];
const counsellingHref =
  "/mbbs-abroad/kyrgyzstan/international-higher-school-of-medicine?counselling=open";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title:
    "International Higher School of Medicine Fee Structure 2026 | IHSM Kyrgyzstan MBBS | ILMALINK MEDIGO",
  description:
    "International Higher School of Medicine Kyrgyzstan two-campus MBBS guide with Central Campus and Elite Campus fee structure, accreditation, admission requirements, documents, facilities, and FMGE data.",
  keywords: [
    "International Higher School of Medicine",
    "IHSM Kyrgyzstan MBBS",
    "International Higher School of Medicine Fee Structure 2026",
    "IHSM Central Campus",
    "IHSM Elite Campus",
    "MBBS in Kyrgyzstan 2026",
    "Kyrgyzstan MBBS Fee Structure",
  ],
  alternates: {
    canonical:
      "https://ilmalink.com/mbbs-abroad/kyrgyzstan/international-higher-school-of-medicine",
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

function FactGrid({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {facts.map((fact) => (
        <div key={`${fact.label}-${fact.value}`} className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-extrabold uppercase text-slate-500">{fact.label}</p>
          <p className="mt-1 text-lg font-extrabold text-[#031525]">{fact.value}</p>
        </div>
      ))}
    </div>
  );
}

function FeeTable({ campus }: { campus: KyrgyzCampusData }) {
  return (
    <details
      open
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <summary className="cursor-pointer list-none">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-[#031525]">{campus.name}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              {campus.location} | {campus.address}
            </p>
          </div>
          <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800 ring-1 ring-emerald-200">
            {campus.intake}
          </span>
        </div>
      </summary>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[900px] border-separate border-spacing-0 overflow-hidden rounded-lg text-left text-sm">
          <thead>
            <tr className="bg-[#0b3158] text-white">
              {[
                "Fee Component",
                "Semester",
                "Tuition Fees ($)",
                "Hostel Fee",
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
            {campus.feeRows.map((row, index) => (
              <tr
                key={`${campus.name}-${row.year}-${row.semester}`}
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

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {campus.additionalFees.map((fee) => (
          <div key={`${campus.name}-${fee.label}`} className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-extrabold uppercase text-slate-500">{fee.label}</p>
            <p className="mt-1 text-xl font-extrabold text-[#031525]">{fee.amount}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <h4 className="text-lg font-extrabold text-[#031525]">Fee notes</h4>
          <ul className="mt-3 space-y-2 text-sm font-medium leading-6 text-slate-700">
            {campus.feeNotes.map((note) => (
              <li key={`${campus.name}-${note}`}>{note}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-extrabold text-[#031525]">
            Fee payment terms
          </h4>
          <ul className="mt-3 space-y-2 text-sm font-medium leading-6 text-slate-700">
            {campus.paymentTerms.map((term) => (
              <li key={`${campus.name}-${term}`}>{term}</li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  );
}

function CampusPanels({
  render,
}: {
  render: (campus: KyrgyzCampusData) => React.ReactNode;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {campuses.map((campus) => (
        <div key={campus.name} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-lg font-extrabold text-[#031525]">{campus.name}</h3>
          <p className="mt-1 text-sm font-bold text-slate-500">{campus.location}</p>
          <div className="mt-3">{render(campus)}</div>
        </div>
      ))}
    </div>
  );
}

export default function InternationalHigherSchoolOfMedicinePage() {
  const sharedFacts = university.facts;
  const sharedHighlights = Array.from(
    new Set(campuses.flatMap((campus) => campus.highlights)),
  );
  const sharedFacilities = Array.from(
    new Set(campuses.flatMap((campus) => campus.facilities)),
  );
  const clinicalCenters = Array.from(
    new Set(campuses.flatMap((campus) => campus.clinicalCenters ?? [])),
  );

  return (
    <main className="bg-[#f5f8fb] text-slate-900">
      <CounsellingBridgeScript />

      <section className="bg-[#031525] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/mbbs-abroad/kyrgyzstan"
            className="text-sm font-extrabold text-[#00C896] hover:text-white"
          >
            Explore other Kyrgyzstan universities
          </Link>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800">
                  {university.accreditationLabel}
                </span>
                <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800">
                  {university.recommendationLevel}
                </span>
                <SourceBadge />
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-normal md:text-5xl">
                International Higher School of Medicine
              </h1>
              <p className="mt-3 max-w-4xl text-base font-semibold leading-7 text-slate-200">
                IHSM offers the MD Program (MBBS) 2026-2027 across two
                brochure-provided campus options: Central Campus in Bishkek and
                Elite Campus in Issyk-Kul / Cholpon-Ata.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <LetsConnectButton />
                <Link
                  href="/mbbs-abroad/kyrgyzstan#universities"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2.5 text-sm font-extrabold text-white transition hover:border-[#00C896] hover:text-[#00C896]"
                >
                  Back to Kyrgyzstan overview
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/10 p-5">
              <h2 className="text-lg font-extrabold">
                2026 Kyrgyz Ministry of Health Accreditation Status
              </h2>
              <p className="mt-2 text-2xl font-extrabold text-[#00C896]">
                {university.accreditationStatus}
              </p>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-200">
                Recommended for consideration, subject to latest NMC/FMGL,
                WDOMS, course duration, internship, English medium, local
                licence eligibility, and fee verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section title="International Higher School of Medicine Fee Structure 2026-2027">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-extrabold text-[#047857]">
              Kyrgyzstan MBBS Fee Structure | Campus-wise brochure tables
            </p>
            <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
              Central and Elite fee structures are different. Amounts below are
              preserved from the uploaded brochures without calculated totals.
            </p>
          </div>
          <LetsConnectButton />
        </div>
        <div className="grid gap-4">
          {campuses.map((campus) => (
            <FeeTable key={campus.name} campus={campus} />
          ))}
        </div>
      </Section>

      <Section title="IHSM MBBS Admission for Indian Students">
        <CampusPanels
          render={(campus) => <CompactList items={campus.entryRequirements} />}
        />
      </Section>

      <Section title="Required Documents">
        <CampusPanels
          render={(campus) => <CompactList items={campus.documentChecklist} />}
        />
      </Section>

      <Section title="About Program / University Overview">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <FactGrid facts={sharedFacts} />
          <div className="rounded-lg bg-slate-50 p-5">
            <h3 className="text-xl font-extrabold text-[#031525]">
              MD Program (MBBS) - General Medicine
            </h3>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
              The brochure describes IHSM as established by a special
              resolution of the Kyrgyz Government in 2003. It describes the
              English medium undergraduate General Medicine program as a 5.5
              year program for foreign citizens with basic 12-year education.
            </p>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
              The brochure states that IHSM uses up-to-date educational
              technologies, integration and module-based training, and a credit
              hours system. Students should verify current official recognition,
              WDOMS listing, local licence eligibility, internship structure,
              and NMC/FMGL compliance before admission.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Course Highlights">
        <CompactList items={sharedHighlights} />
      </Section>

      <Section title="Clinical Training / Hospitals / Academic Clinics">
        <CompactList items={clinicalCenters} />
      </Section>

      <Section title="Campus, Hostel, Mess, and Facilities">
        <div className="grid gap-4 lg:grid-cols-2">
          {campuses.map((campus) => (
            <div key={campus.name} className="rounded-lg bg-slate-50 p-4">
              <h3 className="text-lg font-extrabold text-[#031525]">
                {campus.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                {campus.address}
              </p>
              <div className="mt-3">
                <CompactList items={campus.facilities} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-extrabold text-[#031525]">
            Shared facilities mentioned in brochures
          </h3>
          <div className="mt-3">
            <CompactList items={sharedFacilities} />
          </div>
        </div>
      </Section>

      <Section title="History / Recognition / Memberships">
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-extrabold text-[#031525]">History</h3>
            <div className="mt-3 grid gap-3">
              {university.history.map((item) => (
                <div key={`${item.year}-${item.text}`} className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-extrabold uppercase text-slate-500">
                    {item.year}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#031525]">
              Recognition and listings shown in brochure
            </h3>
            <CompactList
              items={[
                "Official state educational institution with the license of the Ministry of Education and Science of the Kyrgyz Republic to conduct training in General Medicine.",
                "Official license No.LD 170000949.",
                "Brochure lists WHO, WFME, FAIMER, WDOMS, ORPHEUR, AMEE, AMSE, IFMSA, APQN, and AMSA.",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section title="Student Life">
        <div className="rounded-lg bg-slate-50 p-5">
          <p className="text-sm font-medium leading-7 text-slate-700">
            The brochure describes sports and leisure facilities, sports areas,
            theatres, libraries, internet rooms, cultural and organizational
            activities, excursions to museums, sightseeing in Kyrgyzstan, theatre
            visits, trips to the mountains, hostel accommodation, internet
            access, and security support.
          </p>
        </div>
      </Section>

      <Section title="Current Students / FMGE Passed Examples">
        <div className="grid gap-4 lg:grid-cols-2">
          {campuses.map((campus) => (
            <div key={`${campus.name}-students`} className="rounded-lg bg-slate-50 p-4">
              <h3 className="text-lg font-extrabold text-[#031525]">
                {campus.name}
              </h3>
              <div className="mt-4">
                <h4 className="text-sm font-extrabold uppercase text-slate-500">
                  Current student examples
                </h4>
                <CompactList items={campus.studentExamples ?? []} />
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-extrabold uppercase text-slate-500">
                  FMGE passed examples
                </h4>
                <CompactList items={campus.fmgePassedExamples ?? []} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Matched FMGE Data" source={false}>
        {university.fmgePerformance?.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {university.fmgePerformance.map((item) => (
              <div key={item.sourceName} className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-extrabold uppercase text-slate-500">
                  {item.sourceName}
                </p>
                <p className="mt-2 text-2xl font-extrabold text-[#031525]">
                  {item.passRate}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {item.appeared.toLocaleString("en-IN")} appeared,{" "}
                  {item.passed.toLocaleString("en-IN")} passed
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm font-semibold text-slate-600">
            FMGE data match: To be updated.
          </p>
        )}
        <p className="mt-4 text-sm font-medium leading-6 text-slate-600">
          FMGE performance data is for reference only and does not indicate
          approval, recognition, or admission suitability.
        </p>
      </Section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-[#00C896]/30 bg-[#031525] p-6 text-white shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-extrabold tracking-normal md:text-3xl">
                Need help choosing a suitable Kyrgyzstan MBBS university?
              </h2>
              <p className="mt-3 max-w-4xl text-sm font-medium leading-7 text-slate-200">
                Our counsellors can help you compare accreditation status, fees,
                course duration, internship, English medium, WDOMS listing,
                local licence eligibility, and NMC/FMGL compliance before
                admission.
              </p>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-300">
                {university.disclaimer}
              </p>
            </div>
            <LetsConnectButton />
          </div>
        </div>
      </section>
    </main>
  );
}
