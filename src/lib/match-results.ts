import { prisma } from "./prisma";

interface MatchResult {
  matchId: string;
  winner: string;
  highestRunScorer: {
    name: string;
    runs: number;
  };
  highestWicketTaker: {
    name: string;
    wickets: number;
  };
  totalRuns: number;
}

export async function fetchMatchResults(matchId: string): Promise<MatchResult | null> {
  try {
    // TODO: Replace with actual API endpoint
    const response = await fetch(`https://api.cricbuzz.com/matches/${matchId}/score`);
    const data = await response.json();

    // Transform the API response to our format
    return {
      matchId,
      winner: data.winner,
      highestRunScorer: {
        name: data.topScorer.name,
        runs: data.topScorer.runs,
      },
      highestWicketTaker: {
        name: data.topWicketTaker.name,
        wickets: data.topWicketTaker.wickets,
      },
      totalRuns: data.totalRuns,
    };
  } catch (error) {
    console.error("Error fetching match results:", error);
    return null;
  }
}

export async function validatePredictions(matchId: string) {
  try {
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        markets: {
          include: {
            options: true,
            predictions: true,
          },
        },
      },
    });

    if (!match) {
      throw new Error("Match not found");
    }

    const results = await fetchMatchResults(matchId);
    if (!results) {
      throw new Error("Failed to fetch match results");
    }

    // Validate each prediction
    for (const market of match.markets) {
      for (const prediction of market.predictions) {
        let isCorrect = false;

        switch (market.type) {
          case "MATCH_WINNER":
            isCorrect = prediction.selectedOption.label === results.winner;
            break;

          case "HIGHEST_RUN_SCORER":
            isCorrect = prediction.selectedOption.label === results.highestRunScorer.name;
            break;

          case "HIGHEST_WICKET_TAKER":
            isCorrect = prediction.selectedOption.label === results.highestWicketTaker.name;
            break;

          case "TWO_HUNDRED_RUNS_BARRIER":
            isCorrect = prediction.selectedOption.label === (results.totalRuns >= 200 ? "Yes" : "No");
            break;
        }

        // Update prediction status
        await prisma.prediction.update({
          where: { id: prediction.id },
          data: {
            isCorrect,
            status: isCorrect ? "WON" : "LOST",
          },
        });
      }
    }

    // Update match status
    await prisma.match.update({
      where: { id: matchId },
      data: {
        status: "COMPLETED",
        result: {
          winner: results.winner,
          highestRunScorer: results.highestRunScorer.name,
          highestWicketTaker: results.highestWicketTaker.name,
          totalRuns: results.totalRuns,
        },
      },
    });

    return true;
  } catch (error) {
    console.error("Error validating predictions:", error);
    return false;
  }
} 