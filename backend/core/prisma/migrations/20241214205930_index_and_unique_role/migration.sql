/*
  Warnings:

  - A unique constraint covering the columns `[competitionId,userId]` on the table `CompetitionAdmin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "CompetitionAdmin_competitionId_userId_idx" ON "CompetitionAdmin"("competitionId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionAdmin_competitionId_userId_key" ON "CompetitionAdmin"("competitionId", "userId");
