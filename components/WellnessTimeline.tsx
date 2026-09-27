import type { TimelineEvent } from "@/lib/types";

type WellnessTimelineProps = {
  events: TimelineEvent[];
};

const toneStyles: Record<TimelineEvent["tone"], string> = {
  sleep: "border-indigo-200 bg-indigo-50/80 text-indigo-900",
  activity: "border-emerald-200 bg-emerald-50/80 text-emerald-900",
  stress: "border-violet-200 bg-violet-50/80 text-violet-900",
  nutrition: "border-lime-200 bg-lime-50/80 text-lime-900",
  labs: "border-sky-200 bg-sky-50/80 text-sky-900",
  general: "border-slate-200 bg-slate-50/80 text-slate-900",
};

export function WellnessTimeline({ events }: WellnessTimelineProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Health data timeline</p>
      <h2 className="mt-2 text-lg font-semibold text-slate-900">Lifestyle signal over recent weeks</h2>
      <ol className="mt-6 space-y-4 border-l border-slate-200 pl-5">
        {events.map((event) => (
          <li key={event.id} className="relative">
            <span className="absolute -left-[1.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-sky-500 shadow-sm" />
            <div className={`rounded-2xl border px-4 py-3 ${toneStyles[event.tone]}`}>
              <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{event.weekLabel}</p>
              <p className="mt-1 font-semibold">{event.title}</p>
              <p className="mt-1 text-sm opacity-90">{event.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
