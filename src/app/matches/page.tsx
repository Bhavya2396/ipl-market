"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface Match {
  id: string;
  date: string;
  status: string;
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
    }[];
  }[];
}

export default function MatchesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    fetchMatches();
  }, [session, router]);

  const fetchMatches = async () => {
    try {
      const response = await fetch("/api/matches");
      if (!response.ok) {
        throw new Error("Failed to fetch matches");
      }
      const data = await response.json();
      setMatches(data.matches);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const isMarketClosed = (matchDate: string) => {
    const matchDateTime = new Date(matchDate);
    const oneHourBeforeMatch = new Date(matchDateTime.getTime() - 60 * 60 * 1000);
    return new Date() >= oneHourBeforeMatch;
  };

  if (loading) {
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
        <Button onClick={() => fetchMatches()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Today's Matches</h1>
          <p className="mt-2 text-lg text-gray-600">
            Make your predictions for today's matches
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {matches.map((match) => {
          const marketClosed = isMarketClosed(match.date);
          return (
            <Card key={match.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Match Details</CardTitle>
                  <Badge variant={marketClosed ? "destructive" : "default"}>
                    {marketClosed ? "Closed" : "Open"}
                  </Badge>
                </div>
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
                  <div className="space-y-2">
                    <h3 className="font-semibold">Available Markets:</h3>
                    <ul className="space-y-1">
                      {match.markets.map((market) => (
                        <li key={market.id} className="text-sm">
                          • {market.title} - {market.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href={`/matches/${match.id}/predictions`} className="block">
                    <Button className="w-full" disabled={marketClosed}>
                      {marketClosed ? "Markets Closed" : "Make Predictions"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {matches.length === 0 && (
        <div className="text-center py-12">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No matches today</h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no matches scheduled for today. Check back later for upcoming matches.
          </p>
        </div>
      )}
    </div>
  );
} 