import VerificationCounsellingCard from "../../components/VerificationCounsellingCard";

export default function MalaysiaPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white px-6 py-20">

        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16">

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">

              Study MBBS in Malaysia

            </h1>

            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-9">

              Malaysia offers modern infrastructure, globally connected
              universities, advanced healthcare systems and an
              international academic environment for medical students.

            </p>

          </div>

          {/* Main Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl backdrop-blur-sm">

            <h2 className="text-3xl font-bold mb-8 text-blue-300">

              Why Students Consider Malaysia

            </h2>

            <div className="grid md:grid-cols-2 gap-8 text-gray-300 leading-8 text-lg">

              <div className="space-y-5">

                <p>
                  ✅ English-medium medical education
                </p>

                <p>
                  ✅ Advanced hospitals and modern medical facilities
                </p>

                <p>
                  ✅ International student-friendly environment
                </p>

                <p>
                  ✅ Safe and developed urban lifestyle
                </p>

              </div>

              <div className="space-y-5">

                <p>
                  ✅ Exposure to multicultural healthcare systems
                </p>

                <p>
                  ✅ Strong infrastructure and transport systems
                </p>

                <p>
                  ✅ International collaborations in some universities
                </p>

                <p>
                  ✅ Globally recognized academic ecosystem
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* IMPORTANT ALERT */}
      <section className="px-6 pb-20 bg-black text-white">

        <div className="max-w-7xl mx-auto bg-red-500/10 border-2 border-red-500/40 rounded-3xl p-8 shadow-[0_0_40px_rgba(239,68,68,0.12)]">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center text-3xl">

              ⚠️

            </div>

            <div>

              <h2 className="text-4xl font-bold text-red-300">

                Important NMC Alert for Indian Students

              </h2>

              <p className="text-red-200 mt-2">

                Please read carefully before taking MBBS admission in Malaysia.

              </p>

            </div>

          </div>

          <div className="space-y-6 text-gray-300 leading-8 text-lg">

            <p>

              While Malaysia offers internationally recognized medical
              universities and modern infrastructure, Indian students must
              carefully verify NMC Foreign Medical Graduate Regulations
              before admission.

            </p>

            <p className="text-red-200 font-semibold">

              Many foreign medical programs, transfer pathways, internship
              formats or twinning structures may NOT fully satisfy current
              NMC 2021 guidelines for medical licensing in India.

            </p>

            <ul className="space-y-4">

              <li>
                ❌ Some universities may not fulfill same-country internship requirements
              </li>

              <li>
                ❌ Certain programs may not match the required 54-month academic duration
              </li>

              <li>
                ❌ Twinning or transfer models can create FMGL/NMC eligibility complications
              </li>

              <li>
                ❌ Clinical rotations outside the primary university country may affect eligibility
              </li>

              <li>
                ❌ NMC recognition status and compliance may change over time
              </li>

            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold text-yellow-300 mb-4">

                Our Honest Guidance

              </h3>

              <p className="text-gray-300 leading-8">

                Students aiming to practice medicine in India should strongly
                verify the latest NMC/FMGL compliance directly before taking
                admission. Choosing a university solely based on low fees or
                advertisements can create future licensing risks.

              </p>

            </div>

          </div>

        </div>

      </section>
      <VerificationCounsellingCard
        countryName="Malaysia MBBS"
        title="Check Malaysia MBBS eligibility with ILMALINK"
        buttonLabel="Get Malaysia MBBS Counselling"
      />
    </>
  );
}