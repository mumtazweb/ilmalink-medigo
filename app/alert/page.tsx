import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/navbar";
import {
  AlertTriangle,
  ShieldCheck,
  XCircle,
  CheckCircle,
  FileWarning,
  ExternalLink,
} from "lucide-react";

export const revalidate = 3600;
export const runtime = "nodejs";

export const metadata: Metadata = {
  title:
    "Student Alert: MBBS/BDS Admission Fraud in India & Abroad | ILMALINK MEDIGO",
  description:
    "Important alert for Indian students and parents: no agent can directly admit students to MBBS, BDS or NEET-UG courses in India. Learn how to avoid fake admission promises, cash traps, fake allotment letters and MBBS abroad agency fraud.",
  keywords: [
    "MBBS admission fraud",
    "BDS admission fraud",
    "NEET UG admission alert",
    "MBBS direct admission fraud",
    "MBBS admission agent fraud",
    "MBBS abroad agent fraud",
    "fake allotment letter",
    "medical admission scam India",
    "MBBS abroad scam",
    "NEET counselling fraud",
    "MCC counselling",
    "MBBS India admission",
    "MBBS abroad safety checklist",
    "ILMALINK MEDIGO alert",
  ],
  alternates: {
    canonical: "https://www.ilmalink.com/alert/",
  },
  openGraph: {
    title:
      "Student Alert: MBBS/BDS Admission Fraud in India & Abroad | ILMALINK MEDIGO",
    description:
      "Protect Indian students and parents from MBBS/BDS admission fraud risks in India and abroad. Verify NEET, MCC, NMC and WDOMS before paying any agency.",
    url: "https://www.ilmalink.com/alert/",
    siteName: "ILMALINK MEDIGO",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const FAQ_ITEMS = [
  {
    question: "Can an agent directly admit me to MBBS or BDS in India?",
    answer:
      "No agent can legally bypass NEET rank, official counselling, choice filling, seat availability, document verification and official allotment for MBBS/BDS admission in India.",
  },
  {
    question: "Is counselling guidance allowed?",
    answer:
      "Yes. Data guidance, cutoff analysis, choice-filling support and document guidance are useful. But seat-selling, fake allotment, cash confirmation and backdoor admission promises are fraud risks.",
  },
  {
    question: "Should I pay cash to an agent for MBBS admission in India?",
    answer:
      "No. Students should not pay cash, token money or personal-account transfers to agents. Valid payments should be made only through official counselling, college or university channels after proper allotment.",
  },
  {
    question: "Is MBBS abroad also risky?",
    answer:
      "MBBS abroad can be a valid route, but students must verify eligibility, WDOMS listing, university recognition, accreditation, local licence eligibility, course duration, internship, fees and FMGE/NExT risk.",
  },
  {
    question: "What should I verify before paying an MBBS abroad agency?",
    answer:
      "Verify NEET requirement, country eligibility, PCB marks, WDOMS listing, recognition, accreditation, local licence eligibility, course duration, hostel, official fee route, visa process, refund policy and written agreement.",
  },
];

function JsonLdScripts() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.ilmalink.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Alert",
        item: "https://www.ilmalink.com/alert/",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "MBBS/BDS Admission Fraud Alert & MBBS Abroad Agent Safety Checklist",
    description:
      "Important alert and safety checklist to protect Indian students and parents from medical admission fraud risks in India and abroad.",
    mainEntityOfPage: "https://www.ilmalink.com/alert/",
    author: { "@type": "Organization", name: "ILMALINK MEDIGO" },
    publisher: { "@type": "Organization", name: "ILMALINK MEDIGO" },
  };

  return (
    <>
      {/* Geo meta tags (search engines may use these) */}
      <meta name="geo.placename" content="Kolkata, West Bengal, India" />
      <meta name="geo.region" content="IN-WB" />
      <meta name="geo.position" content="22.5726;88.3639" />
      <meta name="ICBM" content="22.5726, 88.3639" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    </>
  );
}

export default function AlertPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#FFF8F6] via-[#FFF1EE] to-[#FFF5F3] text-[#071B35]">
      <Navbar />

      <JsonLdScripts />

      {/* Alert-style background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3b0f0f] via-[#6b1414] to-transparent opacity-60" />
        <div className="absolute inset-0 opacity-30" style={{ background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0 12px, rgba(0,0,0,0.03) 12px 24px)' }} />
        <svg className="absolute right-0 top-0 h-full w-1/2 opacity-10" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.06" />
            </linearGradient>
          </defs>
          <rect width="800" height="800" fill="url(#g1)" />
        </svg>
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl p-6 perspective-1000" aria-hidden>
          <div className="absolute -inset-1 bg-gradient-to-br from-[#FFEEEC] via-[#FFF2EE] to-[#FFF5F3] opacity-90 blur-3xl transform-gpu rotate-2" />
          <div className="relative z-10 grid gap-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-[0_30px_90px_rgba(8,20,20,0.45)] md:grid-cols-2" style={{ transformStyle: 'preserve-3d' }}>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-bold text-amber-800 backdrop-blur-sm">
                <AlertTriangle size={14} /> Student Safety Alert
              </span>

              <h1 className="mt-4 text-2xl font-extrabold leading-tight text-[#081B35] md:text-4xl">MBBS/BDS Admission Fraud in India & MBBS Abroad Agent Safety Checklist</h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">No agent, broker, middleman, private caller or college-owner contact can legally bypass NEET rank and official counselling to give an MBBS/BDS seat in India. Guidance is useful. Seat-selling is a fraud risk.</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur">No cash to agents</span>
                <span className="inline-flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur">No fake direct admission</span>
                <span className="inline-flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur">Official counselling only</span>
                <span className="inline-flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur">Student safety first</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a href="#india-alert" className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-bold text-white shadow-2xl transform hover:-translate-y-0.5">Read India Alert</a>
                <a href="#abroad-checklist" className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-white/60 px-4 py-2 text-sm font-bold text-amber-700 hover:bg-amber-50">MBBS Abroad Checklist</a>
                <Link href="/create-account/" className="inline-flex items-center gap-2 rounded-lg border border-[#00C896] bg-[#00C896]/10 px-4 py-2 text-sm font-bold text-[#008f72]">Contact ILMALINK</Link>
              </div>
            </div>

                <div className="mt-2 flex items-start justify-end">
              <div className="grid gap-3 w-full sm:w-auto" style={{ transform: 'translateZ(40px)' }}>
                <div className="flex items-start gap-3 rounded-xl bg-white/20 p-4 backdrop-blur-lg ring-1 ring-white/20 shadow-[0_18px_50px_rgba(200,30,30,0.24)]" style={{ transform: 'translateZ(30px)' }}>
                  <FileWarning size={20} className="text-amber-700" />
                  <div>
                    <p className="text-sm font-bold text-amber-900">Official process only</p>
                    <p className="mt-1 text-xs text-amber-900/90">Check NEET, MCC and state counselling portals</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-lg ring-1 ring-white/10 shadow-[0_14px_40px_rgba(8,27,53,0.12)]" style={{ transform: 'translateZ(18px)' }}>
                  <ShieldCheck size={20} className="text-emerald-600" />
                  <div>
                    <p className="text-sm font-bold text-[#081B35]">Verify recognition</p>
                    <p className="mt-1 text-xs text-slate-600">Confirm WDOMS, NMC and local accreditation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INDIA ALERT */}
        <section id="india-alert" className="mt-8">
          <h2 className="text-xl font-extrabold text-[#081B35]">India MBBS/BDS Admission Truth</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <p className="text-sm text-slate-700">
                In India, MBBS/BDS admission happens through NEET-UG rank, official counselling, category rules,
                seat availability, choice filling, document verification and official fee payment. A genuine counsellor may guide a student
                with data, cutoff analysis and choice filling, but no agent can legally create or sell an MBBS/BDS seat outside the
                official counselling process.
              </p>

              <div className="mt-4 rounded-lg border border-red-100 bg-red-50 p-4">
                <div className="flex items-start gap-3">
                  <XCircle size={22} className="text-red-700" />
                  <div>
                    <p className="text-sm font-bold text-red-800">If anyone promises direct admission, treat it as fraud risk</p>
                    <p className="mt-1 text-sm text-red-800/90">If anyone says they can directly admit you to MBBS, BDS or any NEET-UG based course in India through agent network, college owner, donation, cash, backdoor seat or secret quota, treat it as a serious fraud risk.</p>
                  </div>
                </div>
              </div>

              <h3 className="mt-6 text-lg font-bold text-[#081B35]">Why money alone cannot give an MBBS seat in India</h3>
              <p className="mt-2 text-sm text-slate-700">
                India has far more NEET aspirants than available MBBS seats. Many families may be financially ready, but rank,
                category, state quota, fee limit, seat matrix, choice filling and official counselling rules still decide admission. A low rank cannot be converted into a valid MBBS/BDS allotment by cash or private promise.
              </p>

              <h3 className="mt-6 text-lg font-bold text-[#081B35]">Why medical colleges do not need agents to sell MBBS seats</h3>
              <p className="mt-2 text-sm text-slate-700">
                MBBS seats in India are limited and demand is very high. Officially participating colleges fill seats through MCC or state counselling systems.
                A claim that a college owner has secretly given seats to an outside agent should be treated as suspicious.
              </p>

              <h3 className="mt-6 text-lg font-bold text-[#081B35]">Direct admission red flags</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "I will give you direct MBBS admission in India",
                  "Pay cash and your seat will be confirmed",
                  "Low rank does not matter",
                  "I know the college owner",
                  "Management seat is available outside counselling",
                  "No need to wait for official counselling",
                  "We will manage allotment letter",
                  "Do not register in official counselling",
                  "Pay token money now to block the seat",
                  "Do not tell anyone, this is internal quota",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white p-3">
                    <AlertTriangle size={18} className="text-amber-600" />
                    <p className="text-sm font-semibold text-slate-800">{t}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="text-sm font-extrabold text-[#081B35]">15 Safety Checks Before Trusting Anyone for MBBS/BDS Admission in India</h4>
              <ol className="mt-3 grid gap-2 text-sm text-slate-700">
                {[
                  "Check NEET score, percentile, category and rank from the official result.",
                  "Identify the correct counselling authority: MCC, state counselling, deemed university, or NRI quota route.",
                  "Check the official seat matrix and participating college list.",
                  "Check previous-year cutoff and closing rank trends.",
                  "Understand rank reality. Low rank cannot be magically converted into a valid seat.",
                  "Register only on the official counselling portal.",
                  "Understand your own choice filling even if a counsellor guides you.",
                  "Trust only official allotment letters generated from official counselling portals.",
                  "Verify college recognition and course details from official sources.",
                  "Check official fee structure, hostel fee, security deposit and other charges.",
                  "Never pay cash, token money or personal-account transfer to an agent.",
                  "Pay only to official counselling, college or university channels after valid allotment.",
                  "Keep original and scanned documents ready.",
                  "Track reporting date and document-verification deadline carefully.",
                  "Keep written records, receipts, screenshots and counselling documents safely.",
                ].map((check, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-700">{i + 1}</span>
                    <span>{check}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4">
                <Link href="/create-account/" className="inline-flex items-center gap-2 rounded-lg border border-[#00C896] bg-[#00C896]/10 px-3 py-2 text-sm font-bold text-[#008f72]">Contact ILMALINK</Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Fraud reporting & victim support (legally-safe) */}
        <section id="fraud-reporting" className="mt-10">
          <h2 className="text-xl font-extrabold text-[#081B35]">Fraud reporting & victim support</h2>

          <p className="mt-3 text-sm text-slate-700">If you believe you have been targeted by an admission fraudster or agency, act quickly. The guidance below is legally-safe, practical, and focuses on protecting victims and preserving evidence. ILMALINK MEDIGO does not publish unverified allegations or personal names without reliable public sources.</p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="text-sm font-bold text-[#081B35]">If someone is already a victim — immediate steps</h4>
              <ol className="mt-3 list-decimal pl-5 text-sm text-slate-700">
                <li>Stop further payments and record the payer details and transaction IDs.</li>
                <li>Preserve all communications: WhatsApp messages, SMS, emails, receipts, photos and screenshots (do not delete them).</li>
                <li>Take dated screenshots and export chat backups where possible.</li>
                <li>Contact your bank immediately to attempt a recall or report unauthorized transfers; ask about chargeback or fraud complaint procedures.</li>
                <li>File a police complaint (FIR) at your local police station — insist on a written FIR number and keep a copy.</li>
                <li>Report online/cybercrime: use the Indian National Cyber Crime Reporting Portal (https://cybercrime.gov.in/) or your country’s official cybercrime portal.</li>
                <li>If you are being threatened or blackmailed, inform the police and avoid direct confrontation; seek legal advice where available.</li>
                <li>Contact ILMALINK for guidance and to help document the steps you have taken.</li>
              </ol>
              <div className="mt-4">
                <Link href="/create-account/" className="inline-flex items-center gap-2 rounded-lg border border-[#00C896] bg-[#00C896]/10 px-3 py-2 text-sm font-bold text-[#008f72]">Contact ILMALINK</Link>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="text-sm font-bold text-[#081B35]">How fraudsters often intimidate or restrain victims</h4>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
                <li>Threats of exposing private conversations or fabricated documents.</li>
                <li>False claims that police or officials will take action unless money is paid.</li>
                <li>Repeated calls and aggressive messaging to pressure payment.</li>
                <li>Promises that paying more will solve the issue or remove evidence.</li>
                <li>Use of cloned letterheads or fake allotment PDFs to create urgency and fear.</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">If you are being blackmailed, preserve evidence and inform police immediately; do not comply with extortion demands without legal advice.</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h4 className="text-sm font-bold text-[#081B35]">Verified case reports & West Bengal example (placeholders)</h4>
            <p className="mt-2 text-sm text-slate-700">ILMALINK does not publish unverified lists of individuals. We can include names and court-case references only when supported by reliable public sources (news reports, court records or police press releases). Below we provide placeholders you can replace with verified links or documents.</p>
            <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
              <li>Example: <span className="font-semibold">West Bengal arrests —</span> <em>replace with a verified news link or court document URL</em></li>
              <li>Example: <span className="font-semibold">Reported agency cases —</span> <em>replace with verified case links</em></li>
            </ul>
            <p className="mt-3 text-sm text-slate-700">If you have published, reliable links (news articles, police press releases, or court dockets), share them with ILMALINK and we will add the verified case summaries and court references here.</p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="text-sm font-bold text-[#081B35]">Official reporting contacts (examples)</h4>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
                <li>National Cyber Crime Reporting Portal: <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="text-amber-700">cybercrime.gov.in</a></li>
                <li>Local police station: call your city police control room or visit the nearest station to file an FIR.</li>
                <li>State-specific consumer helpline and police cyber cell — check your state police website for numbers.</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">Note: phone numbers and helplines vary by state and country. We will add verified hotline numbers once sourced from official websites.</p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="text-sm font-bold text-[#081B35]">Legal safe-guarding & evidence checklist</h4>
              <ol className="mt-3 list-decimal pl-5 text-sm text-slate-700">
                <li>Export and back up chat histories and emails with timestamps.</li>
                <li>Take clear screenshots that include sender/receiver and timestamps.</li>
                <li>Collect bank transaction proofs and ask your bank for the transaction trace.</li>
                <li>Keep copies of any documents or alleged allotment letters; do not alter originals.</li>
                <li>Get a written acknowledgement of your FIR and keep the FIR number safe.</li>
              </ol>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h4 className="text-sm font-bold text-[#081B35]">Contact ILMALINK Legal Support</h4>
            <p className="mt-2 text-sm text-slate-700">If you are a victim of admission fraud, ILMALINK has an internal legal team that may help victims with documentation, evidence preservation, referral to local counsel, and guidance on properly reporting to police and cyber cells. ILMALINK can assist only through proper legal channels and does not replace formal police or court action.</p>
            <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
              <li>How ILMALINK can help: document review, drafting complaint templates, referrals to local lawyers, and liaising with police on behalf of the student where appropriate.</li>
              <li>What ILMALINK cannot do: act as a law firm for you, guarantee legal outcomes, or publish unverified personal accusations.</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/create-account/" className="inline-flex items-center gap-2 rounded-lg border border-[#00C896] bg-[#00C896]/10 px-3 py-2 text-sm font-bold text-[#008f72]">Contact ILMALINK</Link>
              <a href="mailto:middya@ilmalink.com" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800">Email Legal Team</a>
              <a href="https://wa.me/919563910223" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800">WhatsApp</a>
            </div>
          </div>
        </section>

        {/* Fraud patterns */}
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-[#081B35]">Common Medical Admission Fraud Patterns</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="flex items-center gap-2 text-sm font-bold text-[#081B35]"><FileWarning size={16} /> Fake allotment letter risk</h4>
              <p className="mt-2 text-sm text-slate-700">Students have been warned in different counselling seasons to verify allotment letters only from official counselling portals. Genuine allotment must come through official systems, not through private WhatsApp forwards, email attachments or agent-created PDFs.</p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="flex items-center gap-2 text-sm font-bold text-[#081B35]"><XCircle size={16} /> Confirmed admission scam risk</h4>
              <p className="mt-2 text-sm text-slate-700">Reported admission scams often use emotional pressure, fake receipts, fake letterheads and “confirmed seat” promises. A promise is not admission unless the official counselling route confirms it.</p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="flex items-center gap-2 text-sm font-bold text-[#081B35]"><AlertTriangle size={16} /> NRI quota misuse and forged documents</h4>
              <p className="mt-2 text-sm text-slate-700">Students should never use fake documents, fake NRI records or quota manipulation. A medical career should never start with fraud.</p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="flex items-center gap-2 text-sm font-bold text-[#081B35]"><ExternalLink size={16} /> MBBS abroad agency fraud risk</h4>
              <p className="mt-2 text-sm text-slate-700">Fraud risk also exists abroad. Students must verify university fee accounts, admission letters, recognition, visa route, hostel and total cost before paying any agency.</p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="flex items-center gap-2 text-sm font-bold text-[#081B35]"><AlertTriangle size={16} /> Fee-discount & cash-demand pattern</h4>
              <p className="mt-2 text-sm text-slate-700">A commonly reported pattern: intermediaries claim a college can offer a large discount on official fees (sometimes many lakhs) if the family pays in cash. Victims are told to pay cash for 'discounted' fees; initially the arrangement may appear to work for the first year, but later the promised adjustment is not honoured or additional payments are demanded. In practice, verified official discounts rarely exceed ₹4–5 lakh; claims of much larger reductions are strongly suspect.</p>
              <p className="mt-2 text-sm text-slate-700">Advice: never pay large sums in cash; insist on official college invoices and signed agreements; make payments only through official university or counselling payment channels; keep bank proofs and refuse off-the-record cash transactions. If pressured or extorted, preserve evidence and report to police and your bank immediately.</p>
            </div>
          </div>
        </section>

        {/* Abroad Checklist */}
        <section id="abroad-checklist" className="mt-10">
          <h2 className="text-xl font-extrabold text-[#081B35]">MBBS Abroad Agency Alert</h2>
          <p className="mt-3 text-sm text-slate-700">MBBS abroad can be a valid route for Indian students, but it should never be chosen blindly. Students must verify eligibility, recognition, accreditation, WDOMS listing, local licence eligibility, course duration, internship structure, official fee route and FMGE/NExT risk before paying any agency.</p>

          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h4 className="text-sm font-extrabold text-[#081B35]">15 Checks Before Paying Any MBBS Abroad Agency</h4>
            <ol className="mt-3 grid gap-2 text-sm text-slate-700">
              {[
                "Check NEET-related requirement for Indian students.",
                "Check country-specific eligibility. Nepal, Bangladesh, Kyrgyzstan, Georgia and Russia are not the same.",
                "Check PCB marks requirement.",
                "Check the exact medical school name in WDOMS.",
                "Check whether the university is legally recognised in that country.",
                "Check current accreditation and approval status.",
                "Check local medical registration or licence eligibility after graduation.",
                "Verify course duration, internship and clinical-training structure.",
                "Verify English-medium claim for lectures, exams and clinical teaching.",
                "Check hospital attachment, patient flow and clinical exposure.",
                "Pay university fees only through official university account or documented official route.",
                "Verify hostel, food, local support and safety.",
                "Understand visa process, renewal and post-arrival registration.",
                "Plan FMGE/NExT preparation from the first year.",
                "Get university name, fee, hostel, refund policy, service charge and risk note in writing.",
              ].map((c, i) => (
                <li key={i} className="flex gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-700">{i + 1}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ol>
          
            <div className="mt-4">
              <Link href="/create-account/" className="inline-flex items-center gap-2 rounded-lg border border-[#00C896] bg-[#00C896]/10 px-3 py-2 text-sm font-bold text-[#008f72]">Contact ILMALINK</Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="text-sm font-bold text-[#081B35]">Nepal MBBS: Not simple direct admission</h4>
              <p className="mt-2 text-sm text-slate-700">Nepal MBBS should not be treated as simple direct admission abroad. Students must understand individual PCB and NEET benchmarks, limited foreign seats and matching rules.</p>
              <Link href="/mbbs-abroad/nepal/" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-700">Read Nepal guidance</Link>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="text-sm font-bold text-[#081B35]">Kyrgyzstan MBBS: Accreditation check is essential</h4>
              <p className="mt-2 text-sm text-slate-700">Kyrgyzstan may be comparatively simpler than Nepal in eligibility, but students must verify latest accreditation, WDOMS listing, English medium, local licence eligibility, clinical exposure and NMC/FMGE compliance.</p>
              <Link href="/mbbs-abroad/kyrgyzstan/" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-700">Read Kyrgyzstan guidance</Link>
            </div>
          </div>
        </section>

        {/* ILMALINK SECTION */}
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-[#081B35]">What ILMALINK MEDIGO does</h2>
          <p className="mt-3 text-sm text-slate-700">ILMALINK MEDIGO does not promote blind admission selling. We focus on counselling guidance, data guidance, eligibility verification, cutoff understanding, country comparison, university comparison, risk analysis, scholarship and loan guidance, official source awareness and student safety.</p>

          <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-slate-700">
            {[
              "Counselling guidance",
              "Data guidance",
              "Cutoff analysis",
              "Choice-filling support",
              "Country comparison",
              "University comparison",
              "Eligibility verification",
              "Risk analysis",
              "Scholarship and loan guidance",
              "Official-source awareness",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle size={16} className="text-emerald-600 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl bg-white/30 backdrop-blur ring-1 ring-white/30 p-4 shadow-[0_14px_34px_rgba(8,27,53,0.08)]">
            <h4 className="text-sm font-extrabold text-[#081B35]">About ILMALINK MEDIGO</h4>
            <p className="mt-2 text-sm text-slate-700">ILMALINK MEDIGO is not an agency. We act as a watchdog and information service with internal news and resources. Our team includes members with over 10 years' experience in the medical education sector, including college administration, NEET tutoring and counselling-system experience. We publish verified guidance to protect students and parents from fraud risks.</p>
            <div className="mt-3 flex gap-3">
              <Link href="/create-account/" className="inline-flex items-center gap-2 rounded-lg border border-[#00C896] bg-[#00C896]/10 px-4 py-2 text-sm font-bold text-[#008f72]">Contact ILMALINK</Link>
              <a href="/blogs" className="inline-flex items-center gap-2 rounded-lg bg-white/50 px-4 py-2 text-sm font-semibold text-slate-800">Read internal news</a>
            </div>
          </div>
        </section>

        {/* What we do not claim */}
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-[#081B35]">What ILMALINK MEDIGO does not claim</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Guaranteed MBBS admission in India",
              "Direct MBBS admission outside counselling",
              "Rank manipulation",
              "Fake quota adjustment",
              "Cash seat confirmation",
              "Fake allotment letter",
              "Guaranteed FMGE/NExT pass",
              "Admission without eligibility",
              "Admission through illegal shortcuts",
            ].map((t) => (
              <div key={t} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex items-start gap-3">
                  <XCircle size={18} className="text-red-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{t}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Official Links */}
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-[#081B35]">Official links students should verify</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a href="https://neet.nta.nic.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <ExternalLink size={18} /> NEET UG
            </a>
            <a href="https://mcc.nic.in/ug-medical-counselling/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <ExternalLink size={18} /> MCC UG Medical Counselling
            </a>
            <a href="https://www.nmc.org.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <ExternalLink size={18} /> National Medical Commission (NMC)
            </a>
            <a href="https://www.nmc.org.in/information-desk/for-students-to-study-in-abroad/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <ExternalLink size={18} /> NMC — Students to Study Abroad
            </a>
            <a href="https://search.wdoms.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <ExternalLink size={18} /> WDOMS (World Directory of Medical Schools)
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-[#081B35]">Frequently asked questions</h2>
          <div className="mt-4 grid gap-4">
            {FAQ_ITEMS.map((f) => (
              <div key={f.question} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <h4 className="text-sm font-bold text-[#081B35]">{f.question}</h4>
                <p className="mt-2 text-sm text-slate-700">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-12 mb-24">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-6 text-center shadow-sm">
            <h3 className="text-lg font-extrabold text-[#081B35]">Student safety first. Admission later.</h3>
            <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-700">For Indian MBBS/BDS admission, no agent can legally give a direct seat outside official counselling. For MBBS abroad, students must verify eligibility, recognition, accreditation, WDOMS listing, local licence eligibility, total fee and FMGE/NExT risk before paying any agency.</p>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/mbbs-india/" className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-bold text-white">Explore MBBS India Guidance</Link>
              <Link href="/mbbs-abroad/" className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700">Explore MBBS Abroad Guidance</Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}