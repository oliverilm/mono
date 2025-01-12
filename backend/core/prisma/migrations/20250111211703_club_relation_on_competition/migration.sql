-- AlterTable
ALTER TABLE "Competition" ADD COLUMN     "clubId" TEXT,
ALTER COLUMN "clubName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_clubId_clubName_fkey" FOREIGN KEY ("clubId", "clubName") REFERENCES "Club"("id", "name") ON DELETE SET NULL ON UPDATE CASCADE;
