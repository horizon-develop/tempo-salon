import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { createStylistAbsenceSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const stylistId = request.nextUrl.searchParams.get("stylistId");
  const from = request.nextUrl.searchParams.get("from");
  const to = request.nextUrl.searchParams.get("to");

  const where: Record<string, unknown> = {};
  if (stylistId) where.stylistId = stylistId;
  if (from || to) {
    const dateFilter: Record<string, Date> = {};
    if (from) dateFilter.gte = new Date(from);
    if (to) dateFilter.lte = new Date(to);
    where.date = dateFilter;
  }

  const absences = await prisma.stylistAbsence.findMany({
    where,
    include: { stylist: { select: { id: true, name: true } } },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(absences);
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const parsed = createStylistAbsenceSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos", details: parsed.error.issues }, { status: 400 });
  }

  const dateObj = new Date(parsed.data.date + "T00:00:00");
  const dbDate = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));

  const absence = await prisma.stylistAbsence.create({
    data: {
      stylistId: parsed.data.stylistId,
      date: dbDate,
      startTime: parsed.data.startTime || null,
      endTime: parsed.data.endTime || null,
      reason: parsed.data.reason || null,
    },
    include: { stylist: { select: { id: true, name: true } } },
  });

  return NextResponse.json(absence, { status: 201 });
}
