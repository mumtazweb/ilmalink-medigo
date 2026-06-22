"use client";

import type { LucideIcon } from "lucide-react";
import {
  ChevronRight,
  LogOut,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export type PortalNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export default function PortalDashboardShell({
  title,
  subtitle,
  roleLabel,
  navItems,
  children,
}: {
  title: string;
  subtitle: string;
  roleLabel: string;
  navItems: PortalNavItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch("/api/portal/auth/logout", { method: "POST" });
      router.push("/portal/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F3F7FB] text-[#082A62]">
      <header className="sticky top-0 z-40 border-b border-[#D8E4EF] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-3 px-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D8E4EF] lg:hidden"
              aria-label="Open portal navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="flex min-w-0 items-center gap-2">
              <Image
                src="/logoimage.svg"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="min-w-0">
                <strong className="block truncate text-sm font-black">
                  ILMALINK <span className="text-[#009C95]">MEDIGO</span>
                </strong>
                <span className="block truncate text-[9px] font-bold uppercase tracking-[.12em] text-[#60738F]">
                  Education Portal
                </span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-[#EAF3FF] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#0B4AA2] sm:inline-flex">
              {roleLabel}
            </span>
            <button
              type="button"
              onClick={logout}
              disabled={loggingOut}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#D8E4EF] px-3 text-xs font-black text-[#31577F]"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">
                {loggingOut ? "Signing out..." : "Sign out"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[250px_1fr]">
        <aside className="hidden min-h-[calc(100vh-64px)] border-r border-[#D8E4EF] bg-white p-4 lg:block">
          <PortalNav navItems={navItems} pathname={pathname} />
        </aside>
        <section className="min-w-0 px-3 py-5 sm:px-6 sm:py-7 lg:px-8">
          <div className="mb-6 rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_8px_22px_rgba(8,42,98,.05)] sm:p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E7F8F2] text-[#08A776]">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <h1 className="text-2xl font-black tracking-[-.025em] text-[#082A62] sm:text-3xl">
                  {title}
                </h1>
                <p className="mt-1 text-sm font-medium leading-6 text-[#60738F]">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
          {children}
        </section>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/45 lg:hidden">
          <aside className="h-full w-[285px] overflow-y-auto bg-white p-4 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <strong className="text-sm font-black">Portal Navigation</strong>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D8E4EF]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <PortalNav
              navItems={navItems}
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      ) : null}
    </main>
  );
}

function PortalNav({
  navItems,
  pathname,
  onNavigate,
}: {
  navItems: PortalNavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-1.5">
      {navItems.map((item) => {
        const active =
          pathname === item.href ||
          (item.href.endsWith("/dashboard") &&
            pathname.startsWith(item.href.replace("/dashboard", "")) &&
            pathname === item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold transition ${
              active
                ? "bg-[linear-gradient(105deg,#0B4AA2,#087F9F)] text-white shadow-[0_8px_18px_rgba(11,74,162,.18)]"
                : "text-[#46617F] hover:bg-[#F1F6FB] hover:text-[#0B4AA2]"
            }`}
          >
            <item.icon className="h-[18px] w-[18px] shrink-0" />
            <span className="flex-1">{item.label}</span>
            <ChevronRight className="h-4 w-4 opacity-70" />
          </Link>
        );
      })}
    </nav>
  );
}
