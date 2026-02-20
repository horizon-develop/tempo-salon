import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const config = await prisma.paymentConfig.findFirst();
    if (!config || !config.isActive) {
      return NextResponse.json({ isActive: false });
    }
    return NextResponse.json({
      isActive: config.isActive,
      depositType: config.depositType,
      depositValue: config.depositValue,
    });
  } catch {
    return NextResponse.json({ isActive: false });
  }
}
