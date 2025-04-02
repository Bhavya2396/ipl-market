"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Match, Market, Team, Innings } from "@prisma/client";
import { format } from "date-fns";
import { useSSE } from "@/hooks/use-sse";

type MatchWithDetails = Match & {
  homeTeam: Team;
  awayTeam: Team;
  markets: (Market & {
    options: any[];
  })[];
  details?: {
    innings: Innings[];
  } | null;
};

export default function MatchDetails() {
  const params = useParams();
  const [match, setMatch] = useState<MatchWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use SSE for real-time updates
  const { data: liveData, error: sseError } = useSSE(params.id as string);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await fetch(`/api/matches/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch match details");
        }
        const data = await response.json();
        setMatch(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [params.id]);

  // Update match data when SSE events are received
  useEffect(() => {
    if (liveData) {
      setMatch(liveData);
    }
  }, [liveData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600">{error || "Match not found"}</p>
        </div>
      </div>
    );
  }

  const homeScore = match.details?.innings.find(
    (i) => i.teamId === match.homeTeamId && i.inningsNumber === 1
  )?.runs || 0;

  const awayScore = match.details?.innings.find(
    (i) => i.teamId === match.awayTeamId && i.inningsNumber === 1
  )?.runs || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Match Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Match Details</h1>
          <div className="flex items-center space-x-2">
            {match.status === "LIVE" && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-red-500">LIVE</span>
              </div>
            )}
            <Badge variant={match.status === "COMPLETED" ? "default" : "secondary"}>
              {match.status}
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold">{match.homeTeam.name}</h3>
              <p className="text-4xl font-bold mt-2">{homeScore}</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold">{match.awayTeam.name}</h3>
              <p className="text-4xl font-bold mt-2">{awayScore}</p>
            </div>
          </Card>
        </div>
        <div className="mt-4 text-center text-gray-600">
          <p>{format(new Date(match.date), "MMMM d, yyyy 'at' h:mm a")}</p>
          <p>{match.venue}</p>
        </div>
      </div>

      {/* Match Content */}
      <Tabs defaultValue="markets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="markets">Markets</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="markets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {match.markets.map((market) => (
              <Card key={market.id} className="p-6">
                <h3 className="text-lg font-semibold mb-2">{market.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{market.description}</p>
                <div className="space-y-2">
                  {market.options.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center justify-between p-2 rounded-lg border hover:bg-gray-50 cursor-pointer"
                    >
                      <span>{option.text}</span>
                      <span className="font-semibold">{option.odds}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={market.status !== "ACTIVE"}
                >
                  Place Prediction
                </button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Match Statistics</h3>
            {/* Add match statistics here */}
            <p className="text-gray-600">Statistics will be available after the match.</p>
          </Card>
        </TabsContent>

        <TabsContent value="predictions">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Your Predictions</h3>
            {/* Add user predictions here */}
            <p className="text-gray-600">Your predictions will appear here.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 