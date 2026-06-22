"use client";

import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { STUDENT_INTERESTS } from "../../lib/portal/constants";
import PortalAuthMessage from "./PortalAuthMessage";

const STUDENT_DASHBOARD_PATH = "/portal/student/dashboard/";

export type StudentProfileFormData = {
  name: string;
  email: string;
  mobile: string;
  whatsappAvailable: string;
  whatsappNumber: string;
  interests: string[];
  className: string;
  neetYear: string;
  state: string;
  city: string;
  district: string;
  category: string;
  neetScore: string;
  neetRank: string;
  preferredCourse: string;
  preferredCountry: string;
};

export default function PortalProfileForm({
  initialData,
}: {
  initialData: StudentProfileFormData;
}) {
  const router = useRouter();
  const [form, setForm] = useState(initialData);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    router.prefetch(STUDENT_DASHBOARD_PATH);
  }, [router]);

  function update(key: keyof StudentProfileFormData, value: string | string[]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    if (busy) return;

    let navigatingToDashboard = false;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/portal/student/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Unable to update profile.");
      }
      setSuccess(true);
      setMessage("Profile saved. Opening your dashboard...");
      navigatingToDashboard = true;
      router.replace(STUDENT_DASHBOARD_PATH);
    } catch (error) {
      setSuccess(false);
      setMessage(
        error instanceof Error ? error.message : "Unable to update profile."
      );
    } finally {
      if (!navigatingToDashboard) setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <ProfileField
          label="Student name"
          value={form.name}
          onChange={(value) => update("name", value)}
        />
        <ProfileField
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => update("email", value)}
        />
        <ProfileField
          label="Verified mobile"
          value={form.mobile}
          onChange={() => {}}
          disabled
        />
        <label className="block">
          <span className="mb-1.5 block text-xs font-black text-[#17396E]">
            WhatsApp preference
          </span>
          <select
            value={form.whatsappAvailable}
            onChange={(event) =>
              update("whatsappAvailable", event.target.value)
            }
            className="portal-input"
          >
            <option value="same">Same as verified mobile</option>
            <option value="different">Different number</option>
            <option value="none">I do not use WhatsApp</option>
          </select>
        </label>
        {form.whatsappAvailable === "different" ? (
          <ProfileField
            label="WhatsApp number"
            value={form.whatsappNumber}
            onChange={(value) => update("whatsappNumber", value)}
          />
        ) : null}
        <ProfileField
          label="Class"
          value={form.className}
          onChange={(value) => update("className", value)}
        />
        <ProfileField
          label="NEET year"
          value={form.neetYear}
          onChange={(value) => update("neetYear", value)}
        />
        <ProfileField
          label="State"
          value={form.state}
          onChange={(value) => update("state", value)}
        />
        <ProfileField
          label="City"
          value={form.city}
          onChange={(value) => update("city", value)}
        />
        <ProfileField
          label="District"
          value={form.district}
          onChange={(value) => update("district", value)}
        />
        <ProfileField
          label="You are"
          value={form.category}
          onChange={(value) => update("category", value)}
        />
        <ProfileField
          label="NEET score"
          value={form.neetScore}
          onChange={(value) => update("neetScore", value)}
        />
        <ProfileField
          label="NEET rank"
          value={form.neetRank}
          onChange={(value) => update("neetRank", value)}
        />
        <ProfileField
          label="Preferred course"
          value={form.preferredCourse}
          onChange={(value) => update("preferredCourse", value)}
        />
        <ProfileField
          label="Preferred country"
          value={form.preferredCountry}
          onChange={(value) => update("preferredCountry", value)}
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-black text-[#17396E]">
          Guidance interests
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {STUDENT_INTERESTS.map((interest) => (
            <label
              key={interest}
              className="flex items-center gap-2 rounded-xl border border-[#D8E4EF] bg-[#F9FBFD] px-3 py-2.5 text-sm font-semibold text-[#31577F]"
            >
              <input
                type="checkbox"
                checked={form.interests.includes(interest)}
                onChange={(event) =>
                  update(
                    "interests",
                    event.target.checked
                      ? [...form.interests, interest]
                      : form.interests.filter((item) => item !== interest)
                  )
                }
                className="h-4 w-4 rounded"
              />
              {interest}
            </label>
          ))}
        </div>
      </div>

      <PortalAuthMessage message={message} success={success} />
      <button
        type="button"
        onClick={save}
        disabled={busy}
        className="portal-primary-button sm:w-auto"
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {busy ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}

function ProfileField({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-black text-[#17396E]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="portal-input disabled:bg-[#EEF3F7] disabled:text-[#71839A]"
      />
    </label>
  );
}
