/*
  Warnings:

  - A unique constraint covering the columns `[id,name,slug]` on the table `Competition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,competitionId,competitionName,competitionSlug]` on the table `CompetitionCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `competitionSlug` to the `CompetitionCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `competitionSlug` to the `Competitor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompetitionCategory" DROP CONSTRAINT "CompetitionCategory_competitionId_competitionName_fkey";

-- DropForeignKey
ALTER TABLE "Competitor" DROP CONSTRAINT "Competitor_competitionCategoryId_competitionId_competition_fkey";

-- DropIndex
DROP INDEX "Competition_id_name_key";

-- DropIndex
DROP INDEX "CompetitionCategory_id_competitionId_competitionName_key";

-- AlterTable
ALTER TABLE "CompetitionCategory" ADD COLUMN     "competitionSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Competitor" ADD COLUMN     "competitionSlug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Competition_id_name_slug_key" ON "Competition"("id", "name", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionCategory_id_competitionId_competitionName_compet_key" ON "CompetitionCategory"("id", "competitionId", "competitionName", "competitionSlug");

-- AddForeignKey
ALTER TABLE "CompetitionCategory" ADD CONSTRAINT "CompetitionCategory_competitionId_competitionName_competit_fkey" FOREIGN KEY ("competitionId", "competitionName", "competitionSlug") REFERENCES "Competition"("id", "name", "slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competitor" ADD CONSTRAINT "Competitor_competitionCategoryId_competitionId_competition_fkey" FOREIGN KEY ("competitionCategoryId", "competitionId", "competitionName", "competitionSlug") REFERENCES "CompetitionCategory"("id", "competitionId", "competitionName", "competitionSlug") ON DELETE RESTRICT ON UPDATE CASCADE;
