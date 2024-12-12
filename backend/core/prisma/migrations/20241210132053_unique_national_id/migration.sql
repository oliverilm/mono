/*
  Warnings:

  - A unique constraint covering the columns `[nationalId]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "dateOfBirth" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_nationalId_key" ON "UserProfile"("nationalId");
