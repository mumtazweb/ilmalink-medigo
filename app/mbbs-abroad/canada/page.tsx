export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in Canada 2026 | MCAT FMGE Exempt Medical Pathway",

  description:
    "Study MBBS in Canada for Indian students with globally respected medical universities, MCAT entrance exam, advanced healthcare training and FMGE exemption opportunities.",

  keywords: [
    "MBBS in Canada",
    "Study medicine in Canada",
    "MCAT Canada",
    "Canada medical universities",
    "FMGE exempt countries",
    "MD in Canada",
    "Indian students MBBS Canada",
    "Medical study abroad",
  ],
};

const universities = [
  {
    name: "University of Toronto",
    city: "Toronto",
    fees: "₹35–55 Lakhs/year",
  },

  {
    name: "McGill University",
    city: "Montreal",
    fees: "₹30–50 Lakhs/year",
  },

  {
    name: "University of British Columbia",
    city: "Vancouver",
    fees: "₹35–55 Lakhs/year",
  },

  {
    name: "McMaster University",
    city: "Hamilton",
    fees: "₹30–45 Lakhs/year",
  },

  {
    name: "University of Alberta",
    city: "Edmonton",
    fees: "₹25–40 Lakhs/year",
  },

  {
    name: "Queen’s University",
    city: "Kingston",
    fees: "₹30–45 Lakhs/year",
  },
];

export default function CanadaPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS / MD in Canada

          </h1>

          <p className="text-lg text-gray-300 max-w-4xl leading-8">

            Canada offers globally respected medical education with
            advanced healthcare systems, research-focused universities
            and high-quality clinical training. However, medical admission
            in Canada is extremely competitive for international students.

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

                Canada medical admission is extremely difficult for international students.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 leading-8 text-lg">

            <p>

              Canada has one of the world’s most selective medical
              admission systems with very limited seats available for
              international students.

            </p>

            <ul className="space-y-4">

              <li>
                ❌ Most universities require a pre-med Bachelor’s degree
              </li>

              <li>
                ❌ MCAT entrance examination is mandatory in many universities
              </li>

              <li>
                ❌ Admission competition is extremely high
              </li>

              <li>
                ❌ Tuition and living expenses are very expensive
              </li>

              <li>
                ❌ Residency opportunities for international students are limited
              </li>

              <li>
                ❌ Canadian student visa approval requires strong financial proof
              </li>

              <li>
                ❌ Total medical pathway duration may extend to 8–11+ years
              </li>

            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-green-300 mb-4">

                Major Advantage

              </h3>

              <p className="text-gray-300 leading-8">

                Properly licensed Canadian medical graduates may qualify
                for FMGE exemption pathways under current Indian NMC
                regulations.

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

              Admission Requirements

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>✔ Excellent academic profile required</li>

              <li>✔ Pre-med Bachelor’s degree often necessary</li>

              <li>✔ MCAT entrance examination</li>

              <li>✔ IELTS / TOEFL English proficiency</li>

              <li>✔ Strong research & extracurricular profile</li>

              <li>✔ Financial documentation for visa process</li>

            </ul>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Estimated Expenses

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>💰 Pre-Med Tuition: ₹15–35 Lakhs/year</li>

              <li>💰 MD Tuition: ₹30–55 Lakhs/year</li>

              <li>🏠 Living Cost: ₹10–20 Lakhs/year</li>

              <li>📚 Total Duration: 8–11+ Years</li>

              <li>📈 Total Estimated Cost: ₹2.5–4+ Crores</li>

            </ul>

          </div>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Top Medical Universities in Canada

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

                  💰 Estimated Fees: {uni.fees}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* MCAT */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-8">

            What is MCAT?

          </h2>

          <p className="text-gray-300 leading-8 text-lg mb-6">

            MCAT (Medical College Admission Test) is the entrance exam
            used by many Canadian medical schools for MD admissions.

          </p>

          <ul className="space-y-5 text-gray-300 leading-8">

            <li>
              ✔ Conducted by AAMC
            </li>

            <li>
              ✔ Tests biology, chemistry and reasoning skills
            </li>

            <li>
              ✔ Extremely competitive for international students
            </li>

            <li>
              ✔ High MCAT scores improve admission chances
            </li>

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

                Is FMGE required after medical study in Canada?

              </h3>

              <p className="text-gray-300 leading-7">

                Properly licensed Canadian medical graduates may qualify
                for FMGE exemption pathways according to current NMC rules.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Can Indian students directly enter MBBS in Canada after Class 12?

              </h3>

              <p className="text-gray-300 leading-7">

                Usually no. Most Canadian medical schools require a
                pre-med or bachelor’s degree before MD admission.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}