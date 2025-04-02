import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { handler } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(handler) as Session;
    
    // Get match data without requiring authentication
    const match = await prisma.match.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        date: true,
        venue: true,
        city: true,
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
          select: {
            id: true,
            title: true,
            type: true,
            options: {
              select: {
                id: true,
                label: true,
                predictions: session?.user?.id ? {
                  where: {
                    userId: session.user.id,
                  },
                  select: {
                    id: true,
                  },
                } : false,
              },
            },
          },
        },
      },
    });

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    // Transform the data to include user's predictions if authenticated
    const transformedMatch = {
      id: match.id,
      matchNumber: parseInt(params.id.split('-').pop() || '0'),
      date: match.date.toISOString(),
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      venue: match.venue,
      city: match.city,
      markets: match.markets.map(market => ({
        id: market.id,
        title: market.title,
        type: market.type,
        description: getMarketDescription(market.type),
        options: market.options.map(option => ({
          id: option.id,
          title: option.label,
          odds: 1.0, // TODO: Implement odds calculation
          isSelected: session?.user?.id ? option.predictions?.length > 0 : false,
        })),
      })),
    };

    return NextResponse.json({ match: transformedMatch });
  } catch (error) {
    console.error("Error fetching match:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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