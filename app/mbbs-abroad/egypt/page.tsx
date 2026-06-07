import VerificationCounsellingCard from "../../components/VerificationCounsellingCard";

export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in Egypt 2026 | NMC Aligned Medical Universities | ILMALINK MEDIGO",

  description:
    "Study MBBS in Egypt for Indian students with affordable fees, English-medium medical education, ancient medical heritage and globally recognized universities.",

  keywords: [
    "MBBS in Egypt",
    "Study medicine in Egypt",
    "Egypt medical universities",
    "MBBS abroad Egypt",
    "NMC approved Egypt universities",
    "Indian students MBBS Egypt",
    "Affordable MBBS abroad",
    "Cairo University MBBS",
  ],
};

const universities = [
  {
    name: "Cairo University",
    city: "Cairo",
    fees: "₹18–30 Lakhs Total",
  },

  {
    name: "Ain Shams University",
    city: "Cairo",
    fees: "₹20–32 Lakhs Total",
  },

  {
    name: "Alexandria University",
    city: "Alexandria",
    fees: "₹18–28 Lakhs Total",
  },

  {
    name: "Mansoura University",
    city: "Mansoura",
    fees: "₹18–30 Lakhs Total",
  },

  {
    name: "Zagazig University",
    city: "Zagazig",
    fees: "₹16–28 Lakhs Total",
  },

  {
    name: "Tanta University",
    city: "Tanta",
    fees: "₹16–26 Lakhs Total",
  },
];

export default function EgyptPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in Egypt

          </h1>

          <p className="text-lg text-gray-300 max-w-4xl leading-8">

            Egypt is emerging as a growing MBBS abroad destination for
            Indian students due to affordable tuition fees, English-medium
            medical education, strong patient exposure and globally
            recognized universities with historical excellence in medicine.

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

                Important Regional & NMC Alert

              </h2>

              <p className="text-red-200 mt-2">

                Students should carefully evaluate regional tensions and NMC compliance factors.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 leading-8 text-lg">

            <p>

              Egypt offers several recognized medical universities and
              affordable MBBS programs, but Indian students should remain
              cautious regarding regional geopolitical tensions and evolving
              NMC/FMGL regulations.

            </p>

            <ul className="space-y-4">

              <li>
                ⚠️ Middle East regional conflicts and war-related tensions may affect travel stability
              </li>

              <li>
                ⚠️ Students should regularly monitor embassy and government advisories
              </li>

              <li>
                ⚠️ Visa processing or regional conditions may change unexpectedly
              </li>

              <li>
                ⚠️ Internship structures may vary by university
              </li>

              <li>
                ⚠️ Students must verify current NMC/FMGL eligibility before admission
              </li>

            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-yellow-300 mb-4">

                Our Honest Guidance

              </h3>

              <p className="text-gray-300 leading-8">

                Egypt can be a good affordable option for Indian students,
                especially due to strong patient exposure and recognized
                universities. However, students must independently verify
                NMC compliance, internship structure and regional safety
                conditions before finalizing admission.

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
              Affordable Fees
            </h2>

            <p className="text-gray-300 leading-7">
              Lower tuition fees compared to many private medical colleges in India.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Strong Clinical Exposure
            </h2>

            <p className="text-gray-300 leading-7">
              High patient flow provides strong practical medical training.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              English Medium
            </h2>

            <p className="text-gray-300 leading-7">
              Many universities offer English-medium MBBS programs.
            </p>

          </div>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Top Medical Universities in Egypt

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
              ✔ English-medium programs available
            </li>

            <li>
              ✔ Valid passport and student visa required
            </li>

            <li>
              ✔ Most universities do not require separate entrance exams
            </li>

          </ul>

        </div>

      </section>

      {/* NMC */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-4xl font-bold mb-8">

            NMC Guidelines for MBBS Abroad

          </h2>

          <ul className="space-y-5 text-gray-300 leading-8 text-lg">

            <li>
              ✔ Minimum 54 months academic duration required
            </li>

            <li>
              ✔ Mandatory internship requirements applicable
            </li>

            <li>
              ✔ Entire course should be in English medium
            </li>

            <li>
              ✔ FMGE/NExT qualification required for Indian practice
            </li>

            <li>
              ✔ Students should independently verify current NMC compliance
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

                Is MBBS in Egypt valid in India?

              </h3>

              <p className="text-gray-300 leading-7">

                Students must verify whether their university and internship
                structure comply with current NMC/FMGL regulations before admission.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is NEET compulsory for MBBS in Egypt?

              </h3>

              <p className="text-gray-300 leading-7">

                Yes. NEET qualification is mandatory for Indian students.

              </p>

            </div>

          </div>

        </div>

      </section>

    

      <VerificationCounsellingCard
        countryName="Egypt MBBS"
        title="Check Egypt MBBS eligibility with ILMALINK"
        buttonLabel="Get Egypt MBBS Counselling"
      />
</main>
  );
}