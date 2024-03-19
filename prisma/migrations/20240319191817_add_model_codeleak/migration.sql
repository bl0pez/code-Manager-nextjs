-- CreateTable
CREATE TABLE "CodeLeak" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "service" TEXT NOT NULL,
    "patient_description" TEXT NOT NULL,
    "informant" TEXT NOT NULL,
    "operator" TEXT NOT NULL,

    CONSTRAINT "CodeLeak_pkey" PRIMARY KEY ("id")
);
