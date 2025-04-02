import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MarketStatus, Prisma } from "@prisma/client";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const status = statusParam as MarketStatus | null;
    const matchId = searchParams.get("matchId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const where: Prisma.MarketWhereInput = {
      match: {
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
      ...(status ? { status } : {}),
      ...(matchId ? { matchId } : {}),
    };

    const [markets, total] = await Promise.all([
      prisma.market.findMany({
        where,
        include: {
          match: {
            include: {
              homeTeam: true,
              awayTeam: true,
            },
          },
          options: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.market.count({ where }),
    ]);

    // Check if markets should be closed based on match time
    const now = new Date();
    const updatedMarkets = markets.map(market => {
      const matchDate = new Date(market.match.date);
      const oneHourBeforeMatch = new Date(matchDate.getTime() - 60 * 60 * 1000);
      
      if (market.status === "ACTIVE" && now >= oneHourBeforeMatch) {
        return {
          ...market,
          status: "CLOSED",
        };
      }
      return market;
    });

    return NextResponse.json({
      markets: updatedMarkets,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching markets:", error);
    return NextResponse.json(
      { error: "Failed to fetch markets" },
      { status: 500 }
    );
  }
} 