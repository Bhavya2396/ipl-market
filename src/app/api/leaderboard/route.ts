import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MarketType, PredictionStatus } from "@prisma/client";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface MarketTypeStats {
  total: number;
  won: number;
  points: number;
  successRate?: number;
}

export async function GET() {
  try {
    // Get all users with their predictions and points
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        predictions: {
          select: {
            market: {
              select: {
                type: true,
              },
            },
            isCorrect: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate points for each user
    const leaderboard = users.map(user => {
      const points = user.predictions.reduce((total, prediction) => {
        if (!prediction.isCorrect) return total;
        
        // Award points based on market type
        switch (prediction.market.type) {
          case 'MATCH_WINNER':
            return total + 10;
          case 'HIGHEST_RUN_SCORER':
            return total + 15;
          case 'HIGHEST_WICKET_TAKER':
            return total + 15;
          case 'TWO_HUNDRED_RUNS_BARRIER':
            return total + 5;
          default:
            return total;
        }
      }, 0);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        points,
        totalPredictions: user.predictions.length,
        correctPredictions: user.predictions.filter(p => p.isCorrect).length,
      };
    });

    // Sort by points (descending) and then by account creation date (newest first)
    leaderboard.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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