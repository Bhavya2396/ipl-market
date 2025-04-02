import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { handler } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(handler);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        totalPoints: true,
        totalPredictions: true,
        correctPredictions: true,
        rank: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const successRate = user.totalPredictions > 0
      ? Math.round((user.correctPredictions / user.totalPredictions) * 100)
      : 0;

    return NextResponse.json({
      totalPoints: user.totalPoints,
      totalPredictions: user.totalPredictions,
      correctPredictions: user.correctPredictions,
      successRate,
      rank: user.rank,
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch user stats" },
      { status: 500 }
    );
  }
} 