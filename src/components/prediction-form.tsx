"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface MarketOption {
  id: string;
  label: string;
  odds: number;
}

interface Market {
  id: string;
  type: string;
  title: string;
  description: string;
  options: MarketOption[];
}

interface PredictionFormProps {
  market: Market;
  matchId: string;
}

export function PredictionForm({ market, matchId }: PredictionFormProps) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) {
      toast.error("Please select a prediction option");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          marketId: market.id,
          matchId,
          optionId: selectedOption,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit prediction");
      }

      toast.success("Prediction submitted successfully!");
      router.push("/predictions");
    } catch (error) {
      toast.error("Failed to submit prediction");
      console.error("Prediction submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{market.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">{market.description}</p>
          </div>
          <RadioGroup
            value={selectedOption}
            onValueChange={setSelectedOption}
            className="space-y-4"
          >
            {market.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex justify-between w-full">
                  <span>{option.label}</span>
                  <span className="text-sm text-gray-500">
                    Odds: {option.odds.toFixed(2)}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Prediction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 