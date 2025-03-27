"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Match, MatchStatus, Team } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";

type MatchWithTeams = Match & {
  homeTeam: Team;
  awayTeam: Team;
  venue: string;
  city: string;
};

interface MatchCardProps {
  match: MatchWithTeams;
}

const statusColors = {
  UPCOMING: "bg-yellow-100",
  LIVE: "bg-green-100",
  COMPLETED: "bg-gray-100",
  CANCELLED: "bg-red-100",
};

export function MatchCard({ match }: MatchCardProps) {
  return (
    <Link href={`/matches/${match.id}`} data-testid="match-card">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {format(new Date(match.date), "MMM d, yyyy h:mm a")}
          </CardTitle>
          <Badge className={statusColors[match.status]} data-testid="status-badge">
            {match.status}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">{match.homeTeam.name}</p>
                <p className="text-xs text-gray-500" data-testid="team1-short-name">{match.homeTeam.shortName}</p>
              </div>
              <div className="text-xl font-bold">VS</div>
              <div>
                <p className="text-sm font-medium">{match.awayTeam.name}</p>
                <p className="text-xs text-gray-500" data-testid="team2-short-name">{match.awayTeam.shortName}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{match.venue || 'Venue TBD'}</p>
              <p className="text-xs text-gray-400">{match.city || 'Location TBD'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 