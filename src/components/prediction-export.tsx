"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Download } from "lucide-react";

interface Market {
  marketId: string;
  type: string;
  description: string;
  options: string[];
  odds: Record<string, number>;
}

interface Match {
  matchId: string;
  matchTitle: string;
  startTime: string;
  venue: string;
  markets: Market[];
}

export function PredictionExport() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPredictionData();
  }, []);

  const fetchPredictionData = async () => {
    try {
      const response = await fetch("/api/predictions/export");
      if (!response.ok) {
        throw new Error("Failed to fetch prediction data");
      }
      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error("Error fetching prediction data:", error);
      toast({
        title: "Error",
        description: "Failed to load prediction data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const csvRows = ["Match,Venue,Start Time,Market Type,Description,Options,Odds"];
    
    matches.forEach((match) => {
      match.markets.forEach((market) => {
        const options = market.options.join(" | ");
        const odds = Object.entries(market.odds)
          .map(([option, value]) => `${option}: ${value}`)
          .join(" | ");
        
        csvRows.push(
          `"${match.matchTitle}","${match.venue}","${new Date(match.startTime).toLocaleString()}","${market.type}","${market.description}","${options}","${odds}"`
        );
      });
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `predictions-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  if (loading) {
    return <div>Loading prediction data...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Available Predictions</h2>
        <Button onClick={exportToCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <Card key={match.matchId}>
            <CardHeader>
              <CardTitle>{match.matchTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Venue: {match.venue}
                </p>
                <p className="text-sm text-muted-foreground">
                  Start Time: {new Date(match.startTime).toLocaleString()}
                </p>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Markets:</h3>
                  <div className="space-y-2">
                    {match.markets.map((market) => (
                      <div
                        key={market.marketId}
                        className="p-2 bg-muted rounded-md"
                      >
                        <p className="font-medium">{market.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {market.description}
                        </p>
                        <div className="mt-2">
                          <p className="text-sm font-medium">Options:</p>
                          <ul className="list-disc list-inside text-sm">
                            {market.options.map((option) => (
                              <li key={option}>
                                {option} ({market.odds[option]})
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 