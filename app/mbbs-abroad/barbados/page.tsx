export const dynamic = "force-static";

export const metadata = {
  title:
    "Study MBBS in Barbados 2026 | Caribbean Medical Universities | ILMALINK MEDIGO",

  description:
    "Study MBBS in Barbados for Indian students with Caribbean medical universities, English-medium education, US-based curriculum and global medical career pathways.",

  keywords: [
    "MBBS in Barbados",
    "Study medicine in Barbados",
    "Caribbean medical universities",
    "MBBS abroad Barbados",
    "American University of Barbados",
    "Victoria University of Barbados",
    "Caribbean MBBS",
    "Indian students Barbados MBBS",
  ],
};

const universities = [
  {
    name: "American University of Barbados",
    city: "Bridgetown",
    fees: "₹30–50 Lakhs Total",
  },

  {
    name: "Victoria University of Barbados",
    city: "Bridgetown",
    fees: "₹28–45 Lakhs Total",
  },

  {
    name: "Washington University of Barbados",
    city: "Bridgetown",
    fees: "₹30–40 Lakhs Total",
  },
];

export default function BarbadosPage() {
  return (
    <main className="min-h-screen bg-[#031525] text-white">

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">

            Study MBBS in Barbados

          </h1>

          <p className="text-lg text-gray-300 max-w-4xl leading-8">

            Barbados is becoming a growing destination for Caribbean
            medical education with English-medium teaching, US-based
            curriculum structures and international licensing pathways
            like USMLE, PLAB and MCCQE.

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

                Important NMC 2021 Guideline Alert

              </h2>

              <p className="text-red-200 mt-2">

                Students must carefully verify NMC/FMGL compliance before admission.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 leading-8 text-lg">

            <p>

              Many Caribbean medical programs, including some Barbados
              pathways, may not strictly align with all current NMC 2021
              Foreign Medical Graduate regulations for Indian students.

            </p>

            <p className="text-red-200 font-semibold">

              Clinical rotation structures, offshore hospital training,
              transfer systems or internship formats can potentially create
              licensing complications for Indian medical practice eligibility.

            </p>

            <ul className="space-y-4">

              <li>
                ❌ Some universities conduct clinical rotations outside Barbados
              </li>

              <li>
                ❌ Certain pathways may not fully satisfy same-country internship norms
              </li>

              <li>
                ❌ US-based transfer/rotation systems require careful verification
              </li>

              <li>
                ❌ NMC recognition and compliance status may change over time
              </li>

              <li>
                ❌ Students should verify WDOMS and accreditation status independently
              </li>

            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-yellow-300 mb-4">

                Our Honest Guidance

              </h3>

              <p className="text-gray-300 leading-8">

                Barbados can be suitable for students targeting
                international licensing pathways like USMLE or PLAB.
                However, Indian students planning to practice in India
                should carefully verify current NMC/FMGL eligibility
                before taking admission.

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
              English Medium
            </h2>

            <p className="text-gray-300 leading-7">
              Medical education is conducted fully in English.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              US-Based Curriculum
            </h2>

            <p className="text-gray-300 leading-7">
              Several universities follow American-style medical curriculum structures.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Global Licensing Pathways
            </h2>

            <p className="text-gray-300 leading-7">
              Students may pursue USMLE, PLAB and MCCQE licensing routes.
            </p>

          </div>

        </div>

      </section>

      {/* UNIVERSITIES */}
      <section className="px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">

            Popular Medical Universities in Barbados

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
              ✔ English-medium MBBS/MD programs available
            </li>

            <li>
              ✔ Valid passport and visa required
            </li>

            <li>
              ✔ PCB eligibility criteria applicable
            </li>

            <li>
              ✔ International travel and insurance documentation needed
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

                Is MBBS in Barbados valid in India?

              </h3>

              <p className="text-gray-300 leading-7">

                Students should carefully verify whether their university
                and clinical training structure fully comply with current
                NMC/FMGL regulations before admission.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">

              <h3 className="text-2xl font-semibold mb-4">

                Is Barbados good for USMLE preparation?

              </h3>

              <p className="text-gray-300 leading-7">

                Many Caribbean universities follow US-oriented curriculum
                models that may support USMLE preparation pathways.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}