"use client";

import { useState } from "react";
import Link from "next/link";

const announcements = [
  {
    title: "NEET 2026 Updates",
    href: "https://www.mumtazeducation.com",
  },
  {
    title: "Admissions Open in 20+ Countries",
    href: "/mbbs-abroad",
  },
  {
    title: "Scholarship Updates",
    href: "/blogs/scholarships-for-medical-students-what-to-prepare",
  },
  {
    title: "Counselling Updates",
    href: "/?counselling=open",
  },
  {
    title: "MBBS Abroad Admission Alerts",
    href: "/alert",
  },
];

export default function AnnouncementTicker() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <nav
      className="w-full bg-[#081B35]"
      aria-label="Announcement ticker"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .ticker-content {
          animation: ticker-scroll 60s linear infinite;
          animation-play-state: ${isPaused ? "paused" : "running"};
        }

        .ticker-content:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="overflow-hidden">
        <div className="ticker-content flex whitespace-nowrap">
          {/* First iteration */}
          <div className="flex items-center gap-4 px-4 py-1.5 text-sm font-medium text-white/95 md:text-base lg:text-[13px]">
            <span className="shrink-0 text-lg">🔔</span>
            <div className="flex items-center gap-4">
              {announcements.map((announcement, index) => (
                <span key={`first-${index}`} className="flex items-center gap-4">
                  <Link
                    href={announcement.href}
                    className="shrink-0 transition-colors duration-300 hover:text-[#00C896]"
                  >
                    {announcement.title}
                  </Link>
                  {index < announcements.length - 1 && (
                    <span className="shrink-0 text-white/50">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Second iteration for seamless loop */}
          <div className="flex items-center gap-4 px-4 py-1.5 text-sm font-medium text-white/95 md:text-base lg:text-[13px]">
            <span className="shrink-0 text-lg">🔔</span>
            <div className="flex items-center gap-4">
              {announcements.map((announcement, index) => (
                <span key={`second-${index}`} className="flex items-center gap-4">
                  <Link
                    href={announcement.href}
                    className="shrink-0 transition-colors duration-300 hover:text-[#00C896]"
                  >
                    {announcement.title}
                  </Link>
                  {index < announcements.length - 1 && (
                    <span className="shrink-0 text-white/50">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
