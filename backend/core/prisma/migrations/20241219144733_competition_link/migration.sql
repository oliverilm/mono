-- CreateTable
CREATE TABLE "CompetitionLinks" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "CompetitionLinks_pkey" PRIMARY KEY ("id")
);
