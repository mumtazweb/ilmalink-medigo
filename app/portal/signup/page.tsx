import type { Metadata } from "next";

import PortalPublicHeader from "../../components/portal/PortalPublicHeader";
import PortalSignupForm from "../../components/portal/PortalSignupForm";
import { normalizePortalReturnPath } from "../../lib/portal/validation";

export const metadata: Metadata = {
  title: "Join ilmaLink | Free Education Guidance Profile",
  description:
    "Create a free ilmaLink profile for NEET, MBBS India, MBBS Abroad, scholarship and education guidance.",
  alternates: { canonical: "https://www.ilmalink.com/portal/signup/" },
  robots: { index: true, follow: true },
};

export default async function PortalSignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = normalizePortalReturnPath(params.next);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#EAF3FC] text-[#082A62]">
      <PortalPublicHeader />
      <PortalSignupForm nextPath={nextPath} />
    </main>
  );
}



