import { z } from "zod";
import { ACTIVITY_LEVEL, SLEEP_QUALITY } from "./types";

export const twinSchema = z.object({
  geneticsMarkers: z.string().min(10).max(4000),
  wearableMetrics: z.string().min(10).max(4000),
  sleepQuality: z.enum(SLEEP_QUALITY),
  sleepHoursPerNight: z.string().min(1).max(20),
  activityLevel: z.enum(ACTIVITY_LEVEL),
  activityMinutesPerWeek: z.string().min(1).max(20),
  nutritionNotes: z.string().min(10).max(4000),
  wellnessGoals: z.string().min(10).max(4000),
});
