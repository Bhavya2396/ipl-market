"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface PredictionFormProps {
  matchId: string;
  marketId: string;
  marketTitle: string;
  marketDescription: string;
  marketType: string;
  points: number;
  options: {
    id: string;
    label: string;
  }[];
  matchStartTime: Date;
}

export function PredictionForm({
  matchId,
  marketId,
  marketTitle,
  marketDescription,
  marketType,
  points,
  options,
  matchStartTime,
}: PredictionFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please sign in to make predictions");
      router.push("/auth/signin");
      return;
    }

    if (!selectedOption) {
      toast.error("Please select an option");
      return;
    }

    // Check if match starts in less than 1 hour
    const oneHourBeforeMatch = new Date(matchStartTime.getTime() - 60 * 60 * 1000);
    if (new Date() >= oneHourBeforeMatch) {
      toast.error("Market is closed (1 hour before match)");
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
          matchId,
          marketId,
          optionId: selectedOption,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to place prediction");
      }

      toast.success("Prediction placed successfully!");
      setSelectedOption("");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to place prediction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{marketTitle}</h3>
          <Badge variant="secondary">{points} points</Badge>
        </div>
        <p className="text-sm text-gray-500">{marketDescription}</p>
      </div>

      <RadioGroup
        value={selectedOption}
        onValueChange={setSelectedOption}
        className="space-y-4"
      >
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>

      <Button
        type="submit"
        disabled={isSubmitting || !selectedOption}
        className="w-full"
      >
        {isSubmitting ? "Placing Prediction..." : "Place Prediction"}
      </Button>
    </form>
  );
} 