import { HealthSafetyDisclaimer } from "@/components/HealthSafetyDisclaimer";
import { SubpageVisual } from "@/components/SubpageVisual";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
      <SubpageVisual variant="about" />
      <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">About GenoTwin Health</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Mission and safety philosophy
      </h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700 sm:text-base">
        <p>
          People collect health data everywhere — wearables, food logs, lab portals, and appointment
          notes — but rarely know which patterns matter or what to ask their clinician. GenoTwin Health
          is a personal wellness intelligence dashboard that organizes those signals into educational
          summaries, habit experiments, and visit-prep questions.
        </p>
        <p>
          We are intentionally not a medical diagnosis app, a treatment recommendation engine, or a fake
          telehealth product. Every output is framed as wellness education and clinician discussion
          support.
        </p>
        <p>
          The emotional core is clarity: help users see their own lifestyle rhythms, notice when data is
          incomplete or noisy, and arrive at appointments with better questions — not with AI-generated
          prescriptions.
        </p>
      </div>
      <section className="mt-10">
        <HealthSafetyDisclaimer />
      </section>
    </main>
  );
}
