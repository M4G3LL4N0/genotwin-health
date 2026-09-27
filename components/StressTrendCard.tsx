import type { StressTrendCard as StressTrendData } from "@/lib/types";

type StressTrendCardProps = {
  data: StressTrendData;
};

const trendCopy = {
  easing: "Easing",
  steady: "Steady",
  rising: "Rising",
} as const;

export function StressTrendCard({ data }: StressTrendCardProps) {
  return (
    <article className="rounded-3xl border border-violet-100 bg-gradient-to-br from-white via-violet-50/35 to-fuchsia-50/40 p-6 shadow-lg shadow-violet-900/5">
      <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Stress trend</p>
      <h2 className="mt-2 text-lg font-semibold text-slate-900">{data.level} self-report</h2>
      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600">Direction: {trendCopy[data.trendDirection]}</p>
        <p className="text-2xl font-bold tabular-nums text-violet-800">{data.weeklyAverage}</p>
      </div>
      <div className="mt-4 flex gap-1">
        {[28, 42, 36, 55, 48, 62, 50].map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-full bg-gradient-to-t from-violet-300 to-violet-500"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{data.trendNote}</p>
    </article>
  );
}
