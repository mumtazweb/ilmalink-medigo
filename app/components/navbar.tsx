"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MessageCircle,
  Search,
  Menu,
  ChevronDown,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  return (

    <header className="fixed left-0 top-0 z-50 w-full">

      {/* ROW 1 — TOP CONTACT BAR */}
      {/* STYLE UPDATED: Neutral, low-noise utility bar with consistent brand hover colors. */}
      <div className="border-b border-slate-200/80 bg-white/95 text-xs font-medium text-slate-600 backdrop-blur-xl md:text-sm">

        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">

          {/* CONTACTS */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">

            <a
              href="tel:+919330155576"
              className="flex items-center gap-2 transition hover:text-[#0F4CFF]"
            >

              <Phone size={14} />

              <span>+91 9330155576</span>

            </a>

            <a
              href="mailto:middya@ilmalink.com"
              className="hidden items-center gap-2 transition hover:text-[#0F4CFF] md:flex"
            >

              <Mail size={14} />

              <span>middya@ilmalink.com</span>

            </a>

            <a
              href="https://wa.me/919563910223"
              target="_blank"
              className="hidden items-center gap-2 text-[#16A34A] transition hover:text-[#15803d] md:flex"
            >

              <MessageCircle size={14} />

              <span>WhatsApp</span>

            </a>

          </div>

          {/* SOCIALS */}
          <div className="flex items-center gap-3 text-slate-500">

            <a
              href="https://www.facebook.com/share/1Edsb6dJwu/"
              target="_blank"
              className="transition hover:text-[#0F4CFF]"
            >

              <FaFacebookF size={14} />

            </a>

            <a
              href="https://www.instagram.com/injamul_bin_ebrahim_middya"
              target="_blank"
              className="transition hover:text-[#0F4CFF]"
            >

              <FaInstagram size={15} />

            </a>

            <a
              href="https://www.youtube.com/@injamul.h.middya"
              target="_blank"
              className="transition hover:text-[#0F4CFF]"
            >

              <FaYoutube size={16} />

            </a>

          </div>

        </div>

      </div>

      {/* ROW 2 — MAIN NAVBAR */}
      {/* STYLE UPDATED: Premium white header, calmer border, and cleaner vertical rhythm. */}
      <div className="border-b border-slate-200/80 bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8 lg:py-3.5">

          {/* MOBILE LEFT */}
          <div className="flex min-w-0 items-center gap-2.5 lg:hidden">

            {/* HAMBURGER */}
            <button
  onClick={() => setMobileMenuOpen(true)}
  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#0F172A] transition hover:border-[#0F4CFF]/30 hover:text-[#0F4CFF]"
>
              <Menu size={24} />

            </button>

            {/* LOGO */}
            <img
              src="/logoimage.svg"
              alt="ILMALINK MEDIGO Logo"
              className="h-9 w-9 object-contain"
            />

            {/* LOGO TEXT */}
            <h2 className="truncate text-base font-bold tracking-normal text-[#0F172A]">

  <span className="text-[#0F172A]">
    Ilma
  </span>

  <span className="text-[#0F172A]">
    Link
  </span>

  <span className="text-[#0F4CFF]">
    {" "}Medigo
  </span>

</h2>

</div>

          {/* DESKTOP LOGO */}
          <div className="hidden items-center gap-2.5 lg:flex">

            <img
              src="/logoimage.svg"
              alt="ILMALINK MEDIGO Logo"
              className="h-10 w-10 object-contain"
            />

            <h2 className="text-xl font-bold tracking-normal text-[#0F172A]">

              ILMALINK
              <span className="text-[#0F4CFF]"> MEDIGO</span>

            </h2>

          </div>

          {/* DESKTOP MENU */}
          {/* STYLE UPDATED: Reduced menu spacing and calmer hover hierarchy. */}
          <nav className="hidden items-center gap-5 text-sm font-medium text-[#0F172A] lg:flex xl:gap-7">

            <a href="/about/" className="transition hover:text-[#0F4CFF]">

              About Us

            </a>
{/* DESKTOP MBBS ABROAD */}
<div className="relative">

  <button
    onClick={() => setCountryMenuOpen(!countryMenuOpen)}
    className="flex items-center gap-1.5 text-[#0F172A] transition hover:text-[#0F4CFF]"
  >

    MBBS Abroad

    <ChevronDown size={18} />

  </button>

  {/* STYLE UPDATED: Cleaner dropdown surface with consistent radius, spacing, and neutral text. */}
  {countryMenuOpen && (

    <div className="absolute left-0 top-full mt-4 w-[520px] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.14)]">

      <h3 className="mb-5 text-lg font-bold text-[#0F172A]">

        Top MBBS Destinations

      </h3>

      <div className="flex justify-between gap-8 text-sm text-[#0F172A]">

        {/* LEFT COLUMN */}
        <div className="space-y-3">

          <a href="/mbbs-abroad/kyrgyzstan" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            <img
              src="https://flagcdn.com/w40/kg.png"
              alt="Kyrgyzstan Flag"
              className="w-5 h-4 rounded-sm"
            />

            Kyrgyzstan

            <span className="bg-[#0F4CFF]/10 text-[#0F4CFF] text-xs px-2 py-1 rounded-full">

              Top

            </span>

          </a>

          <a href="/mbbs-abroad/georgia" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            <img
              src="https://flagcdn.com/w40/ge.png"
              alt="Georgia Flag"
              className="w-5 h-4 rounded-sm"
            />

            Georgia

            <span className="bg-[#0F4CFF]/10 text-[#0F4CFF] text-xs px-2 py-1 rounded-full">

              Top

            </span>

          </a>

          <a href="/mbbs-abroad/bangladesh" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            <img
              src="https://flagcdn.com/w40/bd.png"
              alt="Bangladesh Flag"
              className="w-5 h-4 rounded-sm"
            />

            Bangladesh

            <span className="bg-[#0F4CFF]/10 text-[#0F4CFF] text-xs px-2 py-1 rounded-full">

              Top

            </span>

          </a>

          <a href="/mbbs-abroad/russia" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            <img
              src="https://flagcdn.com/w40/ru.png"
              alt="Russia Flag"
              className="w-5 h-4 rounded-sm"
            />

            Russia

          </a>

          <a href="/mbbs-abroad/kazakhstan" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            <img
              src="https://flagcdn.com/w40/kz.png"
              alt="Kazakhstan Flag"
              className="w-5 h-4 rounded-sm"
            />

            Kazakhstan

          </a>

          <a href="/mbbs-abroad/uzbekistan" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            <img
              src="https://flagcdn.com/w40/uz.png"
              alt="Uzbekistan Flag"
              className="w-5 h-4 rounded-sm"
            />

            Uzbekistan

          </a>

          <a href="/mbbs-abroad/tajikistan" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            <img
              src="https://flagcdn.com/w40/tj.png"
              alt="Tajikistan Flag"
              className="w-5 h-4 rounded-sm"
            />

            Tajikistan

          </a>
          <a href="/mbbs-abroad/malaysia" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

  <img
    src="https://flagcdn.com/w40/my.png"
    alt="Malaysia Flag"
    className="w-5 h-4 rounded-sm"
  />

  Malaysia

</a>
          <a href="/mbbs-abroad/egypt" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            <img
              src="https://flagcdn.com/w40/eg.png"
              alt="Egypt Flag"
              className="w-5 h-4 rounded-sm"
            />

            Egypt

          </a>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-3 text-right">

          <a href="/mbbs-abroad/saudi-arabia" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            Saudi Arabia

            <img
              src="https://flagcdn.com/w40/sa.png"
              alt="Saudi Arabia Flag"
              className="w-5 h-4 rounded-sm"
            />

          </a>

          <a href="/mbbs-abroad/qatar" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            Qatar

            <img
              src="https://flagcdn.com/w40/qa.png"
              alt="Qatar Flag"
              className="w-5 h-4 rounded-sm"
            />

          </a>

          <a href="/mbbs-abroad/uae" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            UAE

            <img
              src="https://flagcdn.com/w40/ae.png"
              alt="UAE Flag"
              className="w-5 h-4 rounded-sm"
            />

          </a>

          <a href="/mbbs-abroad/iran" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            Iran

            <img
              src="https://flagcdn.com/w40/ir.png"
              alt="Iran Flag"
              className="w-5 h-4 rounded-sm"
            />

          </a>

          <a href="/mbbs-abroad/usa" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            USA

            <img
              src="https://flagcdn.com/w40/us.png"
              alt="USA Flag"
              className="w-5 h-4 rounded-sm"
            />

          </a>

          <a href="/mbbs-abroad/canada" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            Canada

            <img
              src="https://flagcdn.com/w40/ca.png"
              alt="Canada Flag"
              className="w-5 h-4 rounded-sm"
            />

          </a>

          <a href="/mbbs-abroad/australia" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            Australia

            <img
              src="https://flagcdn.com/w40/au.png"
              alt="Australia Flag"
              className="w-5 h-4 rounded-sm"
            />

          </a>

          <a href="/mbbs-abroad/new-zealand" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            New Zealand

            <img
              src="https://flagcdn.com/w40/nz.png"
              alt="New Zealand Flag"
              className="w-5 h-4 rounded-sm"
            />

          </a>

          <a href="/mbbs-abroad/uk" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

            England (UK)

            <img
              src="https://flagcdn.com/w40/gb.png"
              alt="UK Flag"
              className="w-5 h-4 rounded-sm"
            />

          </a>

        </div>

      </div>

    </div>

  )}

</div>

            <a href="/mbbs-india/" className="transition hover:text-[#0F4CFF]">

              MBBS India

            </a>

          <a
  href="https://www.mumtazeducation.com"
  target="_blank"
  rel="noopener noreferrer"
  className="transition hover:text-[#0F4CFF]"
>

  NEET

</a>

            <Link
  href="/blogs"
  className="transition hover:text-[#0F4CFF]"
>
  Blogs
</Link>

            <a href="/alert/" className="font-semibold text-[#0F4CFF] transition hover:text-[#0b3fd6]">

              ALERT

            </a>

          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2.5">

            {/* DESKTOP LIVE BOX */}
            {/* STYLE UPDATED: Premium live CTA using accent green and neutral live indicator. */}
<a
  href="https://wa.me/919563910223"
  target="_blank"
  className="group hidden items-center gap-2.5 rounded-full border border-[#16A34A]/20 bg-[#F8FAFC] px-3.5 py-2 text-[#0F172A] shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-[#16A34A]/35 hover:bg-white hover:shadow-[0_14px_28px_rgba(22,163,74,0.16)] md:flex"
>

  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16A34A]/10 text-[#16A34A] transition duration-300 group-hover:bg-[#16A34A] group-hover:text-white">
    <MessageCircle size={18} />
  </span>

  {/* TEXT */}
  <div className="flex flex-col leading-tight">

    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#0F4CFF]">

      <span className="relative flex h-2 w-2">

        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16A34A] opacity-60"></span>

        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16A34A]"></span>

      </span>

      LIVE

    </span>

    <span className="text-sm font-bold text-[#0F172A]">

      Counselling

    </span>

  </div>

</a>

{/* MOBILE LIVE BOX */}
<a
  href="https://wa.me/919563910223"
  target="_blank"
  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#16A34A]/25 bg-white text-[#16A34A] shadow-[0_10px_22px_rgba(15,23,42,0.10)] transition duration-300 hover:bg-[#F8FAFC] md:hidden"
>

  <MessageCircle size={19} />

  <span className="absolute right-1.5 top-1.5 flex h-2.5 w-2.5">

    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16A34A] opacity-60"></span>

    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#16A34A] ring-2 ring-white"></span>

  </span>

</a>

            {/* SEARCH */}
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#0F172A] transition hover:border-[#0F4CFF]/30 hover:bg-[#F8FAFC] hover:text-[#0F4CFF]">

              <Search size={16} />

            </button>

            {/* APPLY */}
            <button className="min-h-10 rounded-full bg-[#0F4CFF] px-5 py-2 text-sm font-bold text-white shadow-[0_10px_22px_rgba(15,76,255,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0b3fd6]">

              Apply

            </button>

          </div>

        </div>
{/* MOBILE MENU */}
{/* STYLE UPDATED: Mobile drawer uses the same neutral production surface and spacing. */}
{mobileMenuOpen && (

  <div className="fixed left-0 top-[94px] z-50 flex h-[calc(100vh-94px)] w-full bg-[#0F172A]/20 backdrop-blur-sm lg:hidden">

    {/* LEFT DRAWER */}
    <div className="min-h-screen w-[84%] max-w-sm overflow-y-auto bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.18)] animate-in slide-in-from-left duration-300">

      {/* TOP */}
       <div className="mb-8 flex items-center justify-between">

        <h2 className="text-lg font-bold tracking-normal text-[#0F172A]">

          EXPLORE

        </h2>

        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setCountryMenuOpen(false);
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-xl text-[#0F172A] transition hover:border-[#0F4CFF]/30 hover:text-[#0F4CFF]"
        >

          ✕

        </button>

      </div>

      {/* NAV LINKS */}
      <div className="flex flex-col gap-5 text-base font-medium text-[#0F172A]">

        <a
          href="/about/"
          className="transition hover:text-[#0F4CFF]"
        >

          About Us

        </a>

        {/* MBBS ABROAD */}
        <button
          onClick={() => setCountryMenuOpen(!countryMenuOpen)}
          className="flex items-center justify-between transition hover:text-[#0F4CFF]"
        >

          <span>MBBS Abroad</span>

          <span className="text-2xl leading-none">

            {countryMenuOpen ? "−" : "+"}

          </span>

        </button>

        <a
          href="mbbs-india/west-bengal"
          className="transition hover:text-[#0F4CFF]"
        >

          MBBS India

        </a>

        <a
          href="https://www.mumtazeducation.com"
          className="transition hover:text-[#0F4CFF]"
        >

          NEET

        </a>

        <Link
  href="/blogs"
  className="transition hover:text-[#0F4CFF]"
>
  Blogs
</Link>

        <a
          href="coming-soon"
          className="font-semibold text-[#0F4CFF] transition hover:text-[#0b3fd6]"
        >

          ALERT

        </a>

      </div>

    </div>

    {/* COUNTRY PANEL */}
   {countryMenuOpen && (

  <div className="absolute left-0 top-0 z-[60] flex h-full w-full">

       <div className="mx-auto mt-5 max-h-[80vh] w-[92%] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.18)] animate-in slide-in-from-left duration-300">
          {/* HEADING */}
          <h3 className="mb-5 text-lg font-bold text-[#0F172A]">

            Top MBBS Destinations
 
          </h3>

          {/* 2 COLUMNS */}
          <div className="flex justify-between gap-6 text-sm text-[#0F172A]">

            {/* LEFT COLUMN */}
            <div className="space-y-3">

              <a href="/mbbs-abroad/kyrgyzstan" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                <img
                  src="https://flagcdn.com/w40/kg.png"
                  alt="Kyrgyzstan Flag"
                  className="w-5 h-4 rounded-sm"
                />

                Kyrgyzstan

                <span className="bg-[#0F4CFF]/10 text-[#0F4CFF] text-xs px-2 py-1 rounded-full">

                  Top

                </span>

              </a>

              <a href="/mbbs-abroad/georgia" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                <img
                  src="https://flagcdn.com/w40/ge.png"
                  alt="Georgia Flag"
                  className="w-5 h-4 rounded-sm"
                />

                Georgia

                <span className="bg-[#0F4CFF]/10 text-[#0F4CFF] text-xs px-2 py-1 rounded-full">

                  Top

                </span>

              </a>

              <a href="/mbbs-abroad/bangladesh" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                <img
                  src="https://flagcdn.com/w40/bd.png"
                  alt="Bangladesh Flag"
                  className="w-5 h-4 rounded-sm"
                />

                Bangladesh

                <span className="bg-[#0F4CFF]/10 text-[#0F4CFF] text-xs px-2 py-1 rounded-full">

                  Top

                </span>

              </a>

              <a href="/mbbs-abroad/russia" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                <img
                  src="https://flagcdn.com/w40/ru.png"
                  alt="Russia Flag"
                  className="w-5 h-4 rounded-sm"
                />

                Russia

              </a>

              <a href="/mbbs-abroad/kazakhstan" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                <img
                  src="https://flagcdn.com/w40/kz.png"
                  alt="Kazakhstan Flag"
                  className="w-5 h-4 rounded-sm"
                />

                Kazakhstan

              </a>

              <a href="/mbbs-abroad/uzbekistan" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                <img
                  src="https://flagcdn.com/w40/uz.png"
                  alt="Uzbekistan Flag"
                  className="w-5 h-4 rounded-sm"
                />

                Uzbekistan

              </a>

              <a href="/mbbs-abroad/tajikistan" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                <img
                  src="https://flagcdn.com/w40/tj.png"
                  alt="Tajikistan Flag"
                  className="w-5 h-4 rounded-sm"
                />

                Tajikistan

              </a>

              <a href="/mbbs-abroad/egypt" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                <img
                  src="https://flagcdn.com/w40/eg.png"
                  alt="Egypt Flag"
                  className="w-5 h-4 rounded-sm"
                />

                Egypt

              </a>

              <a href="/mbbs-abroad/malaysia" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                <img
                  src="https://flagcdn.com/w40/my.png"
                  alt="Malaysia Flag"
                  className="w-5 h-4 rounded-sm"
                />

                Malaysia

              </a>

              <a href="/mbbs-abroad/barbados" className="flex items-center gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                <img
                  src="https://flagcdn.com/w40/bb.png"
                  alt="Barbados Flag"
                  className="w-5 h-4 rounded-sm"
                />

                Barbados

              </a>

            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-4 text-right">

              <a href="/mbbs-abroad/saudi-arabia" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                Saudi Arabia

                <img
                  src="https://flagcdn.com/w40/sa.png"
                  alt="Saudi Arabia Flag"
                  className="w-5 h-4 rounded-sm"
                />

              </a>

              <a href="/mbbs-abroad/qatar" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                Qatar

                <img
                  src="https://flagcdn.com/w40/qa.png"
                  alt="Qatar Flag"
                  className="w-5 h-4 rounded-sm"
                />

              </a>

               <a href="/mbbs-abroad/uae" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                UAE

                <img
                  src="https://flagcdn.com/w40/ae.png"
                  alt="United Arab Emirates Flag"
                  className="w-5 h-4 rounded-sm"
                />

              </a>

              <a href="/mbbs-abroad/iran" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                Iran

                <img
                  src="https://flagcdn.com/w40/ir.png"
                  alt="Iran Flag"
                  className="w-5 h-4 rounded-sm"
                />

              </a>

              <a href="/mbbs-abroad/vietnam" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                Vietnam

                <img
                  src="https://flagcdn.com/w40/vn.png"
                  alt="Vietnam Flag"
                  className="w-5 h-4 rounded-sm"
                />

              </a>

              <a href="/mbbs-abroad/singapore" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                Singapore

                <img
                  src="https://flagcdn.com/w40/sg.png"
                  alt="Singapore Flag"
                  className="w-5 h-4 rounded-sm"
                />

              </a>

              <a href="/mbbs-abroad/usa" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                USA

                <img
                  src="https://flagcdn.com/w40/us.png"
                  alt="USA Flag"
                  className="w-5 h-4 rounded-sm"
                />

              </a>

              <a href="/mbbs-abroad/canada" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                Canada

                <img
                  src="https://flagcdn.com/w40/ca.png"
                  alt="Canada Flag"
                  className="w-5 h-4 rounded-sm"
                />

              </a>

              <a href="/mbbs-abroad/australia" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                Australia

                <img
                  src="https://flagcdn.com/w40/au.png"
                  alt="Australia Flag"
                  className="w-5 h-4 rounded-sm"
                />

              </a>

              <a href="/mbbs-abroad/new-zealand" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                New Zealand

                <img
                  src="https://flagcdn.com/w40/nz.png"
                  alt="New Zealand Flag"
                  className="w-5 h-4 rounded-sm"
                />

              </a>

              <a href="/mbbs-abroad/united-kingdom" className="flex items-center justify-end gap-2 text-[#0F172A] hover:text-[#0F4CFF] transition">

                England (UK)

                <img
                  src="https://flagcdn.com/w40/gb.png"
                  alt="UK Flag"
                  className="w-5 h-4 rounded-sm"
                />

              </a>

            </div>

          </div>

        </div>

      </div>

    )}

  </div>

)}

      </div>

    </header>

  );
}
  

