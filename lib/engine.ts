import { runWellnessTwin, wellnessInputFromLegacy } from "./genotwin-engine";
import type { TwinInput, TwinResult, WearableSnapshot } from "./types";

const MODEL_VERSION = "genotwin-edu-sim-1.0.0";

function hashish(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 1000;
}

function parseNumberLoose(s: string, fallback: number): number {
  const m = s.match(/[\d.]+/);
  if (!m) return fallback;
  const n = Number.parseFloat(m[0]);
  return Number.isFinite(n) ? n : fallback;
}

function buildWearableSnapshot(input: TwinInput): WearableSnapshot {
  const h = hashish(input.wearableMetrics + input.activityLevel);
  const sleepH = Math.min(10, Math.max(4, parseNumberLoose(input.sleepHoursPerNight, 7)));
  const activeMin = Math.min(600, Math.max(30, parseNumberLoose(input.activityMinutesPerWeek, 150)));
  const rhr = 52 + (h % 18) + (input.activityLevel === "Sedentary" ? 6 : 0);
  const steps = 4000 + (h % 8000) + (input.activityLevel === "Active" ? 4000 : 0);

  return {
    restingHeartRateBpm: Math.round(rhr),
    avgStepsPerDay: Math.round(steps),
    sleepHoursAvg: Math.round(sleepH * 10) / 10,
    activeMinutesPerWeek: Math.round(activeMin),
    dataQualityNote:
      "Synthetic dashboard values for education only — not validated medical or device data.",
  };
}

export function runTwin(input: TwinInput): TwinResult {
  const wearableSnapshot = buildWearableSnapshot(input);
  const wellnessTwin = runWellnessTwin(wellnessInputFromLegacy(input));

  return {
    wellnessInsights: wellnessTwin.patternSummary,
    clinicianQuestions: wellnessTwin.clinicianQuestions,
    habitRecommendations: wellnessTwin.habitSuggestions,
    riskAwarenessReport: wellnessTwin.awarenessNotes,
    clinicianDiscussionSummary: wellnessTwin.clinicianDiscussionSummary,
    wearableSnapshot,
    awarenessScore: wellnessTwin.wellnessTwinScore,
    modelVersion: MODEL_VERSION,
    wellnessTwin,
  };
}

export { runWellnessTwin } from "./genotwin-engine";
