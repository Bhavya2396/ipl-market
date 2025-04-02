"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Match {
  id: string;
  matchNumber: number;
  date: string;
  homeTeam: {
    id: string;
    name: string;
  };
  awayTeam: {
    id: string;
    name: string;
  };
  venue: string;
  city: string;
  markets: {
    id: string;
    title: string;
    type: string;
    options: {
      id: string;
      title: string;
      odds: number;
    }[];
  }[];
}

interface Prediction {
  marketId: string;
  optionId: string;
}

export default function UpcomingPredictionsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Record<string, Prediction>>({});

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    fetchUpcomingMatches();
  }, [session, router]);

  const fetchUpcomingMatches = async () => {
    try {
      const response = await fetch("/api/matches/upcoming");
      if (!response.ok) {
        throw new Error("Failed to fetch upcoming matches");
      }
      const data = await response.json();
      setMatches(data.matches);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handlePrediction = (matchId: string, marketId: string, optionId: string) => {
    setPredictions((prev) => ({
      ...prev,
      [matchId]: {
        marketId,
        optionId,
      },
    }));
  };

  const submitPrediction = async (matchId: string) => {
    const prediction = predictions[matchId];
    if (!prediction) return;

    try {
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchId,
          marketId: prediction.marketId,
          optionId: prediction.optionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit prediction");
      }

      // Remove the prediction from state after successful submission
      setPredictions((prev) => {
        const newPredictions = { ...prev };
        delete newPredictions[matchId];
        return newPredictions;
      });

      // Refresh the matches to show updated state
      fetchUpcomingMatches();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit prediction");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Upcoming Matches</h1>
        <p className="mt-2 text-lg text-gray-600">
          Make your predictions for upcoming IPL matches
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <Card key={match.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                Match {match.matchNumber}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="font-medium">{match.homeTeam.name}</p>
                  <p className="text-sm text-gray-500">vs</p>
                  <p className="font-medium">{match.awayTeam.name}</p>
                </div>
                <div className="text-sm text-gray-500">
                  <p>{format(new Date(match.date), "MMM d, yyyy h:mm a")}</p>
                  <p>{match.venue}, {match.city}</p>
                </div>

                {match.markets.map((market) => (
                  <div key={market.id} className="space-y-2">
                    <h3 className="font-medium">{market.title}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {market.options.map((option) => (
                        <Button
                          key={option.id}
                          variant={
                            predictions[match.id]?.optionId === option.id
                              ? "default"
                              : "outline"
                          }
                          className="w-full"
                          onClick={() =>
                            handlePrediction(match.id, market.id, option.id)
                          }
                        >
                          <div className="flex flex-col items-center">
                            <span>{option.title}</span>
                            <span className="text-sm text-gray-500">
                              {option.odds.toFixed(2)}
                            </span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}

                {predictions[match.id] && (
                  <Button
                    className="w-full"
                    onClick={() => submitPrediction(match.id)}
                  >
                    Submit Prediction
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 