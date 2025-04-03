/*
  Warnings:

  - Added the required column `closesAt` to the `Market` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opensAt` to the `Market` table without a default value. This is not possible if the table is not empty.

*/
-- First, add the columns as nullable
ALTER TABLE "Market" ADD COLUMN "opensAt" TIMESTAMP(3);
ALTER TABLE "Market" ADD COLUMN "closesAt" TIMESTAMP(3);

-- Update existing records with default values
UPDATE "Market" m
SET 
  "opensAt" = (
    SELECT date
    FROM "Match"
    WHERE id = m."matchId"
  ),
  "closesAt" = (
    SELECT date - INTERVAL '1 hour'
    FROM "Match"
    WHERE id = m."matchId"
  );

-- Make the columns required
ALTER TABLE "Market" ALTER COLUMN "opensAt" SET NOT NULL;
ALTER TABLE "Market" ALTER COLUMN "closesAt" SET NOT NULL;

-- Add indices for market timing
CREATE INDEX "Market_opensAt_idx" ON "Market"("opensAt");
CREATE INDEX "Market_closesAt_idx" ON "Market"("closesAt");

-- Add player relation to market options
ALTER TABLE "MarketOption" ADD COLUMN "playerId" TEXT;
ALTER TABLE "MarketOption" ADD CONSTRAINT "MarketOption_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
