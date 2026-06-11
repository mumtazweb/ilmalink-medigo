"use client";

import { useEffect, useState } from "react";
import CounsellingPopup from "./CounsellingPopup";

const OPEN_COUNSELLING_EVENT = "ilmalink:open-counselling";

/**
 * ILMALINK MEDIGO: Global floating "CONTACT NOW" sticky button
 * Appears on the right side of all blog pages
 * Opens the existing CounsellingPopup component
 */
export default function FloatingContactButton() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const openPopup = () => setIsPopupOpen(true);
    const consumeUrlOpen = () => {
      const params = new URLSearchParams(window.location.search);

      if (params.get("counselling") === "open") {
        openPopup();
      }
    };

    window.addEventListener(OPEN_COUNSELLING_EVENT, openPopup);
    window.setTimeout(consumeUrlOpen, 0);

    return () => window.removeEventListener(OPEN_COUNSELLING_EVENT, openPopup);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className={`fixed right-0 top-1/2 z-50 -translate-y-1/2 transition duration-300 group ${
          isFooterVisible ? "pointer-events-none translate-x-full opacity-0" : "opacity-100"
        }`}
        aria-label="Open contact counselling form"
      >
        {/* Button Container */}
        <div className="relative h-64 md:h-72 w-14 md:w-16 flex items-center justify-center">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F4CFF] to-[#0b3fd6] rounded-l-3xl shadow-lg group-hover:shadow-xl transition-shadow duration-300" />

          {/* Glow Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F4CFF] to-[#0b3fd6] rounded-l-3xl opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300" />

          {/* Premium Border */}
          <div className="absolute inset-0 rounded-l-3xl border border-white/20 group-hover:border-white/40 transition-colors duration-300" />

          {/* Floating Pulse Animation */}
          <div className="absolute inset-0 rounded-l-3xl animate-pulse bg-white/5" />

          {/* Text Content - Vertical Writing Mode */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            {/* Vertical Text - Read from Bottom to Top */}
            <span
              className="text-white font-bold text-xs md:text-sm leading-tight tracking-widest"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
              }}
            >
              CONTACT NOW
            </span>

            {/* Decorative Dividers */}
            <div className="w-0.5 h-2 bg-white/40 my-2 rounded-full" />
          </div>

          {/* Interactive Hover State */}
          <div className="absolute inset-0 rounded-l-3xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Hover Tooltip (Hidden on Mobile) */}
        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-[#0F4CFF] text-white px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block shadow-lg">
          Get Expert Guidance
          <div className="absolute left-full top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0F4CFF] rounded-sm transform -rotate-45" />
        </div>
      </button>

      {/* Counselling Popup */}
      <CounsellingPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
}
