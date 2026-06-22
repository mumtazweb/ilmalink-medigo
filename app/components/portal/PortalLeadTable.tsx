"use client";

import {
  CalendarClock,
  ChevronDown,
  Eye,
  FileDown,
  Loader2,
  PencilLine,
  Save,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  STUDENT_STATUSES,
  statusLabel,
} from "../../lib/portal/constants";

export type PortalLeadRow = {
  id: string;
  leadCode: string;
  name: string;
  mobile: string;
  whatsapp: string;
  interest: string;
  state: string;
  neetYear: string;
  neetScore: string;
  status: string;
  assignedToId: string;
  assignedToName: string;
  followUpDate: string;
  createdAt: string;
};

export type PortalCounsellorOption = {
  id: string;
  name: string;
};

export default function PortalLeadTable({
  initialLeads,
  counsellors = [],
  canAssign = false,
  readOnly = false,
  detailBasePath,
}: {
  initialLeads: PortalLeadRow[];
  counsellors?: PortalCounsellorOption[];
  canAssign?: boolean;
  readOnly?: boolean;
  detailBasePath?: string;
}) {
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editing, setEditing] = useState<PortalLeadRow | null>(null);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return leads.filter((lead) => {
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;
      if (!search) return true;
      return [
        lead.leadCode,
        lead.name,
        lead.mobile,
        lead.interest,
        lead.state,
        lead.assignedToName,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search);
    });
  }, [leads, query, statusFilter]);

  return (
    <section className="rounded-2xl border border-[#D8E4EF] bg-white p-3 shadow-[0_7px_18px_rgba(8,42,98,.045)] sm:p-4">
      <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search lead ID, name, mobile, interest or state"
          className="portal-input"
        />
        <label className="relative">
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="portal-input min-w-44 appearance-none pr-9"
          >
            <option value="all">All statuses</option>
            {STUDENT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {statusLabel(status)}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#60738F]" />
        </label>
        {!readOnly ? (
          <a
            href="/api/portal/staff/export"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#BFD3E8] bg-[#F4F9FF] px-4 text-xs font-black text-[#0B4AA2]"
          >
            <FileDown className="h-4 w-4" />
            Export CSV
          </a>
        ) : null}
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[1120px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[#D8E4EF] bg-[#F4F8FC] text-[#46617F]">
              {[
                "Lead ID",
                "Name / Mobile",
                "WhatsApp",
                "Interest",
                "State",
                "NEET",
                "Status",
                "Assigned",
                "Created",
                "Action",
              ].map((heading) => (
                <th key={heading} className="px-3 py-3 font-black">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-[#E5ECF3] align-top last:border-0"
              >
                <td className="px-3 py-3 font-black text-[#0B4AA2]">
                  {lead.leadCode}
                </td>
                <td className="px-3 py-3">
                  <strong className="block text-[#17396E]">{lead.name}</strong>
                  <span className="mt-1 block text-[#71839A]">{lead.mobile}</span>
                </td>
                <td className="px-3 py-3 font-semibold text-[#46617F]">
                  {lead.whatsapp}
                </td>
                <td className="max-w-52 px-3 py-3 font-semibold leading-5 text-[#46617F]">
                  {lead.interest}
                </td>
                <td className="px-3 py-3 font-semibold text-[#46617F]">
                  {lead.state || "—"}
                </td>
                <td className="px-3 py-3 font-semibold text-[#46617F]">
                  {lead.neetYear || "—"}
                  <span className="block text-[#71839A]">
                    Score: {lead.neetScore || "—"}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span className="rounded-full bg-[#EAF3FF] px-2.5 py-1 font-black text-[#0B4AA2]">
                    {statusLabel(lead.status)}
                  </span>
                  {lead.followUpDate ? (
                    <span className="mt-2 flex items-center gap-1 text-[10px] font-bold text-[#A46A08]">
                      <CalendarClock className="h-3.5 w-3.5" />
                      {new Date(lead.followUpDate).toLocaleDateString("en-IN")}
                    </span>
                  ) : null}
                </td>
                <td className="px-3 py-3 font-semibold text-[#46617F]">
                  {lead.assignedToName || "Unassigned"}
                </td>
                <td className="px-3 py-3 font-semibold text-[#71839A]">
                  {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                </td>
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {detailBasePath ? (
                      <a
                        href={`${detailBasePath}/${lead.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#BFD3E8] px-2.5 py-2 font-black text-[#0B4AA2]"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </a>
                    ) : null}
                    {!readOnly ? (
                      <button
                        type="button"
                        onClick={() => setEditing(lead)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#BFD3E8] px-2.5 py-2 font-black text-[#0B4AA2]"
                      >
                        <PencilLine className="h-3.5 w-3.5" />
                        Update
                      </button>
                    ) : null}
                    {readOnly && !detailBasePath ? (
                      <span className="text-[#71839A]">View only</span>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm font-semibold text-[#71839A]">
          No leads match the current filters.
        </p>
      ) : null}

      {editing ? (
        <LeadEditModal
          lead={editing}
          counsellors={counsellors}
          canAssign={canAssign}
          onClose={() => setEditing(null)}
          onSaved={(updated) => {
            setLeads((current) =>
              current.map((lead) =>
                lead.id === updated.id ? updated : lead
              )
            );
            setEditing(null);
          }}
        />
      ) : null}
    </section>
  );
}

function LeadEditModal({
  lead,
  counsellors,
  canAssign,
  onClose,
  onSaved,
}: {
  lead: PortalLeadRow;
  counsellors: PortalCounsellorOption[];
  canAssign: boolean;
  onClose: () => void;
  onSaved: (lead: PortalLeadRow) => void;
}) {
  const [status, setStatus] = useState(lead.status);
  const [assignedToId, setAssignedToId] = useState(lead.assignedToId);
  const [followUpDate, setFollowUpDate] = useState(
    lead.followUpDate ? lead.followUpDate.slice(0, 16) : ""
  );
  const [activityNote, setActivityNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function save() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`/api/portal/staff/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          assignedToId,
          followUpDate,
          activityNote,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        lead?: {
          status: string;
          assignedToId: string | null;
          assignedToName: string | null;
          followUpDate: string | null;
        };
      };
      if (!response.ok || !data.ok || !data.lead) {
        throw new Error(data.message || "Unable to update lead.");
      }
      onSaved({
        ...lead,
        status: data.lead.status,
        assignedToId: data.lead.assignedToId ?? "",
        assignedToName: data.lead.assignedToName ?? "",
        followUpDate: data.lead.followUpDate ?? "",
      });
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to update lead."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[26px] bg-white p-5 shadow-2xl sm:rounded-[26px]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-[#082A62]">Update Lead</h2>
            <p className="mt-1 text-xs font-semibold text-[#60738F]">
              {lead.leadCode} · {lead.name}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D8E4EF]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-black text-[#17396E]">
              Status
            </span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="portal-input"
            >
              {STUDENT_STATUSES.map((item) => (
                <option key={item} value={item}>
                  {statusLabel(item)}
                </option>
              ))}
            </select>
          </label>
          {canAssign ? (
            <label className="block">
              <span className="mb-1.5 block text-xs font-black text-[#17396E]">
                Assigned counsellor
              </span>
              <select
                value={assignedToId}
                onChange={(event) => setAssignedToId(event.target.value)}
                className="portal-input"
              >
                <option value="">Unassigned</option>
                {counsellors.map((counsellor) => (
                  <option key={counsellor.id} value={counsellor.id}>
                    {counsellor.name}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          <label className="block">
            <span className="mb-1.5 block text-xs font-black text-[#17396E]">
              Follow-up date and time
            </span>
            <input
              type="datetime-local"
              value={followUpDate}
              onChange={(event) => setFollowUpDate(event.target.value)}
              className="portal-input"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-black text-[#17396E]">
              Call note / activity note
            </span>
            <textarea
              value={activityNote}
              onChange={(event) => setActivityNote(event.target.value)}
              rows={4}
              className="w-full rounded-xl border border-[#CCD9E7] px-3 py-2 text-sm font-medium"
              placeholder="Add the latest discussion, student response or next action."
            />
          </label>
          {message ? (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              {message}
            </p>
          ) : null}
          <button
            type="button"
            onClick={save}
            disabled={busy}
            className="portal-primary-button"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Lead Update
          </button>
        </div>
      </div>
    </div>
  );
}
