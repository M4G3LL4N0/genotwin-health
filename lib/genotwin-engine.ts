import { MODEL_VERSION } from "./genotwin-data";
import type {
  ActivityLevel,
  NutritionConsistency,
  SleepQuality,
  StressLevel,
  TimelineEvent,
  WellnessTwinInput,
  WellnessTwinResult,
} from "./types";

function hashish(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) % 1000;
  return h >>> 0;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function scoreSleep(hours: number, quality: SleepQuality): number {
  const hourScore =
    hours >= 7 && hours <= 9 ? 92 : hours >= 6.5 ? 78 : hours >= 6 ? 62 : hours >= 5 ? 48 : 35;
  const qualityBonus: Record<SleepQuality, number> = {
    Excellent: 8,
    Good: 4,
    Fair: 0,
    Poor: -10,
  };
  return clamp(hourScore + qualityBonus[quality], 20, 100);
}

function scoreActivity(level: ActivityLevel): number {
  const map: Record<ActivityLevel, number> = {
    Active: 90,
    Moderate: 78,
    Light: 62,
    Sedentary: 42,
  };
  return map[level];
}

function scoreStress(stress: StressLevel): number {
  const map: Record<StressLevel, number> = {
    Low: 88,
    Moderate: 68,
    High: 48,
    "Very high": 32,
  };
  return map[stress];
}

function scoreNutrition(consistency: NutritionConsistency): number {
  const map: Record<NutritionConsistency, number> = {
    "Very steady": 92,
    "Mostly steady": 78,
    Mixed: 58,
    Inconsistent: 40,
  };
  return map[consistency];
}

function scoreWearableTrend(trend: WellnessTwinInput["wearableTrend"]): number {
  const map = { Improving: 86, Stable: 72, Declining: 52 } as const;
  return map[trend];
}

function estimateActiveMinutes(level: ActivityLevel, seed: number): number {
  const base: Record<ActivityLevel, number> = {
    Sedentary: 60,
    Light: 130,
    Moderate: 210,
    Active: 320,
  };
  return clamp(base[level] + (seed % 45), 30, 600);
}

function estimateSteps(level: ActivityLevel, seed: number): number {
  const base: Record<ActivityLevel, number> = {
    Sedentary: 4200,
    Light: 6500,
    Moderate: 8200,
    Active: 10500,
  };
  return clamp(base[level] + (seed % 1800), 2500, 14000);
}

function buildTimeline(input: WellnessTwinInput, seed: number): TimelineEvent[] {
  const weeks = ["This week", "Last week", "2 weeks ago", "3 weeks ago"];
  const tones: TimelineEvent["tone"][] = ["sleep", "activity", "stress", "nutrition", "labs", "general"];
  const titles = [
    "Sleep window drifted later on work nights",
    "Activity minutes clustered on weekends",
    "Stress markers rose mid-week (self-report)",
    "Nutrition consistency improved on weekdays",
    "Mock lab markers flagged for clinician review",
    "Wearable trend noted in your summary",
  ];
  const details = [
    `You logged about ${input.sleepHours} hours with ${input.sleepQuality.toLowerCase()} quality — a rhythm topic to discuss if it persists.`,
    `${input.activityLevel} activity pattern with wearable notes: ${input.wearableNotes.slice(0, 72)}${input.wearableNotes.length > 72 ? "…" : ""}`,
    `Stress felt ${input.stress.toLowerCase()}; educational only — not a clinical stress score.`,
    `Nutrition consistency: ${input.nutritionConsistency.toLowerCase()}. Use food logs as conversation starters, not judgments.`,
    `Lab-style notes for visit prep: ${input.labMarkers.slice(0, 80)}${input.labMarkers.length > 80 ? "…" : ""}`,
    `Wearable trend marked as ${input.wearableTrend.toLowerCase()} in your twin builder inputs.`,
  ];

  return weeks.map((weekLabel, index) => ({
    id: `timeline-${index}`,
    weekLabel,
    title: titles[(index + seed) % titles.length]!,
    detail: details[(index + seed) % details.length]!,
    tone: tones[(index + seed) % tones.length]!,
  }));
}

function buildPatternSummary(input: WellnessTwinInput): string[] {
  const patterns = [
    "This twin summarizes lifestyle patterns you entered for self-reflection — it does not diagnose or treat any condition.",
    `Sleep rhythm centers on ~${input.sleepHours} hours with ${input.sleepQuality.toLowerCase()} self-reported quality; timing consistency often matters as much as duration.`,
    `Activity is ${input.activityLevel.toLowerCase()} with wearable notes describing ${input.wearableTrend.toLowerCase()} trends — treat devices as context, not verdicts.`,
    `Stress feels ${input.stress.toLowerCase()} in your inputs; consider what recovery blocks fit your week (education only).`,
    `Nutrition consistency reads as ${input.nutritionConsistency.toLowerCase()} — useful for noticing routines, not labeling success or failure.`,
  ];

  const lab = input.labMarkers.toLowerCase();
  if (lab.includes("vitamin") || lab.includes("ldl") || lab.includes("glucose")) {
    patterns.push(
      "Mock lab-style markers are framed for clinician discussion — ranges and meaning should be interpreted with a qualified professional.",
    );
  } else {
    patterns.push(
      "If you add lab-style results later, bring official reports to visits rather than relying on this educational twin alone.",
    );
  }

  return patterns;
}

function buildHabitSuggestions(input: WellnessTwinInput): string[] {
  const suggestions = [
    "Try a fixed wake time five days per week and note energy changes (habit experiment, not medical advice).",
    "Add one 10-minute movement block after lunch on weekdays.",
    "Keep a simple food log for seven days to notice patterns, then discuss with a clinician if desired.",
  ];

  if (input.sleepQuality === "Poor" || input.sleepQuality === "Fair" || input.sleepHours < 7) {
    suggestions.push("Limit late caffeine after 2 p.m. if sleep feels fragmented (general sleep hygiene tip).");
  }
  if (input.activityLevel === "Sedentary" || input.activityLevel === "Light") {
    suggestions.push("Stack short walks onto existing errands to raise daily steps without an all-or-nothing plan.");
  }
  if (input.stress === "High" || input.stress === "Very high") {
    suggestions.push("Schedule two brief decompression breaks on calendar-heavy days — breath, walk, or screen-free pause.");
  }
  if (input.nutritionConsistency === "Inconsistent" || input.nutritionConsistency === "Mixed") {
    suggestions.push("Pick one repeatable breakfast or lunch template for busy days to reduce decision fatigue.");
  }

  return suggestions.slice(0, 5);
}

function buildClinicianQuestions(input: WellnessTwinInput): string[] {
  const questions = [
    "Given my sleep and activity patterns, what vitals or labs would you want to review together?",
    "Are there preventive screenings appropriate for my age and history that we should schedule?",
    "How should I interpret consumer wearable summaries alongside clinical tests?",
    "What warning signs should prompt urgent care versus a routine follow-up?",
    "Do my stated wellness goals conflict with any medications or conditions you are managing for me?",
  ];

  if (input.labMarkers.trim().length > 20) {
    questions.push(
      "For the lab-style markers I logged, what follow-up timing and ranges would you want to use in my situation?",
    );
  }
  if (input.stress === "High" || input.stress === "Very high") {
    questions.push("What non-diagnostic stress recovery approaches are reasonable to discuss alongside my care plan?");
  }

  return questions.slice(0, 6);
}

function buildAwarenessNotes(input: WellnessTwinInput): string[] {
  return [
    "Educational framing: the wellness twin score reflects lifestyle consistency inputs — not clinical risk.",
    "Wearables can miss context (illness, stress, medications); never use this dashboard to start or stop treatments.",
    "If you have chest pain, sudden weakness, difficulty breathing, or thoughts of self-harm, seek immediate in-person emergency care.",
    `Wearable trend marked as ${input.wearableTrend.toLowerCase()} — trends are for conversation prep, not diagnosis.`,
    "Lab-style notes here are mock or user-entered summaries; official results belong in your medical record.",
  ];
}

function buildWeeklyFocusAreas(input: WellnessTwinInput): string[] {
  const focus: string[] = [];
  if (input.sleepHours < 7 || input.sleepQuality === "Poor" || input.sleepQuality === "Fair") {
    focus.push("Sleep rhythm: anchor wake time and note what disrupts your wind-down.");
  }
  if (input.activityLevel === "Sedentary" || input.activityLevel === "Light") {
    focus.push("Activity recovery: add short movement blocks on low-energy days.");
  }
  if (input.stress === "High" || input.stress === "Very high") {
    focus.push("Stress trend: identify one recurring weekly stressor to discuss with your clinician.");
  }
  if (input.nutritionConsistency === "Inconsistent" || input.nutritionConsistency === "Mixed") {
    focus.push("Nutrition consistency: simplify one daily meal template.");
  }
  if (input.wearableTrend === "Declining") {
    focus.push("Wearable trends: review travel, illness, or routine changes before changing habits abruptly.");
  }
  if (focus.length < 3) {
    focus.push("Visit prep: export clinician questions before your next appointment.");
  }
  if (focus.length < 3) {
    focus.push("Reflection: note one habit that felt sustainable this week.");
  }
  return focus.slice(0, 4);
}

function buildDiscussionSummary(input: WellnessTwinInput, score: number): string {
  return `Summary to bring to a visit: I am using GenoTwin as an educational worksheet. I logged sleep (~${input.sleepHours}h, ${input.sleepQuality}), ${input.activityLevel.toLowerCase()} activity, ${input.stress.toLowerCase()} stress, ${input.nutritionConsistency.toLowerCase()} nutrition consistency, wearable trend (${input.wearableTrend}), goals (${input.goals.slice(0, 90)}${input.goals.length > 90 ? "…" : ""}), and lab-style notes for discussion. My wellness twin score is ${score} (non-clinical). I want help separating signal from noise and building a safe, evidence-based plan.`;
}

export function runWellnessTwin(input: WellnessTwinInput): WellnessTwinResult {
  const seed = hashish(
    `${input.sleepHours}-${input.sleepQuality}-${input.activityLevel}-${input.stress}-${input.goals}`,
  );

  const sleepScore = scoreSleep(input.sleepHours, input.sleepQuality);
  const activityScore = scoreActivity(input.activityLevel);
  const stressScore = scoreStress(input.stress);
  const nutritionScore = scoreNutrition(input.nutritionConsistency);
  const wearableScore = scoreWearableTrend(input.wearableTrend);

  const wellnessTwinScore = Math.round(
    sleepScore * 0.28 +
      activityScore * 0.22 +
      stressScore * 0.18 +
      nutritionScore * 0.17 +
      wearableScore * 0.15,
  );

  const activeMinutesPerWeek = estimateActiveMinutes(input.activityLevel, seed);
  const stepsPerDay = estimateSteps(input.activityLevel, seed);

  const stressTrendDirection: WellnessTwinResult["stressTrend"]["trendDirection"] =
    input.stress === "Low"
      ? "easing"
      : input.stress === "Very high" || input.stress === "High"
        ? "rising"
        : "steady";

  return {
    wellnessTwinScore: clamp(wellnessTwinScore, 18, 96),
    patternSummary: buildPatternSummary(input),
    habitSuggestions: buildHabitSuggestions(input),
    clinicianQuestions: buildClinicianQuestions(input),
    awarenessNotes: buildAwarenessNotes(input),
    weeklyFocusAreas: buildWeeklyFocusAreas(input),
    timeline: buildTimeline(input, seed % 6),
    sleepRhythm: {
      hoursPerNight: input.sleepHours,
      quality: input.sleepQuality,
      rhythmNote:
        input.sleepHours < 7
          ? "Duration is below common public-health sleep targets — a reasonable topic for your clinician if you feel unrefreshed."
          : "Duration is in a commonly discussed wellness range; consistency and timing still matter.",
      consistencyScore: clamp(Math.round(sleepScore * 0.9 + (seed % 8)), 30, 98),
    },
    activityRecovery: {
      level: input.activityLevel,
      activeMinutesPerWeek,
      recoveryNote:
        input.activityLevel === "Active" || input.activityLevel === "Moderate"
          ? "Balance harder days with recovery time — educational framing only."
          : "Small, repeatable movement blocks often beat sporadic intense sessions for habit building.",
      stepsPerDay,
    },
    stressTrend: {
      level: input.stress,
      trendDirection: stressTrendDirection,
      trendNote:
        "Self-reported stress trend for reflection — not a clinical anxiety or depression score.",
      weeklyAverage: clamp(
        stressScore + (stressTrendDirection === "rising" ? -6 : stressTrendDirection === "easing" ? 6 : 0),
        20,
        95,
      ),
    },
    nutritionPanel: {
      consistency: input.nutritionConsistency,
      score: nutritionScore,
      focusNote:
        input.nutritionConsistency === "Very steady" || input.nutritionConsistency === "Mostly steady"
          ? "Steady routines can make visit conversations easier — still personalize with a dietitian or clinician."
          : "Variable weeks are common; look for one anchor meal before making broad changes.",
    },
    clinicianDiscussionSummary: buildDiscussionSummary(input, clamp(wellnessTwinScore, 18, 96)),
    modelVersion: MODEL_VERSION,
  };
}

export function wellnessInputFromLegacy(input: {
  sleepHoursPerNight: string;
  sleepQuality: SleepQuality;
  activityLevel: ActivityLevel;
  wearableMetrics: string;
  nutritionNotes: string;
  wellnessGoals: string;
  geneticsMarkers: string;
}): WellnessTwinInput {
  const hours = Number.parseFloat(input.sleepHoursPerNight);
  return {
    sleepHours: Number.isFinite(hours) ? hours : 7,
    sleepQuality: input.sleepQuality,
    activityLevel: input.activityLevel,
    stress: "Moderate",
    nutritionConsistency: "Mixed",
    wearableTrend: "Stable",
    wearableNotes: input.wearableMetrics,
    goals: input.wellnessGoals,
    labMarkers: input.geneticsMarkers,
  };
}
