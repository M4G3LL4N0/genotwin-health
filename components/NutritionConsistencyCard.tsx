import type { NutritionConsistencyPanel } from "@/lib/types";

type NutritionConsistencyCardProps = {
  data: NutritionConsistencyPanel;
};

export function NutritionConsistencyCard({ data }: NutritionConsistencyCardProps) {
  return (
    <article className="rounded-3xl border border-lime-100 bg-gradient-to-br from-white via-lime-50/25 to-emerald-50/40 p-6 shadow-lg shadow-lime-900/5">
      <p className="text-xs font-semibold uppercase tracking-wide text-lime-800">Nutrition consistency</p>
      <h2 className="mt-2 text-lg font-semibold text-slate-900">{data.consistency}</h2>
      <div className="mt-5">
        <div className="flex items-end justify-between gap-3">
          <p className="text-3xl font-bold tabular-nums text-slate-900">{data.score}</p>
          <p className="text-xs font-medium uppercase tracking-wide text-lime-800">consistency index</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-lime-400 to-emerald-500"
            style={{ width: `${data.score}%` }}
          />
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{data.focusNote}</p>
    </article>
  );
}
