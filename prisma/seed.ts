import { PrismaClient, DayOfWeek } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // 1. Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@tempo.com" },
    update: {},
    create: {
      email: "admin@tempo.com",
      name: "Admin",
      passwordHash: hashedPassword,
    },
  });
  console.log(`Admin user created: ${admin.email}`);

  // 2. Create stylists
  const pedro = await prisma.stylist.upsert({
    where: { id: "stylist-pedro" },
    update: {},
    create: {
      id: "stylist-pedro",
      name: "Pedro",
      order: 0,
    },
  });

  const jenifer = await prisma.stylist.upsert({
    where: { id: "stylist-jenifer" },
    update: {},
    create: {
      id: "stylist-jenifer",
      name: "Jenifer",
      order: 1,
    },
  });
  console.log(`Stylists created: ${pedro.name}, ${jenifer.name}`);

  // 3. Create services
  const corteMasculino = await prisma.service.upsert({
    where: { id: "service-corte-masculino" },
    update: {},
    create: {
      id: "service-corte-masculino",
      name: "Corte Masculino",
      price: 3500, // $35.00
      duration: 30,
      order: 0,
    },
  });

  const corteMasculinoBarba = await prisma.service.upsert({
    where: { id: "service-corte-masculino-barba" },
    update: {},
    create: {
      id: "service-corte-masculino-barba",
      name: "Corte Masculino y Barba",
      price: 5000, // $50.00
      duration: 45,
      order: 1,
    },
  });

  const corteFemenino = await prisma.service.upsert({
    where: { id: "service-corte-femenino" },
    update: {},
    create: {
      id: "service-corte-femenino",
      name: "Corte Femenino",
      price: 4000, // $40.00
      duration: 45,
      order: 2,
    },
  });

  const balayage = await prisma.service.upsert({
    where: { id: "service-balayage" },
    update: {},
    create: {
      id: "service-balayage",
      name: "Balayage",
      price: 8000, // $80.00
      duration: 120,
      order: 3,
    },
  });

  const brushing = await prisma.service.upsert({
    where: { id: "service-brushing" },
    update: {},
    create: {
      id: "service-brushing",
      name: "Brushing",
      price: 3500, // $35.00
      duration: 30,
      order: 4,
    },
  });

  const reflejos = await prisma.service.upsert({
    where: { id: "service-reflejos" },
    update: {},
    create: {
      id: "service-reflejos",
      name: "Reflejos",
      price: 6000, // $60.00
      duration: 90,
      order: 5,
    },
  });
  console.log("Services created");

  // 4. Assign stylists to services
  // Pedro: Corte Masculino, Corte Masculino y Barba, Corte Femenino
  // Jenifer: Corte Femenino, Balayage, Brushing, Reflejos
  const assignments = [
    { serviceId: corteMasculino.id, stylistId: pedro.id },
    { serviceId: corteMasculinoBarba.id, stylistId: pedro.id },
    { serviceId: corteFemenino.id, stylistId: pedro.id },
    { serviceId: corteFemenino.id, stylistId: jenifer.id },
    { serviceId: balayage.id, stylistId: jenifer.id },
    { serviceId: brushing.id, stylistId: jenifer.id },
    { serviceId: reflejos.id, stylistId: jenifer.id },
  ];

  for (const a of assignments) {
    await prisma.serviceStylist.upsert({
      where: {
        serviceId_stylistId: {
          serviceId: a.serviceId,
          stylistId: a.stylistId,
        },
      },
      update: {},
      create: a,
    });
  }
  console.log("Service-stylist assignments created");

  // 5. Create default salon schedule (Mon-Fri 09:00-21:00, Sat 10:00-20:00)
  const weekdays: DayOfWeek[] = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

  for (const day of weekdays) {
    await prisma.salonSchedule.upsert({
      where: { id: `salon-schedule-${day.toLowerCase()}` },
      update: {},
      create: {
        id: `salon-schedule-${day.toLowerCase()}`,
        dayOfWeek: day,
        startTime: "09:00",
        endTime: "21:00",
        isActive: true,
      },
    });
  }

  await prisma.salonSchedule.upsert({
    where: { id: "salon-schedule-saturday" },
    update: {},
    create: {
      id: "salon-schedule-saturday",
      dayOfWeek: "SATURDAY",
      startTime: "10:00",
      endTime: "20:00",
      isActive: true,
    },
  });
  console.log("Salon schedule created (Mon-Fri 09:00-21:00, Sat 10:00-20:00, Sun closed)");

  // 6. Create default stylist schedules (both work same hours as salon for now)
  for (const stylist of [pedro, jenifer]) {
    for (const day of weekdays) {
      await prisma.stylistSchedule.upsert({
        where: { id: `${stylist.id}-schedule-${day.toLowerCase()}` },
        update: {},
        create: {
          id: `${stylist.id}-schedule-${day.toLowerCase()}`,
          stylistId: stylist.id,
          dayOfWeek: day,
          startTime: "09:00",
          endTime: "21:00",
        },
      });
    }

    await prisma.stylistSchedule.upsert({
      where: { id: `${stylist.id}-schedule-saturday` },
      update: {},
      create: {
        id: `${stylist.id}-schedule-saturday`,
        stylistId: stylist.id,
        dayOfWeek: "SATURDAY",
        startTime: "10:00",
        endTime: "20:00",
      },
    });
  }
  console.log("Stylist schedules created");

  // 7. Upsert initial PaymentConfig (disabled by default)
  await prisma.paymentConfig.upsert({
    where: { id: "payment-config-singleton" },
    update: {},
    create: {
      id: "payment-config-singleton",
      isActive: false,
      depositType: "PERCENTAGE",
      depositValue: 50,
    },
  });
  console.log("PaymentConfig seeded (disabled, 50% percentage)");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
