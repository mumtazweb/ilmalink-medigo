import type { Metadata } from "next";
import {
  CheckCircle2,
  ClipboardCheck,
  FileText,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import PortalCallbackButton from "../../../components/portal/PortalCallbackButton";
import PortalStatCard from "../../../components/portal/PortalStatCard";
import { profileCompletion } from "../../../lib/portal/presentation";
import { requirePortalStudent } from "../../../lib/portal/session";
import {
  parseStoredInterests,
} from "../../../lib/portal/validation";
import { statusLabel } from "../../../lib/portal/constants";

export const metadata: Metadata = {
  title: "Student Dashboard | ILMALINK MEDIGO",
  robots: { index: false, follow: false },
};

export default async function StudentDashboardPage() {
  const student = await requirePortalStudent();
  const completion = profileCompletion(student);
  const interests = parseStoredInterests(student.interests);
  const verifiedDocuments = student.documents.filter(
    (document) => document.status === "verified"
  ).length;

  return (
    <div className="space-y-5">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <PortalStatCard
          label="Profile completion"
          value={`${completion}%`}
          note={completion === 100 ? "Profile complete" : "Add remaining details"}
          icon={UserRound}
          tone="blue"
        />
        <PortalStatCard
          label="Mobile status"
          value={student.mobileVerified ? "Verified" : "Pending"}
          note={student.mobile}
          icon={ShieldCheck}
          tone="teal"
        />
        <PortalStatCard
          label="Documents"
          value={`${verifiedDocuments}/${student.documents.length}`}
          note="Verified / submitted"
          icon={FileText}
          tone="violet"
        />
        <PortalStatCard
          label="Application"
          value={statusLabel(student.status)}
          note="Current counselling status"
          icon={ClipboardCheck}
          tone="amber"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
        <article className="rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)] sm:p-5">
          <h2 className="text-xl font-black text-[#082A62]">
            Your counselling profile
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Info label="Selected interest" value={interests.join(", ") || "Not selected"} />
            <Info
              label="WhatsApp status"
              value={
                student.whatsappAvailable === "none"
                  ? "Not used"
                  : student.whatsappNumber || "Not provided"
              }
            />
            <Info
              label="Eligibility status"
              value="Profile review pending"
            />
            <Info
              label="Assigned counsellor"
              value={student.assignedToName || "Assignment pending"}
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <PortalCallbackButton />
            <Link
              href="/portal/student/profile"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#A9CBEF] bg-[#F4F9FF] px-5 text-sm font-black text-[#0B4AA2]"
            >
              <UserRound className="h-4 w-4" />
              Edit Profile
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-[#BFE5D9] bg-[linear-gradient(145deg,#F7FCFA,#EFF8FF)] p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)] sm:p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#08A776] shadow-sm">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-xl font-black text-[#082A62]">
            Recommended next step
          </h2>
          <p className="mt-2 text-sm font-medium leading-6 text-[#46617F]">
            {completion < 80
              ? "Complete your profile so the counselling team can review your NEET year, location and preferred pathway."
              : student.assignedToName
                ? `Your assigned counsellor is ${student.assignedToName}. Check your follow-up date and keep documents ready.`
                : "Your profile is ready for counsellor assignment and eligibility review."}
          </p>
          <Link
            href={completion < 80 ? "/portal/student/profile" : "/portal/student/application-status"}
            className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#0B4AA2]"
          >
            Continue
            <PhoneCall className="h-4 w-4" />
          </Link>
        </article>
      </section>

      <section className="rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)] sm:p-5">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-[#1769E8]" />
          <h2 className="text-lg font-black text-[#082A62]">Recent activity</h2>
        </div>
        <div className="mt-3 grid gap-2">
          {student.activities.length ? (
            student.activities.map((activity) => (
              <div
                key={activity.id}
                className="rounded-xl border border-[#E0E8F0] bg-[#F9FBFD] px-3 py-2.5"
              >
                <strong className="text-sm text-[#17396E]">
                  {activity.action.replace(/_/g, " ")}
                </strong>
                {activity.note ? (
                  <p className="mt-1 text-xs font-medium leading-5 text-[#60738F]">
                    {activity.note}
                  </p>
                ) : null}
                <time className="mt-1 block text-[10px] font-bold text-[#8A9BB0]">
                  {activity.createdAt.toLocaleString("en-IN")}
                </time>
              </div>
            ))
          ) : (
            <p className="text-sm font-medium text-[#71839A]">
              No activity has been recorded yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#E0E8F0] bg-[#F9FBFD] p-3">
      <p className="text-[10px] font-black uppercase tracking-[.1em] text-[#71839A]">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold leading-5 text-[#17396E]">{value}</p>
    </div>
  );
}
