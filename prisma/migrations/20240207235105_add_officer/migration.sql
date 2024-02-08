/*
  Warnings:

  - Added the required column `officer` to the `CodeBlue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CodeBlue" ADD COLUMN     "officer" TEXT NOT NULL;
