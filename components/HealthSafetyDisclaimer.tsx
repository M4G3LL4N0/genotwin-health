type HealthSafetyDisclaimerProps = {
  compact?: boolean;
};

export function HealthSafetyDisclaimer({ compact = false }: HealthSafetyDisclaimerProps) {
  if (compact) {
    return (
      <p className="rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-xs text-amber-950">
        <strong className="font-semibold">Educational only.</strong> GenoTwin does not diagnose, treat, or
        replace a licensed clinician.
      </p>
    );
  }

  return (
    <aside
      role="region"
      aria-label="Health safety disclaimer"
      className="rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-50/60 p-6 shadow-md"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-900">Safety philosophy</p>
      <h2 className="mt-2 text-lg font-semibold text-amber-950">Educational wellness intelligence only</h2>
      <p className="mt-3 text-sm leading-relaxed text-amber-950/90">
        GenoTwin Health organizes wearable, lifestyle, and lab-style notes into patterns and clinician
        discussion prompts. It is not a medical device, does not provide diagnosis or treatment, and is
        not a substitute for emergency care or licensed clinical judgment.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-amber-950/90">
        If you have chest pain, sudden weakness, difficulty breathing, or thoughts of self-harm, contact
        emergency services or go to the nearest emergency department immediately.
      </p>
    </aside>
  );
}
