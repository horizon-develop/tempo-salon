import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { updateSalonClosureSchema } from "@/lib/validations";

type Params = { params: Promise<{ closureId: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { closureId } = await params;
  const body = await request.json();
  const parsed = updateSalonClosureSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  if (parsed.data.date) {
    const dateObj = new Date(parsed.data.date + "T00:00:00");
    data.date = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));
  }
  if (parsed.data.startTime !== undefined) data.startTime = parsed.data.startTime || null;
  if (parsed.data.endTime !== undefined) data.endTime = parsed.data.endTime || null;
  if (parsed.data.reason !== undefined) data.reason = parsed.data.reason || null;

  const closure = await prisma.salonClosure.update({
    where: { id: closureId },
    data,
  });

  return NextResponse.json(closure);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { closureId } = await params;
  await prisma.salonClosure.delete({ where: { id: closureId } });
  return NextResponse.json({ success: true });
}
