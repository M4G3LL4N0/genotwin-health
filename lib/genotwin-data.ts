import {
  ACTIVITY_LEVEL,
  NUTRITION_CONSISTENCY,
  SLEEP_QUALITY,
  STRESS_LEVEL,
  WEARABLE_TREND,
  type ActivityLevel,
  type NutritionConsistency,
  type SleepQuality,
  type StressLevel,
  type WearableTrend,
  type WellnessTwinInput,
} from "./types";

export const MODEL_VERSION = "genotwin-wellness-twin-1.0.0";

export const DEFAULT_WELLNESS_INPUT: WellnessTwinInput = {
  sleepHours: 6.5,
  sleepQuality: "Fair",
  activityLevel: "Light",
  stress: "Moderate",
  nutritionConsistency: "Mixed",
  wearableTrend: "Stable",
  wearableNotes:
    "Resting HR ~62 bpm, steps ~7.5k/day, HRV flat after travel week — demo wearable summary.",
  goals:
    "More consistent sleep, sustainable activity, and clearer questions for my annual physical.",
  labMarkers:
    "Mock wellness panel: vitamin D borderline on last check, LDL discussed with PCP, no diagnosis implied.",
};

export const DEMO_LAB_MARKERS = [
  "Vitamin D — often discussed in general wellness visits (mock value)",
  "Fasting glucose — lifestyle context only, not diagnostic",
  "Lipid panel — educational framing for clinician follow-up",
  "Ferritin / iron studies — ask what timing and ranges mean for you",
] as const;

export const SLEEP_QUALITY_OPTIONS = SLEEP_QUALITY;
export const ACTIVITY_LEVEL_OPTIONS = ACTIVITY_LEVEL;
export const STRESS_LEVEL_OPTIONS = STRESS_LEVEL;
export const NUTRITION_CONSISTENCY_OPTIONS = NUTRITION_CONSISTENCY;
export const WEARABLE_TREND_OPTIONS = WEARABLE_TREND;

export const PRICING_TIERS = [
  {
    id: "individual",
    name: "Individual",
    price: "$12",
    cadence: "per month",
    blurb: "One personal wellness twin with weekly focus plans and clinician question briefs.",
    features: [
      "Wellness twin builder",
      "Sleep, activity, and stress panels",
      "Educational pattern summaries",
      "Clinician discussion prompts",
    ],
  },
  {
    id: "family",
    name: "Family",
    price: "$24",
    cadence: "per month",
    blurb: "Up to four household profiles with shared safety disclaimers and exportable visit briefs.",
    features: [
      "Four wellness twin profiles",
      "Household timeline view",
      "Shared habit experiment library",
      "Family-friendly educational copy",
    ],
  },
  {
    id: "coach",
    name: "Coach",
    price: "$49",
    cadence: "per month",
    blurb: "For wellness coaches organizing client check-ins — not medical supervision.",
    features: [
      "Client workspace templates",
      "Weekly focus planning",
      "Non-diagnostic awareness notes",
      "Visit-prep question packs",
    ],
  },
  {
    id: "clinic",
    name: "Clinic partner",
    price: "Custom",
    cadence: "annual",
    blurb: "Clinic-branded educational intake that helps patients arrive with clearer questions.",
    features: [
      "Branded wellness twin intake",
      "Staff safety guardrails",
      "Aggregate de-identified trends",
      "Implementation support",
    ],
  },
] as const;

export function labelForSleepQuality(value: SleepQuality): string {
  return value;
}

export function labelForActivityLevel(value: ActivityLevel): string {
  return value;
}

export function labelForStressLevel(value: StressLevel): string {
  return value;
}

export function labelForNutritionConsistency(value: NutritionConsistency): string {
  return value;
}

export function labelForWearableTrend(value: WearableTrend): string {
  return value;
}
