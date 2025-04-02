import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { handler } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MarketStatus, PredictionStatus } from "@prisma/client";
import { Session } from "next-auth";

const MARKET_POINTS = {
  MATCH_WINNER: 1,
  HIGHEST_RUN_SCORER: 2,
  HIGHEST_WICKET_TAKER: 2,
  TWO_HUNDRED_RUNS_BARRIER: 1,
};

export async function GET(request: Request) {
  try {
    const session = await getServerSession(handler) as Session;
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const predictions = await prisma.prediction.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        match: {
          include: {
            homeTeam: true,
            awayTeam: true,
          },
        },
        market: true,
        option: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ predictions });
  } catch (error) {
    console.error("Error fetching predictions:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(handler) as Session;
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { matchId, marketId, optionId } = body;

    if (!matchId || !marketId || !optionId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if match exists and is upcoming
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { markets: true },
    });

    if (!match) {
      return new NextResponse("Match not found", { status: 404 });
    }

    if (match.status !== "UPCOMING") {
      return new NextResponse("Match is not upcoming", { status: 400 });
    }

    // Check if market exists and is active
    const market = await prisma.market.findUnique({
      where: { id: marketId },
      include: {
        options: true,
      },
    });

    if (!market || market.status !== "ACTIVE") {
      return new NextResponse("Market not found or not active", { status: 404 });
    }

    // Check if option exists and belongs to the market
    const option = market.options.find(opt => opt.id === optionId);
    if (!option) {
      return new NextResponse("Option not found or does not belong to this market", { status: 404 });
    }

    // Check if user has already made a prediction for this market
    const existingPrediction = await prisma.prediction.findFirst({
      where: {
        userId: session.user.id,
        matchId,
        marketId,
        status: PredictionStatus.ACTIVE,
      },
    });

    if (existingPrediction) {
      return new NextResponse("You have already made a prediction for this market", { status: 400 });
    }

    // Check if match starts in less than 1 hour
    const oneHourBeforeMatch = new Date(match.date.getTime() - 60 * 60 * 1000);
    if (new Date() >= oneHourBeforeMatch) {
      return new NextResponse("Predictions are closed as match starts in less than 1 hour", { status: 400 });
    }

    // Create the prediction
    const prediction = await prisma.prediction.create({
      data: {
        userId: session.user.id,
        matchId,
        marketId,
        optionId,
        status: PredictionStatus.ACTIVE,
        points: MARKET_POINTS[market.type as keyof typeof MARKET_POINTS] || 0,
      },
    });

    return NextResponse.json({ prediction });
  } catch (error) {
    console.error("Error creating prediction:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 