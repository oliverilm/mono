-- DropIndex
DROP INDEX "Competition_clubName_idx";

-- DropIndex
DROP INDEX "Competition_name_idx";

-- CreateIndex
CREATE INDEX "Camp_connectedCompetitionId_idx" ON "Camp"("connectedCompetitionId");

-- CreateIndex
CREATE INDEX "Camp_slug_idx" ON "Camp"("slug");

-- CreateIndex
CREATE INDEX "Camp_createdAt_idx" ON "Camp"("createdAt");

-- CreateIndex
CREATE INDEX "Category_createdAt_idx" ON "Category"("createdAt");

-- CreateIndex
CREATE INDEX "Club_createdAt_idx" ON "Club"("createdAt");

-- CreateIndex
CREATE INDEX "Club_slug_idx" ON "Club"("slug");

-- CreateIndex
CREATE INDEX "ClubAdmin_createdAt_idx" ON "ClubAdmin"("createdAt");

-- CreateIndex
CREATE INDEX "ClubAdmin_clubId_idx" ON "ClubAdmin"("clubId");

-- CreateIndex
CREATE INDEX "ClubAdmin_userId_idx" ON "ClubAdmin"("userId");

-- CreateIndex
CREATE INDEX "ClubMetadata_createdAt_idx" ON "ClubMetadata"("createdAt");

-- CreateIndex
CREATE INDEX "ClubMetadata_clubId_idx" ON "ClubMetadata"("clubId");

-- CreateIndex
CREATE INDEX "Competition_clubId_idx" ON "Competition"("clubId");

-- CreateIndex
CREATE INDEX "Competition_createdAt_idx" ON "Competition"("createdAt");

-- CreateIndex
CREATE INDEX "CompetitionAdmin_createdAt_idx" ON "CompetitionAdmin"("createdAt");

-- CreateIndex
CREATE INDEX "CompetitionCategory_createdAt_idx" ON "CompetitionCategory"("createdAt");

-- CreateIndex
CREATE INDEX "CompetitionLink_createdAt_idx" ON "CompetitionLink"("createdAt");

-- CreateIndex
CREATE INDEX "Competitor_createdAt_idx" ON "Competitor"("createdAt");

-- CreateIndex
CREATE INDEX "Invitation_createdAt_idx" ON "Invitation"("createdAt");

-- CreateIndex
CREATE INDEX "Invitation_clubId_idx" ON "Invitation"("clubId");

-- CreateIndex
CREATE INDEX "Invitation_profileId_idx" ON "Invitation"("profileId");

-- CreateIndex
CREATE INDEX "Invitation_invitedById_idx" ON "Invitation"("invitedById");

-- CreateIndex
CREATE INDEX "Session_createdAt_idx" ON "Session"("createdAt");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "UserProfile_createdAt_idx" ON "UserProfile"("createdAt");

-- CreateIndex
CREATE INDEX "UserProfile_clubId_idx" ON "UserProfile"("clubId");

-- CreateIndex
CREATE INDEX "UserProfile_userId_idx" ON "UserProfile"("userId");
