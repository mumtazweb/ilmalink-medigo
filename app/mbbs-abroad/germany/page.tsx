import VerificationCounsellingCard from "../../components/VerificationCounsellingCard";

export const dynamic = "force-static";

export const metadata = {
  title:
    "Study Medicine in Germany 2026 for Indian Students | WDOMS & NMC/FMGL Checks",

  description:
    "Explore medical study in Germany for Indian students with 48 WDOMS-listed medical schools, admission route guidance, language and eligibility checks, NMC/FMGL rule review and ilmalink service-line counselling support under ilmalink.",

  keywords: [
    "Study medicine in Germany",
    "MBBS equivalent in Germany",
    "Germany medical universities",
    "WDOMS listed medical schools Germany",
    "NMC FMGL checks Germany",
    "DAAD medicine Germany",
    "Indian students medicine Germany",
    "medical study abroad Germany",
  ],
};

const universities = [
  {
    name: "Charite - Universitaetsmedizin Berlin",
    city: "Berlin",
    fees: "Verify official semester contribution and tuition",
  },

  {
    name: "Heidelberg University Faculty of Medicine",
    city: "Heidelberg",
    fees: "Verify official university fee rules",
  },

  {
    name: "Ludwig Maximilian University of Munich",
    city: "Munich",
    fees: "Verify official semester and living costs",
  },

  {
    name: "Technical University of Munich",
    city: "Munich",
    fees: "Verify official medicine admission route",
  },

  {
    name: "University of Freiburg Faculty of Medicine",
    city: "Freiburg",
    fees: "Verify official admission and language rules",
  },

  {
    name: "University of Hamburg Faculty of Medicine",
    city: "Hamburg",
    fees: "Verify official degree and licensing pathway",
  },
];

export default function GermanyPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study Medicine in Germany 2026 for Indian Students

          </h1>

          <p className="text-lg text-gray-300 max-w-5xl leading-8">

            Germany has 48 WDOMS-listed medical schools to review, but it is
            not a simple direct MBBS route like some abroad destinations.
            Indian students must understand admission restrictions, German
            language expectations, host-country recognition, clinical training,
            licensing pathway and NMC/FMGL rules before applying.

          </p>

        </div>

      </section>

      {/* ALERT */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-red-500/10 border-2 border-red-500/40 rounded-3xl p-8 shadow-[0_0_40px_rgba(239,68,68,0.12)]">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center text-3xl">

              ⚠️

            </div>

            <div>

              <h2 className="text-4xl font-bold text-red-300">

                Important Reality Check for Indian Students

              </h2>

              <p className="text-red-200 mt-2">

                Germany medical admission is regulated, language-heavy and highly competitive.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 leading-8 text-lg">

            <p>

              Germany can be a strong medical education route for suitable
              students, but it requires careful planning. DAAD and official
              university requirements should be checked for admission,
              language, documentation and application pathway.

            </p>

            <ul className="space-y-4">

              <li>
                ⚠️ Medicine in Germany is not usually a simple direct MBBS admission route
              </li>

              <li>
                ⚠️ Strong German language ability may be important for study and clinical training
              </li>

              <li>
                ⚠️ Admission restrictions and selection processes must be checked carefully
              </li>

              <li>
                ⚠️ WDOMS listing is a directory check, not an approval claim
              </li>

              <li>
                ⚠️ Indian students must verify NMC/FMGL rules before admission
              </li>

              <li>
                ⚠️ Licensing, internship and clinical pathway details should be reviewed before choosing a route
              </li>

            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-yellow-300 mb-4">

                Route Guidance

              </h3>

              <p className="text-gray-300 leading-8">

                ilmalink, an extension/service line of ilmalink, can help students compare Germany with other
                MBBS abroad routes, review documents, check WDOMS listing,
                verify university-wise language requirements and plan NMC/FMGL
                eligibility questions before applying.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* REQUIREMENTS */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Admission Route Checks

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>✔ School qualification and eligibility review</li>

              <li>✔ DAAD and official university admission requirement check</li>

              <li>✔ German language requirement verification</li>

              <li>✔ WDOMS listing and host-country recognition check</li>

              <li>✔ NMC/FMGL rule review for Indian students</li>

              <li>✔ Licensing pathway and clinical training comparison</li>

            </ul>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Estimated Expenses

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>💰 Semester Fee Guidance: ₹ 5L/Semester</li>

              <li>🏠 Living Cost: verify city-wise</li>

              <li>📚 Course Duration: verify official medicine pathway</li>

              <li>✈️ Visa + Insurance + Travel Extra</li>

              <li>📄 Translations, certifications and application fees may apply</li>

            </ul>

          </div>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Medical Universities to Verify in Germany

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {universities.map((uni, index) => (

              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-blue-500 transition"
              >

                <h3 className="text-2xl font-semibold mb-4">

                  {uni.name}

                </h3>

                <p className="text-gray-300 mb-3">

                  📍 {uni.city}

                </p>

                <p className="text-gray-300">

                  💰 {uni.fees}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* WDOMS */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-8">

            WDOMS and NMC/FMGL Verification

          </h2>

          <p className="text-gray-300 leading-8 text-lg mb-6">

            Germany has 48 WDOMS-listed medical schools for listing checks.
            Students should treat WDOMS as a directory reference and verify
            official university status, degree structure, medium of instruction,
            internship, clinical training and host-country licence eligibility
            before making an admission decision.

          </p>

          <ul className="space-y-5 text-gray-300 leading-8">

            <li>✔ Confirm the exact medicine route and degree structure</li>

            <li>✔ Verify German or English instruction requirements university-wise</li>

            <li>✔ Check whether the pathway fits current Indian NMC/FMGL rules</li>

            <li>✔ Review documents, translation and application process early</li>

          </ul>

        </div>

      </section>

      {/* FAQ */}
      <section className="px-6 pb-24">

        <div className="max-w-5xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Frequently Asked Questions

          </h2>

          <div className="space-y-8">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is Germany a direct MBBS route after Class 12?

              </h3>

              <p className="text-gray-300 leading-7">

                Germany is not usually a simple direct MBBS-style route.
                Students must verify school qualification equivalence,
                admission restrictions, language requirements and the official
                medicine pathway before applying.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Can Indian students practice in India after medical study in Germany?

              </h3>

              <p className="text-gray-300 leading-7">

                That depends on whether the specific degree route, duration,
                internship, language structure and host-country licensing
                pathway satisfy current NMC/FMGL requirements. Students should
                verify this before admission.

              </p>

            </div>

          </div>

        </div>

      </section>

      <VerificationCounsellingCard
        countryName="Germany Medicine"
        title="Check Germany medical study route with ilmaLink"
        buttonLabel="Get Germany Counselling"
      />
    </main>
  );
}
