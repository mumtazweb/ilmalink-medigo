import VerificationCounsellingCard from "../../components/VerificationCounsellingCard";

export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in Georgia 2026 | Top Choice for Indian Students | ILMALINK MEDIGO",

  description:
    "Study MBBS in Georgia for Indian students with affordable fees, English-medium education, modern infrastructure, NMC aligned universities and strong FMGE preparation support.",

  keywords: [
    "MBBS in Georgia",
    "Study medicine in Georgia",
    "Georgia medical universities",
    "NMC approved Georgia universities",
    "MBBS abroad Georgia",
    "Indian students MBBS Georgia",
    "Tbilisi State Medical University",
    "SEU Georgia",
    "Affordable MBBS abroad",
  ],
};

const universities = [
  {
    name: "Tbilisi State Medical University (TSMU)",
    city: "Tbilisi",
    fees: "₹35–45 Lakhs Total",
  },

  {
    name: "Georgian National University SEU",
    city: "Tbilisi",
    fees: "₹30–40 Lakhs Total",
  },

  {
    name: "David Tvildiani Medical University",
    city: "Tbilisi",
    fees: "₹40–50 Lakhs Total",
  },

  {
    name: "European University Georgia",
    city: "Tbilisi",
    fees: "₹28–38 Lakhs Total",
  },

  {
    name: "Batumi Shota Rustaveli State University",
    city: "Batumi",
    fees: "₹25–35 Lakhs Total",
  },

  {
    name: "Akaki Tsereteli State University",
    city: "Kutaisi",
    fees: "₹22–32 Lakhs Total",
  },
];

export default function GeorgiaPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in Georgia

          </h1>

          <p className="text-lg text-gray-300 max-w-4xl leading-8">

            Georgia has become one of the most popular and trusted MBBS
            abroad destinations for Indian students due to affordable
            tuition fees, modern European infrastructure, English-medium
            education and strong NMC aligned medical universities.

          </p>

        </div>

      </section>

      {/* HIGHLIGHTS */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Most Preferred Destination
            </h2>

            <p className="text-gray-300 leading-7">
              Georgia is currently among the top MBBS abroad choices for Indian students.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              English Medium
            </h2>

            <p className="text-gray-300 leading-7">
              Most universities provide complete English-medium medical education.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Affordable European MBBS
            </h2>

            <p className="text-gray-300 leading-7">
              Lower tuition fees compared to many European countries.
            </p>

          </div>

        </div>

      </section>

      {/* WHY GEORGIA */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-8">

            Why Georgia is So Popular Among Indian Students

          </h2>

          <ul className="space-y-5 text-gray-300 leading-8 text-lg">

            <li>
              ✔ Modern European-style medical education
            </li>

            <li>
              ✔ Strong FMGE/NExT preparation support
            </li>

            <li>
              ✔ English-medium teaching environment
            </li>

            <li>
              ✔ WHO/WDOMS listed universities
            </li>

            <li>
              ✔ Affordable tuition and living costs
            </li>

            <li>
              ✔ Safe and student-friendly environment
            </li>

            <li>
              ✔ Large Indian student community
            </li>

          </ul>

        </div>

      </section>

      {/* NMC */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-green-500/10 border border-green-500/30 rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-8 text-green-300">

            NMC Guidelines & Recognition

          </h2>

          <p className="text-gray-300 leading-8 text-lg mb-8">

            Many reputed Georgian medical universities are considered
            among the better aligned options with current NMC/FMGL
            regulations for Indian students pursuing MBBS abroad.

          </p>

          <ul className="space-y-5 text-gray-300 leading-8 text-lg">

            <li>
              ✔ Most top universities follow 6-year MBBS/MD structure
            </li>

            <li>
              ✔ English-medium programs widely available
            </li>

            <li>
              ✔ Internship structure generally aligns with FMGL norms
            </li>

            <li>
              ✔ Universities listed in WDOMS/WHO directories
            </li>

            <li>
              ✔ NEET qualification mandatory for Indian students
            </li>

          </ul>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Top Medical Universities in Georgia

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

      {/* EXPENSES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Estimated Expenses

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>💰 Tuition Fees: ₹22–50 Lakhs Total</li>

              <li>🏠 Hostel & Living: ₹12k–25k/month</li>

              <li>📚 Course Duration: 6 Years</li>

              <li>✈️ Visa + Insurance Extra</li>

              <li>🍛 Indian food widely available</li>

            </ul>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Admission Requirements

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>✔ NEET qualification mandatory</li>

              <li>✔ Minimum 50% PCB marks</li>

              <li>✔ No IELTS/TOEFL in many universities</li>

              <li>✔ English-medium MBBS available</li>

              <li>✔ Student visa required</li>

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

                Is MBBS in Georgia valid in India?

              </h3>

              <p className="text-gray-300 leading-7">

                Yes, students from recognized and NMC-aligned Georgian
                universities can appear for FMGE/NExT according to current regulations.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is Georgia good for Indian students?

              </h3>

              <p className="text-gray-300 leading-7">

                Yes. Georgia is considered one of the best MBBS abroad
                destinations for Indian students due to affordability,
                infrastructure and English-medium education.

              </p>

            </div>

          </div>

        </div>

      </section>

    

      <VerificationCounsellingCard
        countryName="Georgia MBBS"
        title="Check Georgia MBBS eligibility with ILMALINK"
        buttonLabel="Get Georgia MBBS Counselling"
      />
</main>
  );
}