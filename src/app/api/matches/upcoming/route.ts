import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { handler } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MatchStatus } from "@prisma/client";
import { Session } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(handler) as Session;
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get matches scheduled for today and future dates
    const matches = await prisma.match.findMany({
      where: {
        date: {
          gte: today,
        },
        status: MatchStatus.UPCOMING,
      },
      include: {
        homeTeam: {
          select: {
            id: true,
            name: true,
          },
        },
        awayTeam: {
          select: {
            id: true,
            name: true,
          },
        },
        markets: {
          include: {
            options: {
              select: {
                id: true,
                label: true,
                predictions: {
                  where: {
                    userId: session.user.id,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // Transform the data to include odds and remove user-specific predictions
    const transformedMatches = matches.map(match => ({
      ...match,
      markets: match.markets.map(market => ({
        ...market,
        options: market.options.map(option => ({
          id: option.id,
          title: option.label,
          odds: 1.0, // TODO: Implement odds calculation
        })),
      })),
    }));

    return NextResponse.json({ matches: transformedMatches });
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 