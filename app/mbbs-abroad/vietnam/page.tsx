import VerificationCounsellingCard from "../../components/VerificationCounsellingCard";

export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in Vietnam 2026 for Indian Students | Fees, WDOMS & NMC/FMGL Checks",

  description:
    "Explore MBBS in Vietnam for Indian students with 29 WDOMS-listed medical schools, fee guidance, eligibility checks, NMC/FMGL rule review, documents and ilmalink service-line counselling support under ilmalink.",

  keywords: [
    "MBBS in Vietnam",
    "Study medicine in Vietnam",
    "Vietnam medical universities",
    "WDOMS listed medical schools Vietnam",
    "NMC FMGL checks Vietnam",
    "MBBS abroad Vietnam",
    "Indian students MBBS Vietnam",
    "Duy Tan University",
    "Can Tho University of Medicine and Pharmacy",
    "Hong Bang International University",
  ],
};

const universities = [
  {
    name: "Duy Tan University",
    city: "Da Nang",
    fees: "₹30-45 Lakhs Total",
    note: "Verify WDOMS listing, host-country recognition and medicine pathway before admission",
  },

  {
    name: "Can Tho University of Medicine and Pharmacy",
    city: "Can Tho",
    fees: "₹28-42 Lakhs Total",
    note: "Official university details and clinical training structure should be checked university-wise",
  },

  {
    name: "Hong Bang International University",
    city: "Ho Chi Minh City",
    fees: "₹32-50 Lakhs Total",
    note: "English-medium route, internship and licensing pathway must be verified before admission",
  },

  {
    name: "Hai Phong Medical University",
    city: "Hai Phong",
    fees: "₹25-38 Lakhs Total",
    note: "Students should confirm current eligibility, recognition and language structure directly",
  },

  {
    name: "Phan Chau Trinh University",
    city: "Da Nang",
    fees: "₹30-48 Lakhs Total",
    note: "Check host-country recognition, WDOMS listing and NMC/FMGL fit before shortlisting",
  },

  {
    name: "Hue University of Medicine and Pharmacy",
    city: "Hue",
    fees: "₹25-40 Lakhs Total",
    note: "Verify current official admission, medium of instruction and clinical pathway details",
  },
];

export default function VietnamPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in Vietnam 2026 for Indian Students

          </h1>

          <p className="text-lg text-gray-300 max-w-5xl leading-8">

            Vietnam is an emerging medical education destination for Indian
            students, with 29 WDOMS-listed medical schools to review. Before
            admission, students should verify WDOMS listing, host-country
            recognition, medium of instruction, internship, clinical training,
            eligibility and licensing pathway for the specific university.

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

                Vietnam requires careful university-wise verification.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 text-lg leading-8">

            <ul className="space-y-4">

              <li>
                ⚠️ Vietnam is still a comparatively newer MBBS abroad route for Indian students
              </li>

              <li>
                ⚠️ Published FMGE/NExT performance data may be limited for some universities
              </li>

              <li>
                ⚠️ English-medium route must be verified university-wise
              </li>

              <li>
                ⚠️ Host-country recognition and local licensing eligibility should be checked
              </li>

              <li>
                ⚠️ NMC/FMGL compliance should be reviewed before admission
              </li>

              <li>
                ⚠️ Clinical exposure, internship structure and documents may vary by university
              </li>

              <li>
                ⚠️ Students should not rely only on agent brochures or fee claims
              </li>

            </ul>

            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-red-300 mb-4">

                Important NMC/FMGL Alert

              </h3>

              <p className="text-gray-300 leading-8">

                Indian students must verify current NMC/FMGL rules before
                admission. WDOMS listing is a directory check, not an approval
                claim. Course duration, internship, English-medium instruction,
                host-country licence eligibility and registration pathway should
                be checked independently.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ADVANTAGES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-green-500/10 border border-green-500/30 rounded-3xl p-8">

          <h2 className="text-4xl font-bold text-green-300 mb-8">

            Why Students Consider Vietnam

          </h2>

          <ul className="space-y-5 text-gray-300 text-lg leading-8">

            <li>
              ✔ Nearby Asian destination with improving medical education interest
            </li>

            <li>
              ✔ Semester fee guidance around ₹ 3.0L/Semester for planning
            </li>

            <li>
              ✔ 29 WDOMS-listed medical schools for listing checks
            </li>

            <li>
              ✔ Some universities may offer English-medium routes that need direct verification
            </li>

            <li>
              ✔ Clinical training, internship and hospital exposure should be compared carefully
            </li>

            <li>
              ✔ ilmalink, an extension/service line of ilmalink, can support document verification and counselling
            </li>

          </ul>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Medical Universities to Verify in Vietnam

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

            NMC/FMGL Rule Checks

          </h2>

          <ul className="space-y-5 text-gray-300 text-lg leading-8">

            <li>
              ✔ NEET qualification and Indian eligibility must be checked
            </li>

            <li>
              ✔ Course duration should be reviewed against current FMGL regulations
            </li>

            <li>
              ✔ Internship and clinical training structure should be verified
            </li>

            <li>
              ✔ Students should verify registration eligibility in Vietnam
            </li>

            <li>
              ✔ English-medium instruction should be confirmed university-wise
            </li>

            <li>
              ✔ FMGE/NExT or applicable licensing pathway must be planned before admission
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
                💰 Semester Fee Guidance: ₹ 3.0L/Semester
              </li>

              <li>
                💰 Tuition Fees: ₹25-50 Lakhs Total
              </li>

              <li>
                🏠 Living Cost: ₹10k - ₹25k/month
              </li>

              <li>
                📚 Course Duration: verify university-wise
              </li>

              <li>
                ✈️ Visa + Insurance + Travel Extra
              </li>

            </ul>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">

              Admission Requirements

            </h2>

            <ul className="space-y-5 text-gray-300 leading-8">

              <li>
                ✔ NEET qualification and PCB eligibility review
              </li>

              <li>
                ✔ WDOMS listing and host-country recognition check
              </li>

              <li>
                ✔ English-medium route verification
              </li>

              <li>
                ✔ Student visa and document support
              </li>

              <li>
                ✔ University-wise admission and licensing pathway review
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

                It depends on whether the selected university and course
                structure satisfy current NMC/FMGL rules, internship conditions,
                medium of instruction and host-country licensing requirements.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is Vietnam good for Indian medical students?

              </h3>

              <p className="text-gray-300 leading-7">

                Vietnam may be considered after careful route comparison.
                Students should verify WDOMS listing, official university
                details, English-medium pathway, clinical training, internship
                and NMC/FMGL fit before admission.

              </p>

            </div>

          </div>

        </div>

      </section>

      <VerificationCounsellingCard
        countryName="Vietnam MBBS"
        title="Check Vietnam MBBS eligibility with ilmaLink"
        buttonLabel="Get Vietnam MBBS Counselling"
      />
    </main>
  );
}
