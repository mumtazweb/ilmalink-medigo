import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import Navbar from "./navbar";

type ToolPlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
};

export default function ToolPlaceholderPage({
  eyebrow,
  title,
  description,
  points,
}: ToolPlaceholderPageProps) {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <Navbar />

      <section className="bg-[linear-gradient(135deg,#EAF2FF_0%,#FFFFFF_50%,#ECFEFF_100%)] px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#0F4CFF]">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-tight text-[#061D3F] md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-700 md:text-lg">
            {description}
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_0.72fr]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)] sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#047857]">
              What this page will help with
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#061D3F]">
              Practical, student-first planning
            </h2>
            <ul className="mt-6 grid gap-4">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00A876]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>

          <aside className="rounded-[28px] bg-[#061D3F] p-6 text-white shadow-[0_18px_44px_rgba(6,29,63,0.2)] sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#5EEAD4]">
              Full tool coming next
            </p>
            <h2 className="mt-3 text-2xl font-extrabold">
              This crawlable guidance page is ready.
            </h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-200">
              Detailed tool content and interactive features will be added in a future
              update. The core purpose and planning checks are available here as real HTML
              text for students, parents and search systems.
            </p>
            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-[#061D3F] transition hover:bg-blue-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to homepage
            </Link>
            <Link
              href="/mbbs-abroad"
              className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold text-[#5EEAD4]"
            >
              Compare MBBS countries
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
