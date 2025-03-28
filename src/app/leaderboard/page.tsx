"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface UserStats {
  id: string;
  username: string;
  totalPoints: number;
  successRate: number;
  rank: number;
  recentStats: {
    predictions: number;
    won: number;
    successRate: number;
    points: number;
  };
}

interface UserPosition {
  rank: number;
  totalPoints: number;
  successRate: number;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<UserStats[]>([]);
  const [userPosition, setUserPosition] = useState<UserPosition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLeaderboard();
  }, [timeRange, page]);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(
        `/api/leaderboard?timeRange=${timeRange}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
      }
      const data = await response.json();
      setUsers(data.users);
      setUserPosition(data.userPosition);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="mt-2 text-lg text-gray-600">
          See how you stack up against other predictors
        </p>
      </div>

      {/* Time Range Tabs */}
      <Tabs value={timeRange} onValueChange={setTimeRange} className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Time</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* User Position Card */}
      {userPosition && (
        <Card>
          <CardHeader>
            <CardTitle>Your Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="w-8 h-8 flex items-center justify-center">
                  {userPosition.rank}
                </Badge>
                <div>
                  <p className="font-medium">Your Position</p>
                  <p className="text-sm text-gray-500">
                    {userPosition.totalPoints} total points
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user, index) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="w-8 h-8 flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-gray-500">
                      {user.recentStats.predictions} predictions |{" "}
                      {user.recentStats.won} won |{" "}
                      {user.recentStats.successRate}% success rate
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{user.totalPoints} points</p>
                  <p className="text-sm text-gray-500">
                    +{user.recentStats.points} this period
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 