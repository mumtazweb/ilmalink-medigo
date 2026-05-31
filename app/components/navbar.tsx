"use client";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import AnnouncementTicker from "./AnnouncementTicker";
import CounsellingPopup from "./CounsellingPopup";
import SearchModal from "./SearchModal";
import { Phone, Mail, MessageCircle, Menu, X, ChevronDown, Search, Send, MessageSquare } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const countryDestinations = [
  { href: "/mbbs-abroad/kyrgyzstan", label: "Kyrgyzstan", flag: "kg", badge: "Top" },
  { href: "/mbbs-abroad/georgia", label: "Georgia", flag: "ge", badge: "Top" },
  { href: "/mbbs-abroad/bangladesh", label: "Bangladesh", flag: "bd", badge: "Top" },
  { href: "/mbbs-abroad/russia", label: "Russia", flag: "ru" },
  { href: "/mbbs-abroad/kazakhstan", label: "Kazakhstan", flag: "kz" },
  { href: "/mbbs-abroad/uzbekistan", label: "Uzbekistan", flag: "uz" },
  { href: "/mbbs-abroad/tajikistan", label: "Tajikistan", flag: "tj" },
  { href: "/mbbs-abroad/malaysia", label: "Malaysia", flag: "my" },
  { href: "/mbbs-abroad/egypt", label: "Egypt", flag: "eg" },
  { href: "/mbbs-abroad/saudi-arabia", label: "Saudi Arabia", flag: "sa" },
  { href: "/mbbs-abroad/qatar", label: "Qatar", flag: "qa" },
  { href: "/mbbs-abroad/uae", label: "UAE", flag: "ae" },
  { href: "/mbbs-abroad/iran", label: "Iran", flag: "ir" },
  { href: "/mbbs-abroad/usa", label: "USA", flag: "us" },
  { href: "/mbbs-abroad/canada", label: "Canada", flag: "ca" },
  { href: "/mbbs-abroad/australia", label: "Australia", flag: "au" },
  { href: "/mbbs-abroad/new-zealand", label: "New Zealand", flag: "nz" },
  { href: "/mbbs-abroad/uk", label: "England (UK)", flag: "gb" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCountryOpen, setMobileCountryOpen] = useState(false);
  const [desktopCountryOpen, setDesktopCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [showCounsellingPopup, setShowCounsellingPopup] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcuts for search
  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setShowSearchModal(true);
      }
      // ESC to close search
      if (event.key === "Escape") {
        setShowSearchModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileMenuOpen ? "hidden" : originalOverflow;

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen, mounted]);

  const filteredDestinations = useMemo(() => {
    if (!countrySearch.trim()) return countryDestinations;
    return countryDestinations.filter((destination) =>
      destination.label.toLowerCase().includes(countrySearch.trim().toLowerCase())
    );
  }, [countrySearch]);

  return (
    <>
      <div className="sticky top-0 z-50 overflow-visible bg-white">
  <AnnouncementTicker />
  <header className="relative z-50 border-b border-slate-100/50 bg-white shadow-sm">
          <div className="mx-auto max-w-[1500px] px-3 sm:px-4 lg:px-6 py-2.5">
            <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
              {/* LEFT SECTION: HAMBURGER + BRANDING */}
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <button
                  type="button"
                  aria-label="Open navigation menu"
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-900 transition hover:border-[#00C896]/50 hover:text-[#00C896] lg:hidden flex-shrink-0"
                >
                  <Menu size={18} />
                </button>

                <Link href="/" className="group flex min-w-0 flex-1 items-center gap-2 sm:gap-2.5 lg:flex-none lg:flex-shrink-0">
                  {/* Logo Image */}
                  <div className="relative hidden h-14 w-14 flex-shrink-0 items-center justify-center sm:h-16 sm:w-16 lg:flex">
                    <img 
                      src="/logoimage.svg" 
                      alt="ILMALINK MEDIGO Logo" 
                      className="h-full w-full object-contain" 
                    />
                  </div>

                  {/* Brand Text Stack - Desktop */}
                  <div className="hidden lg:flex flex-col gap-0.5">
                    <h1 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-extrabold tracking-tight text-[#081B35] leading-tight">
                      ILMALINK
                    </h1>
                    <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-extrabold tracking-tight text-[#00C896] leading-tight">
                      MEDIGO
                    </h2>
                    <p className="text-[10px] font-medium text-slate-500 tracking-wide mt-0.5">
                      Global Medical Education
                    </p>
                  </div>

                  {/* Brand Text Stack - Mobile & Tablet */}
                  <div className="flex min-w-0 flex-col gap-0.5 overflow-hidden lg:hidden">
                    <h1 className="min-w-0 truncate whitespace-nowrap font-[family-name:var(--font-plus-jakarta)] text-xs sm:text-sm font-extrabold leading-none">
                      <span className="text-[#081B35]">ILMALINK</span>{" "}
                      <span className="text-[#00C896]">MEDIGO</span>
                    </h1>
                    <p className="truncate text-[8px] sm:text-[9px] font-medium leading-tight text-slate-500">
                      Global Medical Education
                    </p>
                  </div>
                </Link>
              </div>

              {/* CENTER SECTION: NAVIGATION (Desktop Only) */}
              <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
                <style>{`
                  .nav-link {
                    position: relative;
                    padding: 0.375rem 0.875rem;
                    font-size: 14px;
                    font-weight: 500;
                    color: #475569;
                    transition: color 0.2s ease;
                  }

                  .nav-link:hover {
                    color: #00C896;
                  }

                  .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0.2rem;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #00C896, #0EA5A4);
                    border-radius: 2px;
                    transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                  }

                  .nav-link:hover::after {
                    width: 55%;
                  }
                `}</style>

                <Link href="/" className="nav-link">Home</Link>
                <Link href="/about/" className="nav-link">About</Link>

                <div className="relative group">
                  <button
                    type="button"
                    onClick={() => setDesktopCountryOpen(!desktopCountryOpen)}
                    className="nav-link flex items-center gap-1"
                  >
                    MBBS Abroad
                    <ChevronDown 
                      size={14} 
                      className={`transition-transform duration-300 ${desktopCountryOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {desktopCountryOpen && (
                    <div className="absolute left-0 top-full z-40 mt-2 min-w-[24rem] overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">MBBS Abroad</h3>
                          <p className="mt-0.5 text-xs text-slate-500">20+ destinations</p>
                        </div>
                        <div className="inline-flex rounded-full bg-gradient-to-r from-[#00C896]/10 to-[#0EA5A4]/10 px-2.5 py-1 text-xs font-semibold text-[#00C896]">
                          Global
                        </div>
                      </div>
                      <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Search size={14} className="text-slate-400" />
                          <input
                            type="search"
                            value={countrySearch}
                            onChange={(event) => setCountrySearch(event.target.value)}
                            placeholder="Search..."
                            className="w-full border-0 bg-transparent px-1 text-sm outline-none placeholder-slate-400"
                          />
                        </div>
                      </div>
                      <div className="grid gap-1.5 text-xs text-slate-900 max-h-56 overflow-y-auto sm:grid-cols-2">
                        {filteredDestinations.map((destination) => (
                          <Link
                            key={destination.href}
                            href={destination.href}
                            className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-2 transition hover:border-[#00C896]/50 hover:bg-[#f0fdf9]"
                          >
                            <span className="flex items-center gap-1.5">
                              <img
                                src={`https://flagcdn.com/w40/${destination.flag}.png`}
                                alt={`${destination.label} Flag`}
                                className="h-3 w-4 rounded-sm"
                              />
                              <span className="text-xs">{destination.label}</span>
                            </span>
                            {destination.badge ? (
                              <span className="rounded-full bg-[#00C896]/10 px-1.5 py-0.5 text-[9px] font-semibold text-[#00C896]">
                                Top
                              </span>
                            ) : null}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link href="/mbbs-india/" className="nav-link">MBBS India</Link>
                <a href="https://www.mumtazeducation.com" target="_blank" rel="noopener noreferrer" className="nav-link">NEET</a>
                <Link href="/blogs" className="nav-link">Blogs</Link>
              </nav>

              {/* RIGHT SECTION: SEARCH + CTA */}
              <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2.5">
                {/* Search Button */}
                <button
                  type="button"
                  aria-label="Search"
                  onClick={() => setShowSearchModal(true)}
                  className="group relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#00C896]/50 hover:text-[#00C896] sm:h-9 sm:w-9 sm:shadow-none"
                  title="Search (Ctrl+K)"
                >
                  <Search size={16} />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] font-medium bg-slate-900 text-white opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                    Ctrl+K
                  </span>
                </button>

                {/* Enquire Now Button */}
                <button
                  type="button"
                  onClick={() => setShowCounsellingPopup(true)}
                  className="group inline-flex h-8 flex-shrink-0 items-center gap-1 rounded-lg bg-gradient-to-r from-[#00C896] to-[#0EA5A4] px-2.5 text-xs font-semibold text-white shadow-[0_6px_16px_rgba(0,200,150,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,200,150,0.25)] sm:h-9 sm:gap-1.5 sm:px-5 sm:text-sm sm:shadow-none whitespace-nowrap"
                >
                  <Send size={13} className="flex-shrink-0 transition group-hover:translate-x-0.5" />
                  <span className="hidden sm:inline">Enquire Now</span>
                  <span className="sm:hidden">Enquire</span>
                </button>
              </div>
            </div>
          </div>
        </header>

{/* Mobile Menu */}
        {mounted && mobileMenuOpen &&
          createPortal(
            <div className="fixed inset-0 z-[99999] flex bg-slate-950/40 lg:hidden">
              <div className="relative flex h-full w-[84%] max-w-sm flex-col overflow-y-auto bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#00C896]">Menu</p>
                    <h2 className="mt-1 text-lg font-extrabold text-[#081B35]">ILMALINK MEDIGO</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileCountryOpen(false);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-900 transition hover:border-[#00C896]/50 hover:text-[#00C896]"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-1 text-sm font-medium text-slate-900">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3.5 py-2.5 transition hover:bg-slate-50 hover:text-[#00C896]">
                    Home
                  </Link>
                  <Link href="/about/" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3.5 py-2.5 transition hover:bg-slate-50 hover:text-[#00C896]">
                    About Us
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileCountryOpen(!mobileCountryOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left transition hover:bg-slate-50 hover:text-[#00C896]"
                  >
                    <span>MBBS Abroad</span>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${mobileCountryOpen ? "rotate-180" : ""}`} />
                  </button>
                  <Link href="/mbbs-india/" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3.5 py-2.5 transition hover:bg-slate-50 hover:text-[#00C896]">
                    MBBS India
                  </Link>
                  <a href="https://www.mumtazeducation.com" target="_blank" rel="noopener noreferrer" className="block rounded-lg px-3.5 py-2.5 transition hover:bg-slate-50 hover:text-[#00C896]">
                    NEET
                  </a>
                  <Link href="/blogs" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3.5 py-2.5 transition hover:bg-slate-50 hover:text-[#00C896]">
                    Blogs
                  </Link>
                  <Link href="/alert/" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg bg-[#fee2e2] px-3.5 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-[#fce7ea]">
                    Alerts
                  </Link>
                </div>

                {mobileCountryOpen && (
                  <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Destinations
                    </h3>
                    <div className="grid gap-1.5 text-xs max-h-56 overflow-y-auto">
                      {countryDestinations.map((destination) => (
                        <Link
                          key={destination.href}
                          href={destination.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between gap-2 rounded-lg bg-white px-2.5 py-2 transition hover:bg-slate-100"
                        >
                          <span className="flex items-center gap-1.5">
                            <img
                              src={`https://flagcdn.com/w40/${destination.flag}.png`}
                              alt={`${destination.label} Flag`}
                              className="h-3 w-4 rounded-sm"
                            />
                            <span className="text-xs">{destination.label}</span>
                          </span>
                          {destination.badge ? (
                            <span className="rounded-full bg-[#00C896]/10 px-1 py-0.5 text-[9px] font-semibold text-[#00C896]">
                              Top
                            </span>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCounsellingPopup(true);
                      setMobileMenuOpen(false);
                    }}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#00C896] to-[#0EA5A4] px-4 py-2.5 text-xs font-semibold text-white transition hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <MessageSquare size={14} />
                    Enquire Now
                  </button>
                  <a
                    href="https://wa.me/919563910223"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    <Phone size={14} />
                    WhatsApp
                  </a>
                </div>
              </div>
              <button
                type="button"
                className="flex-1"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileCountryOpen(false);
                }}
                aria-label="Close overlay"
              />
            </div>,
            document.body
          )}

        {/* Counselling Popup */}
        <CounsellingPopup isOpen={showCounsellingPopup} onClose={() => setShowCounsellingPopup(false)} />

        {/* Search Modal */}
        <SearchModal isOpen={showSearchModal} onClose={() => setShowSearchModal(false)} />
      </div>
    </>
  );
}
