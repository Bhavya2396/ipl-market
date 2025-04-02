"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, isBefore, subHours } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock, AlertCircle } from "lucide-react";

interface Match {
  id: string;
  matchNumber: number;
  date: string;
  homeTeam: {
    id: string;
    name: string;
    shortName: string;
    logo: string;
  };
  awayTeam: {
    id: string;
    name: string;
    shortName: string;
    logo: string;
  };
  venue: string;
  city: string;
  markets: {
    id: string;
    title: string;
    type: string;
    description: string;
    options: {
      id: string;
      title: string;
      odds: number;
      isSelected: boolean;
    }[];
  }[];
}

interface Prediction {
  marketId: string;
  optionId: string;
}

const MARKET_POINTS = {
  MATCH_WINNER: 1,
  HIGHEST_RUN_SCORER: 2,
  HIGHEST_WICKET_TAKER: 2,
  TWO_HUNDRED_RUNS_BARRIER: 1,
};

export default function MatchPredictionsPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Record<string, Prediction>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }
    if (status === "authenticated") {
      fetchMatch();
    }
  }, [status, router, params.id]);

  const fetchMatch = async () => {
    try {
      const response = await fetch(`/api/matches/${params.id}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch match");
      }
      const data = await response.json();
      setMatch(data.match);
    } catch (err) {
      console.error("Error in fetchMatch:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handlePrediction = (marketId: string, optionId: string) => {
    setPredictions((prev) => ({
      ...prev,
      [marketId]: {
        marketId,
        optionId,
      },
    }));
  };

  const submitPrediction = async (marketId: string) => {
    const prediction = predictions[marketId];
    if (!prediction || !match) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchId: match.id,
          marketId: prediction.marketId,
          optionId: prediction.optionId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit prediction");
      }

      toast.success("Prediction submitted successfully!");
      
      // Remove the prediction from state after successful submission
      setPredictions((prev) => {
        const newPredictions = { ...prev };
        delete newPredictions[marketId];
        return newPredictions;
      });

      // Refresh the match data to show updated state
      fetchMatch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit prediction");
    } finally {
      setSubmitting(false);
    }
  };

  const isMarketClosed = (matchDate: string) => {
    const matchDateTime = new Date(matchDate);
    const oneHourBeforeMatch = subHours(matchDateTime, 1);
    return isBefore(new Date(), oneHourBeforeMatch);
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <Button onClick={() => fetchMatch()}>Try Again</Button>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-gray-500 mb-4">Match not found</div>
        <Link href="/matches">
          <Button>Back to Matches</Button>
        </Link>
      </div>
    );
  }

  const marketClosed = isMarketClosed(match.date);

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Match {match.matchNumber}</h1>
          <p className="mt-2 text-lg text-gray-600">
            Make your predictions for this match
          </p>
        </div>
        <Link href="/matches">
          <Button variant="outline">Back to Matches</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Match Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <p className="text-2xl font-medium">{match.homeTeam.name}</p>
                <p className="text-sm text-gray-500">{match.homeTeam.shortName}</p>
              </div>
              <div className="text-2xl font-bold text-gray-500">vs</div>
              <div className="text-center">
                <p className="text-2xl font-medium">{match.awayTeam.name}</p>
                <p className="text-sm text-gray-500">{match.awayTeam.shortName}</p>
              </div>
            </div>
            <div className="text-center text-sm text-gray-500">
              <p>{format(new Date(match.date), "MMM d, yyyy h:mm a")}</p>
              <p>{match.venue}, {match.city}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {marketClosed && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Markets Closed</AlertTitle>
          <AlertDescription>
            Predictions are no longer available as the match starts in less than 1 hour.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Markets</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {match.markets.map((market) => (
            <Card key={market.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{market.title}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">{market.description}</p>
                  </div>
                  <Badge variant="secondary">
                    {MARKET_POINTS[market.type as keyof typeof MARKET_POINTS]} points
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {market.options.map((option) => (
                      <Button
                        key={option.id}
                        variant={
                          predictions[market.id]?.optionId === option.id
                            ? "default"
                            : option.isSelected
                            ? "secondary"
                            : "outline"
                        }
                        className="w-full"
                        onClick={() => !option.isSelected && handlePrediction(market.id, option.id)}
                        disabled={option.isSelected || marketClosed}
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
                  {predictions[market.id] && !marketClosed && (
                    <Button
                      className="w-full"
                      onClick={() => submitPrediction(market.id)}
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Prediction"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Alert>
        <Clock className="h-4 w-4" />
        <AlertTitle>Prediction Rules</AlertTitle>
        <AlertDescription>
          <ul className="list-disc list-inside space-y-1">
            <li>All predictions must be made before 1 hour of match start time</li>
            <li>You can make one prediction per market per match</li>
            <li>Points are awarded only for correct predictions</li>
            <li>No points are deducted for incorrect predictions</li>
            <li>Predictions cannot be modified after submission</li>
            <li>Points distribution:
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>Match Winner: 1 point</li>
                <li>Highest Run Scorer: 2 points</li>
                <li>Highest Wicket Taker: 2 points</li>
                <li>200+ Runs Barrier: 1 point</li>
              </ul>
            </li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
} 