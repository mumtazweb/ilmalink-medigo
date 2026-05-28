export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in Uzbekistan 2026 | NMC Alert & Medical Universities Guide",

  description:
    "Study MBBS in Uzbekistan for Indian students with affordable tuition fees, English-medium medical education, growing infrastructure and important NMC advisory updates.",

  keywords: [
    "MBBS in Uzbekistan",
    "Study medicine in Uzbekistan",
    "Uzbekistan medical universities",
    "NMC alert Uzbekistan",
    "MBBS abroad Uzbekistan",
    "Indian students MBBS Uzbekistan",
    "Tashkent Medical Academy",
    "Samarkand State Medical University",
    "Affordable MBBS abroad",
  ],
};

const universities = [
  {
    name: "Tashkent Medical Academy",
    city: "Tashkent",
    fees: "₹20–35 Lakhs Total",
  },

  {
    name: "Samarkand State Medical University",
    city: "Samarkand",
    fees: "₹22–38 Lakhs Total",
  },

  {
    name: "Bukhara State Medical Institute",
    city: "Bukhara",
    fees: "₹20–34 Lakhs Total",
  },

  {
    name: "Andijan State Medical Institute",
    city: "Andijan",
    fees: "₹18–30 Lakhs Total",
  },

  {
    name: "Tashkent Pediatric Medical Institute",
    city: "Tashkent",
    fees: "₹20–32 Lakhs Total",
  },

  {
    name: "Fergana Medical Institute of Public Health",
    city: "Fergana",
    fees: "₹18–28 Lakhs Total",
  },
];

export default function UzbekistanPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in Uzbekistan

          </h1>

          <p className="text-lg text-gray-300 max-w-4xl leading-8">

            Uzbekistan has rapidly become one of the most discussed MBBS
            abroad destinations for Indian students due to affordable fees,
            English-medium medical programs, modern infrastructure and
            simplified admission processes.

          </p>

        </div>

      </section>

      {/* MAIN ALERT */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-red-500/10 border-2 border-red-500/40 rounded-3xl p-8 shadow-[0_0_40px_rgba(239,68,68,0.12)]">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center text-3xl">

              ⚠️

            </div>

            <div>

              <h2 className="text-4xl font-bold text-red-300">

                Important Government & NMC Alert

              </h2>

              <p className="text-red-200 mt-2">

                Indian students should carefully verify universities before admission.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 leading-8 text-lg">

            <p>

              In 2026, the National Medical Commission (NMC) and Indian
              Embassy advisories raised concerns regarding certain medical
              institutions in Uzbekistan over compliance, admission practices
              and quality-control issues.

            </p>

            <ul className="space-y-4">

              <li>
                ⚠️ NMC issued multiple advisories regarding some Uzbekistan medical colleges
              </li>

              <li>
                ⚠️ Concerns were raised about English-medium teaching consistency
              </li>

              <li>
                ⚠️ Some institutions reportedly lacked proper clinical exposure
              </li>

              <li>
                ⚠️ Excessive student intake and agent-driven admissions were highlighted
              </li>

              <li>
                ⚠️ Students should independently verify internship and FMGL compliance
              </li>

              <li>
                ⚠️ Some colleges allegedly provided misleading marketing claims
              </li>

            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-yellow-300 mb-4">

                Important Clarification

              </h3>

              <p className="text-gray-300 leading-8">

                The recent NMC advisories are not a complete ban on MBBS
                in Uzbekistan. However, students must carefully choose
                properly structured and compliant universities.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* GOOD SIDE */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-green-500/10 border border-green-500/30 rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-8 text-green-300">

            Positive Side of MBBS in Uzbekistan

          </h2>

          <ul className="space-y-5 text-gray-300 leading-8 text-lg">

            <li>
              ✔ Affordable tuition fees compared to many countries
            </li>

            <li>
              ✔ English-medium MBBS programs available
            </li>

            <li>
              ✔ Modern infrastructure developing rapidly
            </li>

            <li>
              ✔ Growing Indian student community
            </li>

            <li>
              ✔ WHO/WDOMS listed universities available
            </li>

            <li>
              ✔ Simplified admission process in many universities
            </li>

            <li>
              ✔ Lower living costs compared to Europe
            </li>

          </ul>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Popular Medical Universities in Uzbekistan

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

            NMC Guidelines for Indian Students

          </h2>

          <ul className="space-y-5 text-gray-300 leading-8 text-lg">

            <li>
              ✔ Minimum 54 months academic duration required
            </li>

            <li>
              ✔ 12-month internship mandatory
            </li>

            <li>
              ✔ Entire course should be fully English medium
            </li>

            <li>
              ✔ Internship should generally be completed in same country
            </li>

            <li>
              ✔ FMGE/NExT qualification mandatory for Indian practice
            </li>

            <li>
              ✔ Students must verify registration eligibility in Uzbekistan
            </li>

          </ul>

        </div>

      </section>

      {/* AGENT WARNING */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-yellow-500/10 border border-yellow-500/30 rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-8 text-yellow-300">

            Agent & Admission Scam Warning

          </h2>

          <ul className="space-y-5 text-gray-300 leading-8 text-lg">

            <li>
              ⚠️ Avoid universities promising “No NEET Required”
            </li>

            <li>
              ⚠️ Verify university infrastructure independently
            </li>

            <li>
              ⚠️ Confirm hospital attachment and clinical exposure
            </li>

            <li>
              ⚠️ Do not rely only on agent-provided screenshots or rankings
            </li>

            <li>
              ⚠️ Check official university and embassy information directly
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

              <li>💰 Tuition Fees: ₹18–38 Lakhs Total</li>

              <li>🏠 Hostel & Living: ₹10k–22k/month</li>

              <li>📚 Course Duration: 6 Years</li>

              <li>✈️ Visa & Travel Extra</li>

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

              <li>✔ IELTS/TOEFL not required in many universities</li>

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

                Is MBBS in Uzbekistan valid in India?

              </h3>

              <p className="text-gray-300 leading-7">

                Yes, if the university fully complies with current
                NMC/FMGL regulations including English-medium teaching,
                internship and licensing eligibility.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is Uzbekistan good for Indian students?

              </h3>

              <p className="text-gray-300 leading-7">

                Uzbekistan can be a good affordable option if students
                choose properly verified and compliant universities.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}