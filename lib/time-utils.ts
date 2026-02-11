export type TimeRange = { start: number; end: number };

/** Convert "HH:mm" to minutes from midnight */
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Convert minutes from midnight to "HH:mm" */
export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/** Subtract a single range [subStart, subEnd) from an array of ranges */
export function subtractRange(
  blocks: TimeRange[],
  subStart: number,
  subEnd: number
): TimeRange[] {
  const result: TimeRange[] = [];
  for (const block of blocks) {
    if (subEnd <= block.start || subStart >= block.end) {
      result.push(block);
    } else {
      if (subStart > block.start) {
        result.push({ start: block.start, end: subStart });
      }
      if (subEnd < block.end) {
        result.push({ start: subEnd, end: block.end });
      }
    }
  }
  return result;
}

/** Intersect two arrays of sorted time ranges */
export function intersectRanges(a: TimeRange[], b: TimeRange[]): TimeRange[] {
  const result: TimeRange[] = [];
  const sortedA = [...a].sort((x, y) => x.start - y.start);
  const sortedB = [...b].sort((x, y) => x.start - y.start);

  let i = 0;
  let j = 0;

  while (i < sortedA.length && j < sortedB.length) {
    const start = Math.max(sortedA[i].start, sortedB[j].start);
    const end = Math.min(sortedA[i].end, sortedB[j].end);
    if (start < end) {
      result.push({ start, end });
    }
    if (sortedA[i].end < sortedB[j].end) i++;
    else j++;
  }

  return result;
}

/** Convert a DayOfWeek enum value to JS Date.getDay() number (0=Sunday) */
export function dayOfWeekToNumber(
  day: string
): number {
  const map: Record<string, number> = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };
  return map[day] ?? -1;
}

/** Convert JS Date.getDay() (0=Sunday) to DayOfWeek enum string */
export function numberToDayOfWeek(
  num: number
): string {
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  return days[num];
}

const SLOT_INTERVAL = 30; // minutes

/** Generate time slots at 30-minute intervals where service fits within a block */
export function generateSlots(
  blocks: TimeRange[],
  serviceDuration: number
): TimeRange[] {
  const slots: TimeRange[] = [];
  for (const block of blocks) {
    let cursor = block.start;
    while (cursor + serviceDuration <= block.end) {
      slots.push({ start: cursor, end: cursor + serviceDuration });
      cursor += SLOT_INTERVAL;
    }
  }
  return slots;
}

/** Check if two time ranges overlap */
export function rangesOverlap(a: TimeRange, b: TimeRange): boolean {
  return a.start < b.end && a.end > b.start;
}

/** Filter out slots that overlap with any of the given bookings */
export function removeConflictingSlots(
  slots: TimeRange[],
  bookings: TimeRange[]
): TimeRange[] {
  return slots.filter(
    (slot) => !bookings.some((booking) => rangesOverlap(slot, booking))
  );
}
