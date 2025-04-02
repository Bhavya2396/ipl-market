import { PrismaClient, MatchStatus } from '@prisma/client';

const prisma = new PrismaClient();

const matches = [
  {
    matchNumber: 13,
    date: new Date('2024-04-01T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Lucknow Super Giants',
    awayTeam: 'Punjab Kings',
    venue: 'Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium',
    city: 'Lucknow'
  },
  {
    matchNumber: 14,
    date: new Date('2024-04-02T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Gujarat Titans',
    venue: 'M Chinnaswamy Stadium',
    city: 'Bengaluru'
  },
  {
    matchNumber: 15,
    date: new Date('2024-04-03T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Sunrisers Hyderabad',
    venue: 'Eden Gardens',
    city: 'Kolkata'
  },
  {
    matchNumber: 16,
    date: new Date('2024-04-04T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Lucknow Super Giants',
    awayTeam: 'Mumbai Indians',
    venue: 'Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium',
    city: 'Lucknow'
  },
  {
    matchNumber: 17,
    date: new Date('2024-04-05T10:00:00.000Z'), // 3:30 PM IST
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Delhi Capitals',
    venue: 'MA Chidambaram Stadium',
    city: 'Chennai'
  },
  {
    matchNumber: 18,
    date: new Date('2024-04-05T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Punjab Kings',
    awayTeam: 'Rajasthan Royals',
    venue: 'New PCA Stadium',
    city: 'New Chandigarh'
  },
  {
    matchNumber: 19,
    date: new Date('2024-04-06T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Gujarat Titans',
    venue: 'Rajiv Gandhi International Stadium',
    city: 'Hyderabad'
  },
  {
    matchNumber: 20,
    date: new Date('2024-04-07T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Mumbai Indians',
    awayTeam: 'Royal Challengers Bengaluru',
    venue: 'Wankhede Stadium',
    city: 'Mumbai'
  },
  {
    matchNumber: 21,
    date: new Date('2024-04-08T10:00:00.000Z'), // 3:30 PM IST
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Lucknow Super Giants',
    venue: 'Eden Gardens',
    city: 'Kolkata'
  },
  {
    matchNumber: 22,
    date: new Date('2024-04-08T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Punjab Kings',
    awayTeam: 'Chennai Super Kings',
    venue: 'New PCA Stadium',
    city: 'New Chandigarh'
  },
  // Matches 23-70 follow the same pattern
  // I'll add more matches continuing from here
  {
    matchNumber: 23,
    date: new Date('2024-04-09T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Rajasthan Royals',
    venue: 'Narendra Modi Stadium',
    city: 'Ahmedabad'
  },
  {
    matchNumber: 24,
    date: new Date('2024-04-10T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Delhi Capitals',
    venue: 'M Chinnaswamy Stadium',
    city: 'Bengaluru'
  },
  {
    matchNumber: 25,
    date: new Date('2024-04-11T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Kolkata Knight Riders',
    venue: 'MA Chidambaram Stadium',
    city: 'Chennai'
  },
  {
    matchNumber: 26,
    date: new Date('2024-04-12T10:00:00.000Z'), // 3:30 PM IST
    homeTeam: 'Lucknow Super Giants',
    awayTeam: 'Gujarat Titans',
    venue: 'Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium',
    city: 'Lucknow'
  },
  {
    matchNumber: 27,
    date: new Date('2024-04-12T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Punjab Kings',
    venue: 'Rajiv Gandhi International Stadium',
    city: 'Hyderabad'
  },
  {
    matchNumber: 28,
    date: new Date('2024-04-13T10:00:00.000Z'), // 3:30 PM IST
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Royal Challengers Bengaluru',
    venue: 'Sawai Mansingh Stadium',
    city: 'Jaipur'
  },
  {
    matchNumber: 29,
    date: new Date('2024-04-13T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Mumbai Indians',
    venue: 'Arun Jaitley Stadium',
    city: 'Delhi'
  },
  {
    matchNumber: 30,
    date: new Date('2024-04-14T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Lucknow Super Giants',
    awayTeam: 'Chennai Super Kings',
    venue: 'Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium',
    city: 'Lucknow'
  },
  {
    matchNumber: 31,
    date: new Date('2024-04-15T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Punjab Kings',
    awayTeam: 'Kolkata Knight Riders',
    venue: 'New PCA Stadium',
    city: 'New Chandigarh'
  },
  {
    matchNumber: 32,
    date: new Date('2024-04-16T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Rajasthan Royals',
    venue: 'Arun Jaitley Stadium',
    city: 'Delhi'
  },
  // Continuing with more matches...
  {
    matchNumber: 33,
    date: new Date('2024-04-17T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Mumbai Indians',
    awayTeam: 'Sunrisers Hyderabad',
    venue: 'Wankhede Stadium',
    city: 'Mumbai'
  },
  {
    matchNumber: 34,
    date: new Date('2024-04-18T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Punjab Kings',
    venue: 'M Chinnaswamy Stadium',
    city: 'Bengaluru'
  },
  {
    matchNumber: 35,
    date: new Date('2024-04-19T10:00:00.000Z'), // 3:30 PM IST
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Delhi Capitals',
    venue: 'Narendra Modi Stadium',
    city: 'Ahmedabad'
  },
  {
    matchNumber: 36,
    date: new Date('2024-04-19T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Lucknow Super Giants',
    venue: 'Sawai Mansingh Stadium',
    city: 'Jaipur'
  },
  {
    matchNumber: 37,
    date: new Date('2024-04-20T10:00:00.000Z'), // 3:30 PM IST
    homeTeam: 'Punjab Kings',
    awayTeam: 'Royal Challengers Bengaluru',
    venue: 'New PCA Stadium',
    city: 'New Chandigarh'
  },
  {
    matchNumber: 38,
    date: new Date('2024-04-20T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Mumbai Indians',
    awayTeam: 'Chennai Super Kings',
    venue: 'Wankhede Stadium',
    city: 'Mumbai'
  },
  {
    matchNumber: 39,
    date: new Date('2024-04-21T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Gujarat Titans',
    venue: 'Eden Gardens',
    city: 'Kolkata'
  },
  {
    matchNumber: 40,
    date: new Date('2024-04-22T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Lucknow Super Giants',
    awayTeam: 'Delhi Capitals',
    venue: 'Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium',
    city: 'Lucknow'
  },
  {
    matchNumber: 41,
    date: new Date('2024-04-23T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Mumbai Indians',
    venue: 'Rajiv Gandhi International Stadium',
    city: 'Hyderabad'
  },
  {
    matchNumber: 42,
    date: new Date('2024-04-24T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Rajasthan Royals',
    venue: 'M Chinnaswamy Stadium',
    city: 'Bengaluru'
  },
  {
    matchNumber: 43,
    date: new Date('2024-04-25T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Sunrisers Hyderabad',
    venue: 'MA Chidambaram Stadium',
    city: 'Chennai'
  },
  {
    matchNumber: 44,
    date: new Date('2024-04-26T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Punjab Kings',
    venue: 'Eden Gardens',
    city: 'Kolkata'
  },
  {
    matchNumber: 45,
    date: new Date('2024-04-27T10:00:00.000Z'), // 3:30 PM IST
    homeTeam: 'Mumbai Indians',
    awayTeam: 'Lucknow Super Giants',
    venue: 'Wankhede Stadium',
    city: 'Mumbai'
  },
  {
    matchNumber: 46,
    date: new Date('2024-04-27T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Royal Challengers Bengaluru',
    venue: 'Arun Jaitley Stadium',
    city: 'Delhi'
  },
  {
    matchNumber: 47,
    date: new Date('2024-04-28T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Gujarat Titans',
    venue: 'Sawai Mansingh Stadium',
    city: 'Jaipur'
  },
  {
    matchNumber: 48,
    date: new Date('2024-04-29T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Kolkata Knight Riders',
    venue: 'Arun Jaitley Stadium',
    city: 'Delhi'
  },
  {
    matchNumber: 49,
    date: new Date('2024-04-30T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Punjab Kings',
    venue: 'MA Chidambaram Stadium',
    city: 'Chennai'
  },
  {
    matchNumber: 50,
    date: new Date('2024-05-01T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Mumbai Indians',
    venue: 'Sawai Mansingh Stadium',
    city: 'Jaipur'
  },
  {
    matchNumber: 51,
    date: new Date('2024-05-02T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Sunrisers Hyderabad',
    venue: 'Narendra Modi Stadium',
    city: 'Ahmedabad'
  },
  {
    matchNumber: 52,
    date: new Date('2024-05-03T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Chennai Super Kings',
    venue: 'M Chinnaswamy Stadium',
    city: 'Bengaluru'
  },
  {
    matchNumber: 53,
    date: new Date('2024-05-04T10:00:00.000Z'), // 3:30 PM IST
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Rajasthan Royals',
    venue: 'Eden Gardens',
    city: 'Kolkata'
  },
  {
    matchNumber: 54,
    date: new Date('2024-05-04T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Punjab Kings',
    awayTeam: 'Lucknow Super Giants',
    venue: 'Himachal Pradesh Cricket Association Stadium',
    city: 'Dharamsala'
  },
  {
    matchNumber: 55,
    date: new Date('2024-05-05T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Delhi Capitals',
    venue: 'Rajiv Gandhi International Stadium',
    city: 'Hyderabad'
  },
  {
    matchNumber: 56,
    date: new Date('2024-05-06T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Mumbai Indians',
    awayTeam: 'Gujarat Titans',
    venue: 'Wankhede Stadium',
    city: 'Mumbai'
  },
  {
    matchNumber: 57,
    date: new Date('2024-05-07T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Chennai Super Kings',
    venue: 'Eden Gardens',
    city: 'Kolkata'
  },
  {
    matchNumber: 58,
    date: new Date('2024-05-08T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Punjab Kings',
    awayTeam: 'Delhi Capitals',
    venue: 'Himachal Pradesh Cricket Association Stadium',
    city: 'Dharamsala'
  },
  {
    matchNumber: 59,
    date: new Date('2024-05-09T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Lucknow Super Giants',
    awayTeam: 'Royal Challengers Bengaluru',
    venue: 'Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium',
    city: 'Lucknow'
  },
  {
    matchNumber: 60,
    date: new Date('2024-05-10T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Kolkata Knight Riders',
    venue: 'Rajiv Gandhi International Stadium',
    city: 'Hyderabad'
  },
  {
    matchNumber: 61,
    date: new Date('2024-05-11T10:00:00.000Z'), // 3:30 PM IST
    homeTeam: 'Punjab Kings',
    awayTeam: 'Mumbai Indians',
    venue: 'Himachal Pradesh Cricket Association Stadium',
    city: 'Dharamsala'
  },
  {
    matchNumber: 62,
    date: new Date('2024-05-11T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Gujarat Titans',
    venue: 'Arun Jaitley Stadium',
    city: 'Delhi'
  },
  {
    matchNumber: 63,
    date: new Date('2024-05-12T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Rajasthan Royals',
    venue: 'MA Chidambaram Stadium',
    city: 'Chennai'
  },
  {
    matchNumber: 64,
    date: new Date('2024-05-13T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Sunrisers Hyderabad',
    venue: 'M Chinnaswamy Stadium',
    city: 'Bengaluru'
  },
  {
    matchNumber: 65,
    date: new Date('2024-05-14T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Lucknow Super Giants',
    venue: 'Narendra Modi Stadium',
    city: 'Ahmedabad'
  },
  {
    matchNumber: 66,
    date: new Date('2024-05-15T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Mumbai Indians',
    awayTeam: 'Delhi Capitals',
    venue: 'Wankhede Stadium',
    city: 'Mumbai'
  },
  {
    matchNumber: 67,
    date: new Date('2024-05-16T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Punjab Kings',
    venue: 'Sawai Mansingh Stadium',
    city: 'Jaipur'
  },
  {
    matchNumber: 68,
    date: new Date('2024-05-17T14:00:00.000Z'), // 7:30 PM IST
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Kolkata Knight Riders',
    venue: 'M Chinnaswamy Stadium',
    city: 'Bengaluru'
  },
  {
    matchNumber: 69,
    date: new Date('2024-05-18T10:00:00.000Z'), // 3:30 PM IST
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Chennai Super Kings',
    venue: 'Narendra Modi Stadium',
    city: 'Ahmedabad'
  }
];

const MARKET_TYPES = [
  {
    type: "MATCH_WINNER",
    title: "Match Winner",
    description: "Predict the winner of the match",
    options: ["Home Team", "Away Team"],
  },
  {
    type: "HIGHEST_RUN_SCORER",
    title: "Highest Run Scorer",
    description: "Predict the player who will score the most runs",
    options: ["Home Team", "Away Team"],
  },
  {
    type: "HIGHEST_WICKET_TAKER",
    title: "Highest Wicket Taker",
    description: "Predict the player who will take the most wickets",
    options: ["Home Team", "Away Team"],
  },
  {
    type: "TWO_HUNDRED_RUNS_BARRIER",
    title: "200 Runs Barrier",
    description: "Predict if any team will score 200 or more runs",
    options: ["Yes", "No"],
  },
];

async function main() {
  console.log('🌱 Starting IPL match seed...');

  // Get all teams
  const teams = await prisma.team.findMany();
  const teamMap = new Map();
  teams.forEach(team => {
    teamMap.set(team.name, team.id);
  });

  // Create matches
  console.log('Creating matches...');
  for (const match of matches) {
    const homeTeamId = teamMap.get(match.homeTeam);
    const awayTeamId = teamMap.get(match.awayTeam);

    if (!homeTeamId || !awayTeamId) {
      console.log(`⚠️ Could not find team IDs for ${match.homeTeam} vs ${match.awayTeam}`);
      continue;
    }

    try {
      const createdMatch = await prisma.match.upsert({
        where: {
          date_homeTeamId_awayTeamId: {
            date: match.date,
            homeTeamId,
            awayTeamId,
          },
        },
        update: {
          venue: match.venue,
          city: match.city,
          status: MatchStatus.UPCOMING,
        },
        create: {
          date: match.date,
          homeTeamId,
          awayTeamId,
          venue: match.venue,
          city: match.city,
          status: MatchStatus.UPCOMING,
          details: {
            create: {},
          },
        },
      });

      // Create markets for the match
      for (const marketType of MARKET_TYPES) {
        await prisma.market.upsert({
          where: {
            matchId_type: {
              matchId: createdMatch.id,
              type: marketType.type,
            },
          },
          update: {},
          create: {
            matchId: createdMatch.id,
            type: marketType.type as any,
            title: marketType.title,
            description: marketType.description,
            status: "ACTIVE",
            options: {
              create: marketType.options.map(label => ({
                label,
              })),
            },
          },
        });
      }

      console.log(`✅ Created match #${match.matchNumber}: ${match.homeTeam} vs ${match.awayTeam}`);
    } catch (error) {
      console.error(`❌ Error creating match #${match.matchNumber}:`, error);
    }
  }

  console.log('✅ IPL match seed completed');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 