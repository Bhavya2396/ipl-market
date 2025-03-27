"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";

type MarketType = "MATCH_WINNER" | "HIGHEST_RUN_SCORER" | "HIGHEST_WICKET_TAKER" | "TWO_HUNDRED_RUNS_BARRIER";
type MarketStatus = "ACTIVE" | "CLOSED" | "RESOLVED" | "CANCELLED";

interface MarketOption {
  id: string;
  label: string;
  odds: number;
}

interface Market {
  id: string;
  type: MarketType;
  title: string;
  description: string;
  status: MarketStatus;
  options: MarketOption[];
}

interface MarketCardProps {
  market: Market;
  matchDate: Date;
  matchStatus: string;
}

const statusColors: Record<MarketStatus, string> = {
  ACTIVE: "bg-green-500",
  CLOSED: "bg-yellow-500",
  RESOLVED: "bg-blue-500",
  CANCELLED: "bg-red-500",
};

const marketTypeLabels: Record<MarketType, string> = {
  MATCH_WINNER: "Match Winner",
  HIGHEST_RUN_SCORER: "Highest Run Scorer",
  HIGHEST_WICKET_TAKER: "Highest Wicket Taker",
  TWO_HUNDRED_RUNS_BARRIER: "200 Runs Barrier",
};

export function MarketCard({ market, matchDate, matchStatus }: MarketCardProps) {
  const isActive = market.status === "ACTIVE" && matchStatus === "UPCOMING";

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {marketTypeLabels[market.type]}
        </CardTitle>
        <Badge className={statusColors[market.status]}>
          {market.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">{market.description}</p>
          <div className="space-y-2">
            {market.options.map((option: MarketOption) => (
              <div
                key={option.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <span className="text-sm">{option.label}</span>
                <span className="text-sm font-medium">{option.odds.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              Closes: {format(new Date(matchDate), "MMM d, h:mm a")}
            </span>
            {isActive && (
              <Button asChild>
                <Link href={`/markets/${market.id}/predict`}>
                  Make Prediction
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 