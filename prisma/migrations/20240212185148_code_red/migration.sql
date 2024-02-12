-- CreateTable
CREATE TABLE "CodeRed" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "informant" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "firefightersCallTime" TIMESTAMP(3),
    "COERadialCommunication" BOOLEAN NOT NULL,

    CONSTRAINT "CodeRed_pkey" PRIMARY KEY ("id")
);
