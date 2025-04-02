import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all upcoming matches
    const matches = await prisma.match.findMany({
      where: {
        startTime: {
          gt: new Date(),
        },
        status: "SCHEDULED",
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        venue: true,
        markets: {
          where: {
            status: "OPEN",
          },
          include: {
            type: true,
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    // Format the data for export
    const exportData = matches.map((match) => ({
      matchId: match.id,
      matchTitle: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      startTime: match.startTime,
      venue: match.venue.name,
      markets: match.markets.map((market) => ({
        marketId: market.id,
        type: market.type.name,
        description: market.description,
        options: market.options,
        odds: market.odds,
      })),
    }));

    return NextResponse.json(exportData);
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export prediction data" },
      { status: 500 }
    );
  }
} 