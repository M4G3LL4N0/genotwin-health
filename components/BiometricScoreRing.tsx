type BiometricScoreRingProps = {
  score: number;
  label?: string;
  caption?: string;
  size?: number;
};

export function BiometricScoreRing({
  score,
  label = "Wellness twin score",
  caption = "Educational consistency index — not a medical grade.",
  size = 168,
}: BiometricScoreRingProps) {
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, score));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id="wellness-ring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="45%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(148, 163, 184, 0.25)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#wellness-ring)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold tabular-nums text-slate-900">{Math.round(clamped)}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">/ 100</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="mt-1 max-w-xs text-xs text-slate-500">{caption}</p>
      </div>
    </div>
  );
}
