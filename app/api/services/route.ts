import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    include: {
      stylists: {
        include: {
          stylist: {
            select: { id: true, name: true, imageUrl: true },
          },
        },
      },
    },
    orderBy: { order: "asc" },
  });

  const formatted = services.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    price: s.price,
    duration: s.duration,
    stylists: s.stylists.map((ss) => ss.stylist),
  }));

  return NextResponse.json(formatted);
}
