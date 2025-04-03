"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Trophy, Lock, Unlock } from "lucide-react";
import Link from "next/link";
import { format, isBefore, isAfter } from "date-fns";
import { toZonedTime } from "date-fns-tz";

interface Player {
  id: string;
  name: string;
  shortName: string;
  role: string;
}

interface Match {
  id: string;
  date: string;
  venue: string;
  homeTeam: {
    id: string;
    name: string;
    shortName: string;
    players: Player[];
  };
  awayTeam: {
    id: string;
    name: string;
    shortName: string;
    players: Player[];
  };
  status: string;
  markets: {
    id: string;
    type: string;
    title: string;
    description: string;
    opensAt: string;
    closesAt: string;
    options: {
      id: string;
      label: string;
      player?: Player;
    }[];
  }[];
}

export function TodayMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodayMatches();
  }, []);

  const fetchTodayMatches = async () => {
    try {
      const response = await fetch("/api/matches/today");
      if (!response.ok) {
        throw new Error("Failed to fetch today's matches");
      }
      const data = await response.json();
      setMatches(data.matches);
    } catch (error) {
      console.error("Error fetching today's matches:", error);
      setError("Failed to load today's matches");
    } finally {
      setLoading(false);
    }
  };

  const isMarketOpen = (opensAt: string, closesAt: string) => {
    const now = new Date();
    const openTime = new Date(opensAt);
    const closeTime = new Date(closesAt);
    
    // Convert all times to IST for comparison
    const istNow = toZonedTime(now, 'Asia/Kolkata');
    const istOpenTime = toZonedTime(openTime, 'Asia/Kolkata');
    const istCloseTime = toZonedTime(closeTime, 'Asia/Kolkata');
    
    return isBefore(istOpenTime, istNow) && isAfter(istCloseTime, istNow);
  };

  if (loading) {
    return <div>Loading today's matches...</div>;
  }

  if (error) {
    return <div data-testid="error-message">{error}</div>;
  }

  if (matches.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Today's Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500" data-testid="no-matches">No matches scheduled for today.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <Card key={match.id} data-testid="match-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl" data-testid="match-title">
                {match.homeTeam.name} vs {match.awayTeam.name}
              </CardTitle>
              <Badge 
                variant={match.status === "LIVE" ? "destructive" : "secondary"}
                data-testid="match-status"
              >
                {match.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1" data-testid="match-time">
                  <Clock className="h-4 w-4" />
                  {format(new Date(match.date), "h:mm a")}
                </div>
                <div className="flex items-center gap-1" data-testid="match-venue">
                  <Users className="h-4 w-4" />
                  {match.venue}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold" data-testid="team-home">{match.homeTeam.shortName}</div>
                  <div className="text-sm text-gray-500">{match.homeTeam.name}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" data-testid="team-away">{match.awayTeam.shortName}</div>
                  <div className="text-sm text-gray-500">{match.awayTeam.name}</div>
                </div>
              </div>

              {match.markets.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    Available Markets
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {match.markets.map((market) => {
                      const isOpen = isMarketOpen(market.opensAt, market.closesAt);
                      return (
                        <div key={market.id} className="relative">
                          <Link
                            href={`/matches/${match.id}/predict?market=${market.id}`}
                            className={!isOpen ? "pointer-events-none" : ""}
                          >
                            <Button 
                              variant="outline" 
                              className="w-full" 
                              data-testid="market-button"
                              disabled={!isOpen}
                            >
                              {market.title}
                              {!isOpen && (
                                <Lock className="h-4 w-4 ml-2" />
                              )}
                              {isOpen && (
                                <Unlock className="h-4 w-4 ml-2" />
                              )}
                            </Button>
                          </Link>
                          <div className="text-xs text-gray-500 mt-1">
                            Opens: {format(new Date(market.opensAt), "h:mm a")} | 
                            Closes: {format(new Date(market.closesAt), "h:mm a")}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 