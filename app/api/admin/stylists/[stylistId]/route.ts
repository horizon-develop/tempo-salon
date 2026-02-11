import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { updateStylistSchema } from "@/lib/validations";

type Params = { params: Promise<{ stylistId: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { stylistId } = await params;
  const stylist = await prisma.stylist.findUnique({
    where: { id: stylistId },
    include: {
      services: { include: { service: { select: { id: true, name: true } } } },
      schedules: { orderBy: { dayOfWeek: "asc" } },
      absences: { orderBy: { date: "desc" }, take: 50 },
    },
  });

  if (!stylist) {
    return NextResponse.json({ error: "Estilista no encontrado" }, { status: 404 });
  }

  return NextResponse.json(stylist);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { stylistId } = await params;
  const body = await request.json();
  const parsed = updateStylistSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos", details: parsed.error.issues }, { status: 400 });
  }

  const stylist = await prisma.stylist.update({
    where: { id: stylistId },
    data: parsed.data,
  });

  return NextResponse.json(stylist);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { stylistId } = await params;
  await prisma.stylist.update({
    where: { id: stylistId },
    data: { isActive: false },
  });

  return NextResponse.json({ success: true });
}
