/*
  Warnings:

  - Added the required column `event` to the `CodeGreen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CodeGreen" ADD COLUMN     "event" TEXT NOT NULL;
