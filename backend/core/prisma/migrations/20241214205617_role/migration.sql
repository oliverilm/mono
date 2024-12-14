/*
  Warnings:

  - Added the required column `role` to the `CompetitionAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CompetitionRole" AS ENUM ('OWNER', 'MANAGER');

-- AlterTable
ALTER TABLE "CompetitionAdmin" ADD COLUMN     "role" "CompetitionRole" NOT NULL;
