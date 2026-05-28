export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in UK 2026 | UCAT BMAT GMC Recognized Medical Universities",

  description:
    "Study MBBS in UK for Indian students with globally recognized medical universities, NHS clinical exposure, UCAT/BMAT entrance exams and possible FMGE exemption pathways.",

  keywords: [
    "MBBS in UK",
    "Study medicine in UK",
    "UCAT",
    "BMAT",
    "GMC recognized universities",
    "FMGE exempt countries",
    "MBBS abroad UK",
    "UK medical universities",
    "Indian students UK MBBS",
  ],
};

const universities = [
  {
    name: "University of Oxford",
    city: "Oxford",
    fees: "₹45–60 Lakhs/year",
  },

  {
    name: "University of Cambridge",
    city: "Cambridge",
    fees: "₹45–58 Lakhs/year",
  },

  {
    name: "King’s College London",
    city: "London",
    fees: "₹40–55 Lakhs/year",
  },

  {
    name: "Imperial College London",
    city: "London",
    fees: "₹45–60 Lakhs/year",
  },

  {
    name: "University College London (UCL)",
    city: "London",
    fees: "₹40–55 Lakhs/year",
  },

  {
    name: "University of Edinburgh",
    city: "Edinburgh",
    fees: "₹38–50 Lakhs/year",
  },
];

export default function UKPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in United Kingdom (UK)

          </h1>

          <p className="text-lg text-gray-300 max-w-4xl leading-8">

            The United Kingdom offers some of the world’s most prestigious
            medical universities with NHS clinical exposure, research-based
            education and globally respected medical qualifications.
            However, admission is highly competitive and extremely expensive
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

                UK medical admission is extremely competitive and financially demanding.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 leading-8 text-lg">

            <p>

              UK medical schools maintain some of the highest admission
              standards globally. International students face intense
              competition for limited seats.

            </p>

            <ul className="space-y-4">

              <li>
                ❌ Tuition fees are often significantly higher than Indian private medical colleges
              </li>

              <li>
                ❌ UK student visa approval requires strong financial documentation
              </li>

              <li>
                ❌ Living expenses in cities like London are extremely high
              </li>

              <li>
                ❌ UCAT or BMAT entrance exams are usually required
              </li>

              <li>
                ❌ Academic requirements are extremely competitive
              </li>

              <li>
                ❌ MBBS duration generally extends to 5–6 years
              </li>

              <li>
                ❌ Additional UK Foundation Programme training may be required for UK practice
              </li>

            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-green-300 mb-4">

                Major Advantage

              </h3>

              <p className="text-gray-300 leading-8">

                Graduates from GMC-recognized UK medical universities may
                qualify for FMGE exemption pathways if they obtain proper
                licensing and complete required medical registration
                procedures according to current NMC regulations.

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

              <li>✔ Excellent PCB academic scores</li>

              <li>✔ NEET qualification for Indian students</li>

              <li>✔ UCAT or BMAT entrance examination</li>

              <li>✔ IELTS / TOEFL English proficiency</li>

              <li>✔ Strong SOP & interview performance</li>

              <li>✔ Financial proof for visa process</li>

            </ul>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Estimated Expenses

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>💰 Tuition: ₹35–60 Lakhs/year</li>

              <li>🏠 Living Cost: ₹12–20 Lakhs/year</li>

              <li>📚 Course Duration: 5–6 Years</li>

              <li>✈️ Visa + Insurance + NHS Costs Extra</li>

              <li>📈 Total Estimated Cost: ₹2.5–4+ Crores</li>

            </ul>

          </div>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Top Medical Universities in UK

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

            UCAT & BMAT Entrance Exams

          </h2>

          <p className="text-gray-300 leading-8 text-lg mb-6">

            Most UK medical universities require international students
            to qualify entrance examinations like UCAT or BMAT before
            medical admission.

          </p>

          <ul className="space-y-5 text-gray-300 leading-8">

            <li>
              ✔ UCAT = University Clinical Aptitude Test
            </li>

            <li>
              ✔ BMAT = BioMedical Admissions Test
            </li>

            <li>
              ✔ Used for medical school selection in many UK universities
            </li>

            <li>
              ✔ Tests reasoning, problem solving and decision making
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

                Is FMGE required after MBBS in UK?

              </h3>

              <p className="text-gray-300 leading-7">

                Certain UK medical qualification pathways may qualify
                for FMGE exemption according to current NMC regulations
                if proper licensing and registration requirements are fulfilled.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is MBBS in UK expensive?

              </h3>

              <p className="text-gray-300 leading-7">

                Yes. Total medical education costs in the UK are among
                the highest globally for international students.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}