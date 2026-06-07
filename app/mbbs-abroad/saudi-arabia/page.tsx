import VerificationCounsellingCard from "../../components/VerificationCounsellingCard";

export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in Saudi Arabia 2026 | Gulf Medical Universities | ILMALINK MEDIGO",

  description:
    "Study MBBS in Saudi Arabia for Indian students with premium Gulf medical universities, advanced hospitals, strong clinical exposure and modern healthcare infrastructure.",

  keywords: [
    "MBBS in Saudi Arabia",
    "Study medicine in Saudi Arabia",
    "Saudi Arabia medical universities",
    "MBBS abroad Saudi Arabia",
    "Indian students MBBS Saudi Arabia",
    "King Saud University",
    "Alfaisal University",
    "Saudi medical colleges",
  ],
};

const universities = [
  {
    name: "King Saud University",
    city: "Riyadh",
    fees: "₹60 Lakhs – ₹1.2 Crores+",
    note: "Most prestigious government medical university in Saudi Arabia",
  },

  {
    name: "King Abdulaziz University",
    city: "Jeddah",
    fees: "₹50 Lakhs – ₹1 Crore+",
    note: "Strong clinical exposure and research infrastructure",
  },

  {
    name: "Alfaisal University",
    city: "Riyadh",
    fees: "₹80 Lakhs – ₹1.5 Crores+",
    note: "Modern private medical university with advanced international standards",
  },

  {
    name: "Imam Abdulrahman Bin Faisal University",
    city: "Dammam",
    fees: "₹45 Lakhs – ₹90 Lakhs+",
    note: "Recognized Gulf medical institution with strong hospital training",
  },

  {
    name: "Umm Al-Qura University",
    city: "Makkah",
    fees: "₹40 Lakhs – ₹80 Lakhs+",
    note: "Known for growing medical education infrastructure",
  },

  {
    name: "Taibah University",
    city: "Madinah",
    fees: "₹35 Lakhs – ₹70 Lakhs+",
    note: "Affordable government-linked medical university",
  },
];

export default function SaudiArabiaPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in Saudi Arabia

          </h1>

          <p className="text-lg text-gray-300 max-w-5xl leading-8">

            Saudi Arabia offers premium Gulf-standard medical education
            with highly advanced hospitals, modern healthcare systems,
            international infrastructure and globally respected universities.
            The country is known for strong clinical exposure, advanced
            hospital technology and excellent patient care systems.

          </p>

        </div>

      </section>

      {/* ALERT */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-yellow-500/10 border-2 border-yellow-500/40 rounded-3xl p-8">

          <h2 className="text-4xl font-bold text-yellow-300 mb-8">

            Important Reality Check

          </h2>

          <ul className="space-y-5 text-gray-300 text-lg leading-8">

            <li>
              ⚠️ MBBS seats for international students are very limited
            </li>

            <li>
              ⚠️ Admission competition is extremely high
            </li>

            <li>
              ⚠️ Arabic language becomes important during clinical interaction
            </li>

            <li>
              ⚠️ Tuition and living costs are expensive
            </li>

            <li>
              ⚠️ Licensing and residency pathways can be strict
            </li>

            <li>
              ⚠️ NMC/FMGL eligibility should be independently verified
            </li>

            <li>
              ⚠️ Some universities require strong academic profiles and interviews
            </li>

          </ul>

        </div>

      </section>

      {/* ADVANTAGES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-green-500/10 border border-green-500/30 rounded-3xl p-8">

          <h2 className="text-4xl font-bold text-green-300 mb-8">

            Advantages of MBBS in Saudi Arabia

          </h2>

          <ul className="space-y-5 text-gray-300 text-lg leading-8">

            <li>
              ✔ Advanced Gulf-standard healthcare infrastructure
            </li>

            <li>
              ✔ Strong hospital and patient exposure
            </li>

            <li>
              ✔ Globally respected universities
            </li>

            <li>
              ✔ Excellent safety and lifestyle standards
            </li>

            <li>
              ✔ Modern research and laboratory facilities
            </li>

            <li>
              ✔ High-quality hostel and campus environment
            </li>

            <li>
              ✔ Strong postgraduate opportunities in Gulf countries
            </li>

          </ul>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Top Medical Universities in Saudi Arabia

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
                💰 Tuition Fees: ₹35 Lakhs – ₹1.5 Crores+
              </li>

              <li>
                🏠 Living Cost: ₹20k – ₹80k/month
              </li>

              <li>
                📚 Course Duration: 5–6 Years
              </li>

              <li>
                ✈️ Visa + Insurance + Travel Extra
              </li>

              <li>
                🍛 Indian food available in major cities
              </li>

            </ul>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Admission Requirements

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>
                ✔ NEET qualification mandatory for Indian students
              </li>

              <li>
                ✔ Strong PCB academic profile preferred
              </li>

              <li>
                ✔ IELTS/English proficiency may be required
              </li>

              <li>
                ✔ Student visa mandatory
              </li>

              <li>
                ✔ Interviews and profile evaluation common
              </li>

            </ul>

          </div>

        </div>

      </section>

    

      <VerificationCounsellingCard
        countryName="Saudi Arabia MBBS"
        title="Check Saudi Arabia MBBS eligibility with ILMALINK"
        buttonLabel="Get Saudi Arabia MBBS Counselling"
      />
</main>
  );
}