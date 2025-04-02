"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";

interface UserStats {
  id: string;
  name: string;
  rank: number;
  totalPoints: number;
  totalPredictions: number;
  correctPredictions: number;
  successRate: number;
}

export default function LeaderboardPage() {
  const { data: session } = useSession();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<UserStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch("/api/leaderboard");
        const data = await response.json();
        setLeaderboard(data);
        
        if (session?.user) {
          const userData = data.find((user: UserStats) => user.id === session.user.id);
          setUserStats(userData || null);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeaderboard();
  }, [session]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
      
      {/* User Stats Card */}
      {userStats && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{userStats.rank}</div>
                <p className="text-sm text-gray-500">Rank</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{userStats.totalPoints}</div>
                <p className="text-sm text-gray-500">Total Points</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{userStats.totalPredictions}</div>
                <p className="text-sm text-gray-500">Predictions</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{userStats.successRate}%</div>
                <p className="text-sm text-gray-500">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle>Global Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Rank</th>
                  <th className="text-left py-2">User</th>
                  <th className="text-right py-2">Points</th>
                  <th className="text-right py-2">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{user.name}</td>
                    <td className="text-right py-2">{user.totalPoints}</td>
                    <td className="text-right py-2">{user.successRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 