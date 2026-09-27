import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { PRICING_TIERS } from "@/lib/genotwin-data";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
      <SubpageVisual variant="pricing" />
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">Pricing</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Plans for individuals, families, coaches, and clinic partners
        </h1>
        <p className="mt-4 text-slate-600">
          Educational wellness intelligence with clinician discussion support — not diagnosis, treatment,
          or telehealth replacement.
        </p>
      </header>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {PRICING_TIERS.map((tier) => (
          <article
            key={tier.id}
            className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg sm:p-8"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-semibold text-slate-900">{tier.name}</h2>
              <p className="text-right">
                <span className="text-3xl font-bold text-indigo-700">{tier.price}</span>
                <span className="block text-xs text-slate-500">{tier.cadence}</span>
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{tier.blurb}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="text-sky-500">●</span>
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-10 text-sm text-slate-500">
        MVP pricing is illustrative.{" "}
        <Link href="/contact" className="font-semibold text-indigo-700 hover:underline">
          Contact us
        </Link>{" "}
        for clinic partner conversations.
      </p>
    </main>
  );
}
