import Link from "next/link";
import { HealthSafetyDisclaimer } from "@/components/HealthSafetyDisclaimer";

const highlights = [
  "Sleep rhythm panels with consistency framing",
  "Activity recovery and wearable trend context",
  "Stress and nutrition pattern summaries",
  "Clinician question briefs for visit prep",
] as const;

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
            Personal health twin dashboard
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Turn scattered wellness data into{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent">
              clearer patterns and better questions
            </span>{" "}
            for your clinician.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-slate-600 sm:text-lg">
            GenoTwin Health organizes wearable trends, sleep, activity, stress, nutrition, and mock
            lab-style markers into a calm wellness twin — educational insights and visit-prep prompts,
            never diagnosis or treatment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:from-indigo-500 hover:to-sky-500"
            >
              Build your wellness twin
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-sky-200 hover:bg-sky-50/60"
            >
              Open personal dashboard
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-sky-50/50 to-violet-50/60 p-8 shadow-2xl shadow-indigo-900/10 ring-1 ring-slate-900/5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
            What the twin surfaces
          </p>
          <p className="mt-2 text-sm text-slate-500">Educational pattern notes only — not a score or diagnosis.</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            {highlights.map((item) => (
              <li key={item} className="flex gap-2 rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-slate-100">
                <span className="text-sky-500">●</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Wellness twin builder",
            body: "Combine sleep, stress, nutrition, wearables, goals, and mock labs into one educational pattern summary.",
            href: "/demo",
          },
          {
            title: "Personal dashboard",
            body: "Review sleep rhythm, activity recovery, stress trends, weekly focus areas, and a lifestyle timeline.",
            href: "/dashboard",
          },
          {
            title: "Safety-first philosophy",
            body: "High-trust disclaimers and clinician discussion support — built for questions, not prescriptions.",
            href: "/about",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-md transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg"
          >
            <h2 className="text-lg font-semibold text-slate-900">{card.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.body}</p>
          </Link>
        ))}
      </section>

      <section className="mt-16">
        <HealthSafetyDisclaimer />
      </section>
    </main>
  );
}
