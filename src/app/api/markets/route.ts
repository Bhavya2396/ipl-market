import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type MarketStatus = "ACTIVE" | "CLOSED" | "RESOLVED" | "CANCELLED";

interface MarketWhereInput {
  status?: MarketStatus;
  matchId?: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const status = statusParam as MarketStatus | null;
    const matchId = searchParams.get("matchId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: MarketWhereInput = {};
    if (status) where.status = status;
    if (matchId) where.matchId = matchId;

    const [markets, total] = await Promise.all([
      prisma.market.findMany({
        where,
        include: {
          options: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.market.count({ where }),
    ]);

    return NextResponse.json({
      markets,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching markets:", error);
    return NextResponse.json(
      { error: "Failed to fetch markets" },
      { status: 500 }
    );
  }
} 