import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const now = new Date();
  const todayStart = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const todayEnd = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + 1));
  const weekEnd = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + 7));

  const [todayBookings, weekBookings, recentCancelled, totalThisMonth] = await Promise.all([
    prisma.booking.findMany({
      where: {
        date: { gte: todayStart, lt: todayEnd },
        status: { in: ["CONFIRMED", "COMPLETED"] },
      },
      include: {
        service: { select: { name: true, price: true, duration: true } },
        stylist: { select: { name: true } },
      },
      orderBy: { startTime: "asc" },
    }),
    prisma.booking.count({
      where: {
        date: { gte: todayStart, lt: weekEnd },
        status: { in: ["CONFIRMED", "COMPLETED"] },
      },
    }),
    prisma.booking.findMany({
      where: { status: "CANCELLED" },
      include: {
        service: { select: { name: true } },
        stylist: { select: { name: true } },
      },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.booking.count({
      where: {
        date: {
          gte: new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1)),
          lt: new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 1)),
        },
        status: { in: ["CONFIRMED", "COMPLETED"] },
      },
    }),
  ]);

  return NextResponse.json({
    todayBookings,
    todayCount: todayBookings.length,
    weekCount: weekBookings,
    monthCount: totalThisMonth,
    recentCancelled,
  });
}
