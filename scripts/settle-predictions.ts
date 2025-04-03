import { PrismaClient, PredictionStatus, MarketType } from '@prisma/client';

const prisma = new PrismaClient();

async function settleMatchPredictions(matchId: string) {
  console.log(`Settling predictions for match ${matchId}...`);

  // Get match details
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: {
      details: {
        include: {
          innings: true,
        },
      },
    },
  });

  if (!match || !match.details) {
    console.log('Match or match details not found');
    return;
  }

  // Get all active predictions for this match
  const predictions = await prisma.prediction.findMany({
    where: {
      matchId,
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
      matchId,
      isHighestRunScorer: true,
    },
    include: {
      player: true,
    },
  });

  // Calculate highest wicket taker
  const highestWicketTaker = await prisma.playerPerformance.findFirst({
    where: {
      matchId,
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

    console.log(`Settled prediction ${prediction.id}: ${isCorrect ? 'Correct' : 'Incorrect'}, ${points} points`);
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

  console.log('Successfully settled all predictions and updated rankings');
}

// Example usage: settleMatchPredictions('match-id-here'); 