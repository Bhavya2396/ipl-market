import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MatchStatus, Prisma } from "@prisma/client";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const status = statusParam as MatchStatus | null;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where = status ? { status } : {};

    const [matches, total] = await Promise.all([
      prisma.match.findMany({
        where,
        include: {
          homeTeam: true,
          awayTeam: true,
          markets: {
            where: {
              status: "ACTIVE",
            },
            include: {
              options: true,
            },
          },
        } as Prisma.MatchInclude,
        orderBy: {
          date: "asc",
        },
        skip,
        take: limit,
      }),
      prisma.match.count({ where }),
    ]);

    return NextResponse.json({
      matches,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
} 