export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in Tajikistan 2026 | Affordable MBBS Abroad | ILMALINK MEDIGO",

  description:
    "Study MBBS in Tajikistan for Indian students with affordable tuition fees, English-medium medical education, growing Indian student community and NMC guideline awareness.",

  keywords: [
    "MBBS in Tajikistan",
    "Study medicine in Tajikistan",
    "Tajikistan medical universities",
    "MBBS abroad Tajikistan",
    "Indian students MBBS Tajikistan",
    "Avicenna Tajik State Medical University",
    "Affordable MBBS abroad",
    "NMC guidelines Tajikistan",
  ],
};

const universities = [
  {
    name: "Avicenna Tajik State Medical University",
    city: "Dushanbe",
    fees: "₹18–30 Lakhs Total",
  },

  {
    name: "Tajik National University",
    city: "Dushanbe",
    fees: "₹16–28 Lakhs Total",
  },

  {
    name: "Medical-Social Institute of Tajikistan",
    city: "Dushanbe",
    fees: "₹18–26 Lakhs Total",
  },
];

export default function TajikistanPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in Tajikistan

          </h1>

          <p className="text-lg text-gray-300 max-w-4xl leading-8">

            Tajikistan is becoming a growing low-cost MBBS abroad option
            for Indian students due to affordable tuition fees,
            English-medium medical programs and relatively lower living expenses.

          </p>

        </div>

      </section>

      {/* ALERT */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-yellow-500/10 border-2 border-yellow-500/40 rounded-3xl p-8 shadow-[0_0_40px_rgba(234,179,8,0.12)]">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center text-3xl">

              ⚠️

            </div>

            <div>

              <h2 className="text-4xl font-bold text-yellow-300">

                Important NMC & Infrastructure Alert

              </h2>

              <p className="text-yellow-200 mt-2">

                Students should carefully verify university quality and NMC compliance.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 leading-8 text-lg">

            <ul className="space-y-4">

              <li>
                ⚠️ Tajikistan is still a developing MBBS destination compared to Russia or Georgia
              </li>

              <li>
                ⚠️ Infrastructure and hospital exposure quality may differ significantly between universities
              </li>

              <li>
                ⚠️ Students should independently verify current NMC/FMGL compliance
              </li>

              <li>
                ⚠️ Licensing and internship eligibility should be confirmed carefully
              </li>

              <li>
                ⚠️ Limited direct international flight connectivity may create travel difficulties
              </li>

              <li>
                ⚠️ Winters can be cold in several regions
              </li>

            </ul>

            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-red-300 mb-4">

                Admission Caution

              </h3>

              <p className="text-gray-300 leading-8">

                Students should avoid choosing universities only based
                on very low fees or aggressive agent marketing. Clinical
                exposure, teaching quality and NMC alignment are extremely important.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* GOOD POINTS */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-green-500/10 border border-green-500/30 rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-8 text-green-300">

            Advantages of MBBS in Tajikistan

          </h2>

          <ul className="space-y-5 text-gray-300 leading-8 text-lg">

            <li>
              ✔ Affordable tuition fees and living costs
            </li>

            <li>
              ✔ English-medium medical programs available
            </li>

            <li>
              ✔ Lower competition compared to many countries
            </li>

            <li>
              ✔ WHO/WDOMS listed universities available
            </li>

            <li>
              ✔ Growing Indian student community
            </li>

            <li>
              ✔ Simplified admission process in many universities
            </li>

          </ul>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Popular Medical Universities in Tajikistan

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

      {/* NMC */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-8">

            NMC Guidelines for MBBS Abroad

          </h2>

          <ul className="space-y-5 text-gray-300 leading-8 text-lg">

            <li>
              ✔ NEET qualification mandatory for Indian students
            </li>

            <li>
              ✔ Course duration should comply with FMGL regulations
            </li>

            <li>
              ✔ Internship requirements must be fulfilled properly
            </li>

            <li>
              ✔ Students should verify registration eligibility in Tajikistan
            </li>

            <li>
              ✔ FMGE/NExT qualification required for Indian practice
            </li>

          </ul>

        </div>

      </section>

      {/* EXPENSES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Estimated Expenses

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>💰 Tuition Fees: ₹16–30 Lakhs Total</li>

              <li>🏠 Hostel & Living: ₹8k–20k/month</li>

              <li>📚 Course Duration: 5–6 Years</li>

              <li>✈️ Visa & Travel Costs Extra</li>

              <li>🍛 Indian food available in major cities</li>

            </ul>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Admission Requirements

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>✔ NEET qualification mandatory</li>

              <li>✔ Minimum PCB eligibility criteria</li>

              <li>✔ English-medium MBBS available</li>

              <li>✔ Student visa required</li>

              <li>✔ No IELTS/TOEFL in many universities</li>

            </ul>

          </div>

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

                Is MBBS in Tajikistan valid in India?

              </h3>

              <p className="text-gray-300 leading-7">

                Students must verify whether their university and course
                structure fully comply with current NMC/FMGL regulations.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is Tajikistan good for Indian students?

              </h3>

              <p className="text-gray-300 leading-7">

                Tajikistan can be a low-cost option for MBBS abroad,
                but students should carefully evaluate university quality,
                infrastructure and clinical exposure before admission.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}