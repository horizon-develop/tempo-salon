-- CreateEnum
CREATE TYPE "DepositType" AS ENUM ('FIXED', 'PERCENTAGE');

-- CreateTable
CREATE TABLE "payment_config" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "depositType" "DepositType" NOT NULL DEFAULT 'PERCENTAGE',
    "depositValue" INTEGER NOT NULL DEFAULT 50,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "payment_config_pkey" PRIMARY KEY ("id")
);
