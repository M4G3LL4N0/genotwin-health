"use client";

import { useMemo, useState } from "react";
import {
  ACTIVITY_LEVEL_OPTIONS,
  DEFAULT_WELLNESS_INPUT,
  NUTRITION_CONSISTENCY_OPTIONS,
  SLEEP_QUALITY_OPTIONS,
  STRESS_LEVEL_OPTIONS,
  WEARABLE_TREND_OPTIONS,
} from "@/lib/genotwin-data";
import { runWellnessTwin } from "@/lib/genotwin-engine";
import type { WellnessTwinInput } from "@/lib/types";
import { BiometricScoreRing } from "./BiometricScoreRing";
import { ClinicianQuestionBrief } from "./ClinicianQuestionBrief";
import { HealthSafetyDisclaimer } from "./HealthSafetyDisclaimer";

type WellnessTwinBuilderProps = {
  onResult?: (input: WellnessTwinInput, result: ReturnType<typeof runWellnessTwin>) => void;
};

export function WellnessTwinBuilder({ onResult }: WellnessTwinBuilderProps) {
  const [form, setForm] = useState<WellnessTwinInput>(DEFAULT_WELLNESS_INPUT);
  const result = useMemo(() => runWellnessTwin(form), [form]);

  function update<K extends keyof WellnessTwinInput>(key: K, value: WellnessTwinInput[K]) {
    const next = { ...form, [key]: value };
    setForm(next);
    onResult?.(next, runWellnessTwin(next));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/5 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Wellness twin builder</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Turn scattered wellness data into clearer patterns
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Enter sleep, activity, stress, nutrition, wearable trends, goals, and mock lab-style markers.
          Outputs are educational wellness insights and clinician discussion support — not diagnosis or
          treatment.
        </p>

        <form className="mt-8 grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Sleep hours / night
            <input
              type="number"
              min={3}
              max={12}
              step={0.5}
              value={form.sleepHours}
              onChange={(e) => update("sleepHours", Number(e.target.value))}
              className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-sky-500/30 focus:border-sky-300 focus:ring-4"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Sleep quality
            <select
              value={form.sleepQuality}
              onChange={(e) => update("sleepQuality", e.target.value as WellnessTwinInput["sleepQuality"])}
              className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-sky-500/30 focus:border-sky-300 focus:ring-4"
            >
              {SLEEP_QUALITY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Activity level
            <select
              value={form.activityLevel}
              onChange={(e) => update("activityLevel", e.target.value as WellnessTwinInput["activityLevel"])}
              className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-sky-500/30 focus:border-sky-300 focus:ring-4"
            >
              {ACTIVITY_LEVEL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Stress (self-report)
            <select
              value={form.stress}
              onChange={(e) => update("stress", e.target.value as WellnessTwinInput["stress"])}
              className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-sky-500/30 focus:border-sky-300 focus:ring-4"
            >
              {STRESS_LEVEL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Nutrition consistency
            <select
              value={form.nutritionConsistency}
              onChange={(e) =>
                update("nutritionConsistency", e.target.value as WellnessTwinInput["nutritionConsistency"])
              }
              className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-sky-500/30 focus:border-sky-300 focus:ring-4"
            >
              {NUTRITION_CONSISTENCY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Wearable trend
            <select
              value={form.wearableTrend}
              onChange={(e) => update("wearableTrend", e.target.value as WellnessTwinInput["wearableTrend"])}
              className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-sky-500/30 focus:border-sky-300 focus:ring-4"
            >
              {WEARABLE_TREND_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
            Wearable notes
            <textarea
              value={form.wearableNotes}
              onChange={(e) => update("wearableNotes", e.target.value)}
              className="mt-1.5 min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-inner outline-none ring-sky-500/30 focus:border-sky-300 focus:ring-4"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
            Wellness goals
            <textarea
              value={form.goals}
              onChange={(e) => update("goals", e.target.value)}
              className="mt-1.5 min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-inner outline-none ring-sky-500/30 focus:border-sky-300 focus:ring-4"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
            Mock lab-style markers
            <textarea
              value={form.labMarkers}
              onChange={(e) => update("labMarkers", e.target.value)}
              className="mt-1.5 min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-inner outline-none ring-sky-500/30 focus:border-sky-300 focus:ring-4"
            />
          </label>
        </form>
      </section>

      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-sky-50/40 to-violet-50/50 p-6 shadow-xl">
          <BiometricScoreRing score={result.wellnessTwinScore} />
          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            {result.patternSummary.slice(0, 3).map((item) => (
              <li key={item} className="rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-slate-100">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <article className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Weekly focus plan</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {result.weeklyFocusAreas.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-emerald-500">●</span>
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Habit suggestions</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {result.habitSuggestions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <ClinicianQuestionBrief
          questions={result.clinicianQuestions.slice(0, 4)}
          summary={result.clinicianDiscussionSummary}
        />
        <HealthSafetyDisclaimer compact />
      </section>
    </div>
  );
}
