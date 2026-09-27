import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
      <SubpageVisual variant="contact" />
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Contact</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Partner with GenoTwin Health
      </h1>
      <p className="mt-4 text-slate-600">
        Coaches, clinics, and research collaborators can reach out about educational wellness twin
        pilots. We do not offer clinical services through this MVP.
      </p>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg sm:p-8">
        <h2 className="text-lg font-semibold text-slate-900">Partner CTA</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Tell us about your population, data sources, and how you want patients or clients to prepare
          for visits. We will respond with pilot scope, safety guardrails, and implementation options.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="mailto:partners@genotwin.health"
            className="inline-flex rounded-full bg-gradient-to-r from-indigo-600 to-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:from-indigo-500 hover:to-sky-500"
          >
            Email partners@genotwin.health
          </a>
          <Link
            href="/demo"
            className="inline-flex rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-sky-200 hover:bg-sky-50/60"
          >
            Try the wellness twin builder
          </Link>
        </div>
      </div>
    </main>
  );
}
