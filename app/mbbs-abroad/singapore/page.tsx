export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in Singapore 2026 | Premium Asian Medical Education | ILMALINK MEDIGO",

  description:
    "Study MBBS in Singapore for Indian students with globally ranked universities, advanced healthcare infrastructure, research-focused medical education and international exposure.",

  keywords: [
    "MBBS in Singapore",
    "Study medicine in Singapore",
    "Singapore medical universities",
    "NUS medicine",
    "NTU medicine",
    "MBBS abroad Singapore",
    "Indian students MBBS Singapore",
    "Singapore medical colleges",
  ],
};

const universities = [
  {
    name: "National University of Singapore (NUS)",
    city: "Singapore",
    fees: "₹1.5 – ₹3+ Crores",
    note: "One of the best medical universities in Asia and globally ranked",
  },

  {
    name: "Nanyang Technological University (NTU) - Lee Kong Chian School of Medicine",
    city: "Singapore",
    fees: "₹1.5 – ₹3+ Crores",
    note: "Modern UK-linked medical school with strong research exposure",
  },

  {
    name: "Duke-NUS Medical School",
    city: "Singapore",
    fees: "₹2 – ₹4+ Crores",
    note: "American-affiliated graduate medical school linked with Duke University",
  },
];

export default function SingaporePage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in Singapore

          </h1>

          <p className="text-lg text-gray-300 max-w-5xl leading-8">

            Singapore offers one of the most advanced and prestigious
            medical education systems in Asia with globally ranked
            universities, cutting-edge hospitals, modern research
            facilities and extremely high academic standards. The country
            is internationally respected for healthcare quality, patient
            safety and medical innovation.

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

                Important Reality Check

              </h2>

              <p className="text-red-200 mt-2">

                Singapore medical admission is among the toughest in the world.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 text-lg leading-8">

            <ul className="space-y-4">

              <li>
                ⚠️ Extremely limited seats for international students
              </li>

              <li>
                ⚠️ Admission competition is exceptionally high
              </li>

              <li>
                ⚠️ Tuition fees and living expenses are extremely expensive
              </li>

              <li>
                ⚠️ Strong academic profile and interviews required
              </li>

              <li>
                ⚠️ International students may face limited scholarship opportunities
              </li>

              <li>
                ⚠️ Residency and long-term practice pathways can be competitive
              </li>

              <li>
                ⚠️ Students should independently verify NMC/FMGL compliance
              </li>

            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-yellow-300 mb-4">

                Important NMC Note

              </h3>

              <p className="text-gray-300 leading-8">

                Singapore has globally reputed medical universities,
                but Indian students should still independently verify
                current NMC/FMGL regulations including licensing,
                internship and eligibility pathways.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ADVANTAGES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-green-500/10 border border-green-500/30 rounded-3xl p-8">

          <h2 className="text-4xl font-bold text-green-300 mb-8">

            Major Advantages of MBBS in Singapore

          </h2>

          <ul className="space-y-5 text-gray-300 text-lg leading-8">

            <li>
              ✔ One of the best healthcare systems in the world
            </li>

            <li>
              ✔ Globally ranked and internationally respected universities
            </li>

            <li>
              ✔ Ultra-modern hospitals and clinical infrastructure
            </li>

            <li>
              ✔ Strong research and innovation opportunities
            </li>

            <li>
              ✔ International faculty and multicultural environment
            </li>

            <li>
              ✔ English-medium medical education
            </li>

            <li>
              ✔ High-quality lifestyle, safety and public infrastructure
            </li>

            <li>
              ✔ Strong global recognition for postgraduate opportunities
            </li>

          </ul>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Top Medical Universities in Singapore

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

                <p className="text-gray-300 mb-3">

                  💰 Estimated Cost: {uni.fees}

                </p>

                <p className="text-gray-400 leading-7">

                  {uni.note}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* COST */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Estimated Expenses

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>
                💰 Tuition Fees: ₹1.5 – ₹4+ Crores
              </li>

              <li>
                🏠 Living Cost: ₹50k – ₹2 Lakhs/month
              </li>

              <li>
                📚 Course Duration: 5–6+ Years
              </li>

              <li>
                ✈️ Visa + Insurance + Travel Extra
              </li>

              <li>
                🍛 Indian food easily available
              </li>

            </ul>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Admission Requirements

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>
                ✔ Extremely strong PCB academic profile required
              </li>

              <li>
                ✔ NEET qualification mandatory for Indian students
              </li>

              <li>
                ✔ IELTS/TOEFL generally required
              </li>

              <li>
                ✔ Interviews and profile evaluation common
              </li>

              <li>
                ✔ High extracurricular and research profile preferred
              </li>

              <li>
                ✔ Student visa and financial proof mandatory
              </li>

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

                Is MBBS in Singapore valid in India?

              </h3>

              <p className="text-gray-300 leading-7">

                Singapore has globally reputed medical universities,
                but Indian students should independently verify current
                NMC/FMGL regulations before admission.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is Singapore good for Indian medical students?

              </h3>

              <p className="text-gray-300 leading-7">

                Singapore offers world-class medical education and
                healthcare exposure, but admission competition and
                overall expenses are extremely high.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}