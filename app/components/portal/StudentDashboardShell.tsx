"use client";

import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BookOpenCheck,
  Building2,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Settings,
  UserRound,
  UsersRound,
  ShieldCheck,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type StudentNavItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  badge?: string;
};

const studentNavItems: StudentNavItem[] = [
  { label: "Dashboard", href: "/portal/student/dashboard", icon: LayoutDashboard },
  { label: "My Profile", href: "/portal/student/profile", icon: UserRound },
  { label: "Documents", href: "/portal/student/documents", icon: FileText },
  { label: "Application", href: "/portal/student/application-status", icon: ClipboardList },
  { label: "NEET Guidance", icon: BookOpenCheck, badge: "Soon" },
  { label: "Colleges & Countries", icon: Building2, badge: "Soon" },
  { label: "Counselling", icon: UsersRound, badge: "Soon" },
  { label: "Messages", icon: MessageSquare, badge: "Soon" },
  { label: "Notifications", icon: Bell, badge: "Soon" },
  { label: "Support", icon: CircleHelp, badge: "Soon" },
  { label: "Settings", icon: Settings, badge: "Soon" },
];

const mobileNavItems: StudentNavItem[] = [
  studentNavItems[0],
  studentNavItems[1],
  studentNavItems[2],
  { label: "Messages", icon: MessageSquare },
];

export default function StudentDashboardShell({
  children,
  adminPreview,
}: {
  children: React.ReactNode;
  adminPreview?: {
    studentName: string;
    studentCode: string;
  };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [leavingPreview, setLeavingPreview] = useState(false);

  async function returnToAdmin() {
    setLeavingPreview(true);
    try {
      const response = await fetch("/api/portal/admin/student-preview", {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Unable to close student preview.");
      router.push("/portal/admin/dashboard");
      router.refresh();
    } finally {
      setLeavingPreview(false);
    }
  }

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch("/api/portal/auth/logout", { method: "POST" });
      router.push("/portal/login?tab=student");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#071A45] lg:grid lg:grid-cols-[242px_minmax(0,1fr)]">
      <aside className="hidden min-h-screen bg-[linear-gradient(180deg,#031B3D_0%,#062C5C_55%,#031A3B_100%)] px-3 py-5 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <PortalBrand inverse />
        <nav className="mt-8 space-y-1.5" aria-label="Student portal navigation">
          {studentNavItems.map((item) => (
            <DesktopNavItem key={item.label} item={item} pathname={pathname} />
          ))}
        </nav>
        <button
          type="button"
          onClick={logout}
          disabled={loggingOut}
          className="mt-auto flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold text-[#FF6B7A] transition hover:bg-white/10 disabled:opacity-60"
        >
          <LogOut className="h-[18px] w-[18px]" />
          {loggingOut ? "Signing out..." : "Logout"}
        </button>
      </aside>

      <div className="min-w-0 pb-20 lg:pb-0">
        {adminPreview ? (
          <div className="sticky top-0 z-50 flex min-h-12 items-center justify-between gap-3 bg-[#082A62] px-4 py-2 text-white sm:px-6 lg:static lg:px-9">
            <p className="flex min-w-0 items-center gap-2 text-xs font-bold sm:text-sm">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#77F2D1]" />
              <span className="truncate">
                Super Admin student preview: {adminPreview.studentName} · {adminPreview.studentCode}
              </span>
            </p>
            <button
              type="button"
              onClick={returnToAdmin}
              disabled={leavingPreview}
              className="shrink-0 rounded-lg bg-white px-3 py-2 text-[10px] font-black text-[#082A62] disabled:opacity-60 sm:text-xs"
            >
              {leavingPreview ? "Returning..." : "Return to Admin"}
            </button>
          </div>
        ) : null}
        <header className="sticky top-0 z-40 border-b border-[#E1E7F0] bg-white/95 backdrop-blur lg:static">
          <div className="flex h-[72px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-[74px] lg:px-9">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[#071A45] lg:hidden"
              aria-label="Open student portal navigation"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="lg:hidden">
              <PortalBrand />
            </div>
            <div className="hidden lg:block">
              <h1 className="text-xl font-black tracking-[-.025em] text-[#0A1020]">
                Student Dashboard
              </h1>
              <p className="mt-0.5 text-xs font-semibold text-[#58657C]">
                Your ilmaLink student dashboard
              </p>
            </div>
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#071A45]"
              aria-label="Notifications — coming soon"
              title="Notifications coming soon"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#E73749]" />
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1480px] px-3 py-4 sm:px-5 sm:py-5 lg:px-5 lg:py-5 xl:px-6">
          {children}
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid h-[68px] grid-cols-5 border-t border-[#DCE4EF] bg-white px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_25px_rgba(8,42,98,.08)] lg:hidden">
        {mobileNavItems.map((item) => (
          <MobileNavItem key={item.label} item={item} pathname={pathname} />
        ))}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex flex-col items-center justify-center gap-1 text-[10px] font-bold text-[#33415C]"
        >
          <MoreHorizontal className="h-5 w-5" />
          More
        </button>
      </nav>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/45 lg:hidden">
          <aside className="h-full w-[min(86vw,320px)] overflow-y-auto bg-[linear-gradient(180deg,#031B3D,#062C5C)] p-4 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <PortalBrand inverse />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"
                aria-label="Close student portal navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-7 space-y-1.5" aria-label="Mobile student portal navigation">
              {studentNavItems.map((item) => (
                <DesktopNavItem
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  onNavigate={() => setMenuOpen(false)}
                />
              ))}
            </nav>
            <button
              type="button"
              onClick={logout}
              disabled={loggingOut}
              className="mt-6 flex min-h-11 w-full items-center gap-3 rounded-xl bg-white/10 px-3 text-sm font-bold text-[#FF8994]"
            >
              <LogOut className="h-[18px] w-[18px]" />
              {loggingOut ? "Signing out..." : "Logout"}
            </button>
          </aside>
        </div>
      ) : null}
    </main>
  );
}

function PortalBrand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/portal/student/dashboard" className="flex items-center gap-2.5">
      <Image
        src="/logoimage.svg"
        alt="ilmaLink logo"
        width={46}
        height={46}
        className={`h-11 w-11 ${inverse ? "rounded-lg bg-white/95 p-1" : ""}`}
      />
      <span>
        <strong className={`block text-[17px] font-black tracking-[.11em] ${inverse ? "text-white" : "text-[#071A45]"}`}>
          ilmaLink
        </strong>
        <strong className="block text-[17px] font-black tracking-[.11em] text-[#00B886]">
          ilmaLink
        </strong>
        <span className={`block text-[9px] font-bold tracking-[.13em] ${inverse ? "text-white/70" : "text-[#23324D]"}`}>
          STUDENT PORTAL
        </span>
      </span>
    </Link>
  );
}

function DesktopNavItem({
  item,
  pathname,
  onNavigate,
}: {
  item: StudentNavItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const active = Boolean(item.href && pathname === item.href);
  const content = (
    <>
      <item.icon className="h-[18px] w-[18px] shrink-0" />
      <span className="flex-1">{item.label}</span>
      {item.badge ? (
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-wide text-white/65">
          {item.badge}
        </span>
      ) : (
        <ChevronRight className="h-4 w-4 opacity-55" />
      )}
    </>
  );

  if (!item.href) {
    return (
      <span className="flex min-h-11 cursor-not-allowed items-center gap-3 rounded-xl px-3 text-sm font-semibold text-white/55">
        {content}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold transition ${
        active
          ? "bg-[linear-gradient(105deg,#285BFF,#493BE6)] text-white shadow-[0_10px_24px_rgba(36,72,255,.35)]"
          : "text-white/85 hover:bg-white/10 hover:text-white"
      }`}
    >
      {content}
    </Link>
  );
}

function MobileNavItem({
  item,
  pathname,
}: {
  item: StudentNavItem;
  pathname: string;
}) {
  const active = Boolean(item.href && pathname === item.href);

  if (!item.href) {
    return (
      <span className="flex cursor-not-allowed flex-col items-center justify-center gap-1 text-[10px] font-bold text-[#8A94A8]">
        <item.icon className="h-5 w-5" />
        {item.label}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold ${
        active ? "text-[#0F4CFF]" : "text-[#33415C]"
      }`}
    >
      <item.icon className="h-5 w-5" />
      {item.label.replace("My ", "")}
    </Link>
  );
}
