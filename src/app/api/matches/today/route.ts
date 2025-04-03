import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MatchStatus, MarketType, MarketStatus } from "@prisma/client";

export async function GET() {
  try {
    // Get today's date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get tomorrow's date at midnight
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Fetch matches scheduled for today
    const matches = await prisma.match.findMany({
      where: {
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        homeTeam: {
          select: {
            id: true,
            name: true,
            shortName: true,
            players: {
              select: {
                id: true,
                name: true,
                shortName: true,
                role: true,
              },
            },
          },
        },
        awayTeam: {
          select: {
            id: true,
            name: true,
            shortName: true,
            players: {
              select: {
                id: true,
                name: true,
                shortName: true,
                role: true,
              },
            },
          },
        },
        markets: {
          where: {
            status: MarketStatus.ACTIVE,
            opensAt: {
              lte: new Date(),
            },
            closesAt: {
              gt: new Date(),
            },
          },
          include: {
            options: {
              select: {
                id: true,
                label: true,
                player: {
                  select: {
                    id: true,
                    name: true,
                    shortName: true,
                    role: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Format the matches data
    const formattedMatches = matches.map(match => ({
      id: match.id,
      date: match.date.toISOString(),
      venue: match.venue,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      status: match.status,
      markets: match.markets.map(market => ({
        id: market.id,
        type: market.type as MarketType,
        title: market.title,
        description: market.description,
        opensAt: market.opensAt.toISOString(),
        closesAt: market.closesAt.toISOString(),
        options: market.options.map(option => ({
          id: option.id,
          label: option.label,
          player: option.player,
        })),
      })),
    }));

    return NextResponse.json({ matches: formattedMatches });
  } catch (error) {
    console.error("Error fetching today's matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch today's matches" },
      { status: 500 }
    );
  }
} 