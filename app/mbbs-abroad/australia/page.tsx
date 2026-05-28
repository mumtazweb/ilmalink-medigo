export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in Australia 2026 | UCAT ANZ GAMSAT FMGE Exempt Pathway",

  description:
    "Study MBBS in Australia for Indian students with globally ranked universities, UCAT ANZ & GAMSAT entrance exams, advanced clinical training and FMGE exemption opportunities.",

  keywords: [
    "MBBS in Australia",
    "Study medicine in Australia",
    "UCAT ANZ",
    "GAMSAT",
    "Australia medical universities",
    "FMGE exempt countries",
    "MD in Australia",
    "Indian students MBBS Australia",
    "Medical study abroad",
  ],
};

const universities = [
  {
    name: "University of Melbourne",
    city: "Melbourne",
    fees: "₹40–60 Lakhs/year",
  },

  {
    name: "University of Sydney",
    city: "Sydney",
    fees: "₹40–55 Lakhs/year",
  },

  {
    name: "Monash University",
    city: "Melbourne",
    fees: "₹38–55 Lakhs/year",
  },

  {
    name: "University of Queensland",
    city: "Brisbane",
    fees: "₹35–50 Lakhs/year",
  },

  {
    name: "Australian National University",
    city: "Canberra",
    fees: "₹35–50 Lakhs/year",
  },

  {
    name: "University of New South Wales",
    city: "Sydney",
    fees: "₹40–55 Lakhs/year",
  },
];

export default function AustraliaPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS / MD in Australia

          </h1>

          <p className="text-lg text-gray-300 max-w-4xl leading-8">

            Australia offers world-class medical education with advanced
            hospital infrastructure, globally ranked universities and
            internationally recognized clinical training systems.
            However, medical admission is extremely competitive and
            financially demanding for international students.

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

                Australian medical admission is highly competitive and expensive.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 leading-8 text-lg">

            <p>

              Australia has one of the world’s most respected healthcare
              systems, but international medical admissions involve
              strict academic standards, entrance exams and high financial
              requirements.

            </p>

            <ul className="space-y-4">

              <li>
                ❌ Tuition fees are significantly higher than many Indian private medical colleges
              </li>

              <li>
                ❌ Living expenses in Australian cities are very high
              </li>

              <li>
                ❌ UCAT ANZ or GAMSAT entrance exams may be required
              </li>

              <li>
                ❌ Student visa approval requires strong financial proof
              </li>

              <li>
                ❌ Clinical training and residency competition is intense
              </li>

              <li>
                ❌ Total medical pathway duration may extend to 6–10+ years
              </li>

              <li>
                ❌ International student seats are limited in top universities
              </li>

            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-green-300 mb-4">

                Major Advantage

              </h3>

              <p className="text-gray-300 leading-8">

                Properly licensed Australian medical graduates may
                qualify for FMGE exemption pathways according to current
                Indian NMC regulations.

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

              <li>✔ Excellent PCB academic profile</li>

              <li>✔ NEET qualification for Indian students</li>

              <li>✔ UCAT ANZ or GAMSAT entrance exam</li>

              <li>✔ IELTS / TOEFL English proficiency</li>

              <li>✔ Interview and profile evaluation</li>

              <li>✔ Strong financial documentation for visa</li>

            </ul>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Estimated Expenses

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>💰 Tuition: ₹35–60 Lakhs/year</li>

              <li>🏠 Living Cost: ₹12–22 Lakhs/year</li>

              <li>📚 Course Duration: 5–7 Years</li>

              <li>✈️ Visa + Insurance + Travel Extra</li>

              <li>📈 Total Estimated Cost: ₹2.5–4+ Crores</li>

            </ul>

          </div>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Top Medical Universities in Australia

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

      {/* UCAT */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-8">

            UCAT ANZ & GAMSAT Entrance Exams

          </h2>

          <p className="text-gray-300 leading-8 text-lg mb-6">

            Australian medical universities commonly use entrance exams
            like UCAT ANZ and GAMSAT for selecting domestic and
            international medical students.

          </p>

          <ul className="space-y-5 text-gray-300 leading-8">

            <li>
              ✔ UCAT ANZ = Undergraduate medical aptitude test
            </li>

            <li>
              ✔ GAMSAT = Graduate-entry medical admissions test
            </li>

            <li>
              ✔ Tests reasoning, science and problem-solving abilities
            </li>

            <li>
              ✔ Strong scores improve admission chances significantly
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

                Is FMGE required after MBBS in Australia?

              </h3>

              <p className="text-gray-300 leading-7">

                Properly licensed Australian medical graduates may
                qualify for FMGE exemption pathways under current NMC rules.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is MBBS in Australia expensive?

              </h3>

              <p className="text-gray-300 leading-7">

                Yes. Australian medical education and living expenses
                are among the highest globally for international students.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}