/*
  Warnings:

  - A unique constraint covering the columns `[profileId,competitionCategoryId,weight]` on the table `Competitor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Competition" ADD COLUMN     "registrationEndAt" DATE;

-- CreateIndex
CREATE UNIQUE INDEX "Competitor_profileId_competitionCategoryId_weight_key" ON "Competitor"("profileId", "competitionCategoryId", "weight");
