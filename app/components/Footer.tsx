 "use client";

import { type MouseEvent, type ReactNode, useState } from "react";
import Link from "next/link";
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
  home: "/",
  about: "/about",
  blogs: "/blogs",
  mbbsIndia: "/mbbs-india",
  mbbsAbroad: "/mbbs-abroad",
  advisories: "/official-advisories",
  counselling: "/?counselling=open",
};

const mbbsAbroadLinks = [
  { label: "MBBS Abroad", href: "/mbbs-abroad" },
  { label: "MBBS in Kyrgyzstan", href: "/mbbs-abroad/kyrgyzstan" },
  { label: "MBBS in Georgia", href: "/mbbs-abroad/georgia" },
  { label: "MBBS in Russia", href: "/mbbs-abroad/russia" },
  { label: "MBBS in Bangladesh", href: "/mbbs-abroad/bangladesh" },
  { label: "MBBS in Uzbekistan", href: "/mbbs-abroad/uzbekistan" },
  { label: "MBBS in Kazakhstan", href: "/mbbs-abroad/kazakhstan" },
  { label: "MBBS in Tajikistan", href: "/mbbs-abroad/tajikistan" },
  { label: "MBBS in Malaysia", href: "/mbbs-abroad/malaysia" },
  { label: "MBBS in Egypt", href: "/mbbs-abroad/egypt" },
  { label: "MBBS in UAE", href: "/mbbs-abroad/uae" },
  { label: "MBBS in UK", href: "/mbbs-abroad/uk" },
  { label: "MBBS in USA", href: "/mbbs-abroad/usa" },
];

const linkGroups = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: realPageLinks.home },
      { label: "About", href: realPageLinks.about },
      { label: "Blogs", href: realPageLinks.blogs },
      { label: "Official Advisories", href: realPageLinks.advisories },
      { label: "Counselling", href: realPageLinks.counselling, counselling: true },
    ],
  },
  {
    title: "MBBS India",
    links: [
      { label: "MBBS India", href: realPageLinks.mbbsIndia },
      { label: "Government Medical Colleges", href: realPageLinks.mbbsIndia },
      { label: "Private Medical Colleges", href: realPageLinks.mbbsIndia },
      { label: "State-wise MBBS Seats", href: realPageLinks.mbbsIndia },
      { label: "NEET UG Guidance", href: realPageLinks.mbbsIndia },
    ],
  },
  {
    title: "MBBS Abroad",
    links: mbbsAbroadLinks,
  },
  {
    title: "Blogs & Advisories",
    links: [
      { label: "Blogs & Guides", href: realPageLinks.blogs },
      { label: "Official Advisories", href: realPageLinks.advisories },
      { label: "FMGE Guidance", href: realPageLinks.blogs },
      { label: "NMC/FMGL Updates", href: realPageLinks.advisories },
      { label: "Counselling Updates", href: realPageLinks.advisories },
    ],
  },
];

const offices = [
  {
    title: "Headquarters - Bengaluru",
    address: "Near Lalbagh Main Gate, Hosur Road, Bangalore-27",
  },
  {
    title: "Main Office - Kolkata, West Bengal",
    address: "MUMTAZ Campus, Kamrbari, Basina, Rajarhat-Newtown, Kolkata-135",
  },
  {
    title: "R&D Branch - Mumbai",
    address: "M.A.K Azad Road, Sector 8B, Belapur, Mumbai - 400614",
  },
];

type BranchContact = {
  district?: string;
  city?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  mapLink?: string;
  status?: string;
};

const branchGroups: { title: string; branches: BranchContact[] }[] = [
  { title: "West Bengal District Branches", branches: [] },
  { title: "Karnataka District Branches", branches: [] },
  { title: "Other India Branches", branches: [] },
  { title: "Overseas Offices", branches: [] },
];

const footerLinkClass =
  "inline-flex rounded-md text-xs font-medium leading-5 text-slate-300 transition hover:text-[#00C896] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#031525]";

const cardClass =
  "group block h-[68px] rounded-xl border border-white/10 bg-white/[0.055] px-3 py-2.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#00C896]/45 hover:bg-white/[0.085] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#031525]";

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

export default function Footer() {
  const [openLinkGroup, setOpenLinkGroup] = useState<string | null>(null);
  const [officeOpen, setOfficeOpen] = useState(false);
  const [openBranchGroup, setOpenBranchGroup] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

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

  const renderFooterLink = (item: {
    label: string;
    href: string;
    counselling?: boolean;
  }) => {
    if (item.counselling) {
      return (
        <CounsellingLink
          key={item.label}
          className={footerLinkClass}
          onClick={openCounselling}
        >
          {item.label}
        </CounsellingLink>
      );
    }

    return (
      <Link key={item.label} href={item.href} className={footerLinkClass}>
        {item.label}
      </Link>
    );
  };

  const renderQuickCard = (
    title: string,
    subtitle: string,
    icon: ReactNode,
    content: ReactNode
  ) => (
    <span className="flex h-full items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#00C896]/20 bg-[#00C896]/10 text-[#00C896]">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-white">
          {title}
        </span>
        <span className="mt-0.5 block truncate text-xs font-medium text-slate-400">
          {subtitle}
        </span>
      </span>
      {content}
    </span>
  );

  return (
    <footer className="relative overflow-hidden bg-[#031525] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#031525_0%,#061D3F_55%,#031525_100%)]" />
      <div className="relative mx-auto max-w-7xl px-3 py-6 sm:px-4 md:px-6 md:py-8">
        <section className="rounded-2xl border border-[#00C896]/25 bg-white/[0.065] p-4 shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#00C896]">
                Premium MBBS guidance
              </p>
              <h2 className="mt-1 text-xl font-extrabold tracking-normal text-white md:text-2xl">
                Confused about MBBS?
              </h2>
              <p className="mt-1 text-sm font-medium leading-6 text-slate-300">
                Get MBBS India & Abroad guidance.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
              <CounsellingLink
                onClick={openCounselling}
                className="inline-flex min-h-9 items-center justify-center rounded-xl bg-[#00C896] px-3 text-xs font-extrabold text-[#031525] transition hover:bg-[#17dfad] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Let&apos;s Connect
              </CounsellingLink>
              <a
                href={contact.callHref}
                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3 text-xs font-bold text-white transition hover:border-[#00C896]/45 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]/70"
                aria-label={`Call ILMALINK MEDIGO at ${contact.callText}`}
              >
                <Phone size={14} />
                {contact.callText}
              </a>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-xl border border-[#00C896]/25 bg-[#00C896]/10 px-3 text-xs font-bold text-[#9fffe5] transition hover:border-[#00C896]/55 hover:bg-[#00C896]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]/70"
                aria-label={`WhatsApp ILMALINK MEDIGO at ${contact.whatsappText}`}
              >
                <MessageCircle size={14} />
                {contact.whatsappText}
              </a>
            </div>
          </div>
        </section>

        <div className="mt-4 grid gap-4 lg:grid-cols-[0.86fr_1.42fr]">
          <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur">
            <h2 className="text-lg font-extrabold tracking-normal text-white">
              ILMALINK MEDIGO
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Focused MBBS India & Abroad guidance with official updates,
              counselling support, FMGE data, country comparison, scholarships
              and loan guidance.
            </p>

            <div className="mt-4 hidden grid-cols-2 gap-2 lg:grid">
              <a
                href={contact.callHref}
                className="rounded-xl border border-white/10 bg-white/[0.055] p-3 transition hover:border-[#00C896]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]/70"
              >
                <span className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <Phone size={14} className="text-[#00C896]" />
                  Call
                </span>
                <span className="mt-1 block text-sm font-bold text-white">
                  {contact.callText}
                </span>
              </a>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/10 bg-white/[0.055] p-3 transition hover:border-[#00C896]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]/70"
              >
                <span className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <MessageCircle size={14} className="text-[#00C896]" />
                  WhatsApp
                </span>
                <span className="mt-1 block text-sm font-bold text-white">
                  {contact.whatsappText}
                </span>
              </a>
              <a
                href={contact.emailHref}
                className="col-span-2 rounded-xl border border-white/10 bg-white/[0.055] p-3 transition hover:border-[#00C896]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]/70"
              >
                <span className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <Mail size={14} className="text-[#00C896]" />
                  Email
                </span>
                <span className="mt-1 block break-all text-sm font-bold text-white">
                  {contact.emailText}
                </span>
              </a>
            </div>
          </section>

          <section aria-label="Footer quick actions">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <button
                type="button"
                onClick={openSearch}
                className={cardClass}
                aria-label="Open Ask ILMALINK search"
              >
                {renderQuickCard(
                  "Explore ILMALINK",
                  "Search anything",
                  <Search size={15} />,
                  <Search size={14} className="text-slate-400" />
                )}
              </button>
              <Link href={realPageLinks.mbbsIndia} className={cardClass}>
                {renderQuickCard(
                  "MBBS India",
                  "Seats & colleges",
                  <GraduationCap size={15} />,
                  <ChevronRight size={14} className="text-slate-500 transition group-hover:text-[#00C896]" />
                )}
              </Link>
              <Link href={realPageLinks.mbbsAbroad} className={cardClass}>
                {renderQuickCard(
                  "MBBS Abroad",
                  "Countries & universities",
                  <Landmark size={15} />,
                  <ChevronRight size={14} className="text-slate-500 transition group-hover:text-[#00C896]" />
                )}
              </Link>
              <Link href={realPageLinks.blogs} className={cardClass}>
                {renderQuickCard(
                  "Blogs",
                  "Guides & updates",
                  <BookOpen size={15} />,
                  <ChevronRight size={14} className="text-slate-500 transition group-hover:text-[#00C896]" />
                )}
              </Link>
              <Link href={realPageLinks.advisories} className={cardClass}>
                {renderQuickCard(
                  "Advisories",
                  "Official updates",
                  <Sparkles size={15} />,
                  <ChevronRight size={14} className="text-slate-500 transition group-hover:text-[#00C896]" />
                )}
              </Link>
              <CounsellingLink
                onClick={openCounselling}
                className={cardClass}
              >
                {renderQuickCard(
                  "Scholarships & Loans",
                  "Coming soon",
                  <Banknote size={15} />,
                  <MessageCircle size={14} className="text-slate-400" />
                )}
              </CounsellingLink>
              <button
                type="button"
                onClick={() => setOfficeOpen((current) => !current)}
                className={cardClass}
                aria-expanded={officeOpen}
                aria-controls="footer-office-network"
              >
                {renderQuickCard(
                  "Offices",
                  "Branch network",
                  <Building2 size={15} />,
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition ${officeOpen ? "rotate-180 text-[#00C896]" : ""}`}
                  />
                )}
              </button>
              <CounsellingLink
                onClick={openCounselling}
                className={cardClass}
              >
                {renderQuickCard(
                  "Counselling",
                  "Talk to ILMALINK",
                  <MessageCircle size={15} />,
                  <MessageCircle size={14} className="text-slate-400" />
                )}
              </CounsellingLink>
            </div>
          </section>
        </div>

        <section className="mt-4 grid grid-cols-2 gap-2 lg:hidden">
          <a
            href={contact.callHref}
            className="rounded-xl border border-white/10 bg-white/[0.055] p-3 transition hover:border-[#00C896]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]/70"
          >
            <span className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Phone size={14} className="text-[#00C896]" />
              Call
            </span>
            <span className="mt-1 block text-sm font-bold text-white">
              {contact.callText}
            </span>
          </a>
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/10 bg-white/[0.055] p-3 transition hover:border-[#00C896]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]/70"
          >
            <span className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <MessageCircle size={14} className="text-[#00C896]" />
              WhatsApp
            </span>
            <span className="mt-1 block text-sm font-bold text-white">
              {contact.whatsappText}
            </span>
          </a>
          <a
            href={contact.emailHref}
            className="col-span-2 rounded-xl border border-white/10 bg-white/[0.055] p-3 transition hover:border-[#00C896]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]/70"
          >
            <span className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Mail size={14} className="text-[#00C896]" />
              Email
            </span>
            <span className="mt-1 block break-all text-sm font-bold text-white">
              {contact.emailText}
            </span>
          </a>
        </section>

        <section className="mt-4 hidden rounded-2xl border border-[#00C896]/20 bg-[#00C896]/[0.065] p-4 lg:block">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-extrabold text-white">
                  Scholarships & Loans
                </h2>
                <span className="rounded-full border border-[#00C896]/30 bg-[#00C896]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9fffe5]">
                  Coming Soon
                </span>
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                Scholarship guidance, education loan support, financial
                planning, and document guidance for MBBS India and MBBS Abroad.
              </p>
            </div>
            <CounsellingLink
              onClick={openCounselling}
              className="inline-flex min-h-9 items-center justify-center rounded-xl bg-white px-4 text-xs font-extrabold text-[#031525] transition hover:bg-[#dffcf3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]/70 md:w-auto"
            >
              Get Guidance
            </CounsellingLink>
          </div>
        </section>

        <section className="mt-4 lg:grid lg:grid-cols-[1.35fr_0.95fr] lg:gap-4">
          <div className="lg:hidden">
            {linkGroups.map((group) => {
              const isOpen = openLinkGroup === group.title;

              return (
                <div
                  key={group.title}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => setOpenLinkGroup(isOpen ? null : group.title)}
                    className="flex w-full items-center justify-between gap-3 py-3 text-left text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]/70"
                    aria-expanded={isOpen}
                  >
                    {group.title}
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition ${isOpen ? "rotate-180 text-[#00C896]" : ""}`}
                    />
                  </button>
                  {isOpen ? (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 pb-3">
                      {group.links.map((item) => renderFooterLink(item))}
                    </div>
                  ) : null}
                </div>
              );
            })}
            <div className="mt-3 rounded-2xl border border-[#00C896]/20 bg-[#00C896]/[0.065] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-extrabold text-white">
                  Scholarships & Loans
                </h2>
                <span className="rounded-full border border-[#00C896]/30 bg-[#00C896]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9fffe5]">
                  Coming Soon
                </span>
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                Scholarship guidance, education loan support, financial
                planning, and document guidance for MBBS India and MBBS Abroad.
              </p>
              <CounsellingLink
                onClick={openCounselling}
                className="mt-3 inline-flex min-h-9 w-full items-center justify-center rounded-xl bg-white px-4 text-xs font-extrabold text-[#031525] transition hover:bg-[#dffcf3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]/70"
              >
                Get Guidance
              </CounsellingLink>
            </div>
          </div>

          <div className="hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 lg:grid lg:grid-cols-4 lg:gap-5">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-extrabold text-white">{group.title}</h2>
                <div className="mt-3 grid gap-2.5">
                  {group.links.map((item) => renderFooterLink(item))}
                </div>
              </div>
            ))}
          </div>

          <div
            id="footer-office-network"
            className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 lg:mt-0"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-white">
                  Office and branch network
                </h2>
                <p className="mt-1 text-xs font-medium leading-5 text-slate-400">
                  HQ Bengaluru | Main Kolkata | R&amp;D Mumbai
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOfficeOpen((current) => !current)}
                className="inline-flex min-h-9 items-center justify-center gap-2 rounded-xl border border-[#00C896]/25 bg-[#00C896]/10 px-3 text-xs font-bold text-[#9fffe5] transition hover:border-[#00C896]/50 hover:bg-[#00C896]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]/70"
                aria-expanded={officeOpen}
                aria-controls="footer-office-details"
              >
                {officeOpen ? "Hide office details" : "View office details"}
                <ChevronDown
                  size={14}
                  className={`transition ${officeOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <div
              id="footer-office-details"
              className={`${officeOpen ? "grid" : "hidden"} mt-4 gap-2 lg:grid`}
            >
              {offices.map((office) => (
                <address
                  key={office.title}
                  className="not-italic rounded-xl border border-white/10 bg-white/[0.045] p-3"
                >
                  <p className="flex items-start gap-2 text-sm font-bold text-white">
                    <MapPin size={15} className="mt-0.5 shrink-0 text-[#00C896]" />
                    {office.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">
                    {office.address}
                  </p>
                </address>
              ))}

              <div className="mt-1 grid gap-2">
                {branchGroups.map((group) => {
                  const isOpen = openBranchGroup === group.title;

                  return (
                    <div
                      key={group.title}
                      className="rounded-xl border border-white/10 bg-white/[0.035]"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenBranchGroup(isOpen ? null : group.title)
                        }
                        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-xs font-bold text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]/70"
                        aria-expanded={isOpen}
                      >
                        {group.title}
                        <ChevronDown
                          size={14}
                          className={`text-slate-500 transition ${isOpen ? "rotate-180 text-[#00C896]" : ""}`}
                        />
                      </button>
                      {isOpen ? (
                        <div className="border-t border-white/10 px-3 py-3">
                          {group.branches.length ? (
                            <div className="grid gap-2">
                              {group.branches.map((branch) => (
                                <div
                                  key={`${branch.district ?? branch.city}-${branch.address}`}
                                  className="rounded-lg bg-white/[0.04] p-2 text-xs text-slate-300"
                                >
                                  <p className="font-bold text-white">
                                    {branch.district ?? branch.city}
                                  </p>
                                  {branch.address ? <p>{branch.address}</p> : null}
                                  {branch.status ? <p>{branch.status}</p> : null}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs leading-5 text-slate-400">
                              District-wise contacts will be updated soon.
                            </p>
                          )}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
          <p className="text-xs leading-5 text-slate-400">
            Information on ILMALINK MEDIGO is for student guidance only. Fees,
            seats, counselling rules, scholarships, loan eligibility,
            accreditation, FMGE data, NMC/FMGL compliance, university status,
            and admission rules may change. Students must verify the latest
            official source before final admission.
          </p>
        </section>

        <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 text-xs font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 ILMALINK MEDIGO. All rights reserved.</p>
          <p>Powered by ILMALINK.</p>
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
