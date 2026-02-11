import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { updateSalonScheduleSchema } from "@/lib/validations";
import { DayOfWeek } from "@/app/generated/prisma/client";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const schedules = await prisma.salonSchedule.findMany({
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  return NextResponse.json(schedules);
}

export async function PUT(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const parsed = updateSalonScheduleSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos", details: parsed.error.issues }, { status: 400 });
  }

  // Replace all salon schedule blocks
  await prisma.$transaction([
    prisma.salonSchedule.deleteMany(),
    ...parsed.data.blocks.map((block) =>
      prisma.salonSchedule.create({
        data: {
          dayOfWeek: block.dayOfWeek as DayOfWeek,
          startTime: block.startTime,
          endTime: block.endTime,
          isActive: block.isActive ?? true,
        },
      })
    ),
  ]);

  const schedules = await prisma.salonSchedule.findMany({
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  return NextResponse.json(schedules);
}
