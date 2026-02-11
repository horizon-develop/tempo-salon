import { NextRequest, NextResponse } from "next/server";
import { getAvailableDates } from "@/lib/availability";
import { availableDatesQuerySchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams);
  const parsed = availableDatesQuerySchema.safeParse(params);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Parámetros inválidos", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { serviceId, stylistId, days } = parsed.data;
  const dates = await getAvailableDates(serviceId, stylistId, days ?? 30);

  return NextResponse.json(dates);
}
