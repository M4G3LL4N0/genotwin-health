import type { ActivityRecoveryCard as ActivityRecoveryData } from "@/lib/types";

type ActivityRecoveryCardProps = {
  data: ActivityRecoveryData;
};

export function ActivityRecoveryCard({ data }: ActivityRecoveryCardProps) {
  return (
    <article className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50 p-6 shadow-lg shadow-emerald-900/5">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Activity recovery</p>
      <h2 className="mt-2 text-lg font-semibold text-slate-900">{data.level} movement pattern</h2>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-emerald-100">
          <p className="text-xs font-medium text-slate-500">Steps / day (demo)</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-900">{data.stepsPerDay}</p>
        </div>
        <div className="rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-emerald-100">
          <p className="text-xs font-medium text-slate-500">Active min / week</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-900">
            {data.activeMinutesPerWeek}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{data.recoveryNote}</p>
    </article>
  );
}
