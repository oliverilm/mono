/*
  Warnings:

  - Added the required column `seed` to the `Competitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Competitor" ADD COLUMN     "seed" INTEGER NOT NULL;
