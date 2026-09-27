export const SLEEP_QUALITY = ["Poor", "Fair", "Good", "Excellent"] as const;
export const ACTIVITY_LEVEL = ["Sedentary", "Light", "Moderate", "Active"] as const;
export const STRESS_LEVEL = ["Low", "Moderate", "High", "Very high"] as const;
export const NUTRITION_CONSISTENCY = ["Inconsistent", "Mixed", "Mostly steady", "Very steady"] as const;
export const WEARABLE_TREND = ["Declining", "Stable", "Improving"] as const;

export type SleepQuality = (typeof SLEEP_QUALITY)[number];
export type ActivityLevel = (typeof ACTIVITY_LEVEL)[number];
export type StressLevel = (typeof STRESS_LEVEL)[number];
export type NutritionConsistency = (typeof NUTRITION_CONSISTENCY)[number];
export type WearableTrend = (typeof WEARABLE_TREND)[number];

export type WellnessTwinInput = {
  sleepHours: number;
  sleepQuality: SleepQuality;
  activityLevel: ActivityLevel;
  stress: StressLevel;
  nutritionConsistency: NutritionConsistency;
  wearableTrend: WearableTrend;
  wearableNotes: string;
  goals: string;
  labMarkers: string;
};

export type TimelineEvent = {
  id: string;
  weekLabel: string;
  title: string;
  detail: string;
  tone: "sleep" | "activity" | "stress" | "nutrition" | "labs" | "general";
};

export type SleepRhythmPanel = {
  hoursPerNight: number;
  quality: SleepQuality;
  rhythmNote: string;
  consistencyScore: number;
};

export type ActivityRecoveryCard = {
  level: ActivityLevel;
  activeMinutesPerWeek: number;
  recoveryNote: string;
  stepsPerDay: number;
};

export type StressTrendCard = {
  level: StressLevel;
  trendDirection: "easing" | "steady" | "rising";
  trendNote: string;
  weeklyAverage: number;
};

export type NutritionConsistencyPanel = {
  consistency: NutritionConsistency;
  score: number;
  focusNote: string;
};

export type WellnessTwinResult = {
  wellnessTwinScore: number;
  patternSummary: string[];
  habitSuggestions: string[];
  clinicianQuestions: string[];
  awarenessNotes: string[];
  weeklyFocusAreas: string[];
  timeline: TimelineEvent[];
  sleepRhythm: SleepRhythmPanel;
  activityRecovery: ActivityRecoveryCard;
  stressTrend: StressTrendCard;
  nutritionPanel: NutritionConsistencyPanel;
  clinicianDiscussionSummary: string;
  modelVersion: string;
};

/** Legacy intake shape retained for saved API runs. */
export type TwinInput = {
  geneticsMarkers: string;
  wearableMetrics: string;
  sleepQuality: SleepQuality;
  sleepHoursPerNight: string;
  activityLevel: ActivityLevel;
  activityMinutesPerWeek: string;
  nutritionNotes: string;
  wellnessGoals: string;
};

export type WearableSnapshot = {
  restingHeartRateBpm: number;
  avgStepsPerDay: number;
  sleepHoursAvg: number;
  activeMinutesPerWeek: number;
  dataQualityNote: string;
};

export type TwinResult = {
  wellnessInsights: string[];
  clinicianQuestions: string[];
  habitRecommendations: string[];
  riskAwarenessReport: string[];
  clinicianDiscussionSummary: string;
  wearableSnapshot: WearableSnapshot;
  awarenessScore: number;
  modelVersion: string;
  wellnessTwin?: WellnessTwinResult;
};
