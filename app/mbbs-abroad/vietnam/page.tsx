import VerificationCounsellingCard from "../../components/VerificationCounsellingCard";

export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in Vietnam 2026 | Affordable Emerging MBBS Destination | ILMALINK MEDIGO",

  description:
    "Study MBBS in Vietnam for Indian students with affordable tuition fees, English-medium medical education, modern infrastructure and growing NMC-recognized universities.",

  keywords: [
    "MBBS in Vietnam",
    "Study medicine in Vietnam",
    "Vietnam medical universities",
    "MBBS abroad Vietnam",
    "Indian students MBBS Vietnam",
    "NMC approved Vietnam universities",
    "Duy Tan University",
    "Can Tho University",
    "Hong Bang University",
  ],
};

const universities = [
  {
    name: "Duy Tan University",
    city: "Da Nang",
    fees: "₹30–45 Lakhs Total",
    note: "One of the most internationally known universities in Vietnam",
  },

  {
    name: "Can Tho University of Medicine and Pharmacy",
    city: "Can Tho",
    fees: "₹28–42 Lakhs Total",
    note: "Strong clinical exposure and affordable tuition",
  },

  {
    name: "Hong Bang International University",
    city: "Ho Chi Minh City",
    fees: "₹32–50 Lakhs Total",
    note: "Popular among international students with English-medium pathway",
  },

  {
    name: "Hai Phong Medical University",
    city: "Hai Phong",
    fees: "₹25–38 Lakhs Total",
    note: "Affordable university with growing Indian student presence",
  },

  {
    name: "Phan Chau Trinh University",
    city: "Da Nang",
    fees: "₹30–48 Lakhs Total",
    note: "Modern infrastructure and English-medium MBBS",
  },

  {
    name: "Hue University of Medicine and Pharmacy",
    city: "Hue",
    fees: "₹25–40 Lakhs Total",
    note: "One of Vietnam’s oldest and respected medical institutions",
  },
];

export default function VietnamPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in Vietnam

          </h1>

          <p className="text-lg text-gray-300 max-w-5xl leading-8">

            Vietnam is becoming a rapidly growing MBBS abroad destination
            for Indian students due to affordable tuition fees,
            English-medium medical programs, modern infrastructure,
            good hospital exposure and close connectivity with India.
            The country is attracting students looking for alternatives
            to Russia, China and Central Asian countries.

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

                Vietnam is promising but still a comparatively new MBBS destination.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 text-lg leading-8">

            <ul className="space-y-4">

              <li>
                ⚠️ Vietnam is still a relatively new destination for Indian MBBS students
              </li>

              <li>
                ⚠️ Published FMGE/NExT performance data is still limited
              </li>

              <li>
                ⚠️ Some universities may partially use Vietnamese language clinically
              </li>

              <li>
                ⚠️ Students should independently verify complete English-medium structure
              </li>

              <li>
                ⚠️ NMC/FMGL compliance should be carefully checked before admission
              </li>

              <li>
                ⚠️ Clinical exposure quality may vary by university
              </li>

              <li>
                ⚠️ Some newer universities are heavily agent-driven
              </li>

            </ul>

            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-red-300 mb-4">

                Important NMC Alert

              </h3>

              <p className="text-gray-300 leading-8">

                The National Medical Commission does not officially endorse
                any foreign medical university list. Students must verify
                course duration, internship, language structure and
                licensing eligibility independently before admission.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ADVANTAGES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-green-500/10 border border-green-500/30 rounded-3xl p-8">

          <h2 className="text-4xl font-bold text-green-300 mb-8">

            Major Advantages of MBBS in Vietnam

          </h2>

          <ul className="space-y-5 text-gray-300 text-lg leading-8">

            <li>
              ✔ Affordable tuition fees compared to private colleges in India
            </li>

            <li>
              ✔ English-medium MBBS programs available
            </li>

            <li>
              ✔ Strong patient flow and practical clinical exposure
            </li>

            <li>
              ✔ Modern infrastructure and teaching facilities
            </li>

            <li>
              ✔ Short travel distance from India
            </li>

            <li>
              ✔ Safe and student-friendly environment
            </li>

            <li>
              ✔ Similar food habits and climate compared to many Asian countries
            </li>

            <li>
              ✔ WHO/WDOMS recognized universities available
            </li>

          </ul>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Top Medical Universities in Vietnam

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

      {/* NMC */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-8">

            NMC Guidelines & Recognition

          </h2>

          <ul className="space-y-5 text-gray-300 text-lg leading-8">

            <li>
              ✔ NEET qualification mandatory for Indian students
            </li>

            <li>
              ✔ Course duration should comply with FMGL regulations
            </li>

            <li>
              ✔ Internship should meet current NMC guidelines
            </li>

            <li>
              ✔ Students should verify registration eligibility in Vietnam
            </li>

            <li>
              ✔ English-medium instruction should be confirmed carefully
            </li>

            <li>
              ✔ FMGE/NExT qualification required for Indian practice
            </li>

          </ul>

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
                💰 Tuition Fees: ₹25–50 Lakhs Total
              </li>

              <li>
                🏠 Living Cost: ₹10k – ₹25k/month
              </li>

              <li>
                📚 Course Duration: 6 Years
              </li>

              <li>
                ✈️ Visa + Insurance + Travel Extra
              </li>

              <li>
                🍛 Asian food and Indian food availability improving
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
                ✔ English-medium MBBS available
              </li>

              <li>
                ✔ Student visa required
              </li>

              <li>
                ✔ IELTS/TOEFL generally not mandatory in many universities
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

                Is MBBS in Vietnam valid in India?

              </h3>

              <p className="text-gray-300 leading-7">

                Yes, if the university and course structure fully comply
                with current NMC/FMGL regulations including internship
                and licensing eligibility.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is Vietnam good for Indian medical students?

              </h3>

              <p className="text-gray-300 leading-7">

                Vietnam is becoming a promising affordable MBBS destination
                with improving infrastructure and English-medium programs,
                but students should carefully verify universities before admission.

              </p>

            </div>

          </div>

        </div>

      </section>

    

      <VerificationCounsellingCard
        countryName="Vietnam MBBS"
        title="Check Vietnam MBBS eligibility with ILMALINK"
        buttonLabel="Get Vietnam MBBS Counselling"
      />
</main>
  );
}