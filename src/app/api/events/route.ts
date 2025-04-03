import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const matchId = searchParams.get("matchId");
  const marketId = searchParams.get("marketId");

  if (!matchId && !marketId) {
    return NextResponse.json(
      { error: "Match ID or Market ID is required" },
      { status: 400 }
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // Initial data fetch
      if (matchId) {
        const match = await prisma.match.findUnique({
          where: { id: matchId },
          include: {
            homeTeam: true,
            awayTeam: true,
            markets: {
              where: { status: "ACTIVE" },
              include: { options: true },
            },
          },
        });
        if (match) {
          sendEvent({ type: "MATCH_UPDATE", data: match });
        }
      }

      if (marketId) {
        const market = await prisma.market.findUnique({
          where: { id: marketId },
          include: {
            match: {
              include: {
                homeTeam: true,
                awayTeam: true,
              },
            },
            options: true,
          },
        });
        if (market) {
          sendEvent({ type: "MARKET_UPDATE", data: market });
        }
      }

      // Set up polling interval
      const interval = setInterval(async () => {
        try {
          if (matchId) {
            const match = await prisma.match.findUnique({
              where: { id: matchId },
              include: {
                homeTeam: true,
                awayTeam: true,
                markets: {
                  where: { status: "ACTIVE" },
                  include: { options: true },
                },
              },
            });
            if (match) {
              sendEvent({ type: "MATCH_UPDATE", data: match });
            }
          }

          if (marketId) {
            const market = await prisma.market.findUnique({
              where: { id: marketId },
              include: {
                match: {
                  include: {
                    homeTeam: true,
                    awayTeam: true,
                  },
                },
                options: true,
              },
            });
            if (market) {
              sendEvent({ type: "MARKET_UPDATE", data: market });
            }
          }
        } catch (error) {
          console.error("Error in SSE polling:", error);
        }
      }, 5000); // Poll every 5 seconds

      // Clean up on client disconnect
      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
} 