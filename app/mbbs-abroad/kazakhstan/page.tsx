export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in Kazakhstan 2026 | Affordable NMC Aligned MBBS Abroad",

  description:
    "Study MBBS in Kazakhstan for Indian students with affordable fees, English-medium education, NMC aligned universities and strong FMGE/NExT preparation pathways.",

  keywords: [
    "MBBS in Kazakhstan",
    "Study medicine in Kazakhstan",
    "Kazakhstan medical universities",
    "NMC approved Kazakhstan universities",
    "MBBS abroad Kazakhstan",
    "Indian students MBBS Kazakhstan",
    "Kazakh National Medical University",
    "Affordable MBBS abroad",
  ],
};

const universities = [
  {
    name: "Kazakh National Medical University",
    city: "Almaty",
    fees: "₹22–35 Lakhs Total",
  },

  {
    name: "Astana Medical University",
    city: "Astana",
    fees: "₹20–32 Lakhs Total",
  },

  {
    name: "South Kazakhstan Medical Academy",
    city: "Shymkent",
    fees: "₹18–30 Lakhs Total",
  },

  {
    name: "Semey Medical University",
    city: "Semey",
    fees: "₹18–28 Lakhs Total",
  },

  {
    name: "West Kazakhstan Marat Ospanov Medical University",
    city: "Aktobe",
    fees: "₹18–30 Lakhs Total",
  },

  {
    name: "Al-Farabi Kazakh National University",
    city: "Almaty",
    fees: "₹25–35 Lakhs Total",
  },
];

export default function KazakhstanPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in Kazakhstan

          </h1>

          <p className="text-lg text-gray-300 max-w-4xl leading-8">

            Kazakhstan is one of the most affordable and popular MBBS
            abroad destinations for Indian students due to low tuition
            fees, English-medium medical education, WHO-recognized
            universities and improving NMC/FMGL compliance structures.

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

                Important NMC & Licensing Alert

              </h2>

              <p className="text-yellow-200 mt-2">

                Students must carefully verify internship and licensing eligibility.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 leading-8 text-lg">

            <p>

              Kazakhstan remains among the top MBBS abroad destinations
              for Indian students, but applicants should carefully verify
              current NMC/FMGL compliance and host-country licensing rules
              before admission.

            </p>

            <ul className="space-y-4">

              <li>
                ⚠️ NMC requires 54+ months academic study + 12 months internship
              </li>

              <li>
                ⚠️ Internship must generally be completed in the same country/university
              </li>

              <li>
                ⚠️ Students must be eligible for medical registration/licensing in Kazakhstan
              </li>

              <li>
                ⚠️ Some universities may differ in internship or clinical exposure quality
              </li>

              <li>
                ⚠️ Students should independently verify WDOMS/NMC alignment before admission
              </li>

            </ul>

            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-red-300 mb-4">

                Licensing Requirement Alert

              </h3>

              <p className="text-gray-300 leading-8">

                Current NMC regulations require foreign graduates to be
                eligible for medical registration in the country where
                they studied. Kazakhstan may require graduates to clear
                local licensing or competency examinations for full
                registration eligibility.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* BENEFITS */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Affordable Fees
            </h2>

            <p className="text-gray-300 leading-7">
              MBBS costs are much lower than many Indian private medical colleges.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              English Medium
            </h2>

            <p className="text-gray-300 leading-7">
              Most universities offer complete English-medium MBBS programs.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Large Indian Student Community
            </h2>

            <p className="text-gray-300 leading-7">
              Kazakhstan hosts thousands of Indian medical students every year.
            </p>

          </div>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Top Medical Universities in Kazakhstan

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

      {/* REQUIREMENTS */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Admission Requirements

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>✔ NEET qualification mandatory</li>

              <li>✔ Minimum 50% PCB marks</li>

              <li>✔ No IELTS/TOEFL in many universities</li>

              <li>✔ English-medium MBBS programs available</li>

              <li>✔ Valid passport and student visa required</li>

            </ul>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Estimated Expenses

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>💰 Tuition Fees: ₹18–35 Lakhs Total</li>

              <li>🏠 Hostel & Living: ₹10k–22k/month</li>

              <li>📚 Course Duration: 5–6 Years</li>

              <li>✈️ Visa + Insurance Extra</li>

              <li>🍛 Indian food available in major universities</li>

            </ul>

          </div>

        </div>

      </section>

      {/* LICENSE */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-8">

            Kazakhstan Medical Licensing Information

          </h2>

          <p className="text-gray-300 leading-8 text-lg mb-8">

            According to Indian Embassy and Kazakhstan education guidance,
            graduates may need to clear local competency or licensing
            examinations for registration eligibility in Kazakhstan.

          </p>

          <ul className="space-y-5 text-gray-300 leading-8 text-lg">

            <li>
              ✔ Licensing exams may be conducted in English, Kazakh or Russian
            </li>

            <li>
              ✔ Registration eligibility is important for NMC compliance
            </li>

            <li>
              ✔ Students should verify latest licensing requirements directly
            </li>

            <li>
              ✔ Clinical exposure quality differs by university
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

                Is IELTS required for MBBS in Kazakhstan?

              </h3>

              <p className="text-gray-300 leading-7">

                Most Kazakhstan medical universities generally do not
                require IELTS or TOEFL for Indian students.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is MBBS in Kazakhstan valid in India?

              </h3>

              <p className="text-gray-300 leading-7">

                Yes, if the university and course structure comply with
                current NMC/FMGL regulations including internship and
                licensing eligibility requirements.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}