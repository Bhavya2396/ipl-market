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

    const predictions = await prisma.prediction.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        market: {
          include: {
            match: {
              include: {
                homeTeam: true,
                awayTeam: true,
              },
            },
          },
        },
        option: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(predictions);
  } catch (error) {
    console.error("Error fetching user predictions:", error);
    return NextResponse.json(
      { error: "Failed to fetch user predictions" },
      { status: 500 }
    );
  }
} 