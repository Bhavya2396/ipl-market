import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface MarketTypeStats {
  total: number;
  won: number;
  points: number;
  successRate?: number;
}

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const users = await prisma.user.findMany({
      orderBy: {
        totalPoints: "desc",
      },
      select: {
        id: true,
        name: true,
        image: true,
        totalPoints: true,
        totalPredictions: true,
        correctPredictions: true,
        successRate: true,
        rank: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}

// Get user's detailed statistics
export async function GET_USER_STATS(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        totalPoints: true,
        successRate: true,
        rank: true,
        predictions: {
          select: {
            status: true,
            points: true,
            createdAt: true,
            market: {
              select: {
                type: true,
                title: true,
              },
            },
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
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    // Calculate statistics by market type
    const marketTypeStats = user.predictions.reduce((acc, prediction) => {
      const type = prediction.market.type;
      if (!acc[type]) {
        acc[type] = {
          total: 0,
          won: 0,
          points: 0,
          successRate: 0,
        };
      }
      acc[type].total++;
      if (prediction.status === "WON") {
        acc[type].won++;
      }
      acc[type].points += prediction.points;
      return acc;
    }, {} as Record<string, MarketTypeStats>);

    // Calculate success rate by market type
    Object.keys(marketTypeStats).forEach(type => {
      const stats = marketTypeStats[type];
      stats.successRate = stats.total > 0 ? Math.round((stats.won / stats.total) * 100) : 0;
    });

    return {
      ...user,
      marketTypeStats,
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return null;
  }
} 