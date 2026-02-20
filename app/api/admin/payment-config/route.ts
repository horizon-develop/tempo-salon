import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { paymentConfigSchema } from "@/lib/validations";

const SINGLETON_ID = "payment-config-singleton";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const config = await prisma.paymentConfig.upsert({
    where: { id: SINGLETON_ID },
    update: {},
    create: {
      id: SINGLETON_ID,
      isActive: false,
      depositType: "PERCENTAGE",
      depositValue: 50,
    },
  });

  return NextResponse.json(config);
}

export async function PUT(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();
  const parsed = paymentConfigSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { isActive, depositType, depositValue } = parsed.data;

  const config = await prisma.paymentConfig.upsert({
    where: { id: SINGLETON_ID },
    update: { isActive, depositType, depositValue },
    create: {
      id: SINGLETON_ID,
      isActive,
      depositType,
      depositValue,
    },
  });

  return NextResponse.json(config);
}
