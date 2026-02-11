import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { updateServiceSchema } from "@/lib/validations";

type Params = { params: Promise<{ serviceId: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { serviceId } = await params;
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    include: {
      stylists: { include: { stylist: { select: { id: true, name: true } } } },
    },
  });

  if (!service) {
    return NextResponse.json({ error: "Servicio no encontrado" }, { status: 404 });
  }

  return NextResponse.json(service);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { serviceId } = await params;
  const body = await request.json();
  const parsed = updateServiceSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos", details: parsed.error.issues }, { status: 400 });
  }

  const service = await prisma.service.update({
    where: { id: serviceId },
    data: parsed.data,
  });

  return NextResponse.json(service);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { serviceId } = await params;
  await prisma.service.update({
    where: { id: serviceId },
    data: { isActive: false },
  });

  return NextResponse.json({ success: true });
}
