import {
  CalendarClock,
  FileText,
  History,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import { statusLabel } from "../../lib/portal/constants";
import { parseStoredInterests } from "../../lib/portal/validation";

type LeadDetail = {
  leadCode: string;
  name: string | null;
  mobile: string;
  email: string | null;
  mobileVerified: boolean;
  whatsappNumber: string | null;
  whatsappAvailable: string | null;
  interests: string | null;
  className: string | null;
  neetYear: string | null;
  state: string | null;
  city: string | null;
  district: string | null;
  category: string | null;
  neetScore: string | null;
  neetRank: string | null;
  preferredCourse: string | null;
  preferredCountry: string | null;
  status: string;
  assignedToName: string | null;
  notes: string | null;
  followUpDate: Date | null;
  createdAt: Date;
  documents: Array<{
    id: string;
    documentType: string;
    fileName: string | null;
    fileUrl: string | null;
    status: string;
    note: string | null;
  }>;
  activities: Array<{
    id: string;
    action: string;
    note: string | null;
    createdBy: string | null;
    createdAt: Date;
  }>;
};

export default function PortalLeadDetail({
  lead,
  backHref,
}: {
  lead: LeadDetail;
  backHref: string;
}) {
  const interests = parseStoredInterests(lead.interests);
  const fields = [
    ["Class", lead.className],
    ["NEET year", lead.neetYear],
    ["Category", lead.category],
    ["NEET score", lead.neetScore],
    ["NEET rank", lead.neetRank],
    ["Preferred course", lead.preferredCourse],
    ["Preferred country", lead.preferredCountry],
    ["Assigned counsellor", lead.assignedToName],
  ];

  return (
    <div className="space-y-5">
      <Link
        href={backHref}
        className="inline-flex items-center text-sm font-black text-[#0B4AA2]"
      >
        ← Back to leads
      </Link>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <article className="rounded-2xl border border-[#D8E4EF] bg-white p-5 shadow-[0_7px_18px_rgba(8,42,98,.045)]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[.12em] text-[#1769E8]">
                {lead.leadCode}
              </p>
              <h2 className="mt-1 text-2xl font-black text-[#082A62]">
                {lead.name || "Student name pending"}
              </h2>
            </div>
            <span className="rounded-full bg-[#EAF3FF] px-3 py-1.5 text-xs font-black text-[#0B4AA2]">
              {statusLabel(lead.status)}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ContactItem icon={Phone} label="Mobile" value={lead.mobile} />
            <ContactItem icon={Mail} label="Email" value={lead.email} />
            <ContactItem
              icon={MessageCircle}
              label="WhatsApp"
              value={
                lead.whatsappAvailable === "none"
                  ? "Not used"
                  : lead.whatsappNumber
              }
            />
            <ContactItem
              icon={MapPin}
              label="Location"
              value={[lead.city, lead.district, lead.state]
                .filter(Boolean)
                .join(", ")}
            />
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-black text-[#17396E]">
              Selected interests
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {interests.length ? (
                interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-[#E7F8F2] px-3 py-1.5 text-xs font-black text-[#087A60]"
                  >
                    {interest}
                  </span>
                ))
              ) : (
                <span className="text-sm font-medium text-[#71839A]">
                  Not selected
                </span>
              )}
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-[#D8E4EF] bg-white p-5 shadow-[0_7px_18px_rgba(8,42,98,.045)]">
          <h2 className="flex items-center gap-2 text-lg font-black text-[#082A62]">
            <UserRound className="h-5 w-5 text-[#1769E8]" />
            Profile details
          </h2>
          <dl className="mt-4 divide-y divide-[#E4EBF2]">
            {fields.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[130px_1fr] gap-3 py-2.5 text-sm"
              >
                <dt className="font-bold text-[#71839A]">{label}</dt>
                <dd className="font-black text-[#17396E]">{value || "—"}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs font-semibold text-[#60738F]">
            Mobile verified: {lead.mobileVerified ? "Yes" : "No"} · Created{" "}
            {lead.createdAt.toLocaleString("en-IN")}
          </p>
          {lead.followUpDate ? (
            <p className="mt-3 flex items-center gap-2 rounded-xl bg-[#FFF7E8] p-3 text-xs font-black text-[#9A6207]">
              <CalendarClock className="h-4 w-4" />
              Follow-up: {lead.followUpDate.toLocaleString("en-IN")}
            </p>
          ) : null}
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-2xl border border-[#D8E4EF] bg-white p-5 shadow-[0_7px_18px_rgba(8,42,98,.045)]">
          <h2 className="flex items-center gap-2 text-lg font-black text-[#082A62]">
            <FileText className="h-5 w-5 text-[#08A776]" />
            Student documents
          </h2>
          <div className="mt-4 space-y-2">
            {lead.documents.length ? (
              lead.documents.map((document) => (
                <div
                  key={document.id}
                  className="rounded-xl border border-[#E0E8F0] bg-[#F9FBFD] p-3"
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black text-[#17396E]">
                        {document.documentType}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-[#71839A]">
                        {document.fileName || "Document record"}
                      </p>
                    </div>
                    <span className="text-xs font-black text-[#0B4AA2]">
                      {statusLabel(document.status)}
                    </span>
                  </div>
                  {document.note ? (
                    <p className="mt-2 text-xs font-medium text-[#60738F]">
                      {document.note}
                    </p>
                  ) : null}
                  {document.fileUrl ? (
                    <a
                      href={document.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex text-xs font-black text-[#0B4AA2]"
                    >
                      Open document
                    </a>
                  ) : null}
                </div>
              ))
            ) : (
              <p className="rounded-xl border border-dashed border-[#BFD3E8] bg-[#F8FBFF] p-4 text-sm font-medium text-[#60738F]">
                No document records yet.
              </p>
            )}
          </div>
        </article>

        <article className="rounded-2xl border border-[#D8E4EF] bg-white p-5 shadow-[0_7px_18px_rgba(8,42,98,.045)]">
          <h2 className="flex items-center gap-2 text-lg font-black text-[#082A62]">
            <History className="h-5 w-5 text-[#7A3FE0]" />
            Lead activity
          </h2>
          {lead.notes ? (
            <p className="mt-4 rounded-xl bg-[#F4F8FC] p-3 text-sm font-medium leading-6 text-[#46617F]">
              {lead.notes}
            </p>
          ) : null}
          <div className="mt-4 space-y-3">
            {lead.activities.length ? (
              lead.activities.map((activity) => (
                <div
                  key={activity.id}
                  className="border-l-2 border-[#BFD8F3] pl-3"
                >
                  <h3 className="text-sm font-black text-[#17396E]">
                    {statusLabel(activity.action)}
                  </h3>
                  {activity.note ? (
                    <p className="mt-1 text-xs font-medium leading-5 text-[#60738F]">
                      {activity.note}
                    </p>
                  ) : null}
                  <p className="mt-1 text-[10px] font-bold text-[#8190A3]">
                    {activity.createdAt.toLocaleString("en-IN")}
                    {activity.createdBy ? ` · ${activity.createdBy}` : ""}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm font-medium text-[#71839A]">
                No activity recorded yet.
              </p>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string | null;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-[#F4F8FC] p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#1769E8]" />
      <div>
        <p className="text-[10px] font-black uppercase tracking-wide text-[#71839A]">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-black text-[#17396E]">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}
