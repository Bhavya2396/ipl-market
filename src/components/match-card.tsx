"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Match, Team } from "@prisma/client";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

type MatchWithTeams = Match & {
  homeTeam: Team;
  awayTeam: Team;
};

interface MatchCardProps {
  match: MatchWithTeams;
}

export function MatchCard({ match }: MatchCardProps) {
  const { isAuthenticated } = useAuth();
  const matchDate = new Date(match.date);
  const isLive = match.status === "LIVE";
  const isCompleted = match.status === "COMPLETED";

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {match.homeTeam.name} vs {match.awayTeam.name}
          </CardTitle>
          <Badge variant={isLive ? "destructive" : isCompleted ? "secondary" : "default"}>
            {isLive ? "LIVE" : isCompleted ? "COMPLETED" : "UPCOMING"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {match.homeTeam.logo && (
              <img
                src={match.homeTeam.logo}
                alt={match.homeTeam.name}
                className="w-8 h-8 object-contain"
              />
            )}
            <span className="font-medium">{match.homeTeam.name}</span>
          </div>
          <span className="text-muted-foreground">VS</span>
          <div className="flex items-center space-x-2">
            <span className="font-medium">{match.awayTeam.name}</span>
            {match.awayTeam.logo && (
              <img
                src={match.awayTeam.logo}
                alt={match.awayTeam.name}
                className="w-8 h-8 object-contain"
              />
            )}
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
            <span>{match.venue}</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{format(matchDate, "MMM d, yyyy h:mm a")}</span>
          </div>
        </div>

        {isAuthenticated && !isCompleted && (
          <div className="flex justify-end">
            <Link href={`/matches/${match.id}/predictions`}>
              <Button variant="outline" size="sm">
                {isLive ? "Update Prediction" : "Make Prediction"}
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 