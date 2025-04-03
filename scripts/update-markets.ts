import { PrismaClient, MarketType, MarketStatus } from "@prisma/client";
import { addHours, setHours, setMinutes, setSeconds, setMilliseconds, format } from "date-fns";
import { toZonedTime, toDate } from 'date-fns-tz';

const prisma = new PrismaClient();
const IST_TIMEZONE = 'Asia/Kolkata';

async function updateMarketTimings() {
  try {
    // Get all upcoming matches
    const matches = await prisma.match.findMany({
      where: {
        status: "UPCOMING",
      },
      include: {
        homeTeam: {
          include: {
            players: {
              where: {
                isPlaying: true
              }
            },
          },
        },
        awayTeam: {
          include: {
            players: {
              where: {
                isPlaying: true
              }
            },
          },
        },
      },
    });

    for (const match of matches) {
      // Convert match time to IST
      const matchTimeIST = toZonedTime(match.date, IST_TIMEZONE);
      
      // Set market opening time to 12 AM IST on match day
      const opensAt = toDate(
        setHours(
          setMinutes(
            setSeconds(
              setMilliseconds(matchTimeIST, 0),
              0
            ),
            0
          ),
          0
        ),
        { timeZone: IST_TIMEZONE }
      );

      // Set market closing time to 1 hour before match start in IST
      const closesAt = toDate(
        addHours(matchTimeIST, -1),
        { timeZone: IST_TIMEZONE }
      );

      console.log(`Updating markets for match: ${match.homeTeam.name} vs ${match.awayTeam.name}`);
      console.log(`Match time (IST): ${format(matchTimeIST, 'yyyy-MM-dd HH:mm:ss')}`);
      console.log(`Market opens (IST): ${format(toZonedTime(opensAt, IST_TIMEZONE), 'yyyy-MM-dd HH:mm:ss')}`);
      console.log(`Market closes (IST): ${format(toZonedTime(closesAt, IST_TIMEZONE), 'yyyy-MM-dd HH:mm:ss')}`);

      // Update or create match winner market
      await prisma.market.upsert({
        where: {
          matchId_type: {
            matchId: match.id,
            type: MarketType.MATCH_WINNER,
          },
        },
        update: {
          status: MarketStatus.ACTIVE,
          opensAt,
          closesAt,
        },
        create: {
          matchId: match.id,
          type: MarketType.MATCH_WINNER,
          title: "Match Winner",
          description: "Predict the winner of the match",
          status: MarketStatus.ACTIVE,
          opensAt,
          closesAt,
          options: {
            create: [
              { label: match.homeTeam.name },
              { label: match.awayTeam.name },
            ],
          },
        },
      });

      // Create player options for run scorer market
      const runScorerOptions = [
        ...match.homeTeam.players.map(player => ({
          label: `${player.name} (${match.homeTeam.shortName})`,
          player: {
            connect: {
              id: player.id
            }
          }
        })),
        ...match.awayTeam.players.map(player => ({
          label: `${player.name} (${match.awayTeam.shortName})`,
          player: {
            connect: {
              id: player.id
            }
          }
        }))
      ];

      // Update or create highest run scorer market
      await prisma.market.upsert({
        where: {
          matchId_type: {
            matchId: match.id,
            type: MarketType.HIGHEST_RUN_SCORER,
          },
        },
        update: {
          status: MarketStatus.ACTIVE,
          opensAt,
          closesAt,
        },
        create: {
          matchId: match.id,
          type: MarketType.HIGHEST_RUN_SCORER,
          title: "Highest Run Scorer",
          description: "Predict the player who will score the most runs",
          status: MarketStatus.ACTIVE,
          opensAt,
          closesAt,
          options: {
            create: runScorerOptions,
          },
        },
      });

      // Create player options for wicket taker market
      const wicketTakerOptions = [
        ...match.homeTeam.players.map(player => ({
          label: `${player.name} (${match.homeTeam.shortName})`,
          player: {
            connect: {
              id: player.id
            }
          }
        })),
        ...match.awayTeam.players.map(player => ({
          label: `${player.name} (${match.awayTeam.shortName})`,
          player: {
            connect: {
              id: player.id
            }
          }
        }))
      ];

      // Update or create highest wicket taker market
      await prisma.market.upsert({
        where: {
          matchId_type: {
            matchId: match.id,
            type: MarketType.HIGHEST_WICKET_TAKER,
          },
        },
        update: {
          status: MarketStatus.ACTIVE,
          opensAt,
          closesAt,
        },
        create: {
          matchId: match.id,
          type: MarketType.HIGHEST_WICKET_TAKER,
          title: "Highest Wicket Taker",
          description: "Predict the player who will take the most wickets",
          status: MarketStatus.ACTIVE,
          opensAt,
          closesAt,
          options: {
            create: wicketTakerOptions,
          },
        },
      });

      // Update or create 200 runs barrier market
      await prisma.market.upsert({
        where: {
          matchId_type: {
            matchId: match.id,
            type: MarketType.TWO_HUNDRED_RUNS_BARRIER,
          },
        },
        update: {
          status: MarketStatus.ACTIVE,
          opensAt,
          closesAt,
        },
        create: {
          matchId: match.id,
          type: MarketType.TWO_HUNDRED_RUNS_BARRIER,
          title: "200 Runs Barrier",
          description: "Will any team score 200 or more runs?",
          status: MarketStatus.ACTIVE,
          opensAt,
          closesAt,
          options: {
            create: [
              { label: "Yes" },
              { label: "No" },
            ],
          },
        },
      });
    }

    console.log("Successfully updated market timings and options");
  } catch (error) {
    console.error("Error updating market timings:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateMarketTimings(); 