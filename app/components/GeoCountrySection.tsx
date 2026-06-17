import CountryFactTable from "./CountryFactTable";
import GeoAnswerBox from "./GeoAnswerBox";
import JsonLd from "./JsonLd";
import TrustNote from "./TrustNote";
import { buildCountryFaqs, getCountryGeoFact } from "../data/geo";
import {
  buildBreadcrumbSchema,
  buildCountryMedicalEducationSchema,
  buildFAQSchema,
} from "../lib/schema";

type GeoCountrySectionProps = {
  countryName: string;
};

export default function GeoCountrySection({
  countryName,
}: GeoCountrySectionProps) {
  const country = getCountryGeoFact(countryName);

  if (!country) {
    return null;
  }

  const faqs = buildCountryFaqs(country);
  const summary = `MBBS in ${country.countryName} should be shortlisted only after checking eligibility, NEET status, university recognition, course duration, WDOMS listing, medium of instruction and licensing pathway. ILMALINK MEDIGO's internal country dataset lists ${country.wdomsCount} WDOMS medical school entries for ${country.countryName}. ${country.eligibilitySummary} ${country.licensingNote}`;

  return (
    <section className="overflow-x-hidden bg-[#F8FAFC] px-4 py-12 text-slate-950 sm:px-6 lg:px-8">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "MBBS Abroad", url: "/mbbs-abroad" },
            {
              name: `MBBS in ${country.countryName}`,
              url: `/mbbs-abroad/${country.slug}`,
            },
          ]),
          buildFAQSchema(faqs),
          buildCountryMedicalEducationSchema(country),
        ]}
      />

      <div className="mx-auto grid max-w-7xl gap-6">
        <GeoAnswerBox
          title={`Is ${country.countryName} a suitable MBBS abroad option?`}
          summary={summary}
          facts={[
            {
              label: "WDOMS entries",
              value: `${country.wdomsCount} listed entries`,
            },
            { label: "Duration", value: country.duration },
            { label: "Medium", value: country.medium },
            {
              label: "NEET rule",
              value: country.neetRequirementForIndianStudents,
            },
          ]}
          sourceNote="WDOMS counts are maintained in ILMALINK MEDIGO's internal country dataset for student shortlisting. Students should verify each university name, recognition status and licensing pathway before admission."
        />

        <CountryFactTable
          countryName={country.countryName}
          wdomsCount={country.wdomsCount}
          duration={country.duration}
          medium={country.medium}
          neetRequirementForIndianStudents={
            country.neetRequirementForIndianStudents
          }
          licensingNote={country.licensingNote}
          eligibilitySummary={country.eligibilitySummary}
          keyAdmissionPoints={country.keyAdmissionPoints}
          importantWarning={country.importantWarning}
        />

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0F4CFF]">
            Student FAQ
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-normal text-[#081B35] md:text-3xl">
            Frequently asked questions about MBBS in {country.countryName}
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
        </section>

        <TrustNote
          whatThisPageHelpsWith={[
            `Checking basic MBBS eligibility for ${country.countryName}.`,
            "Understanding NEET, WDOMS, course duration and medium of instruction.",
            "Shortlisting universities before paying application or booking fees.",
            "Preparing questions for counselling, documents, visa and licensing review.",
          ]}
        />
      </div>
    </section>
  );
}
