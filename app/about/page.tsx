import Link from "next/link";
import { Metadata } from "next";

// --- METADATA for SEO ---
export const metadata: Metadata = {
  title: "About ILMALINK MEDIGO | Medical Education Consultant for MBBS Abroad & India",
  description: "ILMALINK MEDIGO provides expert guidance for MBBS admissions abroad and in India. Evidence-based career counselling, verified university partnerships, and transparent admission processes.",
  keywords: "MBBS admission consultant, medical education counselling, study MBBS abroad, MBBS in India guidance, career counselling for doctors, medical university admission, NEET counselling",
  authors: [{ name: "Injamul Hoque Middya", url: "https://x.com/middyaofficial" }],
  openGraph: {
    title: "ILMALINK MEDIGO | Expert Medical Education Counselling",
    description: "Navigate your medical career journey with confidence. Comprehensive guidance for MBBS admissions in India and abroad.",
    url: "https://ilmalink.com/about",
    siteName: "ILMALINK MEDIGO",
    images: [{ url: "https://ilmalink.com/og-about.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ILMALINK MEDIGO | Medical Education Consultant",
    description: "Expert guidance for MBBS admissions and medical education pathways.",
    images: ["https://ilmalink.com/twitter-about.jpg"],
    site: "@middyaofficial",
    creator: "@middyaofficial",
  },
  alternates: { canonical: "https://ilmalink.com/about" },
  robots: { index: true, follow: true },
};

// --- JSON-LD Structured Data ---
const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "ILMALINK MEDIGO",
  url: "https://ilmalink.com",
  logo: "https://ilmalink.com/logoimage.svg",
  description: "Medical education consultancy providing career guidance for MBBS admissions in India and abroad.",
  foundingDate: "2020",
  founder: { "@type": "Person", name: "Injamul Hoque Middya" },
  sameAs: [
    "https://www.facebook.com/share/1Edsb6dJwu/",
    "https://www.instagram.com/injamul_bin_ebrahim_middya",
    "https://www.youtube.com/@injamul.h.middya",
    "https://x.com/middyaofficial",
  ],
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+919330155576", contactType: "customer service" },
    { "@type": "ContactPoint", telephone: "+919563910223", contactType: "customer support", contactOption: "WhatsApp" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          
          {/* Header Section - Brand Colors */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-emerald-600">ilma</span>
              <span className="text-red-600">Link</span>{" "}
              <span className="text-blue-600">Medigo</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 via-red-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Free and seamless medical admission guidance. We provide accurate information, verified university options, 
              and transparent ethical counselling to help students secure MBBS seats in India and abroad.
            </p>
          </div>

          {/* Who We Are & MBBS Scenario Section */}
          <div className="mb-16">
            
            {/* Who We Are - Main Introduction Card */}
            <div className="bg-gradient-to-r from-emerald-50 via-white to-blue-50 rounded-2xl p-6 md:p-8 mb-8 border border-emerald-100 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 text-xl">🏛️</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Who We Are</h2>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong className="text-emerald-700">ILMALINK MEDIGO</strong> is a unit of ilmaLink Foundation, 
                a societal enterprise specializing in education. Through the voluntary engagement of top Indian 
                and international education experts, we bridge the gap between dreams and reality for medical aspirants.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Our national and international connections enable us to provide clear, confident guidance for 
                <strong className="text-emerald-700"> MBBS admissions in India and abroad</strong>. We are dedicated 
                to uplifting Indian youths and students by helping them navigate their medical career journey with 
                transparency and unwavering support.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                We combine deep industry knowledge with personalized counselling to ensure every student receives 
                accurate information and genuine admission pathways to recognized medical institutions.
              </p>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-4 border-t border-emerald-200">
                <div className="flex items-center gap-2 text-sm text-emerald-700">
                  <span className="text-green-600">✓</span>
                  <span>Voluntary experts</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-700">
                  <span className="text-green-600">✓</span>
                  <span>Global connections</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-700">
                  <span className="text-green-600">✓</span>
                  <span>Student-first</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-700">
                  <span className="text-green-600">✓</span>
                  <span>Society-driven</span>
                </div>
              </div>
            </div>

            {/* India's MBBS Reality Section */}
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                India&apos;s MBBS Reality
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 via-red-500 to-blue-500 mx-auto rounded-full"></div>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-4 text-center border border-red-200">
                <div className="text-2xl md:text-3xl font-bold text-red-600">24L+</div>
                <div className="text-xs md:text-sm text-gray-600">NEET Aspirants</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-4 text-center border border-orange-200">
                <div className="text-2xl md:text-3xl font-bold text-orange-600">1.29L</div>
                <div className="text-xs md:text-sm text-gray-600">Total MBBS Seats</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-4 text-center border border-emerald-200">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">63K</div>
                <div className="text-xs md:text-sm text-gray-600">Govt Seats</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 text-center border border-blue-200">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">66K+</div>
                <div className="text-xs md:text-sm text-gray-600">Private Seats</div>
              </div>
            </div>

            {/* The Problem - Gap Section */}
            <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-6 md:p-8 mb-6 border-l-8 border-red-500">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⚠️</span>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">The Gap That Creates Victims</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 text-lg">●</span>
                    <p className="text-gray-700"><strong>Low NEET score?</strong> Government seats remain out of reach</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 text-lg">●</span>
                    <p className="text-gray-700"><strong>Tight budget?</strong> Private college fees become unaffordable</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 text-lg">●</span>
                    <p className="text-gray-700"><strong>This gap creates vulnerability</strong> where fraud thrives</p>
                  </div>
                </div>
                
                <div className="bg-white/60 rounded-xl p-4">
                  <p className="font-semibold text-gray-800 mb-2">⚠️ Exploited by:</p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-center gap-2">• Unregistered agents charging hidden fees</li>
                    <li className="flex items-center gap-2">• Dalals making false admission promises</li>
                    <li className="flex items-center gap-2">• Fraudulent consultants destroying dreams</li>
                    <li className="flex items-center gap-2">• Families losing savings without genuine admission</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Our Societal Response - Approach Section */}
            <div className="bg-gradient-to-r from-emerald-50 via-white to-blue-50 rounded-2xl p-6 md:p-8 border-2 border-emerald-200 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎯</span>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">Our Societal Response</h3>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong className="text-emerald-700">ILMALINK MEDIGO operates on a student-first, society-driven model.</strong> 
                We do not promote any particular college or pathway. We do not charge hidden commissions. 
                We listen to your NEET score, your budget, and your dreams - then guide you toward genuinely achievable options.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-5">
                <strong className="text-emerald-700">We accommodate dreams, not exploit desperation.</strong> 
                Whether government seat, private seat, or MBBS abroad - we provide honest, transparent guidance 
                for every medical aspirant regardless of score or savings.
              </p>
              
              {/* Core Principles Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-emerald-200">
                <div className="text-center p-2">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-emerald-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">No Promotion</p>
                  <p className="text-xs text-gray-500">Of any college</p>
                </div>
                <div className="text-center p-2">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-emerald-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">No Hidden Fees</p>
                  <p className="text-xs text-gray-500">Complete transparency</p>
                </div>
                <div className="text-center p-2">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-emerald-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">Student-First</p>
                  <p className="text-xs text-gray-500">Dreams guide us</p>
                </div>
                <div className="text-center p-2">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-emerald-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">Society-Driven</p>
                  <p className="text-xs text-gray-500">Not profit-first</p>
                </div>
              </div>
            </div>

            {/* 3-Step Commitment */}
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-emerald-600 font-bold text-lg">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">Understand</h4>
                  <p className="text-xs text-gray-600">Your NEET score & budget reality</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold text-lg">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">Guide</h4>
                  <p className="text-xs text-gray-600">Toward genuinely achievable options</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 font-bold text-lg">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">Support</h4>
                  <p className="text-xs text-gray-600">Until admission is secured</p>
                </div>
              </div>
            </div>

            {/* Final Trust Statement */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 italic">
                &quot;Every medical aspirant deserves honest guidance — regardless of NEET score or budget&quot;
              </p>
            </div>
          </div>

          {/* Educational Pathways - MBBS Abroad & MBBS India */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Educational Pathways</h2>
            <p className="text-center text-gray-500 mb-8">Comprehensive guidance across multiple routes</p>
            <div className="grid md:grid-cols-2 gap-6">
              {/* MBBS Abroad */}
              <Link href="/mbbs-abroad" className="group block bg-gradient-to-r from-emerald-50 to-white rounded-xl p-6 border border-emerald-100 hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🌏</span>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition">MBBS Abroad</h3>
                </div>
                <p className="text-gray-600 mb-3">Guidance for medical education in recognized international universities</p>
                <div className="flex flex-wrap gap-2">
                  {["Kyrgyzstan", "Georgia", "Russia", "Kazakhstan", "Bangladesh"].map(c => (
                    <span key={c} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">{c}</span>
                  ))}
                </div>
              </Link>

              {/* MBBS India */}
              <Link href="/mbbs india" className="group block bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-100 hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🇮🇳</span>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">MBBS India</h3>
                </div>
                <p className="text-gray-600 mb-3">Expert guidance for NEET counselling and medical college admissions</p>
                <div className="flex flex-wrap gap-2">
                  {["NEET UG", "Govt Colleges", "Private Colleges", "NRI Quota"].map(c => (
                    <span key={c} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">{c}</span>
                  ))}
                </div>
              </Link>
            </div>
          </div>

{/* Inspiration Section - Al-Ameen Movement & Dr. Mumtaz Ahmed Khan */}
<div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden mb-16 shadow-xl border border-amber-200">
  
  {/* Top Banner Quote */}
  <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-3 text-center">
    <p className="text-white text-sm md:text-base font-medium tracking-wide">
      &quot;Educational empowerment is the foundation of a just society&quot; — Late Dr. Mumtaz Ahmed Khan
    </p>
  </div>

  <div className="p-6 md:p-8">
    
    {/* Heading First */}
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-3xl">🏛️</span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Inspired by Al-Ameen Movement
        </h2>
      </div>
      <div className="w-16 h-0.5 bg-amber-400 mx-auto rounded-full"></div>
    </div>

    {/* Image Second - 2:1 Rectangular */}
    <div className="max-w-2xl mx-auto mb-8">
      <div className="rounded-xl overflow-hidden shadow-2xl ring-4 ring-white">
        <img
          src="/al-ameen-founder.svg"
          alt="Late Dr. Mumtaz Ahmed Khan - Founder of Al-Ameen Movement"
          className="w-full h-auto object-cover"
          style={{ aspectRatio: "2/1" }}
          loading="eager"
        />
      </div>
      
      {/* Image Caption */}
      <div className="text-center mt-3">
        <a 
          href="https://en.wikipedia.org/wiki/Mumtaz_Ahmed_Khan" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-amber-800 font-bold text-sm hover:text-amber-900 underline transition"
        >
          Late Dr. Mumtaz Ahmed Khan
        </a>
        <p className="text-gray-500 text-xs">Founder, Al-Ameen Movement | Established 1966, Bangalore</p>
        <p className="text-gray-400 text-xs mt-1">Educational Empowerment Pioneer | Social Reformer</p>
      </div>
      
      {/* Legacy Link */}
      <div className="flex justify-center mt-3">
        <a 
          href="https://alameeneducationalsociety.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-amber-100 rounded-full px-3 py-1 hover:bg-amber-200 transition"
        >
          <span className="text-amber-700 text-xs font-semibold">🔗 Legacy Since 1966 — Learn More</span>
        </a>
      </div>
    </div>

    {/* Text Content Third - Full Width */}
    <div className="max-w-3xl mx-auto">
      
      <p className="text-gray-700 leading-relaxed mb-4">
        <strong className="text-amber-700">ILMALINK MEDIGO</strong> draws profound inspiration from 
        <a 
          href="https://en.wikipedia.org/wiki/Mumtaz_Ahmed_Khan" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-amber-700 font-bold hover:text-amber-900 underline decoration-amber-300 underline-offset-2 transition mx-1"
        >
          Late Dr. Mumtaz Ahmed Khan
        </a>
        , the visionary founder of the 
        <a 
          href="https://alameeneducationalsociety.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-amber-700 font-bold hover:text-amber-900 underline decoration-amber-300 underline-offset-2 transition mx-1"
        >
          Al-Ameen Movement
        </a>
        established in <strong className="text-amber-700">Bangalore in 1966</strong>.
      </p>
      
      <p className="text-gray-700 leading-relaxed mb-4">
        Dr. Khan&apos;s pioneering work transformed educational access across India. His movement, now led by the 
        <a 
          href="https://alameeneducationalsociety.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-amber-700 font-semibold hover:text-amber-900 underline decoration-amber-300 underline-offset-2 transition mx-1"
        >
          Al-Ameen Educational Society
        </a>
        , established schools, colleges, and institutions that continue empowering thousands of students from all communities, embodying the principle that quality education should never be a privilege but a right.
      </p>
      
      <p className="text-gray-700 leading-relaxed mb-4">
        This legacy of <strong>selfless educational service</strong> and <strong>value-based leadership</strong> 
        directly shapes our philosophy at ILMALINK MEDIGO. We believe every medical aspirant deserves 
        <strong>honest, transparent guidance</strong> — not commercial exploitation.
      </p>
      
      {/* Key Principles Box */}
      <div className="bg-white/70 rounded-xl p-4 mt-4 border-l-4 border-amber-500">
        <p className="text-amber-800 font-semibold text-sm mb-2">What We Inherit from This Legacy:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-amber-600">✓</span> Student-first approach
          </div>
          <div className="flex items-center gap-1">
            <span className="text-amber-600">✓</span> Transparent processes
          </div>
          <div className="flex items-center gap-1">
            <span className="text-amber-600">✓</span> Value-based guidance
          </div>
          <div className="flex items-center gap-1">
            <span className="text-amber-600">✓</span> Societal development focus
          </div>
        </div>
      </div>
    </div>

  </div>

  {/* Bottom Call to Action */}
  <div className="bg-amber-100/50 px-6 py-4 text-center border-t border-amber-200">
    <p className="text-gray-600 text-sm">
      <span className="font-semibold text-amber-700">ILMALINK MEDIGO</span> — Continuing the legacy of 
      <a 
        href="https://alameeneducationalsociety.in/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-amber-700 italic hover:text-amber-900 underline transition mx-1"
      >
        Al-Ameen Educational Society, Bangalore
      </a>
      &apos;s mission of educational empowerment through transparent medical career guidance
    </p>
  </div>
</div>

          {/* Contact Section - Professional SEO Optimized */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden mb-16 shadow-2xl">
            
            {/* Top Accent Bar */}
            <div className="h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500"></div>
            
            <div className="p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                
                {/* Left Side - Text Content */}
                <div className="text-center md:text-left">
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
                    📢 Free Consultation
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Begin Your Medical Career Journey
                  </h2>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                    Schedule a consultation to discuss your educational goals, NEET score, budget, 
                    and receive personalized guidance from our experts.
                  </p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <span className="text-emerald-500">✓</span> 100% Free
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <span className="text-emerald-500">✓</span> No Obligation
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <span className="text-emerald-500">✓</span> Expert Guidance
                    </div>
                  </div>
                </div>

                {/* Right Side - Contact Icons with Labels */}
                <div>
                  <div className="grid grid-cols-3 gap-4">
                    
                    <a 
                      href="tel:+919330155576" 
                      className="group bg-white/10 hover:bg-blue-600 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105"
                      aria-label="Call us at +91 9330155576"
                    >
                      <div className="w-12 h-12 bg-blue-500/20 group-hover:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 transition">
                        <svg className="w-6 h-6 text-blue-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <p className="text-white font-semibold text-sm">Call </p>
                      <p className="text-gray-400 text-xs group-hover:text-gray-200 transition">+91 9330155576</p>
                    </a>

                    <a 
                      href="https://wa.me/919563910223" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group bg-white/10 hover:bg-emerald-600 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105"
                      aria-label="WhatsApp us at +91 9563910223"
                    >
                      <div className="w-12 h-12 bg-emerald-500/20 group-hover:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 transition">
                        <svg className="w-6 h-6 text-emerald-400 group-hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.01-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        </svg>
                      </div>
                      <p className="text-white font-semibold text-sm">Chat</p>
                      <p className="text-gray-400 text-xs group-hover:text-gray-200 transition">+91 9563910223</p>
                    </a>

                    <a 
                      href="mailto:middya@ilmalink.com" 
                      className="group bg-white/10 hover:bg-gray-600 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105"
                      aria-label="Email us at middya@ilmalink.com"
                    >
                      <div className="w-12 h-12 bg-gray-500/20 group-hover:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 transition">
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-white font-semibold text-sm">Email Us</p>
                      <p className="text-gray-400 text-xs group-hover:text-gray-200 transition">middya@ilmalink.com</p>
                    </a>

                  </div>
                </div>

              </div>

              {/* Logo & Social Section */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  
                  <div className="flex items-center gap-3">
                    <img 
                      src="/logoimage.svg" 
                      alt="ILMALINK MEDIGO Logo" 
                      className="w-10 h-10 bg-white rounded-full p-1.5"
                    />
                    <div>
                      <p className="text-white text-sm font-semibold">ILMALINK MEDIGO</p>
                      <p className="text-gray-500 text-xs">MBBS Admission - NEET Counselling Expert</p>
                    </div>
                  </div>

                  <div className="text-center md:text-right">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>Available -All days |</span>
                    </div>
                    <p className="text-gray-600 text-xs mt-1">NEET & Career counselling </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer Tagline - Enhanced SEO */}
          <div className="text-center py-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm mb-2">
              <span className="text-emerald-600 font-semibold">ilma</span>
              <span className="text-red-600 font-semibold">Link</span>{" "}
              <span className="text-blue-600 font-semibold">Medigo</span> — Linking Dreams to Destination
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-3 text-xs text-gray-400">
              <Link href="/mbbs-abroad" className="hover:text-emerald-600 transition">MBBS Abroad</Link>
              <span>•</span>
              <a href="/mbbs india" className="hover:text-emerald-600 transition">MBBS India</a>
              <span>•</span>
              <a href="/neet" className="hover:text-emerald-600 transition">NEET Guidance</a>
              <span>•</span>
              <a href="/contact" className="hover:text-emerald-600 transition">Contact Us</a>
            </div>
            
            <p className="text-gray-400 text-xs mt-4">
              © {new Date().getFullYear()} ILMALINK MEDIGO. All rights reserved.
            </p>
          </div>

        </div>
      </main>
    </>
  );
}
