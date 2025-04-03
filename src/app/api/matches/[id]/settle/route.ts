import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { PredictionStatus, MarketType } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get match details
    const match = await prisma.match.findUnique({
      where: { id: params.id },
      include: {
        details: {
          include: {
            innings: true,
          },
        },
      },
    });

    if (!match || !match.details) {
      return NextResponse.json(
        { error: "Match or match details not found" },
        { status: 404 }
      );
    }

    // Get all active predictions for this match
    const predictions = await prisma.prediction.findMany({
      where: {
        matchId: params.id,
        status: PredictionStatus.ACTIVE,
      },
      include: {
        market: true,
        option: true,
        user: true,
      },
    });

    // Calculate match winner
    const homeTeamScore = match.details.innings[0]?.runs || 0;
    const awayTeamScore = match.details.innings[1]?.runs || 0;
    const winner = homeTeamScore > awayTeamScore ? match.homeTeamId : match.awayTeamId;

    // Calculate highest run scorer
    const highestRunScorer = await prisma.playerPerformance.findFirst({
      where: {
        matchId: params.id,
        isHighestRunScorer: true,
      },
      include: {
        player: true,
      },
    });

    // Calculate highest wicket taker
    const highestWicketTaker = await prisma.playerPerformance.findFirst({
      where: {
        matchId: params.id,
        isHighestWicketTaker: true,
      },
      include: {
        player: true,
      },
    });

    // Check if 200 runs barrier was crossed
    const crossed200Runs = match.details.crossed200Runs || false;

    // Settle each prediction
    for (const prediction of predictions) {
      let isCorrect = false;
      let points = 0;

      switch (prediction.market.type) {
        case MarketType.MATCH_WINNER:
          const predictedTeamId = prediction.option.label === 'Home Team' 
            ? match.homeTeamId 
            : match.awayTeamId;
          isCorrect = predictedTeamId === winner;
          points = isCorrect ? 10 : 0;
          break;

        case MarketType.HIGHEST_RUN_SCORER:
          if (highestRunScorer) {
            const predictedTeamId = prediction.option.label === 'Home Team' 
              ? match.homeTeamId 
              : match.awayTeamId;
            isCorrect = highestRunScorer.player.teamId === predictedTeamId;
            points = isCorrect ? 15 : 0;
          }
          break;

        case MarketType.HIGHEST_WICKET_TAKER:
          if (highestWicketTaker) {
            const predictedTeamId = prediction.option.label === 'Home Team' 
              ? match.homeTeamId 
              : match.awayTeamId;
            isCorrect = highestWicketTaker.player.teamId === predictedTeamId;
            points = isCorrect ? 15 : 0;
          }
          break;

        case MarketType.TWO_HUNDRED_RUNS_BARRIER:
          isCorrect = prediction.option.label === 'Yes' ? crossed200Runs : !crossed200Runs;
          points = isCorrect ? 5 : 0;
          break;
      }

      // Update prediction status and points
      await prisma.prediction.update({
        where: { id: prediction.id },
        data: {
          status: PredictionStatus.SETTLED,
          points,
        },
      });

      // Update user's total points
      if (points > 0) {
        await prisma.user.update({
          where: { id: prediction.userId },
          data: {
            totalPoints: {
              increment: points,
            },
            correctPredictions: {
              increment: 1,
            },
          },
        });
      }

      // Update user's total predictions
      await prisma.user.update({
        where: { id: prediction.userId },
        data: {
          totalPredictions: {
            increment: 1,
          },
        },
      });
    }

    // Update user rankings
    const users = await prisma.user.findMany({
      orderBy: {
        totalPoints: 'desc',
      },
    });

    for (let i = 0; i < users.length; i++) {
      await prisma.user.update({
        where: { id: users[i].id },
        data: {
          rank: i + 1,
          successRate: users[i].totalPredictions > 0 
            ? (users[i].correctPredictions / users[i].totalPredictions) * 100 
            : 0,
        },
      });
    }

    return NextResponse.json({ message: "Predictions settled successfully" });
  } catch (error) {
    console.error("Error settling predictions:", error);
    return NextResponse.json(
      { error: "Failed to settle predictions" },
      { status: 500 }
    );
  }
} 