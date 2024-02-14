-- CreateTable
CREATE TABLE "CodeAir" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "emergencyDetails" TEXT,
    "informant" TEXT NOT NULL,
    "operator" TEXT NOT NULL,

    CONSTRAINT "CodeAir_pkey" PRIMARY KEY ("id")
);
