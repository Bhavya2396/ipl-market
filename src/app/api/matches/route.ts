import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MatchStatus, Prisma } from "@prisma/client";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const status = statusParam as MatchStatus | null;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Get current date at midnight
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const where: Prisma.MatchWhereInput = {
      date: {
        gte: now,
        lt: tomorrow,
      },
      ...(status ? { status } : {}),
    };

    const [matches, total] = await Promise.all([
      prisma.match.findMany({
        where,
        include: {
          homeTeam: {
            select: {
              id: true,
              name: true,
              shortName: true,
              logo: true,
            },
          },
          awayTeam: {
            select: {
              id: true,
              name: true,
              shortName: true,
              logo: true,
            },
          },
          markets: {
            where: {
              status: "ACTIVE",
              type: {
                in: ["MATCH_WINNER", "HIGHEST_RUN_SCORER", "HIGHEST_WICKET_TAKER", "TWO_HUNDRED_RUNS_BARRIER"]
              }
            },
            include: {
              options: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
        skip,
        take: limit,
      }),
      prisma.match.count({ where }),
    ]);

    // Transform the matches data
    const transformedMatches = matches.map(match => ({
      ...match,
      markets: match.markets.map(market => ({
        ...market,
        description: getMarketDescription(market.type),
        options: market.options.map(option => ({
          ...option,
          title: option.label,
          odds: 1.0, // TODO: Implement odds calculation
        })),
      })),
    }));

    return NextResponse.json({
      matches: transformedMatches,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}

function getMarketDescription(type: string): string {
  switch (type) {
    case "MATCH_WINNER":
      return "Predict which team will win the match";
    case "HIGHEST_RUN_SCORER":
      return "Predict which player will score the most runs in the match";
    case "HIGHEST_WICKET_TAKER":
      return "Predict which player will take the most wickets in the match";
    case "TWO_HUNDRED_RUNS_BARRIER":
      return "Predict if any team will score 200 or more runs in the match";
    default:
      return "";
  }
} 