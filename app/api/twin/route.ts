import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { runTwin } from "@/lib/engine";
import { prisma } from "@/lib/prisma";
import { twinSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = twinSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const result = runTwin(parsed.data);
    const row = await prisma.healthTwinRun.create({
      data: {
        inputs: parsed.data as unknown as Prisma.InputJsonValue,
        result: result as unknown as Prisma.InputJsonValue,
      },
    });
    return NextResponse.json({ id: row.id, result });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create twin run" }, { status: 500 });
  }
}

export async function GET() {
  const rows = await prisma.healthTwinRun.findMany({
    orderBy: { createdAt: "desc" },
    take: 40,
  });
  return NextResponse.json({ runs: rows });
}
