import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

    const body = await request.json();
    const { matchId, marketId, optionId } = body;

    // Validate required fields
    if (!matchId || !marketId || !optionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if match is still open for predictions
    const match = await prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!match || match.status !== "UPCOMING") {
      return NextResponse.json(
        { error: "Match is not open for predictions" },
        { status: 400 }
      );
    }

    // Check if market is still active
    const market = await prisma.market.findUnique({
      where: { id: marketId },
    });

    if (!market || market.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Market is not active" },
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
    console.error("Prediction creation error:", error);
    return NextResponse.json(
      { error: "Failed to create prediction" },
      { status: 500 }
    );
  }
} 