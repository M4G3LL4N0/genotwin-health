import type { SleepRhythmPanel as SleepRhythmData } from "@/lib/types";

type SleepPatternPanelProps = {
  data: SleepRhythmData;
};

export function SleepPatternPanel({ data }: SleepPatternPanelProps) {
  const width = Math.min(100, Math.round((data.hoursPerNight / 9) * 100));

  return (
    <article className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50/40 to-sky-50/60 p-6 shadow-lg shadow-indigo-900/5">
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">Sleep rhythm</p>
      <h2 className="mt-2 text-lg font-semibold text-slate-900">Night-to-night pattern</h2>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-bold tabular-nums text-slate-900">{data.hoursPerNight}h</p>
          <p className="text-sm text-slate-600">avg hours · {data.quality} quality</p>
        </div>
        <p className="text-right text-sm font-semibold text-indigo-700">
          Consistency {data.consistencyScore}
        </p>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-400"
          style={{ width: `${width}%` }}
        />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{data.rhythmNote}</p>
    </article>
  );
}
