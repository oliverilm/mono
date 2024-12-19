/*
  Warnings:

  - You are about to drop the `CompetitionLinks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CompetitionLinks";

-- CreateTable
CREATE TABLE "CompetitionLink" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,

    CONSTRAINT "CompetitionLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CompetitionLink_competitionId_idx" ON "CompetitionLink"("competitionId");

-- AddForeignKey
ALTER TABLE "CompetitionLink" ADD CONSTRAINT "CompetitionLink_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
