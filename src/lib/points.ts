import { MarketType } from "@prisma/client";

interface PointsConfig {
  basePoints: number;
  oddsMultiplier: number;
  maxPoints: number;
}

const marketTypeConfigs: Record<MarketType, PointsConfig> = {
  MATCH_WINNER: {
    basePoints: 100,
    oddsMultiplier: 1.5,
    maxPoints: 500,
  },
  HIGHEST_RUN_SCORER: {
    basePoints: 150,
    oddsMultiplier: 2,
    maxPoints: 750,
  },
  HIGHEST_WICKET_TAKER: {
    basePoints: 150,
    oddsMultiplier: 2,
    maxPoints: 750,
  },
  TWO_HUNDRED_RUNS_BARRIER: {
    basePoints: 200,
    oddsMultiplier: 2.5,
    maxPoints: 1000,
  },
};

export function calculatePoints(marketType: MarketType, odds: number): number {
  const config = marketTypeConfigs[marketType];
  if (!config) {
    throw new Error(`Invalid market type: ${marketType}`);
  }

  // Calculate points based on odds and configuration
  const points = Math.round(config.basePoints * (odds * config.oddsMultiplier));

  // Cap points at the maximum allowed
  return Math.min(points, config.maxPoints);
}

export function calculateSuccessRate(won: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((won / total) * 100);
}

export function calculateTotalPoints(predictions: Array<{ points: number }>): number {
  return predictions.reduce((sum, prediction) => sum + prediction.points, 0);
} 