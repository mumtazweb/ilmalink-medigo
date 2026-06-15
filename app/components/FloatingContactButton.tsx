"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname?.() ?? (typeof window !== "undefined" ? window.location.pathname : "");
  const isAlertPage = pathname?.startsWith?.("/alert");

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
        className={`group fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 transition duration-300 md:block ${
          isFooterVisible ? "pointer-events-none translate-x-full opacity-0" : "opacity-100"
        }`}
        aria-label="Open contact counselling form"
      >
        {/* Button Container */}
        <div className="relative flex h-72 w-16 items-center justify-center">
          {/* Background Gradient */}
          <div className={`absolute inset-0 rounded-l-3xl shadow-lg transition-shadow duration-300 group-hover:shadow-xl ${isAlertPage ? 'bg-gradient-to-b from-[#D72626] to-[#8B1A1A]' : 'bg-gradient-to-b from-[#0F4CFF] to-[#0b3fd6]'}`} />

          {/* Glow Effect on Hover */}
          <div className={`absolute inset-0 rounded-l-3xl ${isAlertPage ? 'bg-gradient-to-b from-[#D72626] to-[#8B1A1A]' : 'bg-gradient-to-b from-[#0F4CFF] to-[#0b3fd6]'} opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50`} />

          {/* Premium Border */}
          <div className="absolute inset-0 rounded-l-3xl border border-white/20 transition-colors duration-300 group-hover:border-white/40" />

          {/* Floating Pulse Animation */}
          <div className="absolute inset-0 animate-pulse rounded-l-3xl bg-white/5" />

          {/* Text Content - Vertical Writing Mode */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            {/* Vertical Text - Read from Bottom to Top */}
            <span
              className="text-sm font-bold leading-tight tracking-widest text-white"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
              }}
            >
              CONTACT NOW
            </span>

            {/* Decorative Dividers */}
            <div className="my-2 h-2 w-0.5 rounded-full bg-white/40" />
          </div>

          {/* Interactive Hover State */}
          <div className="absolute inset-0 rounded-l-3xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Hover Tooltip (Hidden on Mobile) */}
        <div className={`absolute right-full mr-2 top-1/2 -translate-y-1/2 text-white px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block shadow-lg ${isAlertPage ? 'bg-[#D72626]' : 'bg-[#0F4CFF]'}`}>
          {isAlertPage ? 'Report Fraud / Contact' : 'Get Expert Guidance'}
          <div className={`absolute left-full top-1/2 -translate-y-1/2 w-2 h-2 rounded-sm transform -rotate-45 ${isAlertPage ? 'bg-[#D72626]' : 'bg-[#0F4CFF]'}`} />
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
