# GenoTwin Health

<p align="center">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="assets/hero/hero-reduced.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/hero/hero-light.svg">
    <img src="assets/hero/hero-motion.svg" alt="GenoTwin Health — animated project plate showing capital &rarr; allocate &rarr; mark &rarr; settle. Motion depicts this project's real state transition." width="100%">
  </picture>
</p>

<p align="center">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="assets/hero/computational-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/hero/computational-light.svg">
    <img src="assets/hero/computational-motion.svg" alt="State machine: capital &rarr; allocate &rarr; mark &rarr; settle." width="100%">
  </picture>
</p>

Educational MVP: a **non-medical** “health twin” worksheet that combines mock genomics notes, wearable-style summaries, sleep, activity, nutrition, and goals into wellness insights, habit ideas, risk-awareness language, and clinician discussion prompts.

## Stack

- Next.js 16 (App Router) + TypeScript  
- Tailwind CSS v4  
- Prisma 6 + SQLite  
- pnpm  

## Routes

- `/` — Landing  
- `/intake` — Health twin intake flow  
- `/dashboard` — Wearable-style snapshot cards + run list  
- `/dashboard/runs/[id]` — Risk awareness report + clinician summary  

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm db:push
```

## Safety

This software is **not** a medical device and **does not** provide diagnosis or treatment. Always consult licensed professionals for medical decisions.
