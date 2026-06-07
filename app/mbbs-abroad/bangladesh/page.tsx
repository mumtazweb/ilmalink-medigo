import VerificationCounsellingCard from "../../components/VerificationCounsellingCard";

export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in Bangladesh 2026 | Affordable SAARC Medical Education",

  description:
    "Study MBBS in Bangladesh for Indian students with NMC aligned medical colleges, SAARC fee benefits, English-medium education and Indian curriculum similarity.",

  keywords: [
    "MBBS in Bangladesh",
    "Study medicine in Bangladesh",
    "Bangladesh medical colleges",
    "SAARC MBBS",
    "NMC approved Bangladesh colleges",
    "MBBS abroad Bangladesh",
    "Indian students MBBS Bangladesh",
    "Affordable MBBS abroad",
  ],
};

const universities = [
  {
    name: "Dhaka National Medical College",
    city: "Dhaka",
    fees: "₹25–40 Lakhs Total",
  },

  {
    name: "Tairunnessa Memorial Medical College",
    city: "Gazipur",
    fees: "₹28–40 Lakhs Total",
  },

  {
    name: "Holy Family Red Crescent Medical College",
    city: "Dhaka",
    fees: "₹35–45 Lakhs Total",
  },

  {
    name: "Jahurul Islam Medical College",
    city: "Kishoreganj",
    fees: "₹30–40 Lakhs Total",
  },

  {
    name: "Anwer Khan Modern Medical College",
    city: "Dhaka",
    fees: "₹30–45 Lakhs Total",
  },

  {
    name: "Green Life Medical College",
    city: "Dhaka",
    fees: "₹35–45 Lakhs Total",
  },
];

export default function BangladeshPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in Bangladesh

          </h1>

          <p className="text-lg text-gray-300 max-w-4xl leading-8">

            Bangladesh has become one of the most preferred MBBS abroad
            destinations for Indian students due to cultural similarity,
            Indian-style curriculum, English-medium medical education
            and relatively affordable SAARC fee structures.

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

                Important Regional Situation Alert

              </h2>

              <p className="text-red-200 mt-2">

                Students should monitor the current political and regional environment carefully.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 leading-8 text-lg">

            <p>

              While Bangladesh remains a popular MBBS destination for
              Indian students, applicants should stay updated about
              evolving India-Bangladesh diplomatic relations and regional
              political developments.

            </p>

            <ul className="space-y-4">

              <li>
                ⚠️ India-Bangladesh political relations have experienced fluctuations recently
              </li>

              <li>
                ⚠️ Reports of growing anti-India sentiments in certain sections have raised concerns
              </li>

              <li>
                ⚠️ Students should regularly monitor embassy and government advisories
              </li>

              <li>
                ⚠️ Visa processing timelines and regional conditions may change unexpectedly
              </li>

              <li>
                ⚠️ Parents and students should prioritize safety, stability and verified institutions
              </li>

            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-yellow-300 mb-4">

                Our Honest Guidance

              </h3>

              <p className="text-gray-300 leading-8">

                Bangladesh still remains academically favorable for many
                Indian students due to curriculum familiarity and NMC
                aligned structures. However, students should carefully
                evaluate the latest regional developments before finalizing admission.

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
              Indian Curriculum Similarity
            </h2>

            <p className="text-gray-300 leading-7">
              Bangladesh follows a curriculum structure similar to India.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              SAARC Fee Benefits
            </h2>

            <p className="text-gray-300 leading-7">
              Indian students may receive lower SAARC-category tuition fees.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              NMC Alignment
            </h2>

            <p className="text-gray-300 leading-7">
              Many Bangladesh colleges generally follow NMC-compatible structures.
            </p>

          </div>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Popular Medical Colleges in Bangladesh

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

        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-8">

            Admission Requirements

          </h2>

          <ul className="space-y-5 text-gray-300 leading-8 text-lg">

            <li>
              ✔ NEET qualification mandatory for Indian students
            </li>

            <li>
              ✔ Minimum PCB eligibility criteria applicable
            </li>

            <li>
              ✔ English-medium MBBS programs available
            </li>

            <li>
              ✔ Valid passport and medical documentation required
            </li>

            <li>
              ✔ Student visa approval required before travel
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

                Is MBBS in Bangladesh valid in India?

              </h3>

              <p className="text-gray-300 leading-7">

                Many Bangladesh medical colleges generally follow
                NMC-compatible structures, but students should always
                verify current NMC regulations before admission.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is NEET compulsory for MBBS in Bangladesh?

              </h3>

              <p className="text-gray-300 leading-7">

                Yes. NEET qualification is mandatory for Indian students.

              </p>

            </div>

          </div>

        </div>

      </section>

    

      <VerificationCounsellingCard
        countryName="Bangladesh MBBS"
        title="Check Bangladesh MBBS eligibility with ILMALINK"
        buttonLabel="Get Bangladesh MBBS Counselling"
      />
</main>
  );
}