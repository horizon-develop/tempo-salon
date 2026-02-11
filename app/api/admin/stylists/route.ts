import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { createStylistSchema } from "@/lib/validations";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const stylists = await prisma.stylist.findMany({
    include: {
      services: { include: { service: { select: { id: true, name: true } } } },
      schedules: true,
    },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(stylists);
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const parsed = createStylistSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos", details: parsed.error.issues }, { status: 400 });
  }

  const stylist = await prisma.stylist.create({ data: parsed.data });
  return NextResponse.json(stylist, { status: 201 });
}
