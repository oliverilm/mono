-- DropForeignKey
ALTER TABLE "Competitor" DROP CONSTRAINT "Competitor_clubId_clubName_fkey";

-- AlterTable
ALTER TABLE "Competitor" ALTER COLUMN "clubName" DROP NOT NULL,
ALTER COLUMN "clubId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Competitor" ADD CONSTRAINT "Competitor_clubId_clubName_fkey" FOREIGN KEY ("clubId", "clubName") REFERENCES "Club"("id", "name") ON DELETE SET NULL ON UPDATE CASCADE;
