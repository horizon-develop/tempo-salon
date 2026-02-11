import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

type Params = { params: Promise<{ absenceId: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { absenceId } = await params;
  const body = await request.json();

  const data: Record<string, unknown> = {};
  if (body.date) {
    const dateObj = new Date(body.date + "T00:00:00");
    data.date = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));
  }
  if (body.startTime !== undefined) data.startTime = body.startTime || null;
  if (body.endTime !== undefined) data.endTime = body.endTime || null;
  if (body.reason !== undefined) data.reason = body.reason || null;
  if (body.stylistId) data.stylistId = body.stylistId;

  const absence = await prisma.stylistAbsence.update({
    where: { id: absenceId },
    data,
    include: { stylist: { select: { id: true, name: true } } },
  });

  return NextResponse.json(absence);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { absenceId } = await params;
  await prisma.stylistAbsence.delete({ where: { id: absenceId } });
  return NextResponse.json({ success: true });
}
