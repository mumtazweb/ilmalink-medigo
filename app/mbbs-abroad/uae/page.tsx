export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in UAE 2026 | Dubai Medical Universities | ILMALINK MEDIGO",

  description:
    "Study MBBS in UAE for Indian students with modern Gulf medical universities, advanced hospitals, international exposure and premium healthcare infrastructure.",

  keywords: [
    "MBBS in UAE",
    "Study medicine in UAE",
    "Dubai medical universities",
    "Gulf Medical University",
    "MBBS abroad UAE",
    "Indian students MBBS UAE",
    "RAK Medical University",
    "Dubai medical colleges",
  ],
};

const universities = [
  {
    name: "Gulf Medical University",
    city: "Ajman",
    fees: "₹60 Lakhs – ₹1.2 Crore+",
    note: "Most famous private medical university in UAE",
  },

  {
    name: "Mohammed Bin Rashid University of Medicine",
    city: "Dubai",
    fees: "₹80 Lakhs – ₹1.5 Crore+",
    note: "Premium Dubai government-backed medical university",
  },

  {
    name: "UAE University",
    city: "Al Ain",
    fees: "₹50 Lakhs – ₹1 Crore+",
    note: "Top government university with strong research reputation",
  },

  {
    name: "RAK Medical & Health Sciences University",
    city: "Ras Al Khaimah",
    fees: "₹45 Lakhs – ₹90 Lakhs+",
    note: "Popular among international students",
  },

  {
    name: "University of Sharjah",
    city: "Sharjah",
    fees: "₹55 Lakhs – ₹1 Crore+",
    note: "Strong clinical infrastructure and modern campus",
  },
];

export default function UAEPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in UAE

          </h1>

          <p className="text-lg text-gray-300 max-w-5xl leading-8">

            UAE has become one of the most modern medical education hubs
            in the Gulf region with highly advanced hospitals, premium
            infrastructure, international faculty and globally connected
            healthcare systems. Cities like Dubai, Abu Dhabi and Sharjah
            provide world-class lifestyle and healthcare exposure for
            international students.

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

                UAE medical education is highly modern but extremely expensive.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 text-lg leading-8">

            <ul className="space-y-4">

              <li>
                ⚠️ Tuition fees are among the highest in Asia and Gulf region
              </li>

              <li>
                ⚠️ Dubai and Abu Dhabi living costs are extremely expensive
              </li>

              <li>
                ⚠️ Hostel and accommodation charges are high
              </li>

              <li>
                ⚠️ Residency and licensing pathways can be competitive
              </li>

              <li>
                ⚠️ Students should independently verify NMC/FMGL compliance
              </li>

              <li>
                ⚠️ Internship structure differs by university
              </li>

              <li>
                ⚠️ Some universities are newer and less internationally established
              </li>

            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-yellow-300 mb-4">

                NMC Eligibility Alert

              </h3>

              <p className="text-gray-300 leading-8">

                Indian students should carefully verify whether the
                university fully complies with current NMC/FMGL
                regulations including internship duration, licensing
                eligibility and complete English-medium structure.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ADVANTAGES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-green-500/10 border border-green-500/30 rounded-3xl p-8">

          <h2 className="text-4xl font-bold text-green-300 mb-8">

            Major Advantages of MBBS in UAE

          </h2>

          <ul className="space-y-5 text-gray-300 text-lg leading-8">

            <li>
              ✔ Ultra-modern hospital and healthcare infrastructure
            </li>

            <li>
              ✔ International patient exposure and multicultural environment
            </li>

            <li>
              ✔ English-medium medical education
            </li>

            <li>
              ✔ Very safe and organized lifestyle
            </li>

            <li>
              ✔ Advanced technology integration in healthcare training
            </li>

            <li>
              ✔ Premium Gulf-standard facilities and accommodation
            </li>

            <li>
              ✔ Strong research and international collaboration opportunities
            </li>

          </ul>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Top Medical Universities in UAE

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
                💰 Tuition Fees: ₹45 Lakhs – ₹1.5 Crore+
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
                🍛 Indian food widely available
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
                ✔ Interview and entrance process in some universities
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

                Is MBBS in UAE valid in India?

              </h3>

              <p className="text-gray-300 leading-7">

                Students must verify whether their university fully
                complies with current NMC/FMGL regulations before admission.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is UAE good for Indian medical students?

              </h3>

              <p className="text-gray-300 leading-7">

                UAE offers premium infrastructure and excellent healthcare
                exposure, but overall expenses are extremely high compared
                to most MBBS abroad destinations.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}