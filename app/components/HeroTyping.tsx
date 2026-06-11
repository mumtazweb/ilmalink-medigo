"use client";

export default function HeroTyping() {
  const subtitle =
    "Personalized NEET, MBBS & Medical Admission Guidance for India and Abroad";

  return (
    <section className="relative bg-transparent">
      {/* Schema.org markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ILMALINK MEDIGO",
            url: "https://ilmalink.com",
            description: subtitle,
            potentialAction: {
              "@type": "SearchAction",
              target: "https://ilmalink.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* STYLE UPDATED: Better hero breathing room and premium typography balance. */}
      <div className="mx-auto max-w-6xl px-0 py-2 md:py-3">
        {/* Main Heading */}
        <div className="text-center">
          <h1 className="font-bold leading-[1.08] tracking-normal text-[#0F172A]">
            <span className="text-[2.15rem] sm:text-5xl md:text-6xl lg:text-7xl">
              Study
            </span>{" "}
            <span className="inline-block text-[2.15rem] text-[#0F4CFF] sm:text-5xl md:text-6xl lg:text-7xl">
              MBBS
            </span>{" "}
            <span className="text-[2.15rem] sm:text-5xl md:text-6xl lg:text-7xl">
              in
            </span>{" "}
            <span className="inline-block text-[2.15rem] text-[#16A34A] sm:text-5xl md:text-6xl lg:text-7xl">
              INDIA
            </span>{" "}
            <span className="text-[2.15rem] sm:text-5xl md:text-6xl lg:text-7xl">
              &amp;
            </span>{" "}
            <span className="inline-block text-[2.15rem] text-[#0F4CFF] sm:text-5xl md:text-6xl lg:text-7xl">
              Abroad
            </span>
          </h1>

          {/* Subtitle */}
          <div className="mt-5 md:mt-6">
            <p className="mx-auto max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg md:text-xl md:leading-8">
              {subtitle}
            </p>
          </div>
        </div>

        {/* CTA Buttons - REMOVED */}
      </div>
    </section>
  );
}
