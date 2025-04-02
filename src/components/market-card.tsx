"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PredictionForm } from "./prediction-form";
import { MarketStatus } from "@prisma/client";

interface MarketCardProps {
  matchId: string;
  marketId: string;
  marketTitle: string;
  marketDescription: string;
  marketType: string;
  points: number;
  options: {
    id: string;
    label: string;
  }[];
  status: MarketStatus;
  matchStartTime: Date;
}

export function MarketCard({
  matchId,
  marketId,
  marketTitle,
  marketDescription,
  marketType,
  points,
  options,
  status,
  matchStartTime,
}: MarketCardProps) {
  const isMarketClosed = status === MarketStatus.CLOSED;
  const isMarketResolved = status === MarketStatus.RESOLVED;
  const isMarketCancelled = status === MarketStatus.CANCELLED;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{marketTitle}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{points} points</Badge>
            {isMarketClosed && (
              <Badge variant="destructive">Closed</Badge>
            )}
            {isMarketResolved && (
              <Badge variant="default">Resolved</Badge>
            )}
            {isMarketCancelled && (
              <Badge variant="outline">Cancelled</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">{marketDescription}</p>
        {status === MarketStatus.ACTIVE && (
          <PredictionForm
            matchId={matchId}
            marketId={marketId}
            marketTitle={marketTitle}
            marketDescription={marketDescription}
            marketType={marketType}
            points={points}
            options={options}
            matchStartTime={matchStartTime}
          />
        )}
      </CardContent>
    </Card>
  );
} 