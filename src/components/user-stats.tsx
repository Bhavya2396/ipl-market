"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface MarketTypeStats {
  total: number;
  won: number;
  points: number;
  successRate: number;
}

interface UserStats {
  id: string;
  username: string;
  totalPoints: number;
  successRate: number;
  rank: number;
  predictions: Array<{
    status: string;
    points: number;
    createdAt: string;
    market: {
      type: string;
      title: string;
    };
    match: {
      homeTeam: {
        name: string;
      };
      awayTeam: {
        name: string;
      };
    };
  }>;
  marketTypeStats: Record<string, MarketTypeStats>;
}

interface UserStatsProps {
  userId: string;
}

export function UserStats({ userId }: UserStatsProps) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserStats();
  }, [userId]);

  const fetchUserStats = async () => {
    try {
      const response = await fetch(`/api/leaderboard/user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user stats");
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !stats) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Rank</p>
              <p className="text-2xl font-bold">#{stats.rank}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Points</p>
              <p className="text-2xl font-bold">{stats.totalPoints}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-bold">{stats.successRate}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Type Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Market Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stats.marketTypeStats).map(([type, marketStats]) => (
              <div key={type} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{type.replace(/_/g, " ")}</h3>
                  <Badge variant="outline">
                    {marketStats.successRate}% success rate
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Predictions</p>
                    <p className="font-medium">{marketStats.total}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Won</p>
                    <p className="font-medium">{marketStats.won}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Points</p>
                    <p className="font-medium">{marketStats.points}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.predictions.map((prediction) => (
              <div
                key={prediction.createdAt}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{prediction.market.title}</p>
                  <p className="text-sm text-gray-500">
                    {prediction.match.homeTeam.name} vs{" "}
                    {prediction.match.awayTeam.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(prediction.createdAt), "MMM d, yyyy")}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      prediction.status === "WON"
                        ? "default"
                        : prediction.status === "LOST"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {prediction.status}
                  </Badge>
                  {prediction.points > 0 && (
                    <p className="text-sm font-medium text-green-500 mt-1">
                      +{prediction.points} points
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 