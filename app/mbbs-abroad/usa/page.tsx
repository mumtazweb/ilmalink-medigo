export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in USA 2026 | MCAT USMLE MD Pathway | ILMALINK MEDIGO",

  description:
    "Study MBBS in USA for Indian students with MCAT entrance exam, USMLE pathway, globally respected MD programs and possible FMGE exemption opportunities.",

  keywords: [
    "MBBS in USA",
    "Study medicine in USA",
    "MCAT",
    "USMLE",
    "MD in USA",
    "FMGE exempt countries",
    "USA medical universities",
    "Indian students MBBS USA",
    "Medical study abroad",
  ],
};

const universities = [
  {
    name: "Harvard Medical School",
    city: "Boston",
    fees: "₹45–65 Lakhs/year",
  },

  {
    name: "Johns Hopkins University",
    city: "Baltimore",
    fees: "₹45–60 Lakhs/year",
  },

  {
    name: "Stanford University School of Medicine",
    city: "California",
    fees: "₹50–65 Lakhs/year",
  },

  {
    name: "Yale School of Medicine",
    city: "Connecticut",
    fees: "₹40–55 Lakhs/year",
  },

  {
    name: "University of California San Francisco",
    city: "California",
    fees: "₹40–55 Lakhs/year",
  },

  {
    name: "Mayo Clinic Alix School of Medicine",
    city: "Minnesota",
    fees: "₹40–60 Lakhs/year",
  },
];

export default function USAPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS / MD in USA

          </h1>

          <p className="text-lg text-gray-300 max-w-4xl leading-8">

            The United States offers one of the world’s most advanced and
            prestigious medical education systems with cutting-edge research,
            top hospitals and globally respected MD degrees. However, the
            pathway is extremely long, competitive and financially demanding
            for international students.

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

                USA medical education is among the toughest and costliest pathways globally.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 leading-8 text-lg">

            <p>

              Unlike most countries, students generally cannot directly
              enter medical school in the USA after Class 12. The pathway
              usually includes a pre-med bachelor’s degree followed by
              MD admission.

            </p>

            <ul className="space-y-4">

              <li>
                ❌ Total pathway duration can extend to 8–12+ years
              </li>

              <li>
                ❌ MCAT entrance exam is extremely competitive
              </li>

              <li>
                ❌ USMLE licensing pathway is difficult and expensive
              </li>

              <li>
                ❌ Tuition fees are among the highest globally
              </li>

              <li>
                ❌ Student visa and immigration processes can be strict
              </li>

              <li>
                ❌ Residency match competition is extremely intense for international students
              </li>

              <li>
                ❌ Total medical education cost may exceed ₹3–5+ Crores
              </li>

            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-green-300 mb-4">

                Major Advantage

              </h3>

              <p className="text-gray-300 leading-8">

                Properly licensed US medical graduates may qualify for
                FMGE exemption pathways under current Indian NMC rules,
                eliminating the need for FMGE screening examination in India.

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

              <li>✔ Strong PCB academic background</li>

              <li>✔ Pre-med Bachelor’s Degree usually required</li>

              <li>✔ MCAT entrance examination</li>

              <li>✔ IELTS / TOEFL English proficiency</li>

              <li>✔ Excellent extracurricular & research profile</li>

              <li>✔ Strong financial documentation for visa</li>

            </ul>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Estimated Expenses

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>💰 Pre-Med Tuition: ₹20–45 Lakhs/year</li>

              <li>💰 MD Tuition: ₹35–65 Lakhs/year</li>

              <li>🏠 Living Cost: ₹12–25 Lakhs/year</li>

              <li>📚 Total Duration: 8–12+ Years</li>

              <li>📈 Total Estimated Cost: ₹3–5+ Crores</li>

            </ul>

          </div>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Top Medical Universities in USA

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

            MCAT (Medical College Admission Test) is the entrance
            examination used by most US medical schools for admission
            into MD programs.

          </p>

          <ul className="space-y-5 text-gray-300 leading-8">

            <li>
              ✔ Conducted by AAMC
            </li>

            <li>
              ✔ Tests biology, chemistry, psychology and reasoning
            </li>

            <li>
              ✔ Extremely competitive for international students
            </li>

            <li>
              ✔ High scores are essential for top universities
            </li>

          </ul>

        </div>

      </section>

      {/* USMLE */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-8">

            What is USMLE?

          </h2>

          <p className="text-gray-300 leading-8 text-lg mb-6">

            USMLE (United States Medical Licensing Examination) is the
            medical licensing pathway required for doctors seeking
            residency training and medical practice in the United States.

          </p>

          <ul className="space-y-5 text-gray-300 leading-8">

            <li>
              ✔ Step 1 – Basic medical sciences
            </li>

            <li>
              ✔ Step 2 CK – Clinical knowledge
            </li>

            <li>
              ✔ Step 3 – Medical licensing assessment
            </li>

            <li>
              ✔ Required for residency and licensing in USA
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

                Is FMGE required after medical study in USA?

              </h3>

              <p className="text-gray-300 leading-7">

                Properly licensed US medical graduates may qualify for
                FMGE exemption pathways under current NMC regulations.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Can Indian students directly study MBBS in USA after Class 12?

              </h3>

              <p className="text-gray-300 leading-7">

                Usually no. Most students first complete a pre-med
                bachelor’s degree before entering MD programs.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}