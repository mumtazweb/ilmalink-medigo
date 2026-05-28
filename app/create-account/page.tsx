import type { Metadata } from "next";
import Navbar from "../components/navbar";
import AuthForm from "../components/blog/AuthForm";

export const metadata: Metadata = {
  title: "Create Blog Author Account | ILMALINK MEDIGO",
  description: "Create an ILMALINK MEDIGO blog author account.",
};

export default function CreateAccountPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />
      {/* BLOG SYSTEM: Author account creation page. */}
      <section className="mx-auto flex min-h-screen max-w-md items-center px-4 py-32">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_64px_rgba(15,23,42,0.10)] md:p-8">
          <h1 className="text-3xl font-bold text-[#0F172A]">Create Account</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            New users are created as authors and can submit blogs for approval.
          </p>
          <div className="mt-6">
            <AuthForm mode="signup" />
          </div>
        </div>
      </section>
    </main>
  );
}
