import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { createSalonClosureSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const from = request.nextUrl.searchParams.get("from");
  const to = request.nextUrl.searchParams.get("to");

  const where: Record<string, unknown> = {};
  if (from) where.date = { ...(where.date as object || {}), gte: new Date(from) };
  if (to) where.date = { ...(where.date as object || {}), lte: new Date(to) };

  const closures = await prisma.salonClosure.findMany({
    where,
    orderBy: { date: "desc" },
  });

  return NextResponse.json(closures);
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const parsed = createSalonClosureSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos", details: parsed.error.issues }, { status: 400 });
  }

  const dateObj = new Date(parsed.data.date + "T00:00:00");
  const dbDate = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));

  const closure = await prisma.salonClosure.create({
    data: {
      date: dbDate,
      startTime: parsed.data.startTime || null,
      endTime: parsed.data.endTime || null,
      reason: parsed.data.reason || null,
    },
  });

  return NextResponse.json(closure, { status: 201 });
}
