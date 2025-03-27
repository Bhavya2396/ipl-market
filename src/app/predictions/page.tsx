"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

interface Prediction {
  id: string;
  status: string;
  points: number;
  createdAt: string;
  market: {
    title: string;
    type: string;
  };
  match: {
    homeTeam: {
      name: string;
    };
    awayTeam: {
      name: string;
    };
  };
}

export default function PredictionsPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const response = await fetch("/api/predictions");
      if (!response.ok) {
        throw new Error("Failed to fetch predictions");
      }
      const data = await response.json();
      setPredictions(data.predictions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    ACTIVE: "bg-blue-500",
    WON: "bg-green-500",
    LOST: "bg-red-500",
    CANCELLED: "bg-gray-500",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Predictions</h1>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {predictions.map((prediction) => (
            <Card key={prediction.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {prediction.market.title}
                </CardTitle>
                <Badge className={statusColors[prediction.status as keyof typeof statusColors]}>
                  {prediction.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    {prediction.match.homeTeam.name} vs {prediction.match.awayTeam.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Made on {format(new Date(prediction.createdAt), "MMM d, yyyy h:mm a")}
                  </p>
                  {prediction.points > 0 && (
                    <p className="text-sm font-medium text-green-500">
                      Points earned: {prediction.points}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          {predictions
            .filter((p) => p.status === "ACTIVE")
            .map((prediction) => (
              <Card key={prediction.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {prediction.market.title}
                  </CardTitle>
                  <Badge className={statusColors[prediction.status as keyof typeof statusColors]}>
                    {prediction.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      {prediction.match.homeTeam.name} vs {prediction.match.awayTeam.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Made on {format(new Date(prediction.createdAt), "MMM d, yyyy h:mm a")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {predictions
            .filter((p) => p.status !== "ACTIVE")
            .map((prediction) => (
              <Card key={prediction.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {prediction.market.title}
                  </CardTitle>
                  <Badge className={statusColors[prediction.status as keyof typeof statusColors]}>
                    {prediction.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      {prediction.match.homeTeam.name} vs {prediction.match.awayTeam.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Made on {format(new Date(prediction.createdAt), "MMM d, yyyy h:mm a")}
                    </p>
                    {prediction.points > 0 && (
                      <p className="text-sm font-medium text-green-500">
                        Points earned: {prediction.points}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
} 