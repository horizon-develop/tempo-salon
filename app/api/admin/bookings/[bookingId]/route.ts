import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { BookingStatus } from "@/app/generated/prisma/client";

type Params = { params: Promise<{ bookingId: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { bookingId } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      service: { select: { name: true, price: true, duration: true } },
      stylist: { select: { name: true } },
    },
  });

  if (!booking) {
    return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
  }

  return NextResponse.json(booking);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { bookingId } = await params;
  const body = await request.json();

  const validStatuses: BookingStatus[] = ["CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"];
  if (body.status && !validStatuses.includes(body.status)) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  if (body.status) data.status = body.status;
  if (body.notes !== undefined) data.notes = body.notes;

  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data,
    include: {
      service: { select: { name: true, price: true, duration: true } },
      stylist: { select: { name: true } },
    },
  });

  return NextResponse.json(booking);
}
