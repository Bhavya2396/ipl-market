"use client";

import { MarketCard } from "./market-card";
import { MarketStatus } from "@prisma/client";

interface Market {
  id: string;
  title: string;
  description: string;
  status: MarketStatus;
  options: {
    id: string;
    label: string;
  }[];
}

interface MarketsListProps {
  matchId: string;
  markets: Market[];
}

export function MarketsList({ matchId, markets }: MarketsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {markets.map((market) => (
        <MarketCard
          key={market.id}
          matchId={matchId}
          marketId={market.id}
          title={market.title}
          description={market.description}
          status={market.status}
          options={market.options}
        />
      ))}
    </div>
  );
} 