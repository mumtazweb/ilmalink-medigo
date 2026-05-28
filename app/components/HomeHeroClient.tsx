"use client";

import { useState } from "react";
import HeroTyping from "./HeroTyping";
import CounsellingPopup from "./CounsellingPopup";

// BLOG SYSTEM: Keeps existing homepage counselling popup behavior while page data loads on the server.
export default function HomeHeroClient() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      {/* HERO SECTION */}
      {/* STYLE UPDATED: More comfortable fixed-header offset and section rhythm. */}
      <section className="w-full mt-[88px] md:mt-[96px] lg:mt-[112px]">
        {/* STYLE UPDATED: Premium, calm medical background without noisy color mixing. */}
        <div className="relative overflow-hidden bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] py-16 md:py-20 lg:py-24">
          {/* Soft Green Glow */}
          <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-[#0F4CFF]/10"></div>

          {/* Soft Red Accent */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"></div>

          {/* Subtle Pattern */}
          <div className="absolute inset-0 opacity-[0.025]">
            <div className="h-full w-full bg-[radial-gradient(#0F4CFF_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          </div>

          {/* HERO CONTENT */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <HeroTyping />

            {/* CTA BUTTONS */}
            {/* STYLE UPDATED: Consistent premium button sizing, spacing, and hierarchy. */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-10">
              {/* BOOK COUNSELLING */}
              <button
                onClick={() => setShowPopup(true)}
                className="min-h-12 rounded-full bg-[#0F4CFF] px-7 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(15,76,255,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0b3fd6] hover:shadow-[0_18px_34px_rgba(15,76,255,0.28)] sm:px-8"
              >
                Book Counselling
              </button>

              {/* LET'S CONNECT */}
              <a
                href="tel:+919330155576"
                className="min-h-12 rounded-full border border-[#16A34A] bg-white px-7 py-3 text-sm font-bold text-[#16A34A] shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#16A34A] hover:text-white hover:shadow-[0_16px_30px_rgba(22,163,74,0.18)] sm:px-8"
              >
                Let&apos;s Connect
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* POPUP */}
      <CounsellingPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
}
