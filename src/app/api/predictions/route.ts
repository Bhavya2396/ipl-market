import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MarketStatus, PredictionStatus } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
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

    return NextResponse.json(predictions);
  } catch (error) {
    console.error("Predictions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch predictions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { matchId, marketId, optionId } = await request.json();

    // Check if match exists
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { markets: true },
    });

    if (!match) {
      return NextResponse.json(
        { error: "Match not found" },
        { status: 404 }
      );
    }

    const matchDate = new Date(match.date);
    const now = new Date();

    // Check if match has already started
    if (matchDate <= now) {
      return NextResponse.json(
        { error: "Match has already started" },
        { status: 400 }
      );
    }

    // Check if market is active and not closed
    const market = await prisma.market.findUnique({
      where: { id: marketId },
    });

    if (!market) {
      return NextResponse.json(
        { error: "Market not found" },
        { status: 404 }
      );
    }

    if (market.status !== MarketStatus.ACTIVE) {
      return NextResponse.json(
        { error: "Market is not active" },
        { status: 400 }
      );
    }

    // Check if market closes in less than 1 hour
    const oneHourBeforeMatch = new Date(matchDate.getTime() - 60 * 60 * 1000);
    if (now >= oneHourBeforeMatch) {
      return NextResponse.json(
        { error: "Market is closed (1 hour before match)" },
        { status: 400 }
      );
    }

    // Check if user already made a prediction for this market
    const existingPrediction = await prisma.prediction.findFirst({
      where: {
        userId: session.user.id,
        matchId,
        marketId,
      },
    });

    if (existingPrediction) {
      return NextResponse.json(
        { error: "You have already made a prediction for this market" },
        { status: 400 }
      );
    }

    // Create prediction
    const prediction = await prisma.prediction.create({
      data: {
        userId: session.user.id,
        matchId,
        marketId,
        optionId,
        status: PredictionStatus.ACTIVE,
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
    });

    return NextResponse.json(prediction);
  } catch (error) {
    console.error("Create prediction error:", error);
    return NextResponse.json(
      { error: "Failed to create prediction" },
      { status: 500 }
    );
  }
} 