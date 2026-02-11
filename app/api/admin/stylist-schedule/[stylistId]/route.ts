import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { updateStylistScheduleSchema } from "@/lib/validations";
import { DayOfWeek } from "@/app/generated/prisma/client";

type Params = { params: Promise<{ stylistId: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { stylistId } = await params;
  const schedules = await prisma.stylistSchedule.findMany({
    where: { stylistId },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  return NextResponse.json(schedules);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { stylistId } = await params;
  const body = await request.json();
  const parsed = updateStylistScheduleSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos", details: parsed.error.issues }, { status: 400 });
  }

  // Replace all schedule blocks for this stylist
  await prisma.$transaction([
    prisma.stylistSchedule.deleteMany({ where: { stylistId } }),
    ...parsed.data.blocks.map((block) =>
      prisma.stylistSchedule.create({
        data: {
          stylistId,
          dayOfWeek: block.dayOfWeek as DayOfWeek,
          startTime: block.startTime,
          endTime: block.endTime,
        },
      })
    ),
  ]);

  const schedules = await prisma.stylistSchedule.findMany({
    where: { stylistId },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  return NextResponse.json(schedules);
}
