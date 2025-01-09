/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `Club` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clubId` to the `Competitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Competitor" ADD COLUMN     "clubId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Club_id_name_key" ON "Club"("id", "name");

-- AddForeignKey
ALTER TABLE "Competitor" ADD CONSTRAINT "Competitor_clubId_clubName_fkey" FOREIGN KEY ("clubId", "clubName") REFERENCES "Club"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;
