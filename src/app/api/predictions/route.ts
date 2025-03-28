import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const authSession = await auth();
    if (!authSession?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { marketId, matchId, optionId } = await request.json();

    // Validate market is active
    const market = await prisma.market.findUnique({
      where: { id: marketId },
      include: { options: true },
    });

    if (!market || market.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Market is not active" },
        { status: 400 }
      );
    }

    // Validate match is upcoming
    const match = await prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!match || match.status !== "UPCOMING") {
      return NextResponse.json(
        { error: "Match is not upcoming" },
        { status: 400 }
      );
    }

    // Validate option exists
    const option = market.options.find((opt) => opt.id === optionId);
    if (!option) {
      return NextResponse.json(
        { error: "Invalid prediction option" },
        { status: 400 }
      );
    }

    // Create prediction
    const prediction = await prisma.prediction.create({
      data: {
        userId: authSession.user.id,
        marketId,
        matchId,
        optionId,
        status: "ACTIVE",
        points: 0,
      },
    });

    return NextResponse.json(prediction);
  } catch (error) {
    console.error("Error creating prediction:", error);
    return NextResponse.json(
      { error: "Failed to create prediction" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const authSession = await auth();
    if (!authSession?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where = {
      userId: authSession.user.id,
      ...(status && { status }),
    };

    const [predictions, total] = await Promise.all([
      prisma.prediction.findMany({
        where,
        include: {
          market: {
            include: {
              options: true,
            },
          },
          match: {
            include: {
              homeTeam: true,
              awayTeam: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.prediction.count({ where }),
    ]);

    return NextResponse.json({
      predictions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching predictions:", error);
    return NextResponse.json(
      { error: "Failed to fetch predictions" },
      { status: 500 }
    );
  }
} 