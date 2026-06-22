"use client";
import { CSSProperties, ReactNode, RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import AnnouncementTicker from "./AnnouncementTicker";
import CounsellingPopup from "./CounsellingPopup";
import SearchModal from "./SearchModal";
import { Phone, Menu, X, ChevronDown, Search, MessageSquare, GraduationCap, LogIn, UserPlus } from "lucide-react";

// Small inline SVG icons (under 100kb, minimal, optimized for UI)
function IconHome() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z" fill="#081B35" />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm.75 6.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM11 11h2v6h-2v-6z" fill="#475569" />
    </svg>
  );
}

function IconScholarships() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" fill="#00C896" />
    </svg>
  );
}

function IconBlog() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M4 6h16v10H8l-4 4V6z" fill="#475569" />
    </svg>
  );
}

function IconAlert() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M12 2L2 20h20L12 2z" fill="#FF6B6B" />
      <rect x="11" y="8" width="2" height="6" fill="#fff" />
      <rect x="11" y="15" width="2" height="2" fill="#fff" />
    </svg>
  );
}
import { mbbsIndiaCollegesByState, type MBBSIndiaCollege, type MBBSIndiaStateGroup } from "../data/mbbsIndiaColleges";
import { getMBBSIndiaAdmissionAccess } from "../data/mbbsIndiaAdmissionAccess";
import { navbarCountryDestinations } from "../data/navbarDestinations";
import { getMBBSIndiaCollegeHref } from "../data/exploreLinks";

type NavbarMenuPortalProps = {
  children: ReactNode;
  mode: "anchored" | "fullscreen";
  open: boolean;
  onClose: () => void;
  anchorRef?: RefObject<HTMLElement | null>;
  className?: string;
  maxWidth?: number;
};

// Keep every navbar menu surface in this portal so hero/page stacking contexts cannot cover it.
function NavbarMenuPortal({
  children,
  mode,
  open,
  onClose,
  anchorRef,
  className = "",
  maxWidth = 720,
}: NavbarMenuPortalProps) {
  const [position, setPosition] = useState<CSSProperties>({});

  const updatePosition = useCallback(() => {
    if (!open || mode !== "anchored" || !anchorRef?.current) return;

    const rect = anchorRef.current.getBoundingClientRect();
    const viewportMargin = 16;
    const width = Math.min(maxWidth, window.innerWidth - viewportMargin * 2);
    const centeredLeft = rect.left + rect.width / 2 - width / 2;
    const left = Math.max(viewportMargin, Math.min(centeredLeft, window.innerWidth - width - viewportMargin));
    const top = rect.bottom + 12;

    setPosition({
      left,
      maxHeight: `calc(100vh - ${top + viewportMargin}px)`,
      top,
      width,
    });
  }, [anchorRef, maxWidth, mode, open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  useEffect(() => {
    if (!open || mode !== "anchored") return;

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [mode, open, updatePosition]);

  if (!open || typeof document === "undefined") return null;

  const isFullscreen = mode === "fullscreen";

  return createPortal(
    <div
      className={`fixed inset-0 z-[2147483647] ${isFullscreen ? "bg-slate-950/45 backdrop-blur-[2px]" : "bg-transparent"} ${className}`}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={isFullscreen ? "h-full w-full" : "fixed overflow-y-auto"}
        style={isFullscreen ? undefined : position}
        onPointerDown={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

function buildIndiaStateColumns(groups: MBBSIndiaStateGroup[]) {
  return groups.reduce(
    (columns, group, index) => {
      columns[index % 2 === 0 ? "left" : "right"].push(group);
      return columns;
    },
    { left: [] as MBBSIndiaStateGroup[], right: [] as MBBSIndiaStateGroup[] }
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCountryOpen, setMobileCountryOpen] = useState(false);
  const [mobileIndiaOpen, setMobileIndiaOpen] = useState(false);
  const [desktopCountryOpen, setDesktopCountryOpen] = useState(false);
  const [desktopIndiaOpen, setDesktopIndiaOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [indiaSearch, setIndiaSearch] = useState("");
  const [expandedIndiaState, setExpandedIndiaState] = useState<string | null>("West Bengal");
  const [showCounsellingPopup, setShowCounsellingPopup] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const desktopCountryButtonRef = useRef<HTMLButtonElement | null>(null);
  const desktopIndiaButtonRef = useRef<HTMLButtonElement | null>(null);

  // Keyboard shortcuts for search
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileMenuOpen ? "hidden" : originalOverflow;

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  const filteredDestinations = useMemo(() => {
    if (!countrySearch.trim()) return navbarCountryDestinations;
    return navbarCountryDestinations.filter((destination) =>
      `${destination.label} ${destination.insight}`.toLowerCase().includes(countrySearch.trim().toLowerCase())
    );
  }, [countrySearch]);

  const indiaSearchTerm = indiaSearch.trim().toLowerCase();

  const filteredIndiaStateGroups = useMemo(() => {
    if (!indiaSearchTerm) return mbbsIndiaCollegesByState;

    return mbbsIndiaCollegesByState.filter((group) => {
      const stateMatches = group.state.toLowerCase().includes(indiaSearchTerm);
      const collegeMatches = [...group.governmentColleges, ...group.privateColleges].some((college) =>
        college.collegeName.toLowerCase().includes(indiaSearchTerm)
      );

      return stateMatches || collegeMatches;
    });
  }, [indiaSearchTerm]);

  const indiaStateColumns = useMemo(() => buildIndiaStateColumns(filteredIndiaStateGroups), [filteredIndiaStateGroups]);

  const autoExpandedIndiaState = useMemo(() => {
    if (!indiaSearchTerm) return null;

    return filteredIndiaStateGroups.find((group) =>
      [...group.governmentColleges, ...group.privateColleges].some((college) =>
        college.collegeName.toLowerCase().includes(indiaSearchTerm)
      )
    )?.state ?? null;
  }, [filteredIndiaStateGroups, indiaSearchTerm]);

  const closeDesktopCountryMenu = useCallback(() => {
    setDesktopCountryOpen(false);
    setCountrySearch("");
  }, []);

  const closeDesktopIndiaMenu = useCallback(() => {
    setDesktopIndiaOpen(false);
    setIndiaSearch("");
    setExpandedIndiaState("West Bengal");
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setMobileCountryOpen(false);
    setMobileIndiaOpen(false);
    setCountrySearch("");
    setIndiaSearch("");
    setExpandedIndiaState("West Bengal");
  }, []);

  const destinationCards = (onLinkClick: () => void, compact = false) => (
    <div className={`grid gap-2 ${compact ? "" : "sm:grid-cols-2"}`}>
      {filteredDestinations.map((destination) => (
        <Link
          key={destination.href}
          href={destination.href}
          onClick={onLinkClick}
          className="group flex min-h-[4rem] items-center gap-3 rounded-lg border border-slate-200/80 bg-white px-3 py-2.5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#00C896]/45 hover:bg-[#f2fffb] hover:shadow-[0_14px_28px_rgba(15,23,42,0.08)]"
        >
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 shadow-inner">
            <img
              src={`https://flagcdn.com/w40/${destination.flag}.png`}
              alt={`${destination.label} Flag`}
              className="h-4 w-5 rounded-sm object-cover"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span className="truncate text-sm font-semibold text-slate-950 transition group-hover:text-[#008f72]">
                Study MBBS in {destination.label}
              </span>
              {destination.badge ? (
                <span className="rounded-full bg-[#00C896]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#008f72]">
                  {destination.badge}
                </span>
              ) : null}
            </span>
            <span className="mt-0.5 line-clamp-2 text-xs leading-5 text-slate-500">
              {destination.insight}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );

  const getVisibleIndiaColleges = (group: MBBSIndiaStateGroup, colleges: MBBSIndiaCollege[]) => {
    if (!indiaSearchTerm || group.state.toLowerCase().includes(indiaSearchTerm)) return colleges;

    return colleges.filter((college) => college.collegeName.toLowerCase().includes(indiaSearchTerm));
  };

  const renderIndiaCollegeSection = (
    group: MBBSIndiaStateGroup,
    title: "Government Colleges" | "Private Colleges",
    colleges: MBBSIndiaCollege[],
    badgeClassName: string,
    compact = false
  ) => {
    const visibleColleges = getVisibleIndiaColleges(group, colleges);
    if (!visibleColleges.length) return null;
    const closeMenuAfterClick = compact ? closeMobileMenu : closeDesktopIndiaMenu;

    return (
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h4 className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-700">{title}</h4>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${badgeClassName}`}>
            {visibleColleges.length}
          </span>
        </div>
        <div className="grid max-h-64 gap-2 overflow-y-auto pr-1">
          {visibleColleges.map((college) => (
            <Link
              key={`${group.state}-${college.category}-${college.collegeName}`}
              href={getMBBSIndiaCollegeHref(college)}
              onClick={closeMenuAfterClick}
              className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 transition hover:border-[#00C896]/50 hover:bg-white"
            >
              <p className="text-xs font-bold leading-5 text-slate-950">{college.collegeName}</p>
              <p className="mt-1 text-[11px] font-medium leading-4 text-slate-500">
                Seats: {college.seatCapacity.toLocaleString("en-IN")} | Established: {college.establishmentYear} | Fees: {college.fees}
              </p>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const renderIndiaStateCard = (group: MBBSIndiaStateGroup, compact = false) => {
    const isAutoExpanded = autoExpandedIndiaState === group.state;
    const isExpanded = expandedIndiaState === group.state || isAutoExpanded;
    const access = getMBBSIndiaAdmissionAccess(group.state, group.privateCount);
    const accessBadgeClass =
      access.status === "open"
        ? "bg-[#ECFDF5] text-[#047857] ring-[#A7F3D0]"
        : access.status === "state-specific"
          ? "bg-[#FFF7ED] text-[#C2410C] ring-[#FED7AA]"
          : "bg-slate-100 text-slate-500 ring-slate-200";

    return (
      <div
        key={group.state}
        className={`overflow-hidden rounded-xl border bg-white shadow-sm transition duration-200 ${
          isAutoExpanded ? "border-[#00C896] ring-2 ring-[#00C896]/25" : "border-slate-200 hover:border-[#00C896]/45"
        }`}
      >
        <button
          type="button"
          onClick={() => setExpandedIndiaState(isExpanded && !isAutoExpanded ? null : group.state)}
          className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left transition hover:bg-[#f4fffb]"
          aria-expanded={isExpanded}
        >
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold text-[#081B35]">{group.state}</span>
            <span className="mt-1 block text-xs font-semibold text-slate-500">
              Govt: {group.governmentCount} | Private: {group.privateCount}
            </span>
            <span className="mt-0.5 block text-xs font-semibold text-[#008f72]">
              Seats: {group.totalSeats.toLocaleString("en-IN")}
            </span>
            <span className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ring-1 ${accessBadgeClass}`}>
              {access.label}
            </span>
          </span>
          <ChevronDown size={16} className={`flex-shrink-0 text-slate-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
        </button>

        {isExpanded && (
          <div className={`grid gap-3 border-t border-slate-100 bg-slate-50 p-3 ${compact ? "" : "xl:grid-cols-2"}`}>
            {renderIndiaCollegeSection(group, "Private Colleges", group.privateColleges, "bg-[#081B35]/10 text-[#081B35]", compact)}
            {renderIndiaCollegeSection(group, "Government Colleges", group.governmentColleges, "bg-[#00C896]/10 text-[#008f72]", compact)}
          </div>
        )}
      </div>
    );
  };

  const renderIndiaStateGrid = (compact = false) => {
    if (!filteredIndiaStateGroups.length) {
      return (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white/90 px-4 py-6 text-center text-sm font-semibold text-slate-500">
          No state or medical college found.
        </div>
      );
    }

    if (compact) {
      return <div className="grid gap-2">{filteredIndiaStateGroups.map((group) => renderIndiaStateCard(group, true))}</div>;
    }

    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="grid content-start gap-2">{indiaStateColumns.left.map((group) => renderIndiaStateCard(group))}</div>
        <div className="grid content-start gap-2">{indiaStateColumns.right.map((group) => renderIndiaStateCard(group))}</div>
      </div>
    );
  };

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
                    <span className="font-[family-name:var(--font-plus-jakarta)] text-lg font-extrabold tracking-tight text-[#081B35] leading-tight">
                      ILMALINK
                    </span>
                    <span className="font-[family-name:var(--font-plus-jakarta)] text-lg font-extrabold tracking-tight text-[#00C896] leading-tight">
                      MEDIGO
                    </span>
                    <p className="text-[10px] font-medium text-slate-500 tracking-wide mt-0.5">
                      Global Medical Education
                    </p>
                  </div>

                  {/* Brand Text Stack - Mobile & Tablet */}
                  <div className="flex min-w-0 flex-col gap-0.5 overflow-hidden lg:hidden">
                    <span className="min-w-0 truncate whitespace-nowrap font-[family-name:var(--font-plus-jakarta)] text-xs sm:text-sm font-extrabold leading-none">
                      <span className="text-[#081B35]">ILMALINK</span>{" "}
                      <span className="text-[#00C896]">MEDIGO</span>
                    </span>
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

                <Link href="/" className="nav-link flex items-center gap-2"><IconHome /> <span>Home</span></Link>
                <Link href="/about/" className="nav-link flex items-center gap-2"><IconInfo /> <span>About</span></Link>

                <div className="relative">
                  <button
                    type="button"
                    ref={desktopCountryButtonRef}
                    onClick={() => {
                      setDesktopCountryOpen(!desktopCountryOpen);
                      setDesktopIndiaOpen(false);
                    }}
                    aria-expanded={desktopCountryOpen}
                    aria-haspopup="menu"
                    className="nav-link flex items-center gap-1"
                  >
                    MBBS Abroad
                    <ChevronDown 
                      size={14} 
                      className={`transition-transform duration-300 ${desktopCountryOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    ref={desktopIndiaButtonRef}
                    onClick={() => {
                      setDesktopIndiaOpen(!desktopIndiaOpen);
                      setDesktopCountryOpen(false);
                    }}
                    aria-expanded={desktopIndiaOpen}
                    aria-haspopup="menu"
                    className="nav-link flex items-center gap-1"
                  >
                    MBBS India
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${desktopIndiaOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
                <Link href="/scholarships-loans" className="nav-link flex items-center gap-2"><IconScholarships /> <span>Scholarships & Loans</span></Link>
                <Link href="/neet" className="nav-link flex items-center gap-2">
                  <GraduationCap size={14} />
                  <span>NEET</span>
                </Link>
                <Link href="/blogs" className="nav-link flex items-center gap-2"><IconBlog /> <span>Blogs</span></Link>
              </nav>

              {/* RIGHT SECTION: SEARCH + CTA */}
              <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2.5">
                {/* Search Button */}
                <button
                  type="button"
                  aria-label="Search"
                  onClick={() => setShowSearchModal(true)}
                  className="group relative flex h-8 min-w-8 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-2 text-slate-600 shadow-sm transition hover:border-[#00C896]/50 hover:bg-[#f4fffb] hover:text-[#00C896] sm:h-9 sm:min-w-[10rem] sm:justify-start sm:px-3 sm:shadow-none md:min-w-[14rem]"
                  title="Search (Ctrl+K)"
                >
                  <Search size={16} />
                  <span className="hidden truncate text-xs font-bold text-slate-500 transition group-hover:text-[#008f72] sm:inline">
                    Search keywords or ask questions
                  </span>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] font-medium bg-slate-900 text-white opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                    Ctrl+K
                  </span>
                </button>

                <Link
                  href="/portal/login"
                  className="hidden h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-[#0B4AA2] transition hover:border-[#1769E8]/40 hover:bg-blue-50 xl:inline-flex"
                >
                  <LogIn size={14} />
                  Student Login
                </Link>
                <Link
                  href="/portal/signup"
                  className="group inline-flex h-8 flex-shrink-0 items-center gap-1 rounded-lg bg-gradient-to-r from-[#00C896] to-[#0EA5A4] px-2.5 text-xs font-semibold text-white shadow-[0_6px_16px_rgba(0,200,150,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,200,150,0.25)] sm:h-9 sm:gap-1.5 sm:px-4 sm:text-sm sm:shadow-none whitespace-nowrap"
                >
                  <UserPlus size={13} className="flex-shrink-0" />
                  <span className="hidden sm:inline">Sign Up Free</span>
                  <span className="sm:hidden">Sign Up</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <NavbarMenuPortal
          anchorRef={desktopCountryButtonRef}
          mode="anchored"
          onClose={closeDesktopCountryMenu}
          open={desktopCountryOpen}
        >
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/5">
            <div className="border-b border-slate-100 bg-gradient-to-br from-white via-[#f6fffc] to-slate-50 px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#008f72]">
                    Popular MBBS Abroad Destinations
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-[#081B35]">
                    Find your best-fit country
                  </h3>
                  <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
                    Choose a country to explore universities, fees, eligibility, and FMGE insights.
                  </p>
                </div>
                <div className="hidden rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#008f72] shadow-sm ring-1 ring-[#00C896]/20 sm:inline-flex">
                  {navbarCountryDestinations.length} destinations
                </div>
              </div>
              <label className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition focus-within:border-[#00C896]/70 focus-within:ring-4 focus-within:ring-[#00C896]/10">
                <Search size={16} className="text-slate-400" />
                <input
                  id="navbar-desktop-country-search"
                  name="navbarDesktopCountrySearch"
                  type="search"
                  value={countrySearch}
                  onChange={(event) => setCountrySearch(event.target.value)}
                  placeholder="Search destinations, fees, or pathways"
                  className="w-full border-0 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />
              </label>
            </div>
            <div className="p-4">
              {filteredDestinations.length ? (
                destinationCards(closeDesktopCountryMenu)
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                  No destinations found. Try a country name like Russia or Georgia.
                </div>
              )}
            </div>
          </div>
        </NavbarMenuPortal>

        <NavbarMenuPortal
          anchorRef={desktopIndiaButtonRef}
          mode="anchored"
          maxWidth={1120}
          onClose={closeDesktopIndiaMenu}
          open={desktopIndiaOpen}
        >
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#071B35] text-white shadow-[0_28px_80px_rgba(8,27,53,0.28)] ring-1 ring-slate-900/10">
            <div className="border-b border-white/10 bg-gradient-to-br from-[#081B35] via-[#0b315d] to-[#053f50] px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#58f0c7]">
                    MBBS India State Explorer
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-white">
                    NMC-listed Indian medical colleges
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-200">
                    Explore states, government/private college counts, seat intake, establishment year, and fee placeholders from the provided NMC list.
                  </p>
                </div>
                <div className="hidden rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-[#58f0c7] ring-1 ring-white/15 xl:inline-flex">
                  823 colleges | 1,29,602 seats
                </div>
              </div>

              <label className="mt-4 flex items-center gap-2 rounded-2xl border border-white/15 bg-white px-3 py-2.5 text-slate-900 shadow-sm transition focus-within:border-[#00C896] focus-within:ring-4 focus-within:ring-[#00C896]/20">
                <Search size={16} className="text-slate-400" />
                <input
                  id="navbar-desktop-india-search"
                  name="navbarDesktopIndiaSearch"
                  type="search"
                  value={indiaSearch}
                  onChange={(event) => setIndiaSearch(event.target.value)}
                  placeholder="Search state or medical college…"
                  className="w-full border-0 bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
                />
              </label>
            </div>

            <div className="bg-slate-100 p-4 text-slate-900">
              {renderIndiaStateGrid()}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#071B35] px-5 py-3">
              <p className="hidden text-xs font-medium text-slate-300 sm:block">
                Govt/Private counts and seats are calculated from the provided NMC data.
              </p>
              <Link
                href="/mbbs-india/"
                onClick={closeDesktopIndiaMenu}
                className="ml-auto inline-flex items-center justify-center rounded-lg bg-[#00C896] px-4 py-2.5 text-sm font-extrabold text-[#061D3F] shadow-[0_12px_28px_rgba(0,200,150,0.24)] transition hover:-translate-y-0.5 hover:bg-[#12dfad]"
              >
                View Full MBBS India List
              </Link>
            </div>
          </div>
        </NavbarMenuPortal>

        {/* Mobile Menu */}
        <NavbarMenuPortal
          mode="fullscreen"
          onClose={closeMobileMenu}
          open={mobileMenuOpen}
          className="lg:hidden"
        >
          <div className="flex h-full w-full">
            <div className="relative flex h-full w-[min(92vw,27rem)] flex-col overflow-hidden bg-white shadow-[0_24px_70px_rgba(15,23,42,0.26)]">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-br from-white via-[#f6fffc] to-slate-50 p-5">
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#008f72]">Navigation</p>
                  <h2 className="mt-1 text-lg font-extrabold text-[#081B35]">ILMALINK MEDIGO</h2>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">Global Medical Education</p>
                </div>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-[#00C896]/50 hover:text-[#00C896]"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-1 text-sm font-semibold text-slate-900">
                  <Link href="/" onClick={closeMobileMenu} className="block rounded-lg px-3.5 py-3 transition hover:bg-slate-50 hover:text-[#00C896]">
                    <div className="flex items-center gap-3"><IconHome /> <span>Home</span></div>
                  </Link>
                  <Link href="/about/" onClick={closeMobileMenu} className="block rounded-lg px-3.5 py-3 transition hover:bg-slate-50 hover:text-[#00C896]">
                    <div className="flex items-center gap-3"><IconInfo /> <span>About Us</span></div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileCountryOpen(!mobileCountryOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-3.5 py-3 text-left transition hover:bg-slate-50 hover:text-[#00C896]"
                    aria-expanded={mobileCountryOpen}
                  >
                    <span>MBBS Abroad</span>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${mobileCountryOpen ? "rotate-180" : ""}`} />
                  </button>

                  {mobileCountryOpen && (
                    <div className="my-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <div className="border-b border-slate-200 bg-white px-3 py-3">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#008f72]">
                          Popular MBBS Abroad Destinations
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Choose a country to explore universities, fees, eligibility, and FMGE insights.
                        </p>
                        <label className="mt-3 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition focus-within:border-[#00C896]/70 focus-within:ring-4 focus-within:ring-[#00C896]/10">
                          <Search size={15} className="text-slate-400" />
                          <input
                            id="navbar-mobile-country-search"
                            name="navbarMobileCountrySearch"
                            type="search"
                            value={countrySearch}
                            onChange={(event) => setCountrySearch(event.target.value)}
                            placeholder="Search countries"
                            className="w-full border-0 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                          />
                        </label>
                      </div>
                      <div className="max-h-[55vh] overflow-y-auto p-2.5">
                        {filteredDestinations.length ? (
                          destinationCards(closeMobileMenu, true)
                        ) : (
                          <div className="rounded-lg border border-dashed border-slate-200 bg-white px-3 py-5 text-center text-xs text-slate-500">
                            No destinations found.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setMobileIndiaOpen(!mobileIndiaOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-3.5 py-3 text-left transition hover:bg-slate-50 hover:text-[#00C896]"
                    aria-expanded={mobileIndiaOpen}
                  >
                    <span>MBBS India</span>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${mobileIndiaOpen ? "rotate-180" : ""}`} />
                  </button>

                  {mobileIndiaOpen && (
                    <div className="my-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <div className="border-b border-slate-200 bg-[#081B35] px-3 py-3 text-white">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#58f0c7]">
                          MBBS India State Explorer
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-200">
                          Search NMC-listed states and medical colleges by seat intake and category.
                        </p>
                        <label className="mt-3 flex items-center gap-2 rounded-lg border border-white/15 bg-white px-3 py-2.5 text-slate-900 shadow-sm transition focus-within:border-[#00C896] focus-within:ring-4 focus-within:ring-[#00C896]/20">
                          <Search size={15} className="text-slate-400" />
                          <input
                            id="navbar-mobile-india-search"
                            name="navbarMobileIndiaSearch"
                            type="search"
                            value={indiaSearch}
                            onChange={(event) => setIndiaSearch(event.target.value)}
                            placeholder="Search state or medical college…"
                            className="w-full border-0 bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
                          />
                        </label>
                      </div>
                      <div className="max-h-[58vh] overflow-y-auto p-2.5">
                        {renderIndiaStateGrid(true)}
                      </div>
                      <div className="border-t border-slate-200 bg-white p-3">
                        <Link
                          href="/mbbs-india/"
                          onClick={closeMobileMenu}
                          className="inline-flex w-full items-center justify-center rounded-lg bg-[#00C896] px-4 py-3 text-sm font-extrabold text-[#061D3F] transition hover:bg-[#12dfad]"
                        >
                          View Full MBBS India List
                        </Link>
                      </div>
                    </div>
                  )}

                  <Link href="/scholarships-loans" onClick={closeMobileMenu} className="block rounded-lg px-3.5 py-3 transition hover:bg-slate-50 hover:text-[#00C896]">
                    <div className="flex items-center gap-3"><IconScholarships /> <span>Scholarships & Loans</span></div>
                  </Link>
                  <Link href="/neet" onClick={closeMobileMenu} className="block rounded-lg px-3.5 py-3 transition hover:bg-slate-50 hover:text-[#00C896]">
                    <div className="flex items-center gap-3"><GraduationCap size={14} /> <span>NEET</span></div>
                  </Link>
                  <Link href="/blogs" onClick={closeMobileMenu} className="block rounded-lg px-3.5 py-3 transition hover:bg-slate-50 hover:text-[#00C896]">
                    <div className="flex items-center gap-3"><IconBlog /> <span>Blogs</span></div>
                  </Link>
                  <Link href="/alert/" onClick={closeMobileMenu} className="block rounded-lg bg-red-50 px-3.5 py-3 text-xs font-bold text-red-700 transition hover:bg-red-100">
                    <div className="flex items-center gap-3"><IconAlert /> <span>Alerts</span></div>
                  </Link>
                </div>
              </div>

              <div className="border-t border-slate-200 bg-white p-4">
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/portal/login"
                      onClick={closeMobileMenu}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#BFD3E8] bg-[#F4F9FF] px-3 py-3 text-xs font-black text-[#0B4AA2]"
                    >
                      <LogIn size={14} />
                      Student Login
                    </Link>
                    <Link
                      href="/portal/signup"
                      onClick={closeMobileMenu}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B4AA2] px-3 py-3 text-xs font-black text-white"
                    >
                      <UserPlus size={14} />
                      Sign Up Free
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCounsellingPopup(true);
                      closeMobileMenu();
                    }}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#00C896] to-[#0EA5A4] px-4 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(0,200,150,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,200,150,0.28)]"
                  >
                    <MessageSquare size={15} />
                    Enquire Now
                  </button>
                  <a
                    href="https://wa.me/919563910223"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
                  >
                    <Phone size={15} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="flex-1"
              onClick={closeMobileMenu}
              aria-label="Close overlay"
            />
          </div>
        </NavbarMenuPortal>

        {/* Counselling Popup */}
        <CounsellingPopup isOpen={showCounsellingPopup} onClose={() => setShowCounsellingPopup(false)} />

        {/* Search Modal */}
        <SearchModal
          isOpen={showSearchModal}
          onClose={() => setShowSearchModal(false)}
          onOpenCounselling={() => {
            setShowSearchModal(false);
            setShowCounsellingPopup(true);
          }}
        />
      </div>
    </>
  );
}
