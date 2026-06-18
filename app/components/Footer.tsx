"use client";

import Link from "next/link";
import { type MouseEvent, type ReactNode, useState } from "react";
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  LocateFixed,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Send,
} from "lucide-react";
import SearchModal from "./SearchModal";

const OPEN_SEARCH_EVENT = "ilmalink:open-search";

const contact = {
  call: "+91 93301 55576",
  callHref: "tel:+919330155576",
  whatsapp: "+91 95639 10223",
  whatsappHref: "https://wa.me/919563910223",
  email: "middya@ilmalink.com",
  emailHref: "mailto:middya@ilmalink.com",
};

const footerLinks = [
  {
    title: "Study",
    links: [
      { label: "MBBS in India", href: "/mbbs-india" },
      { label: "MBBS Abroad", href: "/mbbs-abroad" },
      { label: "NEET Hub", href: "/neet" },
      { label: "MBBS in Nepal", href: "/mbbs-abroad/nepal" },
      { label: "MBBS in China", href: "/mbbs-abroad/china" },
      { label: "MBBS in Georgia", href: "/mbbs-abroad/georgia" },
      { label: "MBBS in Russia", href: "/mbbs-abroad/russia" },
      { label: "MBBS in Kyrgyzstan", href: "/mbbs-abroad/kyrgyzstan" },
      { label: "MBBS in Bangladesh", href: "/mbbs-abroad/bangladesh" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blogs", href: "/blogs" },
      { label: "Trust Center", href: "/trust-center" },
      { label: "Explore All Pages", href: "/site-hierarchy" },
      { label: "GEO Profile", href: "/geo-profile" },
      { label: "Official Advisories", href: "/official-advisories" },
      { label: "Official Links", href: "/official-links/" },
      { label: "Scholarships & Loans", href: "/scholarships-loans" },
      { label: "Student Alert", href: "/alert/" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Book Counselling", href: "/", counselling: true },
      { label: "WhatsApp Support", href: contact.whatsappHref, external: true },
      { label: "Call Admission Team", href: contact.callHref },
      { label: "Email Us", href: contact.emailHref },
    ],
  },
];

const offices = [
  {
    label: "Headquarters",
    city: "Bengaluru",
    address: "146/16-01, 6th Cross, 3rd Main, Wilson Garden, Bengaluru - 560027",
  },
  {
    label: "Main Office",
    city: "Kolkata",
    address: "MUMTAZ Campus, Kamrbari, Basina, Rajarhat-Newtown, Kolkata - 700135",
  },
  {
    label: "R&D Branch",
    city: "Mumbai",
    address: "M.A.K Azad Road, Sector 8B, Belapur, Mumbai - 400614",
  },
];

const contactPointGroups = [
  {
    state: "West Bengal",
    note: "District contact points",
    points: [
      "Kolkata",
      "North 24 Parganas",
      "South 24 Parganas",
      "Howrah",
      "Hooghly",
      "Murshidabad",
      "Malda",
      "North Bengal",
    ],
  },
  {
    state: "Karnataka",
    note: "District contact points",
    points: [
      "Bengaluru Urban",
      "Bengaluru Rural",
      "Mysuru",
      "Mangaluru",
      "Hubballi-Dharwad",
      "Belagavi",
      "Kalaburagi",
      "Shivamogga",
    ],
  },
  {
    state: "Maharashtra",
    note: "State desk",
    points: ["Mumbai", "Pune", "Nagpur"],
  },
  {
    state: "Kerala",
    note: "State desk",
    points: ["Kochi", "Kozhikode", "Thiruvananthapuram"],
  },
  {
    state: "Telangana",
    note: "State desk",
    points: ["Hyderabad", "Warangal"],
  },
  {
    state: "International",
    note: "Country desks",
    points: ["Nepal", "Bangladesh", "Kyrgyzstan", "Russia", "Georgia", "Kazakhstan"],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/ilmalinkeduprise/",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ilmalinkmbbs/",
    icon: FaInstagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ilmaLinkFoundation",
    icon: FaYoutube,
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@ilmalinkmbbs",
    icon: FaThreads,
  },
  {
    label: "X",
    href: "https://x.com/middyaofficial",
    icon: FaXTwitter,
  },
  {
    label: "Telegram",
    href: "https://t.me/+919563910223",
    icon: FaTelegramPlane,
  },
];

function openCounselling(event?: MouseEvent<HTMLAnchorElement>) {
  event?.preventDefault();
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent("ilmalink:open-counselling"));
}

function CounsellingLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className: string;
}) {
  return (
    <Link href={href} onClick={openCounselling} className={className}>
      {children}
    </Link>
  );
}

function FooterLink({
  link,
}: {
  link: {
    label: string;
    href: string;
    external?: boolean;
    counselling?: boolean;
  };
}) {
  const className =
    "group inline-flex items-center gap-1.5 text-sm text-slate-300 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300";

  if (link.counselling) {
    return (
      <CounsellingLink href={link.href} className={className}>
        <span>{link.label}</span>
        <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
      </CounsellingLink>
    );
  }

  const content = (
    <>
      <span>{link.label}</span>
      {link.external ? (
        <ExternalLink className="h-3.5 w-3.5 opacity-60" />
      ) : (
        <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
      )}
    </>
  );

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {content}
    </Link>
  );
}

function ContactAction({
  href,
  icon,
  label,
  value,
  external = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
  external?: boolean;
}) {
  const className =
    "flex min-w-0 items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-2 text-left transition hover:border-emerald-300/40 hover:bg-emerald-300/10";
  const content = (
    <>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-300/10 text-emerald-200">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          {label}
        </span>
        <span className="block truncate text-xs font-semibold text-white sm:text-sm">{value}</span>
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      {content}
    </a>
  );
}

export default function Footer() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [contactPointsOpen, setContactPointsOpen] = useState(false);
  const [nearbyState, setNearbyState] = useState(contactPointGroups[0].state);
  const [nearbyPoint, setNearbyPoint] = useState(contactPointGroups[0].points[0]);

  const selectedGroup =
    contactPointGroups.find((group) => group.state === nearbyState) ?? contactPointGroups[0];
  const selectedPoint = selectedGroup.points.includes(nearbyPoint)
    ? nearbyPoint
    : selectedGroup.points[0];
  const pointLabel = nearbyState === "International" ? "Country desk" : "District / city";
  const nearbyWhatsappHref = `${contact.whatsappHref}?text=${encodeURIComponent(
    [
      "Nearby contact points request",
      `Selected state/region: ${nearbyState}`,
      `${pointLabel}: ${selectedPoint}`,
      "Student name:",
      "Student phone:",
      "Current city:",
      "Course interest: MBBS",
      "NEET status/score:",
    ].join("\n"),
  )}`;

  const openSearch = () => {
    setSearchOpen(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT));
    }
  };

  const choosePoint = (state: string, point: string) => {
    setNearbyState(state);
    setNearbyPoint(point);
  };

  const handleStateChange = (state: string) => {
    const nextGroup = contactPointGroups.find((group) => group.state === state);
    setNearbyState(state);
    setNearbyPoint(nextGroup?.points[0] ?? "");
  };

  return (
    <footer className="bg-[#07111f] text-slate-200">
      <div className="mx-auto max-w-[1500px] border-t border-white/10 px-3 py-4 sm:px-6 sm:py-7 lg:px-8">
        <div className="grid gap-4 border-b border-white/10 pb-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex min-w-0 gap-3">
            <Link
              href="/"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white p-1.5 shadow-sm"
              aria-label="ILMALINK MEDIGO home"
            >
              <img src="/logoimage.svg" alt="" className="h-full w-full object-contain" />
            </Link>
           <div className="min-w-0">
  <p className="text-base font-semibold tracking-wide text-white">
    ILMALINK MEDIGO <span className="text-emerald-200">by ilmaLink</span>
  </p>
  <p className="mt-1 max-w-xl text-sm leading-5 text-slate-400">
    ILMALINK MEDIGO guides Indian students for MBBS Abroad, MBBS India, NEET
    counselling, scholarships, education loans and medical admission documentation
    through transparent support from Kolkata, Bengaluru and Mumbai contact points.
  </p>
</div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <ContactAction
              href={contact.callHref}
              icon={<Phone className="h-3.5 w-3.5" />}
              label="Call"
              value={contact.call}
            />
            <ContactAction
              href={contact.emailHref}
              icon={<Mail className="h-3.5 w-3.5" />}
              label="Email"
              value={contact.email}
            />
            <ContactAction
              href={contact.whatsappHref}
              icon={<MessageCircle className="h-3.5 w-3.5" />}
              label="WhatsApp"
              value={contact.whatsapp}
              external
            />
            <button
              type="button"
              onClick={() => setContactPointsOpen(true)}
              className="flex min-w-0 items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-2 text-left transition hover:border-emerald-300/40 hover:bg-emerald-300/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-300/10 text-emerald-200">
                <LocateFixed className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Contact
                </span>
                <span className="block truncate text-xs font-semibold text-white sm:text-sm">
                  Nearby Contact Points
                </span>
              </span>
            </button>
          </div>
        </div>

        <section aria-labelledby="footer-offices" className="border-b border-white/10 py-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h2
              id="footer-offices"
              className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              Offices
            </h2>
            <button
              type="button"
              onClick={() => setContactPointsOpen((open) => !open)}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-emerald-300/40 hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
              aria-expanded={contactPointsOpen}
            >
              Nearby Contact Points
              <ChevronDown
                className={`h-3.5 w-3.5 transition ${contactPointsOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
  {offices.map((office) => (
    <article
      key={`${office.label}-${office.city}`}
      className="min-w-0 rounded-md border border-white/10 bg-white/[0.025] p-2.5 text-center"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-200">
        {office.label}
      </p>
      <p className="mt-1 text-sm font-semibold text-white">{office.city}</p>
      <p className="mx-auto mt-1 max-w-[18rem] text-[11px] leading-4 text-slate-400">
        {office.address}
      </p>
    </article>
  ))}
</div>

          {contactPointsOpen && (
            <div className="mt-3 rounded-md border border-white/10 bg-white/[0.025] p-3">
              <h3 className="mb-2 text-sm font-semibold text-white">Nearby Contact Points</h3>
              <div className="grid grid-cols-2 gap-2">
                {contactPointGroups.map((group) => (
                  <div key={group.state} className="rounded-md border border-white/10 p-2">
                    <p className="text-sm font-semibold text-white">{group.state}</p>
                    <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
                      {group.note}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {group.points.map((point) => (
                        <button
                          type="button"
                          key={`${group.state}-${point}`}
                          onClick={() => choosePoint(group.state, point)}
                          className={`rounded-full border px-2 py-1 text-[11px] font-semibold transition ${
                            nearbyState === group.state && selectedPoint === point
                              ? "border-emerald-300 bg-emerald-300 text-slate-950"
                              : "border-white/10 text-slate-300 hover:border-emerald-300/50 hover:text-white"
                          }`}
                        >
                          {point}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <label className="block min-w-0">
                  <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    State / region
                  </span>
                  <select
                    id="footer-nearby-state"
                    name="footerNearbyState"
                    value={nearbyState}
                    onChange={(event) => handleStateChange(event.target.value)}
                    className="h-10 w-full rounded-md border border-white/10 bg-[#07111f] px-2 text-sm font-semibold text-white outline-none focus:border-emerald-300"
                  >
                    {contactPointGroups.map((group) => (
                      <option key={group.state} value={group.state}>
                        {group.state}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block min-w-0">
                  <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {pointLabel}
                  </span>
                  <select
                    id="footer-nearby-contact-point"
                    name="footerNearbyContactPoint"
                    value={selectedPoint}
                    onChange={(event) => setNearbyPoint(event.target.value)}
                    className="h-10 w-full rounded-md border border-white/10 bg-[#07111f] px-2 text-sm font-semibold text-white outline-none focus:border-emerald-300"
                  >
                    {selectedGroup.points.map((point) => (
                      <option key={point} value={point}>
                        {point}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <a
                href={nearbyWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-emerald-300 px-4 text-sm font-bold text-slate-950 transition hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-100 sm:w-auto"
              >
                <Send className="h-4 w-4" />
                Send student details on WhatsApp
              </a>
            </div>
          )}
        </section>

        <div className="grid gap-4 border-b border-white/10 py-4 md:grid-cols-[1.1fr_0.9fr]">
          <nav aria-label="Footer navigation" className="grid grid-cols-3 gap-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {group.title}
                </h2>
                <ul className="mt-2 space-y-1.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="flex flex-wrap items-start justify-start gap-2 md:justify-end">
            <CounsellingLink
              href="/"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-emerald-300 px-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-100"
            >
              Book counselling
              <ArrowRight className="h-4 w-4" />
            </CounsellingLink>
            <button
              type="button"
              onClick={openSearch}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-white/12 px-3 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
            >
              <Search className="h-4 w-4" />
              Search site
            </button>
            <div className="flex flex-wrap items-center gap-1.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow ILMALINK on ${social.label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-emerald-300/50 hover:bg-emerald-300/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-3 text-xs leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ILMALINK MEDIGO. All Rights Reserved.</p>
          <p>
            Developed and guided by{" "}
            <Link href="/" className="font-semibold text-slate-300 transition hover:text-white">
              ILMALINK
            </Link>
            .
          </p>
        </div>
      </div>

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenCounselling={() => openCounselling()}
      />
    </footer>
  );
}
