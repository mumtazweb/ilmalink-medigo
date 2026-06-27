import type { Metadata } from "next";

import PortalProfileForm from "../../../components/portal/PortalProfileForm";
import { requirePortalStudent } from "../../../lib/portal/session";
import { parseStoredInterests } from "../../../lib/portal/validation";

export const metadata: Metadata = {
  title: "My Student Profile | ilmaLink",
  robots: { index: false, follow: false },
};

export default async function StudentProfilePage() {
  const student = await requirePortalStudent();

  return (
    <section className="rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)] sm:p-6">
      <h2 className="text-xl font-black text-[#082A62]">Edit student profile</h2>
      <p className="mt-1 text-sm font-medium leading-6 text-[#60738F]">
        Keep your academic, contact and counselling preferences current.
      </p>
      <div className="mt-5">
        <PortalProfileForm
          initialData={{
            name: student.name || "",
            email: student.email || "",
            mobile: student.mobile,
            whatsappAvailable: student.whatsappAvailable || "same",
            whatsappNumber: student.whatsappNumber || "",
            interests: parseStoredInterests(student.interests),
            className: student.className || "",
            neetYear: student.neetYear || "",
            state: student.state || "",
            city: student.city || "",
            district: student.district || "",
            category: student.category || "",
            neetScore: student.neetScore || "",
            neetRank: student.neetRank || "",
            preferredCourse: student.preferredCourse || "",
            preferredCountry: student.preferredCountry || "",
          }}
        />
      </div>
    </section>
  );
}
