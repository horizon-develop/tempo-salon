import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/availability";
import { availabilityQuerySchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams);
  const parsed = availabilityQuerySchema.safeParse(params);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Parámetros inválidos", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { date, serviceId, stylistId } = parsed.data;
  const dateObj = new Date(date + "T00:00:00");

  const slots = await getAvailableSlots(dateObj, serviceId, stylistId);

  return NextResponse.json(slots);
}
