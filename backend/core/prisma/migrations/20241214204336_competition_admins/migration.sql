-- CreateTable
CREATE TABLE "CompetitionAdmin" (
    "id" SERIAL NOT NULL,
    "competitionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CompetitionAdmin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompetitionAdmin" ADD CONSTRAINT "CompetitionAdmin_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionAdmin" ADD CONSTRAINT "CompetitionAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
