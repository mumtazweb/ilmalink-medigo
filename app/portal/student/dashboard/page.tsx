import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  CheckCircle2,
  Circle,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  FileBadge,
  FileText,
  GraduationCap,
  IdCard,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  School,
  ShieldCheck,
  Upload,
  UserRound,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import PortalCallbackButton from "../../../components/portal/PortalCallbackButton";
import { getCurrentPortalStudent } from "../../../lib/portal/session";
import { parseStoredInterests } from "../../../lib/portal/validation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Student Dashboard | ILMALINK MEDIGO",
  robots: { index: false, follow: false },
};

const supportWhatsAppUrl =
  "https://wa.me/919563910223?text=I%20need%20help%20with%20my%20ILMALINK%20MEDIGO%20student%20profile.";

const quickActions = [
  {
    title: "Complete Profile",
    text: "Add your personal and academic details",
    href: "/portal/student/profile",
    icon: UserRound,
    tone: "violet",
  },
  {
    title: "Upload Documents",
    text: "Document upload coming soon",
    icon: Upload,
    tone: "green",
    soon: true,
  },
  {
    title: "Check Eligibility",
    text: "Check your NEET & country eligibility",
    href: "#eligibility-snapshot",
    icon: ShieldCheck,
    tone: "blue",
  },
  {
    title: "Book Counselling",
    text: "Request a session with our expert counsellors",
    href: "#counsellor-support",
    icon: CalendarDays,
    tone: "orange",
  },
  {
    title: "WhatsApp Support",
    text: "Chat with our support team on WhatsApp",
    href: supportWhatsAppUrl,
    icon: MessageCircle,
    tone: "whatsapp",
    external: true,
  },
] as const;

const documentRequirements = [
  { label: "Class 10 Marksheet", keys: ["class 10", "10th"] },
  { label: "Class 12 Marksheet", keys: ["class 12", "12th"] },
  { label: "NEET Admit Card/Scorecard", keys: ["neet", "scorecard", "admit"] },
  { label: "Aadhaar / Passport ID", keys: ["aadhaar", "identity", "passport id"] },
  { label: "Passport (For Abroad)", keys: ["passport"] },
  { label: "Photo", keys: ["photo", "photograph"] },
  { label: "Signature", keys: ["signature"] },
  { label: "Category Certificate (If any)", keys: ["category", "caste"] },
  { label: "Domicile Certificate", keys: ["domicile"] },
] as const;

export default async function StudentDashboardPage() {
  let student;

  try {
    student = await getCurrentPortalStudent();
  } catch (error) {
    console.error(
      "[StudentDashboardError] Failed to load the logged-in student dashboard:",
      error
    );
    throw error;
  }

  if (!student) redirect("/portal/login?tab=student");

  const documents = Array.isArray(student.documents) ? student.documents : [];
  const interests = parseStoredInterests(student.interests);
  const studentName = valueOr(student.name, "Student");
  const essentialProfileValues = [
    student.name,
    student.email,
    student.className,
    student.neetYear,
    student.state,
    student.preferredCourse || interests[0],
  ];
  const completedEssentialFields = essentialProfileValues.filter(Boolean).length;
  const profileComplete = completedEssentialFields === essentialProfileValues.length;
  const completion = Math.round(
    ((completedEssentialFields + (student.mobile ? 1 : 0) + (student.category ? 1 : 0)) /
      8) *
      100
  );
  const documentsUploaded = documents.length > 0;
  const currentStatus = dashboardStatus(student.status, profileComplete, documentsUploaded);
  const nextStep = recommendedNextStep({
    profileComplete,
    documentsUploaded,
    hasNeetDetails: Boolean(student.neetYear || student.neetScore),
    hasPreference: Boolean(student.preferredCourse || interests.length),
  });
  const progressSteps = buildProgressSteps({
    mobileVerified: Boolean(student.mobileVerified),
    profileComplete,
    documentsUploaded,
    assigned: Boolean(student.assignedToId || student.assignedToName),
    status: student.status,
  });
  const preferredPath =
    student.preferredCourse || interests.join(", ") || "Not added yet";
  const preferredCountries = student.preferredCountry || "Not added yet";

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-[#CFDEEF] bg-[linear-gradient(110deg,#F6FAFF,#EDF5FF_58%,#F8FBFF)] p-4 shadow-[0_8px_24px_rgba(31,87,164,.055)] sm:p-5 lg:p-4">
        <div className="lg:hidden">
          <h1 className="text-[22px] font-black tracking-[-.025em] text-[#0A1020]">
            Welcome back, {studentName} 👋
          </h1>
          <p className="mt-1 text-sm font-medium text-[#34415F]">
            Your ILMALINK MEDIGO student dashboard
          </p>
        </div>

        <div className="mt-4 grid gap-5 lg:mt-0 lg:grid-cols-[1.1fr_.62fr_.9fr] lg:items-center">
          <div className="flex items-center gap-4 lg:border-r lg:border-[#C9D9EC] lg:pr-5">
            <StudentAvatar />
            <div className="min-w-0 space-y-2">
              <h2 className="hidden truncate text-xl font-black text-[#0A1020] lg:block">
                {studentName}
              </h2>
              <IdentityLine icon={IdCard} label="Student ID" value={valueOr(student.leadCode)} mobileOnlyLabel />
              <IdentityLine icon={Phone} label="Mobile" value={valueOr(student.mobile)} mobileOnlyLabel />
              {student.email ? (
                <IdentityLine icon={Mail} label="Email" value={student.email} />
              ) : null}
              <IdentityLine
                icon={CalendarDays}
                label="NEET"
                value={student.neetYear ? `NEET ${student.neetYear} Aspirant` : "NEET year not added"}
              />
              <IdentityLine
                icon={MapPin}
                label="Location"
                value={student.preferredCountry || student.state || "Location not added"}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#D4E1F0] bg-white/55 p-4 lg:border-0 lg:bg-transparent lg:p-0 lg:text-center">
            <div className="flex items-center justify-between gap-5 lg:block">
              <div>
                <p className="text-sm font-black text-[#0A1020]">Current Status</p>
                <span className="mt-3 inline-flex rounded-lg border border-[#8DDBAA] bg-[#E4F9EB] px-3 py-1.5 text-xs font-black text-[#0A7A33]">
                  {currentStatus}
                </span>
                <p className="mt-3 max-w-[235px] text-xs font-medium leading-5 text-[#33415F] lg:mx-auto">
                  Complete your profile and documents to check eligibility and start counselling.
                </p>
              </div>
              <CompletionRing value={completion} />
            </div>
          </div>

          <div className="hidden rounded-xl border border-[#DDE4EE] bg-white p-4 shadow-[0_8px_20px_rgba(8,42,98,.05)] lg:flex lg:items-center lg:gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FFF2E4] text-[#FF7A00]">
              <ClipboardCheck className="h-7 w-7" />
            </span>
            <div>
              <h2 className="text-sm font-black text-[#0A1020]">Recommended Next Step</h2>
              <p className="mt-1 text-xs font-medium leading-5 text-[#45516A]">{nextStep.text}</p>
              <Link
                href={nextStep.href}
                className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#FF7100] px-3 py-2 text-xs font-black text-white"
              >
                {nextStep.action}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-black text-[#0A1020]">Quick Actions</h2>
        <div className="grid grid-cols-5 gap-2 lg:gap-3">
          {quickActions.map((action) => (
            <QuickAction key={action.title} {...action} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[.95fr_.98fr_1.28fr]">
        <DashboardCard className="hidden xl:block">
          <CardHeading title="Profile Summary" action="Edit Profile" href="/portal/student/profile" />
          <dl className="mt-4 space-y-3">
            <ProfileRow icon={UserRound} label="Full Name" value={valueOr(student.name)} />
            <ProfileRow icon={Phone} label="Mobile Number" value={valueOr(student.mobile)} />
            <ProfileRow icon={Mail} label="Email" value={valueOr(student.email)} />
            <ProfileRow icon={GraduationCap} label="Interested In" value={preferredPath} />
            <ProfileRow icon={MapPin} label="Preferred Countries" value={preferredCountries} />
            <ProfileRow icon={UsersRound} label="Guardian Name" value="Not added yet" />
            <ProfileRow icon={Phone} label="Guardian Mobile" value="Not added yet" />
          </dl>
        </DashboardCard>

        <DashboardCard>
          <CardHeading title="Application Progress" action="View All" href="/portal/student/application-status" />
          <ol className="mt-4 space-y-2.5">
            {progressSteps.map((step, index) => (
              <ProgressRow key={step.label} number={index + 1} {...step} />
            ))}
          </ol>
        </DashboardCard>

        <DashboardCard>
          <CardHeading title="Documents Checklist" action="View All" href="/portal/student/documents" />
          <p className="mt-1 text-[11px] font-semibold text-[#6A768B]">
            {documentsUploaded
              ? "Your submitted document records are shown below."
              : "Document upload coming soon. Your counsellor will confirm the approved upload method."}
          </p>
          <ul className="mt-3 space-y-2.5">
            {documentRequirements.map((requirement) => {
              const record = findDocument(documents, requirement.keys);
              const notRequired =
                requirement.label.startsWith("Passport") &&
                !/abroad/i.test(preferredPath) &&
                !student.preferredCountry;
              return (
                <DocumentRow
                  key={requirement.label}
                  label={requirement.label}
                  status={record ? "Uploaded" : notRequired ? "Not required yet" : "Pending"}
                />
              );
            })}
          </ul>
        </DashboardCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard className="border-[#BFE6CE] bg-[linear-gradient(145deg,#F2FFF7,#EFFBF7)]">
          <CardHeading title="NEET & Admission Guidance" />
          <ul className="mt-4 space-y-3 text-xs font-medium leading-5 text-[#15223D]">
            <GuidanceItem>NEET UG preparation tips & resources</GuidanceItem>
            <GuidanceItem>
              MBBS in Bangladesh, Kyrgyzstan, Georgia, Uzbekistan, Russia & more
            </GuidanceItem>
            <GuidanceItem>Counselling process guidance</GuidanceItem>
            <GuidanceItem>Eligibility, documents & admission support</GuidanceItem>
          </ul>
          <Link href="/neet" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#049247]">
            Explore Guidance <ArrowRight className="h-4 w-4" />
          </Link>
        </DashboardCard>

        <DashboardCard id="eligibility-snapshot" className="border-[#F0D9A5] bg-[linear-gradient(145deg,#FFFDF7,#FFF9E8)]">
          <CardHeading title="Eligibility Snapshot" />
          <dl className="mt-4 space-y-3">
            <SnapshotRow icon={UserRound} label="NEET Status" value={student.neetYear || "Not Added"} />
            <SnapshotRow icon={School} label="PCB in Class 12" value={student.className || "Not Added"} />
            <SnapshotRow icon={FileBadge} label="NEET Score" value={student.neetScore || "Not Added"} />
            <SnapshotRow icon={Clock3} label="Age Criteria" value="Not Added" />
          </dl>
          <p className="mt-5 rounded-xl border border-[#F1D99E] bg-white/55 p-3 text-xs font-medium leading-5 text-[#34415F]">
            {profileComplete
              ? "Your profile is ready for detailed eligibility review."
              : "Complete your profile to check your detailed eligibility."}
          </p>
        </DashboardCard>

        <DashboardCard className="border-[#C9DCF7] bg-[linear-gradient(145deg,#F8FBFF,#F1F7FF)]">
          <div className="flex items-start justify-between gap-3">
            <CardHeading title="Alerts & Announcements" />
            <BellRing className="h-7 w-7 text-[#3B82F6]" />
          </div>
          <div className="mt-5 rounded-xl border border-dashed border-[#BDD1EC] bg-white/55 p-5 text-center">
            <BellRing className="mx-auto h-7 w-7 text-[#6C8DB6]" />
            <p className="mt-2 text-sm font-black text-[#15223D]">No new alerts.</p>
            <p className="mt-1 text-xs font-medium leading-5 text-[#66758C]">
              Important NEET, counselling and document updates will appear here.
            </p>
          </div>
        </DashboardCard>

        <DashboardCard id="counsellor-support" className="border-[#E9CAE8] bg-[linear-gradient(145deg,#FFF7FE,#FFF1FB)]">
          <CardHeading title="Counsellor / Support" />
          <div className="mt-4 flex items-center gap-3">
            <Image
              src="/portal/counsellor-placeholder.webp"
              alt="ILMALINK support counsellor placeholder"
              width={64}
              height={64}
              className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-sm"
            />
            <div>
              <p className="text-[11px] font-semibold text-[#77417A]">Your Counsellor</p>
              <p className="text-sm font-black text-[#15223D]">
                {student.assignedToName || "Counsellor not assigned yet"}
              </p>
              <p className="text-[11px] font-medium text-[#77417A]">ILMALINK Support Team</p>
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-2">
            <a
              href={supportWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#16BE45] px-3 text-xs font-black text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <PortalCallbackButton compact />
          </div>
          <a
            href="mailto:middya@ilmalink.com"
            className="mt-2 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#CDD6E4] bg-white/70 px-3 text-xs font-black text-[#0F4CFF]"
          >
            <Mail className="h-4 w-4" />
            Email Support
          </a>
          <p className="mt-3 text-[11px] font-medium text-[#6C4770]">
            Counsellor not assigned? Contact support.
          </p>
        </DashboardCard>
      </section>

      <section className="rounded-2xl border border-[#DDE4EE] bg-white p-4 shadow-[0_8px_22px_rgba(8,42,98,.04)] lg:hidden">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF2E4] text-[#FF7A00]">
            <ClipboardCheck className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-sm font-black text-[#0A1020]">Recommended Next Step</h2>
            <p className="mt-1 text-xs font-medium leading-5 text-[#45516A]">{nextStep.text}</p>
          </div>
        </div>
        <Link
          href={nextStep.href}
          className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#FF7100] px-4 text-sm font-black text-white"
        >
          {nextStep.action}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <aside className="flex items-start gap-2 rounded-xl border border-[#D7E2EF] bg-white/80 px-4 py-3 text-xs font-medium leading-5 text-[#34415F]">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#1769E8]" />
        <p>
          <strong>Important Note:</strong> Final eligibility and admission depends on official rules, university policies and document verification.
        </p>
      </aside>
    </div>
  );
}

function StudentAvatar() {
  return (
    <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,#4BB8FF,#2565E8)] text-white shadow-[inset_0_0_0_5px_rgba(255,255,255,.18)] lg:h-28 lg:w-28">
      <UserRound className="h-12 w-12 lg:h-14 lg:w-14" />
    </span>
  );
}

function IdentityLine({
  icon: Icon,
  label,
  value,
  mobileOnlyLabel = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  mobileOnlyLabel?: boolean;
}) {
  return (
    <p className="flex min-w-0 items-center gap-2 text-xs font-medium text-[#101828] sm:text-sm">
      <Icon className="hidden h-4 w-4 shrink-0 lg:block" />
      <span className={`${mobileOnlyLabel ? "lg:hidden" : "sr-only"}`}>{label}</span>
      {mobileOnlyLabel ? <span className="ml-auto lg:hidden" /> : null}
      <span className="truncate">{value}</span>
    </p>
  );
}

function CompletionRing({ value }: { value: number }) {
  const safeValue = Math.max(0, Math.min(100, value));
  return (
    <div
      className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full lg:hidden"
      style={{
        background: `conic-gradient(#13A95D ${safeValue * 3.6}deg, #DFE8F3 0deg)`,
      }}
      aria-label={`${safeValue}% profile completed`}
    >
      <div className="flex h-[74px] w-[74px] flex-col items-center justify-center rounded-full bg-[#F6FAFF]">
        <strong className="text-xl font-black text-[#0A1020]">{safeValue}%</strong>
        <span className="text-[10px] font-medium text-[#34415F]">Completed</span>
      </div>
    </div>
  );
}

function QuickAction({
  title,
  text,
  href,
  icon: Icon,
  tone,
  external = false,
  soon = false,
}: {
  title: string;
  text: string;
  href?: string;
  icon: LucideIcon;
  tone: "violet" | "green" | "blue" | "orange" | "whatsapp";
  external?: boolean;
  soon?: boolean;
}) {
  const tones = {
    violet: "from-[#A64DFF] to-[#6E39ED]",
    green: "from-[#2BCF80] to-[#069C57]",
    blue: "from-[#3495FF] to-[#1264E8]",
    orange: "from-[#FF9A26] to-[#FF6D00]",
    whatsapp: "from-[#35D66D] to-[#13AC43]",
  };
  const content = (
    <>
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${tones[tone]} text-white shadow-[0_8px_18px_rgba(37,99,235,.18)] lg:h-13 lg:w-13`}>
        <Icon className="h-6 w-6" />
      </span>
      <span className="min-w-0 lg:block">
        <strong className="block text-center text-[11px] leading-4 text-[#0A1020] lg:text-left lg:text-sm">
          {title}
        </strong>
        <span className="mt-0.5 hidden text-xs font-medium leading-5 text-[#43506A] lg:block">
          {text}
        </span>
        {soon ? (
          <span className="mt-1 hidden text-[10px] font-black uppercase tracking-wide text-[#6B7280] lg:block">
            Coming Soon
          </span>
        ) : null}
      </span>
    </>
  );
  const classes =
    "flex min-w-0 flex-col items-center gap-2 rounded-2xl border border-[#DFE5EE] bg-white px-1.5 py-3 shadow-[0_6px_18px_rgba(8,42,98,.035)] lg:min-h-[82px] lg:flex-row lg:items-center lg:px-3 lg:py-3";

  if (!href) {
    return <span className={`${classes} cursor-not-allowed opacity-80`}>{content}</span>;
  }

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={classes}
    >
      {content}
    </Link>
  );
}

function DashboardCard({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <article
      id={id}
      className={`scroll-mt-24 rounded-2xl border border-[#DFE5EE] bg-white p-4 shadow-[0_8px_22px_rgba(8,42,98,.04)] ${className}`}
    >
      {children}
    </article>
  );
}

function CardHeading({ title, action, href }: { title: string; action?: string; href?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-base font-black text-[#0A1020]">{title}</h2>
      {action && href ? (
        <Link href={href} className="text-xs font-black text-[#0F4CFF]">
          {action}
        </Link>
      ) : null}
    </div>
  );
}

function ProfileRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="grid grid-cols-[18px_1fr_1.15fr] items-center gap-2 text-xs">
      <Icon className="h-4 w-4 text-[#7865F6]" />
      <dt className="font-medium text-[#47536D]">{label}</dt>
      <dd className="font-medium text-[#111827]">{value}</dd>
    </div>
  );
}

function ProgressRow({
  number,
  label,
  state,
}: {
  number: number;
  label: string;
  state: "completed" | "active" | "pending";
}) {
  const completed = state === "completed";
  const active = state === "active";
  return (
    <li className="grid grid-cols-[24px_1fr_auto] items-center gap-2 text-xs">
      <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black ${completed ? "bg-[#18B866] text-white" : active ? "bg-[#FF8A00] text-white" : "bg-[#E5E9F0] text-[#4B5563]"}`}>
        {number}
      </span>
      <span className="font-medium text-[#1B2740]">{label}</span>
      <span className={`inline-flex items-center gap-1 font-medium ${completed ? "text-[#00A64F]" : active ? "text-[#FF7A00]" : "text-[#9AA5B5]"}`}>
        {completed ? <CheckCircle2 className="h-3.5 w-3.5" /> : active ? <Clock3 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5 fill-current" />}
        {completed ? "Completed" : active ? "In Progress" : "Pending"}
      </span>
    </li>
  );
}

function DocumentRow({ label, status }: { label: string; status: "Uploaded" | "Pending" | "Not required yet" }) {
  const uploaded = status === "Uploaded";
  const pending = status === "Pending";
  return (
    <li className="grid grid-cols-[22px_1fr_auto] items-center gap-2 text-xs">
      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#F0ECFF] text-[#7A51F5]">
        <FileText className="h-3.5 w-3.5" />
      </span>
      <span className="font-medium text-[#28344E]">{label}</span>
      <span className={`inline-flex items-center gap-1 font-medium ${uploaded ? "text-[#00A64F]" : pending ? "text-[#FF7A00]" : "text-[#8A94A6]"}`}>
        {uploaded ? <CheckCircle2 className="h-3.5 w-3.5" /> : pending ? <Clock3 className="h-3.5 w-3.5" /> : <CircleHelp className="h-3.5 w-3.5" />}
        {status}
      </span>
    </li>
  );
}

function GuidanceItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#08A94F]" />
      <span>{children}</span>
    </li>
  );
}

function SnapshotRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="grid grid-cols-[22px_1fr_auto] items-center gap-2 text-xs">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F2F3F5] text-[#1B2A46]">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <dt className="font-medium text-[#28344E]">{label}</dt>
      <dd className="font-medium text-[#111827]">{value}</dd>
    </div>
  );
}

function valueOr(value: string | null | undefined, fallback = "Not added yet") {
  const normalized = value?.trim();
  return normalized || fallback;
}

function findDocument(
  documents: Array<{ documentType: string }>,
  keys: readonly string[]
) {
  return documents.find((document) => {
    const type = document.documentType.toLowerCase();
    return keys.some((key) => type.includes(key));
  });
}

function dashboardStatus(status: string, profileComplete: boolean, documentsUploaded: boolean) {
  if (status === "admitted") return "Admission Support";
  if (status === "application-started") return "Application Started";
  if (status === "document-pending" || (profileComplete && !documentsUploaded)) return "Documents Pending";
  if (["called", "interested", "follow-up"].includes(status)) return "Counselling Active";
  return profileComplete ? "Profile Completed" : "Profile Pending";
}

function recommendedNextStep({
  profileComplete,
  documentsUploaded,
  hasNeetDetails,
  hasPreference,
}: {
  profileComplete: boolean;
  documentsUploaded: boolean;
  hasNeetDetails: boolean;
  hasPreference: boolean;
}) {
  if (!profileComplete) {
    return {
      action: "Complete Profile",
      text: "Complete your profile to unlock all features.",
      href: "/portal/student/profile",
    };
  }
  if (!hasNeetDetails) {
    return {
      action: "Add NEET Details",
      text: "Add your NEET year and score for better guidance.",
      href: "/portal/student/profile",
    };
  }
  if (!hasPreference) {
    return {
      action: "Select Preference",
      text: "Select your preferred course or country.",
      href: "/portal/student/profile",
    };
  }
  if (!documentsUploaded) {
    return {
      action: "Prepare Documents",
      text: "Keep your academic and identity documents ready.",
      href: "/portal/student/documents",
    };
  }
  return {
    action: "View Application",
    text: "Your details are ready. Wait for counsellor review.",
    href: "/portal/student/application-status",
  };
}

function buildProgressSteps({
  mobileVerified,
  profileComplete,
  documentsUploaded,
  assigned,
  status,
}: {
  mobileVerified: boolean;
  profileComplete: boolean;
  documentsUploaded: boolean;
  assigned: boolean;
  status: string;
}) {
  const applicationStarted = ["application-started", "admitted"].includes(status);
  const eligibilityChecked = ["interested", "follow-up", "document-pending", "application-started", "admitted"].includes(status);
  const stages = [
    { label: "Signup Completed", done: true },
    { label: "Mobile Verified", done: mobileVerified },
    { label: "Profile Completed", done: profileComplete },
    { label: "Documents Uploaded", done: documentsUploaded },
    { label: "Counsellor Review", done: assigned },
    { label: "Eligibility Checked", done: eligibilityChecked },
    { label: "Application Submitted", done: applicationStarted },
    { label: "Admission / Offer Support", done: status === "admitted" },
  ];
  const firstIncomplete = stages.findIndex((stage) => !stage.done);

  return stages.map((stage, index) => ({
    label: stage.label,
    state: stage.done ? ("completed" as const) : index === firstIncomplete ? ("active" as const) : ("pending" as const),
  }));
}
