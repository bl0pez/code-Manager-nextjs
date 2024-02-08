-- CreateTable
CREATE TABLE "CodeGreen" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "police" BOOLEAN NOT NULL,
    "informant" TEXT NOT NULL,
    "operator" TEXT NOT NULL,

    CONSTRAINT "CodeGreen_pkey" PRIMARY KEY ("id")
);
