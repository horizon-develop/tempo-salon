import { z } from "zod/v4";

// Time format validation "HH:mm"
const timeString = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Formato de hora inválido (HH:mm)");

// Date format validation "YYYY-MM-DD"
const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)");

// ============================================================
// Booking
// ============================================================

export const createBookingSchema = z.object({
  customerName: z.string().min(2, "El nombre es obligatorio"),
  customerPhone: z.string().min(6, "El teléfono es obligatorio"),
  customerEmail: z.email("Email inválido").optional().or(z.literal("")),
  date: dateString,
  startTime: timeString,
  serviceId: z.string().min(1),
  stylistId: z.string().min(1),
  notes: z.string().optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

// ============================================================
// Service (admin)
// ============================================================

export const createServiceSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  price: z.number().int().positive("El precio debe ser mayor a 0"),
  duration: z.number().int().min(15, "La duración mínima es 15 minutos"),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

export const updateServiceSchema = createServiceSchema.partial();

// ============================================================
// Stylist (admin)
// ============================================================

export const createStylistSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  phone: z.string().optional(),
  email: z.email("Email inválido").optional().or(z.literal("")),
  imageUrl: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

export const updateStylistSchema = createStylistSchema.partial();

// ============================================================
// Salon Schedule (admin)
// ============================================================

const scheduleBlockSchema = z.object({
  dayOfWeek: z.enum([
    "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY",
  ]),
  startTime: timeString,
  endTime: timeString,
  isActive: z.boolean().optional(),
});

export const updateSalonScheduleSchema = z.object({
  blocks: z.array(scheduleBlockSchema),
});

// ============================================================
// Stylist Schedule (admin)
// ============================================================

const stylistScheduleBlockSchema = z.object({
  dayOfWeek: z.enum([
    "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY",
  ]),
  startTime: timeString,
  endTime: timeString,
});

export const updateStylistScheduleSchema = z.object({
  blocks: z.array(stylistScheduleBlockSchema),
});

// ============================================================
// Salon Closure (admin)
// ============================================================

export const createSalonClosureSchema = z.object({
  date: dateString,
  startTime: timeString.optional(),
  endTime: timeString.optional(),
  reason: z.string().optional(),
});

export const updateSalonClosureSchema = createSalonClosureSchema.partial();

// ============================================================
// Stylist Absence (admin)
// ============================================================

export const createStylistAbsenceSchema = z.object({
  stylistId: z.string().min(1),
  date: dateString,
  startTime: timeString.optional(),
  endTime: timeString.optional(),
  reason: z.string().optional(),
});

export const updateStylistAbsenceSchema = createStylistAbsenceSchema.partial();

// ============================================================
// Availability query
// ============================================================

export const availabilityQuerySchema = z.object({
  date: dateString,
  serviceId: z.string().min(1),
  stylistId: z.string().min(1),
});

export const availableDatesQuerySchema = z.object({
  serviceId: z.string().min(1),
  stylistId: z.string().min(1),
  days: z.coerce.number().int().min(1).max(90).optional(),
});

// ============================================================
// Service-Stylist assignment (admin)
// ============================================================

export const updateServiceStylistsSchema = z.object({
  stylistIds: z.array(z.string()),
});

// ============================================================
// Payment Config (admin)
// ============================================================

export const paymentConfigSchema = z
  .object({
    isActive: z.boolean(),
    depositType: z.enum(["FIXED", "PERCENTAGE"]),
    depositValue: z.number().int().min(1).max(10_000_000),
  })
  .refine(
    (data) => {
      if (data.depositType === "PERCENTAGE") return data.depositValue >= 1 && data.depositValue <= 100;
      return data.depositValue > 0;
    },
    { message: "Valor de depósito inválido para el tipo seleccionado" }
  );

export type PaymentConfigInput = z.infer<typeof paymentConfigSchema>;
