import { WellnessTwinBuilder } from "@/components/WellnessTwinBuilder";
import { SubpageVisual } from "@/components/SubpageVisual";
import { HealthSafetyDisclaimer } from "@/components/HealthSafetyDisclaimer";

export default function DemoPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10">
      <SubpageVisual variant="demo" />
      <WellnessTwinBuilder />
      <section className="mt-10">
        <HealthSafetyDisclaimer />
      </section>
    </main>
  );
}
