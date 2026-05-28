import type { Metadata } from "next";
import Navbar from "../components/navbar";
import AuthForm from "../components/blog/AuthForm";

export const metadata: Metadata = {
  title: "Blog Login | ILMALINK MEDIGO",
  description: "Sign in to the ILMALINK MEDIGO blog publishing dashboard.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />
      {/* BLOG SYSTEM: Login page for admin and author users. */}
      <section className="mx-auto flex min-h-screen max-w-md items-center px-4 py-32">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_64px_rgba(15,23,42,0.10)] md:p-8">
          <h1 className="text-3xl font-bold text-[#0F172A]">Blog Login</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Sign in with your ID and password to manage ILMALINK MEDIGO blogs.
          </p>
          <div className="mt-6">
            <AuthForm mode="login" />
          </div>
        </div>
      </section>
    </main>
  );
}
