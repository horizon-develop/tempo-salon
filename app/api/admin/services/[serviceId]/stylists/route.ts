import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { updateServiceStylistsSchema } from "@/lib/validations";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { serviceId } = await params;
  const body = await request.json();
  const parsed = updateServiceStylistsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  // Replace all stylist assignments for this service
  await prisma.$transaction([
    prisma.serviceStylist.deleteMany({ where: { serviceId } }),
    ...parsed.data.stylistIds.map((stylistId) =>
      prisma.serviceStylist.create({ data: { serviceId, stylistId } })
    ),
  ]);

  return NextResponse.json({ success: true });
}
