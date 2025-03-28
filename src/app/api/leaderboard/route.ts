import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const authSession = await auth();
    if (!authSession?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const timeRange = searchParams.get("timeRange") || "all"; // all, week, month

    // Get date range for filtering
    const now = new Date();
    let startDate = new Date(0); // Beginning of time
    if (timeRange === "week") {
      startDate = new Date(now.setDate(now.getDate() - 7));
    } else if (timeRange === "month") {
      startDate = new Date(now.setMonth(now.getMonth() - 1));
    }

    // Get user rankings with statistics
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        select: {
          id: true,
          username: true,
          totalPoints: true,
          successRate: true,
          rank: true,
          predictions: {
            where: {
              createdAt: {
                gte: startDate,
              },
            },
            select: {
              status: true,
              points: true,
            },
          },
        },
        orderBy: [
          { totalPoints: "desc" },
          { successRate: "desc" },
        ],
        skip,
        take: limit,
      }),
      prisma.user.count(),
    ]);

    // Calculate additional statistics
    const usersWithStats = users.map(user => {
      const recentPredictions = user.predictions;
      const won = recentPredictions.filter(p => p.status === "WON").length;
      const total = recentPredictions.length;
      const points = recentPredictions.reduce((sum, p) => sum + p.points, 0);

      return {
        ...user,
        recentStats: {
          predictions: total,
          won,
          successRate: total > 0 ? Math.round((won / total) * 100) : 0,
          points,
        },
      };
    });

    // Get current user's position if logged in
    const session = await getServerSession(authOptions);
    let userPosition = null;
    if (session?.user?.id) {
      const userRank = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          rank: true,
          totalPoints: true,
          successRate: true,
        },
      });
      if (userRank) {
        userPosition = {
          rank: userRank.rank,
          totalPoints: userRank.totalPoints,
          successRate: userRank.successRate,
        };
      }
    }

    return NextResponse.json({
      users: usersWithStats,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      userPosition,
      timeRange,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
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
        };
      }
      acc[type].total++;
      if (prediction.status === "WON") {
        acc[type].won++;
      }
      acc[type].points += prediction.points;
      return acc;
    }, {} as Record<string, { total: number; won: number; points: number }>);

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