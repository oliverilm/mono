/*
  Warnings:

  - A unique constraint covering the columns `[id,firstName,lastName]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CompetitionCategorySex" AS ENUM ('Male', 'Female', 'Unisex');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Male', 'Female');

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "sex" "Sex" NOT NULL DEFAULT 'Male';

-- CreateTable
CREATE TABLE "Competition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "clubName" TEXT NOT NULL,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionCategory" (
    "id" SERIAL NOT NULL,
    "weights" TEXT[],
    "largestYearAllowed" INTEGER NOT NULL,
    "smallestYearAllowed" INTEGER NOT NULL,
    "sex" "CompetitionCategorySex" NOT NULL,
    "competitionId" TEXT NOT NULL,
    "competitionName" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "CompetitionCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competitor" (
    "id" SERIAL NOT NULL,
    "clubName" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "competitionCategoryId" INTEGER NOT NULL,
    "competitionId" TEXT NOT NULL,
    "competitionName" TEXT NOT NULL,
    "weight" TEXT NOT NULL,

    CONSTRAINT "Competitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Competition_name_key" ON "Competition"("name");

-- CreateIndex
CREATE INDEX "Competition_clubName_idx" ON "Competition"("clubName");

-- CreateIndex
CREATE INDEX "Competition_slug_idx" ON "Competition"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Competition_id_name_key" ON "Competition"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_value_key" ON "Category"("id", "value");

-- CreateIndex
CREATE INDEX "CompetitionCategory_competitionId_idx" ON "CompetitionCategory"("competitionId");

-- CreateIndex
CREATE INDEX "CompetitionCategory_categoryId_idx" ON "CompetitionCategory"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionCategory_id_competitionId_competitionName_key" ON "CompetitionCategory"("id", "competitionId", "competitionName");

-- CreateIndex
CREATE INDEX "Competitor_competitionId_idx" ON "Competitor"("competitionId");

-- CreateIndex
CREATE INDEX "Competitor_weight_idx" ON "Competitor"("weight");

-- CreateIndex
CREATE INDEX "Competitor_profileId_idx" ON "Competitor"("profileId");

-- CreateIndex
CREATE INDEX "Competitor_clubName_idx" ON "Competitor"("clubName");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_id_firstName_lastName_key" ON "UserProfile"("id", "firstName", "lastName");

-- AddForeignKey
ALTER TABLE "CompetitionCategory" ADD CONSTRAINT "CompetitionCategory_competitionId_competitionName_fkey" FOREIGN KEY ("competitionId", "competitionName") REFERENCES "Competition"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionCategory" ADD CONSTRAINT "CompetitionCategory_categoryId_categoryName_fkey" FOREIGN KEY ("categoryId", "categoryName") REFERENCES "Category"("id", "value") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competitor" ADD CONSTRAINT "Competitor_profileId_firstName_lastName_fkey" FOREIGN KEY ("profileId", "firstName", "lastName") REFERENCES "UserProfile"("id", "firstName", "lastName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competitor" ADD CONSTRAINT "Competitor_competitionCategoryId_competitionId_competition_fkey" FOREIGN KEY ("competitionCategoryId", "competitionId", "competitionName") REFERENCES "CompetitionCategory"("id", "competitionId", "competitionName") ON DELETE RESTRICT ON UPDATE CASCADE;
