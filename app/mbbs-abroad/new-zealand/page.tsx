export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in New Zealand 2026 | FMGE Exempt Pathway | ilmaLink",

  description:
    "Study MBBS in New Zealand for Indian students with world-class universities, advanced clinical exposure, FMGE exemption possibilities and international medical career opportunities.",

  keywords: [
    "MBBS in New Zealand",
    "Study medicine in New Zealand",
    "FMGE exempt countries",
    "New Zealand medical universities",
    "UCAT ANZ",
    "MBBS abroad New Zealand",
    "University of Auckland MBBS",
    "University of Otago MBBS",
    "Medical study abroad",
  ],
};

const universities = [
  {
    name: "University of Auckland",
    city: "Auckland",
    fees: "₹28–35 Lakhs/year",
  },

  {
    name: "University of Otago",
    city: "Dunedin",
    fees: "₹25–32 Lakhs/year",
  },
];

export default function NewZealandPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in New Zealand

          </h1>

          <p className="text-lg text-gray-300 max-w-4xl leading-8">

            New Zealand offers globally respected medical education,
            advanced hospital training, premium research infrastructure
            and internationally recognized medical degrees. It is among
            the most prestigious but also most competitive destinations
            for Indian students pursuing medicine abroad.

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

                New Zealand MBBS admission is extremely competitive and expensive.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 leading-8 text-lg">

            <p>

              Medical admission in New Zealand is considered one of the
              toughest pathways globally for international students.
              Seats are extremely limited and selection standards are high.

            </p>

            <ul className="space-y-4">

              <li>
                ❌ Tuition fees are often higher than many Indian private medical colleges
              </li>

              <li>
                ❌ Visa approval and financial documentation process can be strict
              </li>

              <li>
                ❌ Living costs are significantly higher than most MBBS abroad destinations
              </li>

              <li>
                ❌ Admission competition is extremely intense
              </li>

              <li>
                ❌ UCAT ANZ entrance examination is usually required
              </li>

              <li>
                ❌ Strong English proficiency scores are mandatory
              </li>

            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-green-300 mb-4">

                Major Advantage

              </h3>

              <p className="text-gray-300 leading-8">

                Graduates from New Zealand medical systems may qualify
                for FMGE exemption pathways if they obtain proper medical
                licensing in New Zealand according to current Indian NMC
                regulations and exemption criteria.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ADMISSION */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Admission Requirements

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>✔ Excellent PCB academic scores required</li>

              <li>✔ NEET qualification mandatory for Indian students</li>

              <li>✔ UCAT ANZ entrance examination</li>

              <li>✔ IELTS / English proficiency requirements</li>

              <li>✔ Strong SOP and profile evaluation</li>

              <li>✔ Financial capability proof for visa</li>

            </ul>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Estimated Expenses

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>💰 Tuition: ₹25–35 Lakhs/year</li>

              <li>🏠 Living Cost: ₹10–18 Lakhs/year</li>

              <li>📚 Course Duration: 6 Years</li>

              <li>✈️ Visa + Insurance + Travel Extra</li>

              <li>📈 Total Estimated Cost: ₹2–3+ Crores</li>

            </ul>

          </div>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Top Medical Universities in New Zealand

          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            {universities.map((uni, index) => (

              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-blue-500 transition"
              >

                <h3 className="text-3xl font-semibold mb-4">

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

            What is UCAT ANZ?

          </h2>

          <p className="text-gray-300 leading-8 text-lg">

            UCAT ANZ (University Clinical Aptitude Test Australia &
            New Zealand) is an entrance examination used by many medical
            universities in Australia and New Zealand. It evaluates
            logical reasoning, decision making, problem solving and
            situational judgement skills required for medical education.

          </p>

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

                Is FMGE required after MBBS in New Zealand?

              </h3>

              <p className="text-gray-300 leading-7">

                Certain New Zealand medical qualification pathways may
                qualify for FMGE exemption if graduates obtain proper
                licensing in New Zealand according to current NMC rules.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is MBBS in New Zealand expensive?

              </h3>

              <p className="text-gray-300 leading-7">

                Yes. Total medical education costs in New Zealand can
                exceed many Indian private medical colleges.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}