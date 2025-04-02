import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validatePredictions } from "@/lib/match-results";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all matches that ended today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const matches = await prisma.match.findMany({
      where: {
        date: {
          gte: today,
          lt: tomorrow,
        },
        status: "SCHEDULED",
      },
    });

    // Validate predictions for each match
    const results = await Promise.all(
      matches.map(async (match) => {
        const success = await validatePredictions(match.id);
        return {
          matchId: match.id,
          success,
        };
      })
    );

    return NextResponse.json({
      message: "Match validation completed",
      results,
    });
  } catch (error) {
    console.error("Error in match validation cron:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 