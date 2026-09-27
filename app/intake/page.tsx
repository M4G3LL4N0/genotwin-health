"use client";

import { useState } from "react";
import { SubpageVisual } from "@/components/SubpageVisual";
import { useRouter } from "next/navigation";
import {
  ACTIVITY_LEVEL,
  SLEEP_QUALITY,
  type TwinInput,
  type TwinResult,
} from "@/lib/types";

const initial: TwinInput = {
  geneticsMarkers:
    "Mock: family history note + educational variant list for discussion only (not a lab report).",
  wearableMetrics:
    "Resting HR ~62 bpm, steps ~7.5k/day, HRV trending flat, one week of travel stress.",
  sleepQuality: "Fair",
  sleepHoursPerNight: "6.5",
  activityLevel: "Light",
  activityMinutesPerWeek: "120",
  nutritionNotes:
    "Mostly home cooking; frequent late dinners; trying to reduce sugary drinks on weekdays.",
  wellnessGoals:
    "More consistent sleep, sustainable activity, and clearer questions for my annual physical.",
};

export default function IntakePage() {
  const router = useRouter();
  const [form, setForm] = useState<TwinInput>(initial);
  const [preview, setPreview] = useState<TwinResult | null>(null);
  const [runId, setRunId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setPreview(data.result);
      setRunId(data.id);
    } catch (err) {
      console.error(err);
      alert("Could not generate your educational twin output.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
      <SubpageVisual variant="default" />
      <div className="rounded-3xl border border-teal-100 bg-white/90 p-6 shadow-xl shadow-teal-900/5 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
          Health twin intake
        </p>
        <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Enter mock signals for an educational wellness twin
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Use fictional or anonymized examples. Nothing here is medical advice. Outputs are for
          learning, habit brainstorming, and preparing questions for a clinician.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-6 lg:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Mock genetics / markers (education)
            <textarea
              value={form.geneticsMarkers}
              onChange={(e) => setForm((p) => ({ ...p, geneticsMarkers: e.target.value }))}
              className="mt-1.5 min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-inner outline-none ring-teal-500/30 focus:border-teal-300 focus:ring-4"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Wearable-style metrics (paste summary)
            <textarea
              value={form.wearableMetrics}
              onChange={(e) => setForm((p) => ({ ...p, wearableMetrics: e.target.value }))}
              className="mt-1.5 min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-inner outline-none ring-teal-500/30 focus:border-teal-300 focus:ring-4"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Sleep quality (self-report)
              <select
                value={form.sleepQuality}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    sleepQuality: e.target.value as TwinInput["sleepQuality"],
                  }))
                }
                className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-teal-500/30 focus:border-teal-300 focus:ring-4"
              >
                {SLEEP_QUALITY.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Sleep hours / night (e.g. 7.5)
              <input
                value={form.sleepHoursPerNight}
                onChange={(e) => setForm((p) => ({ ...p, sleepHoursPerNight: e.target.value }))}
                className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-teal-500/30 focus:border-teal-300 focus:ring-4"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Activity level
              <select
                value={form.activityLevel}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    activityLevel: e.target.value as TwinInput["activityLevel"],
                  }))
                }
                className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-teal-500/30 focus:border-teal-300 focus:ring-4"
              >
                {ACTIVITY_LEVEL.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Active minutes / week (approx.)
              <input
                value={form.activityMinutesPerWeek}
                onChange={(e) =>
                  setForm((p) => ({ ...p, activityMinutesPerWeek: e.target.value }))
                }
                className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-teal-500/30 focus:border-teal-300 focus:ring-4"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700 lg:col-span-2">
            Nutrition & lifestyle notes
            <textarea
              value={form.nutritionNotes}
              onChange={(e) => setForm((p) => ({ ...p, nutritionNotes: e.target.value }))}
              className="mt-1.5 min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-inner outline-none ring-teal-500/30 focus:border-teal-300 focus:ring-4"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 lg:col-span-2">
            Wellness goals (non-medical)
            <textarea
              value={form.wellnessGoals}
              onChange={(e) => setForm((p) => ({ ...p, wellnessGoals: e.target.value }))}
              className="mt-1.5 min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-inner outline-none ring-teal-500/30 focus:border-teal-300 focus:ring-4"
            />
          </label>

          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-teal-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 hover:bg-teal-500 disabled:opacity-60"
            >
              {loading ? "Building twin…" : "Generate educational twin"}
            </button>
          </div>
        </form>
      </div>

      {preview ? (
        <section className="mt-10 grid gap-6 rounded-3xl border border-teal-100 bg-gradient-to-br from-white to-teal-50/50 p-6 shadow-lg sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
                Preview (education)
              </p>
              <h2 className="text-xl font-semibold text-slate-900">Awareness score (non-clinical)</h2>
              <p className="mt-1 text-sm text-slate-600">
                Higher means more topics to discuss with a professional — not a diagnosis.
              </p>
            </div>
            <p className="text-4xl font-bold tabular-nums text-teal-700">{preview.awarenessScore}</p>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
            {preview.wellnessInsights.slice(0, 3).map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          {runId ? (
            <button
              type="button"
              onClick={() => router.push(`/dashboard/runs/${runId}`)}
              className="w-fit rounded-full border border-teal-200 bg-white px-6 py-2.5 text-sm font-semibold text-teal-900 shadow-sm hover:bg-teal-50"
            >
              Open full report &amp; dashboard
            </button>
          ) : null}
        </section>
      ) : null}
    </main>
  );
}
