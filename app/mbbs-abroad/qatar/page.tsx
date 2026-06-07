import VerificationCounsellingCard from "../../components/VerificationCounsellingCard";

export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in Qatar 2026 | Premium Gulf Medical Education | ILMALINK MEDIGO",

  description:
    "Study MBBS in Qatar for Indian students with world-class Gulf healthcare infrastructure, advanced hospitals, research-focused universities and premium international medical exposure.",

  keywords: [
    "MBBS in Qatar",
    "Study medicine in Qatar",
    "Qatar medical universities",
    "Weill Cornell Qatar",
    "Qatar University medicine",
    "MBBS abroad Qatar",
    "Indian students MBBS Qatar",
    "Gulf medical education",
  ],
};

const universities = [
  {
    name: "Weill Cornell Medicine-Qatar",
    city: "Doha",
    fees: "₹1.5–3+ Crores",
    note: "Most prestigious American-affiliated medical institution in Qatar",
  },

  {
    name: "Qatar University College of Medicine",
    city: "Doha",
    fees: "₹40 Lakhs – ₹1 Crore+",
    note: "Government-backed university with growing medical reputation",
  },

  {
    name: "University of Calgary in Qatar",
    city: "Doha",
    fees: "₹40–80 Lakhs+",
    note: "Known more for healthcare and nursing pathways",
  },
];

export default function QatarPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in Qatar

          </h1>

          <p className="text-lg text-gray-300 max-w-5xl leading-8">

            Qatar offers one of the most premium healthcare and medical
            education environments in the Gulf region with ultra-modern
            hospitals, strong research infrastructure and globally connected
            healthcare systems. However, MBBS admission opportunities for
            international students are very limited and extremely competitive.

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

                Qatar medical education is extremely prestigious but highly selective.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 text-lg leading-8">

            <ul className="space-y-4">

              <li>
                ⚠️ Very limited number of medical universities in Qatar
              </li>

              <li>
                ⚠️ International student seats are extremely limited
              </li>

              <li>
                ⚠️ Tuition fees and living costs are very high
              </li>

              <li>
                ⚠️ Admission competition is extremely intense
              </li>

              <li>
                ⚠️ Strong academic and English proficiency profile required
              </li>

              <li>
                ⚠️ Licensing and residency pathways should be verified carefully
              </li>

              <li>
                ⚠️ NMC/FMGL compliance should be independently checked
              </li>

            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-yellow-300 mb-4">

                Important NMC Note

              </h3>

              <p className="text-gray-300 leading-8">

                Indian students should carefully verify whether the
                university structure fully aligns with current NMC/FMGL
                regulations including internship, licensing eligibility
                and complete course structure.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ADVANTAGES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-green-500/10 border border-green-500/30 rounded-3xl p-8">

          <h2 className="text-4xl font-bold text-green-300 mb-8">

            Major Advantages of MBBS in Qatar

          </h2>

          <ul className="space-y-5 text-gray-300 text-lg leading-8">

            <li>
              ✔ One of the most advanced healthcare systems in Middle East
            </li>

            <li>
              ✔ Premium international hospital infrastructure
            </li>

            <li>
              ✔ Strong research and innovation exposure
            </li>

            <li>
              ✔ Safe and high-standard lifestyle
            </li>

            <li>
              ✔ International faculty and multicultural environment
            </li>

            <li>
              ✔ Modern technology-driven medical education
            </li>

            <li>
              ✔ Strong links with American and Western medical systems
            </li>

          </ul>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Top Medical Universities in Qatar

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
                💰 Tuition Fees: ₹40 Lakhs – ₹3 Crores+
              </li>

              <li>
                🏠 Living Cost: ₹25k – ₹1 Lakh/month
              </li>

              <li>
                📚 Course Duration: 5–6+ Years
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
                ✔ Strong PCB academic profile required
              </li>

              <li>
                ✔ NEET qualification mandatory for Indian students
              </li>

              <li>
                ✔ IELTS/TOEFL often required
              </li>

              <li>
                ✔ Interviews and profile evaluation common
              </li>

              <li>
                ✔ Student visa and financial proof required
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

                Is MBBS in Qatar valid in India?

              </h3>

              <p className="text-gray-300 leading-7">

                Students should independently verify whether the university
                fully complies with current NMC/FMGL regulations before admission.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is Qatar good for Indian medical students?

              </h3>

              <p className="text-gray-300 leading-7">

                Qatar offers world-class healthcare exposure and premium
                infrastructure, but admissions are extremely competitive
                and overall expenses are very high.

              </p>

            </div>

          </div>

        </div>

      </section>

    

      <VerificationCounsellingCard
        countryName="Qatar MBBS"
        title="Check Qatar MBBS eligibility with ILMALINK"
        buttonLabel="Get Qatar MBBS Counselling"
      />
</main>
  );
}