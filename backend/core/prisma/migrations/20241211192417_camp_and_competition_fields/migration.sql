-- AlterTable
ALTER TABLE "Competition" ADD COLUMN     "description" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "startingAt" DATE;

-- CreateTable
CREATE TABLE "Camp" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "connectedCompetitionId" TEXT,

    CONSTRAINT "Camp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Camp_slug_key" ON "Camp"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Camp_connectedCompetitionId_key" ON "Camp"("connectedCompetitionId");

-- CreateIndex
CREATE INDEX "Competition_name_idx" ON "Competition"("name");

-- AddForeignKey
ALTER TABLE "Camp" ADD CONSTRAINT "Camp_connectedCompetitionId_fkey" FOREIGN KEY ("connectedCompetitionId") REFERENCES "Competition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
