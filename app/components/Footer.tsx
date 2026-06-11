"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, type ReactNode, useState } from "react";
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import {
  Banknote,
  BookOpen,
  Building2,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Landmark,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import SearchModal from "./SearchModal";

const OPEN_COUNSELLING_EVENT = "ilmalink:open-counselling";
const OPEN_SEARCH_EVENT = "open-ilmalink-search";

const contact = {
  callHref: "tel:+919330155576",
  callText: "9330155576",
  whatsappHref: "https://wa.me/919563910223",
  whatsappText: "9563910223",
  emailHref: "mailto:middya@ilmalink.com",
  emailText: "middya@ilmalink.com",
};

const realPageLinks = {
  blogs: "/blogs",
  mbbsIndia: "/mbbs-india",
  mbbsAbroad: "/mbbs-abroad",
  advisories: "/official-advisories",
  counselling: "/?counselling=open",
};

const offices = [
  {
    label: "Headquarters",
    city: "Bengaluru",
    address: ["Near Lalbagh Main Gate,", "Hosur Road,", "Bangalore-27"],
    accent: "#00F0A8",
    markerClass: "bg-[#00DFA2] text-[#031525]",
    image: "/footer-office-bengaluru.svg",
  },
  {
    label: "Main Office",
    city: "Kolkata",
    address: ["MUMTAZ Campus,", "Kamrbari, Basina,", "Rajarhat-Newtown,", "Kolkata-135"],
    accent: "#A855F7",
    markerClass: "bg-[#8B5CF6] text-white",
    image: "/footer-office-kolkata.svg",
  },
  {
    label: "R&D Branch",
    city: "Mumbai",
    address: ["M.A.K Azad Road,", "Sector 8B, Belapur,", "Mumbai - 400614"],
    accent: "#F97316",
    markerClass: "bg-[#F97316] text-white",
    image: "/footer-office-mumbai.svg",
  },
];

const branchGroups = [
  {
    title: "West Bengal District Contact Points",
    iconClass: "bg-[#00DFA2] text-[#031525]",
  },
  {
    title: "Karnataka District Contact Points",
    iconClass: "bg-[#FACC15] text-[#031525]",
  },
  {
    title: "Other India Contact Points",
    iconClass: "bg-[#38BDF8] text-[#031525]",
  },
  {
    title: "Overseas Contact Points",
    iconClass: "bg-[#A855F7] text-white",
  },
];

const actionCardClass =
  "group flex min-h-[50px] w-full items-center gap-2 rounded-xl border border-cyan-300/25 bg-[#071B3E]/88 px-2.5 py-2 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_18px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:border-[#00F0A8]/70 hover:bg-[#092553] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0A8]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020B20] sm:min-h-[56px] sm:px-3";

const contactTileClass =
  "group flex min-h-[56px] items-center gap-2 rounded-xl border border-cyan-300/35 bg-[#071B3E]/88 px-2.5 py-2 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_22px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:border-[#00F0A8]/70 hover:bg-[#092553] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0A8]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020B20] sm:min-h-[62px] sm:px-3";

function CounsellingLink({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className: string;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      href={realPageLinks.counselling}
      data-open-counselling
      onClick={onClick}
      className={className}
    >
      {children}
    </Link>
  );
}

function IconBadge({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_0_18px_rgba(0,240,168,0.14)] sm:h-10 sm:w-10 ${className}`}
    >
      {children}
    </span>
  );
}

function QuickActionContent({
  icon,
  iconClass,
  title,
  subtitle,
}: {
  icon: ReactNode;
  iconClass: string;
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <IconBadge className={iconClass}>{icon}</IconBadge>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-extrabold leading-4 text-white sm:text-[15px]">
          {title}
        </span>
        <span className="mt-0.5 block truncate text-[11px] font-medium leading-3 text-slate-300 sm:text-xs">
          {subtitle}
        </span>
      </span>
      <ChevronRight
        size={18}
        className="shrink-0 text-white transition group-hover:translate-x-0.5 group-hover:text-[#00F0A8]"
      />
    </>
  );
}

export default function Footer() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [contactPointsOpen, setContactPointsOpen] = useState(true);
  const [openBranchGroup, setOpenBranchGroup] = useState<string | null>(null);
  const [activeOffice, setActiveOffice] = useState(1);

  const openCounselling = (event?: MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(OPEN_COUNSELLING_EVENT));
    }
  };

  const openSearch = () => {
    if (typeof window === "undefined") return;

    window.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT));

    const navbarSearchButton = document.querySelector<HTMLButtonElement>(
      'button[aria-label="Search"][title="Search (Ctrl+K)"]'
    );

    if (navbarSearchButton) {
      navbarSearchButton.click();
      return;
    }

    const shortcutEvent = new KeyboardEvent("keydown", {
      key: "k",
      code: "KeyK",
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    const shortcutHandled = !window.dispatchEvent(shortcutEvent);

    if (!shortcutHandled) {
      setSearchOpen(true);
    }
  };

  const showPreviousOffice = () => {
    setActiveOffice((current) => (current === 0 ? offices.length - 1 : current - 1));
  };

  const showNextOffice = () => {
    setActiveOffice((current) => (current === offices.length - 1 ? 0 : current + 1));
  };

  return (
    <footer className="relative overflow-hidden bg-[#020B20] px-1.5 py-2 text-white sm:px-3 sm:py-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_6%,rgba(0,240,168,0.22),transparent_28%),radial-gradient(circle_at_84%_12%,rgba(37,99,235,0.22),transparent_30%),linear-gradient(180deg,#031425_0%,#020B20_50%,#031226_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,240,168,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,168,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <div className="relative mx-auto max-w-[980px] overflow-hidden rounded-[24px] border border-cyan-300/20 bg-[#031226]/95 p-2 shadow-[0_22px_70px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-3.5">
        <section className="relative overflow-hidden rounded-[22px] border border-[#00F0A8]/70 bg-[#061A3A]/90 p-3 shadow-[0_0_28px_rgba(0,240,168,0.26),inset_0_1px_0_rgba(255,255,255,0.12)] sm:p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_7%_8%,rgba(0,240,168,0.28),transparent_18%),radial-gradient(circle_at_92%_14%,rgba(0,200,255,0.24),transparent_24%),linear-gradient(135deg,rgba(0,240,168,0.09),rgba(37,99,235,0.08)_52%,transparent)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative grid gap-3 lg:grid-cols-[0.98fr_1.02fr] lg:items-end">
            <div className="flex items-center gap-3">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[18px] border border-[#00F0A8]/60 bg-[#021629] shadow-[0_0_26px_rgba(0,240,168,0.24)] sm:h-24 sm:w-24">
                <Image
                  src="/footer-confused-student.png"
                  alt="Confused student thinking about MBBS admission choices"
                  fill
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <h2 className="text-[24px] font-black leading-tight text-white sm:text-3xl">
                  Confused about <span className="text-[#00F0A8]">MBBS?</span>
                </h2>
                <p className="mt-1 text-[13px] font-semibold leading-5 text-slate-100 sm:text-base sm:leading-6">
                  Get MBBS India & Abroad guidance
                  <br />
                  from <span className="text-[#00F0A8]">ILMALINK MEDIGO</span> experts.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <CounsellingLink
                onClick={openCounselling}
                className="group col-span-2 flex min-h-[56px] items-center gap-2 rounded-xl border border-[#72FF70]/60 bg-gradient-to-br from-[#72FF70] via-[#00DFA2] to-[#00A86B] px-3 py-2 text-left text-[#032314] shadow-[0_14px_28px_rgba(0,240,120,0.25),inset_0_1px_0_rgba(255,255,255,0.38)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#031226] sm:min-h-[62px]"
              >
                <IconBadge className="bg-white/22 text-white">
                  <MessageCircle size={21} />
                </IconBadge>
                <span className="flex-1 text-[18px] font-black sm:text-xl">Let&apos;s Connect</span>
                <ChevronRight size={25} className="transition group-hover:translate-x-0.5" />
              </CounsellingLink>

              <a href={contact.emailHref} className={`${contactTileClass} col-span-2 sm:col-span-1`}>
                <IconBadge className="bg-[#EAF3FF] text-[#2563EB]">
                  <Mail size={21} />
                </IconBadge>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-extrabold leading-4 text-white sm:text-[15px]">
                    Email
                  </span>
                  <span className="mt-0.5 block break-all text-[10px] font-medium leading-3 text-slate-200 sm:text-xs">
                    {contact.emailText}
                  </span>
                </span>
              </a>

              <a href={contact.callHref} className={contactTileClass}>
                <IconBadge className="bg-gradient-to-br from-[#5CFFB2] to-[#00B67A] text-white">
                  <Phone size={21} />
                </IconBadge>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-extrabold leading-4 text-white sm:text-[15px]">
                    Call Now
                  </span>
                  <span className="mt-0.5 block text-[11px] font-medium leading-3 text-slate-200 sm:text-xs">
                    {contact.callText}
                  </span>
                </span>
              </a>

              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={contactTileClass}
              >
                <IconBadge className="bg-gradient-to-br from-[#5CFF72] to-[#0BBF42] text-white">
                  <MessageCircle size={21} />
                </IconBadge>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-extrabold leading-4 text-white sm:text-[15px]">
                    WhatsApp
                  </span>
                  <span className="mt-0.5 block text-[11px] font-medium leading-3 text-slate-200 sm:text-xs">
                    {contact.whatsappText}
                  </span>
                </span>
                <ChevronRight size={18} className="text-white transition group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </section>

        <section className="mt-3 flex items-center gap-3 px-1 sm:px-2">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[18px] border border-[#00F0A8]/25 bg-[#052448] shadow-[0_0_24px_rgba(0,240,168,0.18)] sm:h-[72px] sm:w-[72px]">
            <img src="/logoimage.svg" alt="ILMALINK MEDIGO logo" className="h-12 w-12 object-contain sm:h-14 sm:w-14" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[25px] font-black leading-none text-white sm:text-4xl">
                ILMALINK <span className="text-[#00F0A8]">MEDIGO</span>
              </h2>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00F0A8] text-[#031525] shadow-[0_0_20px_rgba(0,240,168,0.3)]">
                <ShieldCheck size={17} />
              </span>
            </div>
            <p className="mt-2 border-l-2 border-[#00F0A8] pl-3 text-[13px] font-medium leading-5 text-slate-200 sm:text-base sm:leading-6">
              Guiding students for MBBS in India and MBBS abroad
              <br className="hidden sm:block" />{" "}
              with official updates, counselling support and trusted guidance.
            </p>
          </div>
        </section>

        <section className="mt-4">
          <div className="flex items-center gap-2 px-1 sm:px-2">
            <Sparkles size={20} className="text-[#00F0A8]" />
            <h2 className="text-xl font-black text-white sm:text-2xl">Quick Links</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-300/25 to-transparent" />
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={openSearch}
              className={actionCardClass}
              aria-label="Open Ask ILMALINK search"
            >
              <QuickActionContent
                icon={<Search size={20} />}
                iconClass="bg-gradient-to-br from-[#16F2A5] to-[#087A5C] text-white"
                title="Explore"
                subtitle="Ask anything"
              />
            </button>

            <Link href={realPageLinks.mbbsIndia} className={actionCardClass}>
              <QuickActionContent
                icon={<GraduationCap size={20} />}
                iconClass="bg-gradient-to-br from-[#35F2A6] to-[#047857] text-white"
                title="MBBS India"
                subtitle="Seats & Colleges"
              />
            </Link>

            <Link href={realPageLinks.mbbsAbroad} className={actionCardClass}>
              <QuickActionContent
                icon={<Landmark size={20} />}
                iconClass="bg-gradient-to-br from-[#38BDF8] to-[#2563EB] text-white"
                title="Abroad"
                subtitle="Countries"
              />
            </Link>

            <Link href={realPageLinks.blogs} className={actionCardClass}>
              <QuickActionContent
                icon={<BookOpen size={20} />}
                iconClass="bg-gradient-to-br from-[#A855F7] to-[#6D28D9] text-white"
                title="Blogs"
                subtitle="Guides & News"
              />
            </Link>

            <Link href={realPageLinks.advisories} className={actionCardClass}>
              <QuickActionContent
                icon={<Sparkles size={20} />}
                iconClass="bg-gradient-to-br from-[#F59E0B] to-[#EA580C] text-white"
                title="Updates"
                subtitle="NMC, FMGE"
              />
            </Link>

            <CounsellingLink onClick={openCounselling} className={actionCardClass}>
              <QuickActionContent
                icon={<Banknote size={20} />}
                iconClass="bg-gradient-to-br from-[#FB923C] to-[#EA580C] text-white"
                title="Scholarship"
                subtitle="Loans help"
              />
            </CounsellingLink>

            <CounsellingLink onClick={openCounselling} className={actionCardClass}>
              <QuickActionContent
                icon={<MessageCircle size={20} />}
                iconClass="bg-gradient-to-br from-[#A855F7] to-[#7C3AED] text-white"
                title="Counselling"
                subtitle="Talk to experts"
              />
            </CounsellingLink>

            <a href={contact.emailHref} className={actionCardClass}>
              <QuickActionContent
                icon={<Phone size={20} />}
                iconClass="bg-gradient-to-br from-[#2DD4BF] to-[#0891B2] text-white"
                title="Contact"
                subtitle="Call, WhatsApp"
              />
            </a>
          </div>
        </section>

        <section className="mt-4">
          <div className="flex items-center gap-2 px-1 sm:px-2">
            <MapPin size={22} className="text-[#00F0A8]" />
            <h2 className="text-xl font-black text-white sm:text-2xl">Our Offices</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-300/25 to-transparent" />
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={showPreviousOffice}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:border-[#00F0A8]/60 hover:text-[#00F0A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0A8]/70"
                aria-label="Highlight previous office"
              >
                <ChevronRight size={20} className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={showNextOffice}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:border-[#00F0A8]/60 hover:text-[#00F0A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0A8]/70"
                aria-label="Highlight next office"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="mt-2 flex snap-x gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {offices.map((office, index) => (
              <address
                key={office.city}
                className={`relative min-h-[168px] min-w-[252px] snap-center overflow-hidden rounded-xl border p-3 not-italic shadow-[0_12px_28px_rgba(0,0,0,0.26)] transition lg:min-w-0 ${
                  activeOffice === index ? "scale-[1.01]" : ""
                }`}
                style={{
                  borderColor: office.accent,
                  backgroundImage: `linear-gradient(180deg, rgba(3, 10, 28, 0.12), rgba(3, 10, 28, 0.7) 48%, rgba(3, 10, 28, 0.96)), url("${office.image}")`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  boxShadow:
                    activeOffice === index
                      ? `0 0 0 1px ${office.accent}66, 0 16px 34px rgba(0,0,0,0.32)`
                      : "0 12px 28px rgba(0,0,0,0.26)",
                }}
              >
                <div className="relative flex justify-end">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${office.markerClass}`}>
                    <MapPin size={23} />
                  </span>
                </div>
                <div className="relative mt-6 text-center">
                  <p className="text-sm font-bold leading-4 text-white">{office.label}</p>
                  <h3 className="mt-0.5 text-2xl font-black leading-7" style={{ color: office.accent }}>
                    {office.city}
                  </h3>
                  <div className="mx-auto mt-2 h-px w-4/5" style={{ backgroundColor: office.accent }} />
                  <p className="mx-auto mt-2 max-w-[210px] text-left text-[13px] font-medium leading-5 text-white">
                    {office.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </address>
            ))}
          </div>

          <div className="mt-2 flex justify-center gap-2">
            {offices.map((office, index) => (
              <button
                key={office.city}
                type="button"
                onClick={() => setActiveOffice(index)}
                className={`h-2.5 w-2.5 rounded-full border transition ${
                  activeOffice === index
                    ? "border-[#00F0A8] bg-[#00F0A8]"
                    : "border-cyan-200/70 bg-transparent"
                }`}
                aria-label={`Highlight ${office.city} office`}
              />
            ))}
          </div>
        </section>

        <section className="mt-4 overflow-hidden rounded-xl border border-[#00F0A8]/45 bg-gradient-to-br from-[#0A7A48]/80 via-[#072950]/90 to-[#031226] shadow-[0_0_26px_rgba(0,240,168,0.18),inset_0_1px_0_rgba(255,255,255,0.12)]">
          <button
            type="button"
            onClick={() => setContactPointsOpen((current) => !current)}
            className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0A8]/70 sm:px-4"
            aria-expanded={contactPointsOpen}
            aria-controls="footer-contact-points"
          >
            <span className="flex min-w-0 flex-1 items-center gap-2 text-[15px] font-black leading-5 text-white sm:text-xl">
              <Building2 size={22} className="shrink-0 text-[#B8FF73]" />
              <span className="min-w-0">View Contact Points India & Overseas</span>
            </span>
            <ChevronDown
              size={24}
              className={`shrink-0 text-white transition ${contactPointsOpen ? "rotate-180" : ""}`}
            />
          </button>

          <div id="footer-contact-points" className={`${contactPointsOpen ? "grid" : "hidden"} gap-1.5 px-2.5 pb-3 sm:px-3`}>
            {branchGroups.map((group) => {
              const isOpen = openBranchGroup === group.title;

              return (
                <div key={group.title} className="overflow-hidden rounded-lg border border-cyan-200/20 bg-[#061A3A]/72">
                  <button
                    type="button"
                    onClick={() => setOpenBranchGroup(isOpen ? null : group.title)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0A8]/70"
                    aria-expanded={isOpen}
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${group.iconClass}`}>
                      <Building2 size={17} />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[14px] font-bold text-white sm:text-base">
                      {group.title}
                    </span>
                    <ChevronRight
                      size={20}
                      className={`shrink-0 text-white transition ${isOpen ? "rotate-90 text-[#00F0A8]" : ""}`}
                    />
                  </button>
                  {isOpen ? (
                    <div className="border-t border-cyan-200/15 px-3 py-2 text-xs font-medium leading-5 text-slate-300">
                      Contact details will be updated soon. Use call, WhatsApp, or email for this region.
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-4 grid gap-3 sm:grid-cols-[1fr_0.92fr] sm:items-center">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
            <a
              href="https://facebook.com/ilmalink"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ILMALINK on Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] text-xl text-white shadow-[0_0_18px_rgba(24,119,242,0.45)] transition hover:-translate-y-0.5"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com/ilmalink"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ILMALINK on Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_110%,#FEDA75_0%,#FA7E1E_24%,#D62976_48%,#962FBF_72%,#4F5BD5_100%)] text-xl text-white shadow-[0_0_18px_rgba(214,41,118,0.42)] transition hover:-translate-y-0.5"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com/ilmalink"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ILMALINK on YouTube"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF0000] text-xl text-white shadow-[0_0_18px_rgba(255,0,0,0.38)] transition hover:-translate-y-0.5"
            >
              <FaYoutube />
            </a>
            <a
              href="https://x.com/ilmalink"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ILMALINK on X"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-200/35 bg-black text-xl font-black text-white shadow-[0_0_18px_rgba(96,165,250,0.32)] transition hover:-translate-y-0.5"
            >
              X
            </a>
            <a
              href="https://t.me/ilmalink"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ILMALINK on Telegram"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#229ED9] text-xl text-white shadow-[0_0_18px_rgba(34,158,217,0.42)] transition hover:-translate-y-0.5"
            >
              <FaTelegramPlane />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-cyan-200/20 bg-[#071B3E]/80 px-2.5 py-2">
              <IconBadge className="bg-[#0B284E] text-[#DFFCF3]">
                <ShieldCheck size={20} />
              </IconBadge>
              <p className="text-xs font-bold leading-4 text-white">
                Trusted by
                <br />
                Thousands
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-cyan-200/20 bg-[#071B3E]/80 px-2.5 py-2">
              <IconBadge className="bg-[#00F0A8] text-[#031525]">
                <GraduationCap size={20} />
              </IconBadge>
              <p className="text-xs font-bold leading-4 text-white">
                Genuine &
                <br />
                Verified Info
              </p>
            </div>
          </div>
        </section>

        <section className="mt-3 flex items-center gap-3 rounded-lg border border-cyan-200/20 bg-[#061A3A]/80 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <IconBadge className="bg-[#0B284E] text-[#DFFCF3]">
            <ShieldCheck size={20} />
          </IconBadge>
          <p className="text-xs font-medium leading-5 text-slate-200 sm:text-sm">
            Information is subject to change. Students are advised to verify details from official sources before making any decision.
          </p>
        </section>

        <div className="mt-3 flex flex-col gap-1 px-2 text-center text-xs font-medium text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>&copy; 2026 ILMALINK MEDIGO. All rights reserved.</p>
          <p>
            Powered by <span className="font-black text-[#00F0A8]">ILMALINK</span>
          </p>
        </div>
      </div>

      {searchOpen ? (
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          onOpenCounselling={() => {
            setSearchOpen(false);
            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event(OPEN_COUNSELLING_EVENT));
            }
          }}
        />
      ) : null}
    </footer>
  );
}
