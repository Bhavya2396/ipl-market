import { PrismaClient, PlayerRole, MarketType } from '@prisma/client'

const prisma = new PrismaClient()

const teams = [
  {
    name: 'Mumbai Indians',
    shortName: 'MI',
    logo: 'https://example.com/mi-logo.png',
  },
  {
    name: 'Chennai Super Kings',
    shortName: 'CSK',
    logo: 'https://example.com/csk-logo.png',
  },
  {
    name: 'Royal Challengers Bangalore',
    shortName: 'RCB',
    logo: 'https://example.com/rcb-logo.png',
  },
  {
    name: 'Kolkata Knight Riders',
    shortName: 'KKR',
    logo: 'https://example.com/kkr-logo.png',
  },
  {
    name: 'Delhi Capitals',
    shortName: 'DC',
    logo: 'https://example.com/dc-logo.png',
  },
  {
    name: 'Punjab Kings',
    shortName: 'PBKS',
    logo: 'https://example.com/pbks-logo.png',
  },
  {
    name: 'Rajasthan Royals',
    shortName: 'RR',
    logo: 'https://example.com/rr-logo.png',
  },
  {
    name: 'Sunrisers Hyderabad',
    shortName: 'SRH',
    logo: 'https://example.com/srh-logo.png',
  },
  {
    name: 'Gujarat Titans',
    shortName: 'GT',
    logo: 'https://example.com/gt-logo.png',
  },
  {
    name: 'Lucknow Super Giants',
    shortName: 'LSG',
    logo: 'https://example.com/lsg-logo.png',
  },
]

const players = [
  // Mumbai Indians
  { name: 'Rohit Sharma', shortName: 'RS', role: PlayerRole.BATSMAN, teamName: 'Mumbai Indians' },
  { name: 'Jasprit Bumrah', shortName: 'JB', role: PlayerRole.BOWLER, teamName: 'Mumbai Indians' },
  { name: 'Suryakumar Yadav', shortName: 'SKY', role: PlayerRole.BATSMAN, teamName: 'Mumbai Indians' },
  { name: 'Hardik Pandya', shortName: 'HP', role: PlayerRole.ALL_ROUNDER, teamName: 'Mumbai Indians' },
  { name: 'Ishan Kishan', shortName: 'IK', role: PlayerRole.WICKET_KEEPER, teamName: 'Mumbai Indians' },
  { name: 'Tilak Varma', shortName: 'TV', role: PlayerRole.BATSMAN, teamName: 'Mumbai Indians' },
  { name: 'Piyush Chawla', shortName: 'PC', role: PlayerRole.BOWLER, teamName: 'Mumbai Indians' },
  { name: 'Tim David', shortName: 'TD', role: PlayerRole.BATSMAN, teamName: 'Mumbai Indians' },
  
  // Chennai Super Kings
  { name: 'MS Dhoni', shortName: 'MSD', role: PlayerRole.WICKET_KEEPER, teamName: 'Chennai Super Kings' },
  { name: 'Ravindra Jadeja', shortName: 'RJ', role: PlayerRole.ALL_ROUNDER, teamName: 'Chennai Super Kings' },
  { name: 'Ruturaj Gaikwad', shortName: 'RG', role: PlayerRole.BATSMAN, teamName: 'Chennai Super Kings' },
  { name: 'Deepak Chahar', shortName: 'DC', role: PlayerRole.BOWLER, teamName: 'Chennai Super Kings' },
  { name: 'Moeen Ali', shortName: 'MA', role: PlayerRole.ALL_ROUNDER, teamName: 'Chennai Super Kings' },
  { name: 'Shivam Dube', shortName: 'SD', role: PlayerRole.ALL_ROUNDER, teamName: 'Chennai Super Kings' },
  { name: 'Tushar Deshpande', shortName: 'TD', role: PlayerRole.BOWLER, teamName: 'Chennai Super Kings' },
  { name: 'Devon Conway', shortName: 'DC', role: PlayerRole.BATSMAN, teamName: 'Chennai Super Kings' },
  
  // Royal Challengers Bangalore
  { name: 'Virat Kohli', shortName: 'VK', role: PlayerRole.BATSMAN, teamName: 'Royal Challengers Bangalore' },
  { name: 'Faf du Plessis', shortName: 'FDP', role: PlayerRole.BATSMAN, teamName: 'Royal Challengers Bangalore' },
  { name: 'Glenn Maxwell', shortName: 'GM', role: PlayerRole.ALL_ROUNDER, teamName: 'Royal Challengers Bangalore' },
  { name: 'Mohammed Siraj', shortName: 'MS', role: PlayerRole.BOWLER, teamName: 'Royal Challengers Bangalore' },
  { name: 'Dinesh Karthik', shortName: 'DK', role: PlayerRole.WICKET_KEEPER, teamName: 'Royal Challengers Bangalore' },
  { name: 'Cameron Green', shortName: 'CG', role: PlayerRole.ALL_ROUNDER, teamName: 'Royal Challengers Bangalore' },
  { name: 'Wanindu Hasaranga', shortName: 'WH', role: PlayerRole.ALL_ROUNDER, teamName: 'Royal Challengers Bangalore' },
  { name: 'Josh Hazlewood', shortName: 'JH', role: PlayerRole.BOWLER, teamName: 'Royal Challengers Bangalore' },
  
  // Kolkata Knight Riders
  { name: 'Shreyas Iyer', shortName: 'SI', role: PlayerRole.BATSMAN, teamName: 'Kolkata Knight Riders' },
  { name: 'Andre Russell', shortName: 'AR', role: PlayerRole.ALL_ROUNDER, teamName: 'Kolkata Knight Riders' },
  { name: 'Sunil Narine', shortName: 'SN', role: PlayerRole.ALL_ROUNDER, teamName: 'Kolkata Knight Riders' },
  { name: 'Varun Chakravarthy', shortName: 'VC', role: PlayerRole.BOWLER, teamName: 'Kolkata Knight Riders' },
  { name: 'Venkatesh Iyer', shortName: 'VI', role: PlayerRole.ALL_ROUNDER, teamName: 'Kolkata Knight Riders' },
  { name: 'Nitish Rana', shortName: 'NR', role: PlayerRole.BATSMAN, teamName: 'Kolkata Knight Riders' },
  { name: 'Rinku Singh', shortName: 'RS', role: PlayerRole.BATSMAN, teamName: 'Kolkata Knight Riders' },
  { name: 'Shardul Thakur', shortName: 'ST', role: PlayerRole.ALL_ROUNDER, teamName: 'Kolkata Knight Riders' },
  
  // Delhi Capitals
  { name: 'Rishabh Pant', shortName: 'RP', role: PlayerRole.WICKET_KEEPER, teamName: 'Delhi Capitals' },
  { name: 'David Warner', shortName: 'DW', role: PlayerRole.BATSMAN, teamName: 'Delhi Capitals' },
  { name: 'Mitchell Marsh', shortName: 'MM', role: PlayerRole.ALL_ROUNDER, teamName: 'Delhi Capitals' },
  { name: 'Anrich Nortje', shortName: 'AN', role: PlayerRole.BOWLER, teamName: 'Delhi Capitals' },
  { name: 'Axar Patel', shortName: 'AP', role: PlayerRole.ALL_ROUNDER, teamName: 'Delhi Capitals' },
  { name: 'Prithvi Shaw', shortName: 'PS', role: PlayerRole.BATSMAN, teamName: 'Delhi Capitals' },
  { name: 'Kuldeep Yadav', shortName: 'KY', role: PlayerRole.BOWLER, teamName: 'Delhi Capitals' },
  { name: 'Lalit Yadav', shortName: 'LY', role: PlayerRole.ALL_ROUNDER, teamName: 'Delhi Capitals' },

  // Punjab Kings
  { name: 'Shikhar Dhawan', shortName: 'SD', role: PlayerRole.BATSMAN, teamName: 'Punjab Kings' },
  { name: 'Sam Curran', shortName: 'SC', role: PlayerRole.ALL_ROUNDER, teamName: 'Punjab Kings' },
  { name: 'Liam Livingstone', shortName: 'LL', role: PlayerRole.ALL_ROUNDER, teamName: 'Punjab Kings' },
  { name: 'Arshdeep Singh', shortName: 'AS', role: PlayerRole.BOWLER, teamName: 'Punjab Kings' },
  { name: 'Kagiso Rabada', shortName: 'KR', role: PlayerRole.BOWLER, teamName: 'Punjab Kings' },
  { name: 'Prabhsimran Singh', shortName: 'PS', role: PlayerRole.WICKET_KEEPER, teamName: 'Punjab Kings' },
  { name: 'Rahul Chahar', shortName: 'RC', role: PlayerRole.BOWLER, teamName: 'Punjab Kings' },
  { name: 'Jitesh Sharma', shortName: 'JS', role: PlayerRole.WICKET_KEEPER, teamName: 'Punjab Kings' },

  // Rajasthan Royals
  { name: 'Sanju Samson', shortName: 'SS', role: PlayerRole.WICKET_KEEPER, teamName: 'Rajasthan Royals' },
  { name: 'Jos Buttler', shortName: 'JB', role: PlayerRole.WICKET_KEEPER, teamName: 'Rajasthan Royals' },
  { name: 'Yuzvendra Chahal', shortName: 'YC', role: PlayerRole.BOWLER, teamName: 'Rajasthan Royals' },
  { name: 'Ravichandran Ashwin', shortName: 'RA', role: PlayerRole.ALL_ROUNDER, teamName: 'Rajasthan Royals' },
  { name: 'Trent Boult', shortName: 'TB', role: PlayerRole.BOWLER, teamName: 'Rajasthan Royals' },
  { name: 'Yashasvi Jaiswal', shortName: 'YJ', role: PlayerRole.BATSMAN, teamName: 'Rajasthan Royals' },
  { name: 'Shimron Hetmyer', shortName: 'SH', role: PlayerRole.BATSMAN, teamName: 'Rajasthan Royals' },
  { name: 'Prasidh Krishna', shortName: 'PK', role: PlayerRole.BOWLER, teamName: 'Rajasthan Royals' },

  // Sunrisers Hyderabad
  { name: 'Aiden Markram', shortName: 'AM', role: PlayerRole.BATSMAN, teamName: 'Sunrisers Hyderabad' },
  { name: 'Heinrich Klaasen', shortName: 'HK', role: PlayerRole.WICKET_KEEPER, teamName: 'Sunrisers Hyderabad' },
  { name: 'Bhuvneshwar Kumar', shortName: 'BK', role: PlayerRole.BOWLER, teamName: 'Sunrisers Hyderabad' },
  { name: 'T Natarajan', shortName: 'TN', role: PlayerRole.BOWLER, teamName: 'Sunrisers Hyderabad' },
  { name: 'Washington Sundar', shortName: 'WS', role: PlayerRole.ALL_ROUNDER, teamName: 'Sunrisers Hyderabad' },
  { name: 'Rahul Tripathi', shortName: 'RT', role: PlayerRole.BATSMAN, teamName: 'Sunrisers Hyderabad' },
  { name: 'Abdul Samad', shortName: 'AS', role: PlayerRole.BATSMAN, teamName: 'Sunrisers Hyderabad' },
  { name: 'Marco Jansen', shortName: 'MJ', role: PlayerRole.ALL_ROUNDER, teamName: 'Sunrisers Hyderabad' },

  // Gujarat Titans
  { name: 'Shubman Gill', shortName: 'SG', role: PlayerRole.BATSMAN, teamName: 'Gujarat Titans' },
  { name: 'Hardik Pandya', shortName: 'HP', role: PlayerRole.ALL_ROUNDER, teamName: 'Gujarat Titans' },
  { name: 'Rashid Khan', shortName: 'RK', role: PlayerRole.ALL_ROUNDER, teamName: 'Gujarat Titans' },
  { name: 'Mohammed Shami', shortName: 'MS', role: PlayerRole.BOWLER, teamName: 'Gujarat Titans' },
  { name: 'David Miller', shortName: 'DM', role: PlayerRole.BATSMAN, teamName: 'Gujarat Titans' },
  { name: 'Wriddhiman Saha', shortName: 'WS', role: PlayerRole.WICKET_KEEPER, teamName: 'Gujarat Titans' },
  { name: 'Alzarri Joseph', shortName: 'AJ', role: PlayerRole.BOWLER, teamName: 'Gujarat Titans' },
  { name: 'R Sai Kishore', shortName: 'RSK', role: PlayerRole.BOWLER, teamName: 'Gujarat Titans' },

  // Lucknow Super Giants
  { name: 'KL Rahul', shortName: 'KL', role: PlayerRole.WICKET_KEEPER, teamName: 'Lucknow Super Giants' },
  { name: 'Quinton de Kock', shortName: 'QDK', role: PlayerRole.WICKET_KEEPER, teamName: 'Lucknow Super Giants' },
  { name: 'Marcus Stoinis', shortName: 'MS', role: PlayerRole.ALL_ROUNDER, teamName: 'Lucknow Super Giants' },
  { name: 'Ravi Bishnoi', shortName: 'RB', role: PlayerRole.BOWLER, teamName: 'Lucknow Super Giants' },
  { name: 'Avesh Khan', shortName: 'AK', role: PlayerRole.BOWLER, teamName: 'Lucknow Super Giants' },
  { name: 'Deepak Hooda', shortName: 'DH', role: PlayerRole.ALL_ROUNDER, teamName: 'Lucknow Super Giants' },
  { name: 'Krunal Pandya', shortName: 'KP', role: PlayerRole.ALL_ROUNDER, teamName: 'Lucknow Super Giants' },
  { name: 'Mark Wood', shortName: 'MW', role: PlayerRole.BOWLER, teamName: 'Lucknow Super Giants' },
]

const matchSchedule = [
  {
    date: '2025-03-23T14:00:00Z',
    homeTeam: 'Mumbai Indians',
    awayTeam: 'Chennai Super Kings',
    venue: 'Wankhede Stadium',
    city: 'Mumbai',
  },
  {
    date: '2025-03-24T14:00:00Z',
    homeTeam: 'Royal Challengers Bangalore',
    awayTeam: 'Delhi Capitals',
    venue: 'M. Chinnaswamy Stadium',
    city: 'Bangalore',
  },
  {
    date: '2025-03-25T14:00:00Z',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Punjab Kings',
    venue: 'Eden Gardens',
    city: 'Kolkata',
  },
  {
    date: '2025-03-26T14:00:00Z',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Sunrisers Hyderabad',
    venue: 'Sawai Mansingh Stadium',
    city: 'Jaipur',
  },
  {
    date: '2025-03-27T14:00:00Z',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Lucknow Super Giants',
    venue: 'Narendra Modi Stadium',
    city: 'Ahmedabad',
  },
  {
    date: '2025-03-28T14:00:00Z',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Royal Challengers Bangalore',
    venue: 'M. A. Chidambaram Stadium',
    city: 'Chennai',
  },
  {
    date: '2025-03-29T14:00:00Z',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Kolkata Knight Riders',
    venue: 'Arun Jaitley Stadium',
    city: 'Delhi',
  },
  {
    date: '2025-03-30T14:00:00Z',
    homeTeam: 'Punjab Kings',
    awayTeam: 'Rajasthan Royals',
    venue: 'Punjab Cricket Association Stadium',
    city: 'Mohali',
  },
  {
    date: '2025-03-31T14:00:00Z',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Gujarat Titans',
    venue: 'Rajiv Gandhi International Stadium',
    city: 'Hyderabad',
  },
  {
    date: '2025-04-01T14:00:00Z',
    homeTeam: 'Lucknow Super Giants',
    awayTeam: 'Mumbai Indians',
    venue: 'Ekana Cricket Stadium',
    city: 'Lucknow',
  },

  // Week 2 Matches
  {
    date: '2025-04-02T14:00:00Z',
    homeTeam: 'Mumbai Indians',
    awayTeam: 'Royal Challengers Bangalore',
    venue: 'Wankhede Stadium',
    city: 'Mumbai',
  },
  {
    date: '2025-04-03T14:00:00Z',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Kolkata Knight Riders',
    venue: 'M. A. Chidambaram Stadium',
    city: 'Chennai',
  },
  {
    date: '2025-04-04T14:00:00Z',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Punjab Kings',
    venue: 'Arun Jaitley Stadium',
    city: 'Delhi',
  },
  {
    date: '2025-04-05T14:00:00Z',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Gujarat Titans',
    venue: 'Sawai Mansingh Stadium',
    city: 'Jaipur',
  },
  {
    date: '2025-04-06T14:00:00Z',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Lucknow Super Giants',
    venue: 'Rajiv Gandhi International Stadium',
    city: 'Hyderabad',
  },
  {
    date: '2025-04-07T14:00:00Z',
    homeTeam: 'Royal Challengers Bangalore',
    awayTeam: 'Kolkata Knight Riders',
    venue: 'M. Chinnaswamy Stadium',
    city: 'Bangalore',
  },
  {
    date: '2025-04-08T14:00:00Z',
    homeTeam: 'Punjab Kings',
    awayTeam: 'Mumbai Indians',
    venue: 'Punjab Cricket Association Stadium',
    city: 'Mohali',
  },
  {
    date: '2025-04-09T14:00:00Z',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Chennai Super Kings',
    venue: 'Narendra Modi Stadium',
    city: 'Ahmedabad',
  },
  {
    date: '2025-04-10T14:00:00Z',
    homeTeam: 'Lucknow Super Giants',
    awayTeam: 'Delhi Capitals',
    venue: 'Ekana Cricket Stadium',
    city: 'Lucknow',
  },
  {
    date: '2025-04-11T14:00:00Z',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Rajasthan Royals',
    venue: 'Rajiv Gandhi International Stadium',
    city: 'Hyderabad',
  },
]

async function main() {
  // Create teams
  for (const team of teams) {
    await prisma.team.upsert({
      where: { name: team.name },
      update: {},
      create: team,
    })
  }

  // Create players
  for (const player of players) {
    const team = await prisma.team.findUnique({
      where: { name: player.teamName },
    })

    if (team) {
      const existingPlayer = await prisma.player.findFirst({
        where: { name: player.name },
      })

      if (existingPlayer) {
        await prisma.player.update({
          where: { id: existingPlayer.id },
          data: {
            role: player.role,
            teamId: team.id,
          },
        })
      } else {
        await prisma.player.create({
          data: {
            name: player.name,
            shortName: player.shortName,
            role: player.role,
            teamId: team.id,
            isPlaying: true,
          },
        })
      }
    }
  }

  // Create matches and markets
  for (const match of matchSchedule) {
    const homeTeam = await prisma.team.findUnique({
      where: { name: match.homeTeam },
    })
    const awayTeam = await prisma.team.findUnique({
      where: { name: match.awayTeam },
    })

    if (homeTeam && awayTeam) {
      const matchRecord = await prisma.match.create({
        data: {
          date: new Date(match.date),
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          venue: match.venue,
          city: match.city,
          details: {
            create: {
              tossWinner: homeTeam.id,
              tossDecision: 'BAT',
            },
          },
        },
      })

      // Create markets for the match
      await prisma.market.create({
        data: {
          matchId: matchRecord.id,
          type: MarketType.MATCH_WINNER,
          title: 'Match Winner',
          description: 'Predict the winner of the match',
          options: {
            create: [
              {
                label: homeTeam.name,
                odds: 1.85,
              },
              {
                label: awayTeam.name,
                odds: 2.0,
              },
            ],
          },
        },
      })

      // Get playing XI for both teams
      const homePlayers = await prisma.player.findMany({
        where: { teamId: homeTeam.id, isPlaying: true },
      })
      const awayPlayers = await prisma.player.findMany({
        where: { teamId: awayTeam.id, isPlaying: true },
      })

      // Create Highest Run Scorer market
      await prisma.market.create({
        data: {
          matchId: matchRecord.id,
          type: MarketType.HIGHEST_RUN_SCORER,
          title: 'Highest Run Scorer',
          description: 'Predict the player who will score the most runs',
          options: {
            create: [
              ...homePlayers.map(player => ({
                label: player.name,
                odds: 2.0,
              })),
              ...awayPlayers.map(player => ({
                label: player.name,
                odds: 2.0,
              })),
            ],
          },
        },
      })

      // Create Highest Wicket Taker market
      await prisma.market.create({
        data: {
          matchId: matchRecord.id,
          type: MarketType.HIGHEST_WICKET_TAKER,
          title: 'Highest Wicket Taker',
          description: 'Predict the player who will take the most wickets',
          options: {
            create: [
              ...homePlayers.map(player => ({
                label: player.name,
                odds: 2.0,
              })),
              ...awayPlayers.map(player => ({
                label: player.name,
                odds: 2.0,
              })),
            ],
          },
        },
      })

      // Create 200 Runs Barrier market
      await prisma.market.create({
        data: {
          matchId: matchRecord.id,
          type: MarketType.TWO_HUNDRED_RUNS_BARRIER,
          title: '200 Runs Barrier',
          description: 'Predict if either team will score 200 or more runs',
          options: {
            create: [
              {
                label: 'Yes',
                odds: 2.0,
              },
              {
                label: 'No',
                odds: 1.8,
              },
            ],
          },
        },
      })
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
