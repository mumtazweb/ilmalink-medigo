export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in Iran 2026 | Affordable NMC Aligned Medical Universities | ILMALINK MEDIGO",

  description:
    "Study MBBS in Iran for Indian students with affordable tuition fees, strong clinical exposure, English-medium medical education and globally recognized universities.",

  keywords: [
    "MBBS in Iran",
    "Study medicine in Iran",
    "Iran medical universities",
    "Tehran University of Medical Sciences",
    "MBBS abroad Iran",
    "Indian students MBBS Iran",
    "Iran medical colleges",
    "NMC approved Iran universities",
  ],
};

const universities = [
  {
    name: "Tehran University of Medical Sciences (TUMS)",
    city: "Tehran",
    fees: "₹35–55 Lakhs Total",
    note: "Most prestigious and internationally recognized medical university in Iran",
  },

  {
    name: "Iran University of Medical Sciences",
    city: "Tehran",
    fees: "₹28–45 Lakhs Total",
    note: "Strong clinical hospitals and English-medium programs",
  },

  {
    name: "Shiraz University of Medical Sciences",
    city: "Shiraz",
    fees: "₹25–40 Lakhs Total",
    note: "Popular among international medical students",
  },

  {
    name: "Shahid Beheshti University of Medical Sciences",
    city: "Tehran",
    fees: "₹28–45 Lakhs Total",
    note: "Research-oriented medical university with modern facilities",
  },

  {
    name: "Mashhad University of Medical Sciences",
    city: "Mashhad",
    fees: "₹22–38 Lakhs Total",
    note: "Affordable and clinically strong medical institution",
  },

  {
    name: "Isfahan University of Medical Sciences",
    city: "Isfahan",
    fees: "₹24–40 Lakhs Total",
    note: "Known for academic quality and hospital exposure",
  },
];

export default function IranPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in Iran

          </h1>

          <p className="text-lg text-gray-300 max-w-5xl leading-8">

            Iran is emerging as a strong and affordable MBBS abroad
            destination for Indian students due to low tuition fees,
            advanced hospital infrastructure, strong clinical exposure
            and globally recognized medical universities. Several Iranian
            universities are listed in WDOMS and are considered aligned
            with current NMC/FMGL requirements when properly verified.

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

                Important Reality Check

              </h2>

              <p className="text-yellow-200 mt-2">

                Students should carefully verify language and licensing structure.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 text-lg leading-8">

            <ul className="space-y-4">

              <li>
                ⚠️ Persian language becomes important during clinical interaction with patients
              </li>

              <li>
                ⚠️ Some universities provide mixed English + Persian clinical exposure
              </li>

              <li>
                ⚠️ Students should independently verify complete English-medium structure
              </li>

              <li>
                ⚠️ Geopolitical tensions and sanctions may affect banking or travel occasionally
              </li>

              <li>
                ⚠️ Cultural adaptation may take time for some students
              </li>

              <li>
                ⚠️ Licensing eligibility and NMC/FMGL compliance must be checked carefully
              </li>

            </ul>

            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-red-300 mb-4">

                NMC Eligibility Alert

              </h3>

              <p className="text-gray-300 leading-8">

                Indian students should ensure that the selected university
                fully complies with current NMC/FMGL regulations including
                course duration, internship, licensing eligibility and
                complete medium of instruction requirements.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ADVANTAGES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-green-500/10 border border-green-500/30 rounded-3xl p-8">

          <h2 className="text-4xl font-bold text-green-300 mb-8">

            Major Advantages of MBBS in Iran

          </h2>

          <ul className="space-y-5 text-gray-300 text-lg leading-8">

            <li>
              ✔ Highly affordable tuition fees compared to many countries
            </li>

            <li>
              ✔ Strong clinical exposure and hospital training
            </li>

            <li>
              ✔ Advanced medical research infrastructure
            </li>

            <li>
              ✔ Several universities recognized globally
            </li>

            <li>
              ✔ English-medium programs available for international students
            </li>

            <li>
              ✔ Lower living costs compared to Gulf and Western countries
            </li>

            <li>
              ✔ Strong academic foundation in medicine and sciences
            </li>

          </ul>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Top Medical Universities in Iran

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
                💰 Tuition Fees: ₹22 Lakhs – ₹55 Lakhs Total
              </li>

              <li>
                🏠 Living Cost: ₹8k – ₹22k/month
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
                ✔ NEET qualification mandatory
              </li>

              <li>
                ✔ Minimum PCB eligibility criteria required
              </li>

              <li>
                ✔ English-medium MBBS programs available
              </li>

              <li>
                ✔ Student visa mandatory
              </li>

              <li>
                ✔ Persian language learning may become necessary clinically
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

                Is MBBS in Iran valid in India?

              </h3>

              <p className="text-gray-300 leading-7">

                Yes, if the university and course structure comply with
                current NMC/FMGL regulations including internship and
                licensing eligibility requirements.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is Iran good for Indian medical students?

              </h3>

              <p className="text-gray-300 leading-7">

                Iran offers affordable and academically strong medical
                education with good hospital exposure, but students should
                carefully verify language structure and licensing pathways.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}