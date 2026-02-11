import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const stylists = await prisma.stylist.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      phone: true,
      email: true,
    },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(stylists);
}
