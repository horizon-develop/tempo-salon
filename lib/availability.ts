import { prisma } from "@/lib/prisma";
import { DayOfWeek } from "@/app/generated/prisma/client";
import {
  type TimeRange,
  timeToMinutes,
  minutesToTime,
  subtractRange,
  intersectRanges,
  generateSlots,
  removeConflictingSlots,
  numberToDayOfWeek,
} from "@/lib/time-utils";

// Argentina timezone
const TIMEZONE = "America/Argentina/Buenos_Aires";

function getArgentinaNow(): Date {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: TIMEZONE })
  );
}

function formatDateForDB(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

export interface AvailableSlot {
  start: string; // "HH:mm"
  end: string; // "HH:mm"
}

/**
 * Get available time slots for a specific date, service, and stylist.
 * Implements the 8-step availability algorithm.
 */
export async function getAvailableSlots(
  date: Date,
  serviceId: string,
  stylistId: string
): Promise<AvailableSlot[]> {
  // Get the service duration
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { duration: true, isActive: true },
  });

  if (!service || !service.isActive) return [];

  const serviceDuration = service.duration;
  const jsDay = date.getDay(); // 0=Sunday
  const dayOfWeek = numberToDayOfWeek(jsDay) as DayOfWeek;
  const dbDate = formatDateForDB(date);

  // Run all queries in parallel
  const [salonSchedules, salonClosures, stylistSchedules, stylistAbsences, existingBookings] =
    await Promise.all([
      // Step 1: Salon open blocks for this day of week
      prisma.salonSchedule.findMany({
        where: { dayOfWeek, isActive: true },
        select: { startTime: true, endTime: true },
      }),
      // Step 2: Salon closures for this specific date
      prisma.salonClosure.findMany({
        where: { date: dbDate },
        select: { startTime: true, endTime: true },
      }),
      // Step 3: Stylist work blocks for this day of week
      prisma.stylistSchedule.findMany({
        where: { stylistId, dayOfWeek },
        select: { startTime: true, endTime: true },
      }),
      // Step 4: Stylist absences for this specific date
      prisma.stylistAbsence.findMany({
        where: { stylistId, date: dbDate },
        select: { startTime: true, endTime: true },
      }),
      // Step 7 (pre-fetch): Existing bookings for this stylist on this date
      prisma.booking.findMany({
        where: {
          stylistId,
          date: dbDate,
          status: { in: ["CONFIRMED", "COMPLETED"] },
        },
        select: { startTime: true, endTime: true },
      }),
    ]);

  // Step 1: Convert salon schedule to time ranges
  if (salonSchedules.length === 0) return [];

  let salonBlocks: TimeRange[] = salonSchedules.map((s) => ({
    start: timeToMinutes(s.startTime),
    end: timeToMinutes(s.endTime),
  }));

  // Step 2: Subtract salon closures
  for (const closure of salonClosures) {
    if (closure.startTime === null || closure.endTime === null) {
      return []; // All-day closure
    }
    salonBlocks = subtractRange(
      salonBlocks,
      timeToMinutes(closure.startTime),
      timeToMinutes(closure.endTime)
    );
  }

  if (salonBlocks.length === 0) return [];

  // Step 3: Convert stylist schedule to time ranges
  if (stylistSchedules.length === 0) return [];

  let stylistBlocks: TimeRange[] = stylistSchedules.map((s) => ({
    start: timeToMinutes(s.startTime),
    end: timeToMinutes(s.endTime),
  }));

  // Step 4: Subtract stylist absences
  for (const absence of stylistAbsences) {
    if (absence.startTime === null || absence.endTime === null) {
      return []; // All-day absence
    }
    stylistBlocks = subtractRange(
      stylistBlocks,
      timeToMinutes(absence.startTime),
      timeToMinutes(absence.endTime)
    );
  }

  if (stylistBlocks.length === 0) return [];

  // Step 5: Intersect salon blocks with stylist blocks
  const availableBlocks = intersectRanges(salonBlocks, stylistBlocks);

  if (availableBlocks.length === 0) return [];

  // Step 6: Generate candidate slots at 30-min intervals
  let slots = generateSlots(availableBlocks, serviceDuration);

  // Step 7: Remove slots that conflict with existing bookings
  const bookingRanges: TimeRange[] = existingBookings.map((b) => ({
    start: timeToMinutes(b.startTime),
    end: timeToMinutes(b.endTime),
  }));

  slots = removeConflictingSlots(slots, bookingRanges);

  // Step 8: If querying for today, filter out past times
  const now = getArgentinaNow();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const queryDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (queryDate.getTime() === today.getTime()) {
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    slots = slots.filter((slot) => slot.start > currentMinutes);
  }

  // Convert back to "HH:mm" format
  return slots.map((slot) => ({
    start: minutesToTime(slot.start),
    end: minutesToTime(slot.end),
  }));
}

/**
 * Check which dates have available slots in a date range.
 * Used for the calendar picker to disable dates with no availability.
 */
export async function getAvailableDates(
  serviceId: string,
  stylistId: string,
  days: number = 30
): Promise<{ date: string; hasSlots: boolean }[]> {
  const now = getArgentinaNow();
  const results: { date: string; hasSlots: boolean }[] = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);

    const slots = await getAvailableSlots(date, serviceId, stylistId);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    results.push({
      date: dateStr,
      hasSlots: slots.length > 0,
    });
  }

  return results;
}
