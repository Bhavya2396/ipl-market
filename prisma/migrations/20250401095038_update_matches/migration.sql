/*
  Warnings:

  - The values [CLOSED,RESOLVED] on the enum `MarketStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [WON,LOST] on the enum `PredictionStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[date,homeTeamId,awayTeamId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MarketStatus_new" AS ENUM ('ACTIVE', 'SUSPENDED', 'SETTLED', 'CANCELLED');
ALTER TABLE "Market" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Market" ALTER COLUMN "status" TYPE "MarketStatus_new" USING ("status"::text::"MarketStatus_new");
ALTER TYPE "MarketStatus" RENAME TO "MarketStatus_old";
ALTER TYPE "MarketStatus_new" RENAME TO "MarketStatus";
DROP TYPE "MarketStatus_old";
ALTER TABLE "Market" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PredictionStatus_new" AS ENUM ('ACTIVE', 'SETTLED', 'CANCELLED');
ALTER TABLE "Prediction" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Prediction" ALTER COLUMN "status" TYPE "PredictionStatus_new" USING ("status"::text::"PredictionStatus_new");
ALTER TYPE "PredictionStatus" RENAME TO "PredictionStatus_old";
ALTER TYPE "PredictionStatus_new" RENAME TO "PredictionStatus";
DROP TYPE "PredictionStatus_old";
ALTER TABLE "Prediction" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "Match_date_homeTeamId_awayTeamId_key" ON "Match"("date", "homeTeamId", "awayTeamId");
