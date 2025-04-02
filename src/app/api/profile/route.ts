import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get user stats
    const userStats = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        totalPoints: true,
        totalPredictions: true,
        correctPredictions: true,
        successRate: true,
        rank: true,
      },
    });

    if (!userStats) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get recent predictions
    const recentPredictions = await prisma.prediction.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        createdAt: true,
        status: true,
        match: {
          select: {
            homeTeam: {
              select: { name: true },
            },
            awayTeam: {
              select: { name: true },
            },
          },
        },
        market: {
          select: { title: true },
        },
        option: {
          select: { label: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return NextResponse.json({
      ...userStats,
      recentPredictions,
    });
  } catch (error) {
    console.error("Profile error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
} 