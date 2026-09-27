"use client";

import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { useEffect, useMemo, useState } from "react";
import { ActivityRecoveryCard } from "@/components/ActivityRecoveryCard";
import { BiometricScoreRing } from "@/components/BiometricScoreRing";
import { ClinicianQuestionBrief } from "@/components/ClinicianQuestionBrief";
import { HealthSafetyDisclaimer } from "@/components/HealthSafetyDisclaimer";
import { NutritionConsistencyCard } from "@/components/NutritionConsistencyCard";
import { SleepPatternPanel } from "@/components/SleepPatternPanel";
import { StressTrendCard } from "@/components/StressTrendCard";
import { WellnessTimeline } from "@/components/WellnessTimeline";
import { DEFAULT_WELLNESS_INPUT } from "@/lib/genotwin-data";
import { runWellnessTwin } from "@/lib/genotwin-engine";
import type { TwinResult, WellnessTwinResult } from "@/lib/types";

type RunRow = {
  id: string;
  createdAt: string;
  result: TwinResult;
};

function resolveTwin(result?: TwinResult | null): WellnessTwinResult {
  if (result?.wellnessTwin) return result.wellnessTwin;
  return runWellnessTwin(DEFAULT_WELLNESS_INPUT);
}

export default function DashboardPage() {
  const [runs, setRuns] = useState<RunRow[]>([]);
  const [loading, setLoading] = useState(true);
  const twin = useMemo(() => resolveTwin(runs[0]?.result), [runs]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/twin");
        const data = await res.json();
        setRuns(data.runs ?? []);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10">
      <SubpageVisual variant="dashboard" />
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
            Personal health twin dashboard
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Your wellness twin at a glance
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Educational panels for sleep, activity, stress, nutrition, visit prep, and lifestyle
            timeline — not a clinical record.
          </p>
        </div>
        <Link
          href="/demo"
          className="inline-flex rounded-full bg-gradient-to-r from-indigo-600 to-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:from-indigo-500 hover:to-sky-500"
        >
          Update twin inputs
        </Link>
      </header>

      {loading ? (
        <p className="mt-10 text-slate-600">Loading dashboard…</p>
      ) : (
        <>
          <section className="mt-10 grid gap-6 lg:grid-cols-[220px_1fr] lg:items-center">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg">
              <BiometricScoreRing score={twin.wellnessTwinScore} />
            </div>
            <article className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Wellness pattern summary
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700">
                {twin.patternSummary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <SleepPatternPanel data={twin.sleepRhythm} />
            <ActivityRecoveryCard data={twin.activityRecovery} />
            <StressTrendCard data={twin.stressTrend} />
            <NutritionConsistencyCard data={twin.nutritionPanel} />
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Weekly focus plan
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {twin.weeklyFocusAreas.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-emerald-500">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                Risk awareness notes
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                {twin.awarenessNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mt-8 grid gap-6">
            <ClinicianQuestionBrief
              questions={twin.clinicianQuestions}
              summary={twin.clinicianDiscussionSummary}
            />
            <WellnessTimeline events={twin.timeline} />
            <HealthSafetyDisclaimer />
          </section>

          {runs.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-lg font-semibold text-slate-900">Saved twin runs</h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {runs.map((run) => (
                  <li key={run.id}>
                    <Link
                      href={`/dashboard/runs/${run.id}`}
                      className="block rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md"
                    >
                      <p className="text-xs text-slate-500">
                        {new Date(run.createdAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">Twin run archive</p>
                      <p className="mt-2 text-2xl font-bold text-indigo-700">
                        {run.result?.wellnessTwin?.wellnessTwinScore ??
                          run.result?.awarenessScore ??
                          "—"}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      )}
    </main>
  );
}
