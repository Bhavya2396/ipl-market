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
        date: {
          gt: new Date(),
        },
        status: "UPCOMING",
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        markets: {
          include: {
            options: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // Format the data for export
    const exportData = matches.map((match) => ({
      matchId: match.id,
      matchTitle: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      date: match.date,
      venue: match.venue,
      city: match.city,
      markets: match.markets.map((market) => ({
        marketId: market.id,
        type: market.type,
        title: market.title,
        description: market.description,
        options: market.options.map(option => ({
          id: option.id,
          label: option.label,
        })),
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