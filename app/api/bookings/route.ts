import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createBookingSchema } from "@/lib/validations";
import { getAvailableSlots } from "@/lib/availability";
import { timeToMinutes, minutesToTime } from "@/lib/time-utils";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createBookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { customerName, customerPhone, customerEmail, date, startTime, serviceId, stylistId, notes } = parsed.data;

  // Get service duration to compute endTime
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { duration: true, isActive: true },
  });

  if (!service || !service.isActive) {
    return NextResponse.json({ error: "Servicio no encontrado" }, { status: 404 });
  }

  // Verify stylist performs this service
  const assignment = await prisma.serviceStylist.findUnique({
    where: { serviceId_stylistId: { serviceId, stylistId } },
  });

  if (!assignment) {
    return NextResponse.json(
      { error: "El estilista seleccionado no realiza este servicio" },
      { status: 400 }
    );
  }

  const endTime = minutesToTime(timeToMinutes(startTime) + service.duration);
  const dateObj = new Date(date + "T00:00:00");
  const dbDate = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));

  // Use transaction to prevent race conditions
  try {
    const booking = await prisma.$transaction(async (tx) => {
      // Check for conflicting bookings
      const conflict = await tx.booking.findFirst({
        where: {
          stylistId,
          date: dbDate,
          status: { in: ["CONFIRMED", "COMPLETED"] },
          AND: [
            { startTime: { lt: endTime } },
            { endTime: { gt: startTime } },
          ],
        },
      });

      if (conflict) {
        throw new Error("SLOT_TAKEN");
      }

      // Double-check availability (salon schedule, closures, absences)
      const availableSlots = await getAvailableSlots(dateObj, serviceId, stylistId);
      const slotExists = availableSlots.some((s) => s.start === startTime);

      if (!slotExists) {
        throw new Error("SLOT_UNAVAILABLE");
      }

      return tx.booking.create({
        data: {
          customerName,
          customerPhone,
          customerEmail: customerEmail || null,
          date: dbDate,
          startTime,
          endTime,
          serviceId,
          stylistId,
          notes: notes || null,
        },
        include: {
          service: { select: { name: true, price: true, duration: true } },
          stylist: { select: { name: true } },
        },
      });
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "SLOT_TAKEN") {
        return NextResponse.json(
          { error: "Este horario ya fue reservado. Por favor, elegí otro." },
          { status: 409 }
        );
      }
      if (error.message === "SLOT_UNAVAILABLE") {
        return NextResponse.json(
          { error: "Este horario ya no está disponible." },
          { status: 409 }
        );
      }
    }
    return NextResponse.json(
      { error: "Error al crear la reserva" },
      { status: 500 }
    );
  }
}
