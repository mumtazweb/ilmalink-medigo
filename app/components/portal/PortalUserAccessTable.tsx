"use client";

import { Loader2, Save } from "lucide-react";
import { useState } from "react";

import { PORTAL_STAFF_ROLES } from "../../lib/portal/constants";

type PortalUserRow = {
  id: string;
  name: string;
  email: string;
  blogRole: string;
  portalAccess: boolean;
  portalRole: string;
};

export default function PortalUserAccessTable({
  initialUsers,
}: {
  initialUsers: PortalUserRow[];
}) {
  const [users, setUsers] = useState(initialUsers);
  const [busyId, setBusyId] = useState("");
  const [message, setMessage] = useState("");

  async function save(user: PortalUserRow) {
    setBusyId(user.id);
    setMessage("");
    try {
      const response = await fetch(`/api/portal/staff/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portalAccess: user.portalAccess,
          portalRole: user.portalRole,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Unable to save portal access.");
      }
      setMessage(`Portal access updated for ${user.email}.`);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to save portal access."
      );
    } finally {
      setBusyId("");
    }
  }

  function update(id: string, patch: Partial<PortalUserRow>) {
    setUsers((current) =>
      current.map((user) => (user.id === id ? { ...user, ...patch } : user))
    );
  }

  return (
    <section className="rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)]">
      {message ? (
        <p className="mb-4 rounded-xl bg-[#EFF8F5] px-3 py-2 text-sm font-semibold text-[#087B59]">
          {message}
        </p>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-[#F4F8FC] text-xs font-black text-[#46617F]">
            <tr>
              <th className="px-3 py-3">User</th>
              <th className="px-3 py-3">Blog role</th>
              <th className="px-3 py-3">Portal access</th>
              <th className="px-3 py-3">Portal role</th>
              <th className="px-3 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[#E5ECF3]">
                <td className="px-3 py-3">
                  <strong className="block text-[#17396E]">{user.name}</strong>
                  <span className="text-xs text-[#71839A]">{user.email}</span>
                </td>
                <td className="px-3 py-3 font-semibold text-[#46617F]">
                  {user.blogRole}
                </td>
                <td className="px-3 py-3">
                  <label className="inline-flex items-center gap-2 font-semibold text-[#46617F]">
                    <input
                      type="checkbox"
                      checked={user.portalAccess}
                      onChange={(event) =>
                        update(user.id, {
                          portalAccess: event.target.checked,
                          portalRole: event.target.checked
                            ? user.portalRole || "counsellor"
                            : "",
                        })
                      }
                      className="h-4 w-4"
                    />
                    Enabled
                  </label>
                </td>
                <td className="px-3 py-3">
                  <select
                    value={user.portalRole}
                    onChange={(event) =>
                      update(user.id, { portalRole: event.target.value })
                    }
                    disabled={!user.portalAccess}
                    className="h-10 rounded-lg border border-[#CCD9E7] px-2 text-xs font-bold disabled:bg-[#EEF3F7]"
                  >
                    <option value="">Select role</option>
                    {PORTAL_STAFF_ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-3">
                  <button
                    type="button"
                    onClick={() => save(user)}
                    disabled={busyId === user.id}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#0B4AA2] px-3 text-xs font-black text-white"
                  >
                    {busyId === user.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Save className="h-3.5 w-3.5" />
                    )}
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
