"use client";

import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { useEffect, useState } from "react";
import type { TwinInput, TwinResult } from "@/lib/types";

type Run = {
  id: string;
  createdAt: string;
  inputs: TwinInput;
  result: TwinResult;
};

export default function RunDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [run, setRun] = useState<Run | null>(null);

  useEffect(() => {
    async function load() {
      const { id } = await params;
      const res = await fetch(`/api/twin/${id}`);
      const data = (await res.json()) as { run?: Run; error?: string };
      if (data.run) setRun(data.run as Run);
    }
    void load();
  }, [params]);

  if (!run) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 text-slate-600 sm:px-6">
      <SubpageVisual variant="dashboard" />
        Loading report…
      </main>
    );
  }

  const { result: r } = run;
  const w = r.wearableSnapshot;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10">
      <Link
        href="/dashboard"
        className="text-sm font-medium text-teal-800 hover:underline"
      >
        ← Back to dashboard
      </Link>

      <header className="mt-6 rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
          Risk awareness &amp; clinician prep
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Educational twin report
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {new Date(run.createdAt).toLocaleString()} · {r.modelVersion}
        </p>
        <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50/90 px-4 py-3 text-xs text-amber-950 sm:text-sm">
          <strong>Reminder:</strong> This report is for learning and conversation planning only. It
          does not assess medical risk the way a clinician would.
        </div>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Resting HR (demo)", value: `${w.restingHeartRateBpm} bpm` },
          { label: "Avg steps / day (demo)", value: String(w.avgStepsPerDay) },
          { label: "Sleep hours (demo)", value: `${w.sleepHoursAvg} h` },
          { label: "Active min / week (demo)", value: String(w.activeMinutesPerWeek) },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-teal-100 bg-gradient-to-br from-white to-teal-50/60 p-4 shadow-sm"
          >
            <p className="text-xs font-medium text-slate-500">{card.label}</p>
            <p className="mt-1 text-xl font-bold text-teal-900">{card.value}</p>
          </div>
        ))}
      </section>
      <p className="mt-2 text-xs text-slate-500">{w.dataQualityNote}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">Non-medical wellness insights</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            {r.wellnessInsights.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">Habit recommendations (general)</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            {r.habitRecommendations.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-teal-200 bg-teal-50/40 p-6 shadow-md sm:p-8 lg:col-span-2">
          <h2 className="text-lg font-semibold text-teal-950">Risk awareness report</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-teal-950/90">
            {r.riskAwarenessReport.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-md sm:p-8 lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">Questions to ask a clinician</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            {r.clinicianQuestions.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-slate-900/10 bg-slate-900 p-6 text-white shadow-xl sm:p-8 lg:col-span-2">
          <h2 className="text-lg font-semibold">Clinician discussion summary</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-200">{r.clinicianDiscussionSummary}</p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
            <p className="font-semibold text-white">Your intake snapshot (abbrev.)</p>
            <dl className="mt-2 grid gap-1 sm:grid-cols-2">
              <dt className="text-slate-400">Sleep quality</dt>
              <dd>{run.inputs?.sleepQuality ?? "—"}</dd>
              <dt className="text-slate-400">Activity</dt>
              <dd>{run.inputs?.activityLevel ?? "—"}</dd>
            </dl>
          </div>
        </article>
      </div>
    </main>
  );
}
