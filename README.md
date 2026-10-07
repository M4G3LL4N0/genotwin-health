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

<!-- TRILLIONX:presentation:begin -->

### Animated surfaces

Generated from this repository's own source tree: every count, route and module below was measured, not written by hand.

#### Identity

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/hero-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/hero-light.svg">
  <img alt="Identity diagram for genotwin-health" src="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/hero.svg">
</picture>

#### Modules

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/architecture-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/architecture-light.svg">
  <img alt="Modules diagram for genotwin-health" src="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/architecture.svg">
</picture>

#### Routes

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/data_flow-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/data_flow-light.svg">
  <img alt="Routes diagram for genotwin-health" src="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/data_flow.svg">
</picture>

#### Primitives

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/state_machine-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/state_machine-light.svg">
  <img alt="Primitives diagram for genotwin-health" src="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/state_machine.svg">
</picture>

#### Composition

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/component_map-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/component_map-light.svg">
  <img alt="Composition diagram for genotwin-health" src="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/component_map.svg">
</picture>

#### Build and tests

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/build-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/build-light.svg">
  <img alt="Build and tests diagram for genotwin-health" src="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/build.svg">
</picture>

#### Workflow

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/workflow-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/workflow-light.svg">
  <img alt="Workflow diagram for genotwin-health" src="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/workflow.svg">
</picture>

#### Domain

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/domain-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/domain-light.svg">
  <img alt="Domain diagram for genotwin-health" src="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/domain.svg">
</picture>

#### Identity object

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/footer-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/footer-light.svg">
  <img alt="Identity object diagram for genotwin-health" src="https://raw.githubusercontent.com/M4G3LL4N0/genotwin-health/main/.github-art/surfaces/footer.svg">
</picture>

<!-- TRILLIONX:presentation:end -->

<!-- TRILLIONX:evidence:begin -->

## What is measurable here

Generated by `.github-art` from the source tree at publish time.

| Signal | Value |
| --- | --- |
| HTTP routes | 18 |
| Entry points | 0 |
| Module roots | 3 |
| Test files | 0 |
| CI workflows | 0 |
| Distinctive stack | Prisma, Zod |
| Status | PROTOTYPE |
| Evidence confidence | E3 |
| Animated surfaces | 9 |

<!-- TRILLIONX:evidence:end -->
