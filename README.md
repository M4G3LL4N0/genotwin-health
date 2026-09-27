# GenoTwin Health

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
