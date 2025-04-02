import { PrismaClient, PlayerRole, MatchStatus, MarketType, MarketStatus } from '@prisma/client'

const prisma = new PrismaClient()

const IPL_TEAMS = [
  {
    name: 'Mumbai Indians',
    shortName: 'MI',
    logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/logos/Roundbig/MIroundbig.png',
  },
  {
    name: 'Chennai Super Kings',
    shortName: 'CSK',
    logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Roundbig/CSKroundbig.png',
  },
  {
    name: 'Royal Challengers Bangalore',
    shortName: 'RCB',
    logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/logos/Roundbig/RCBroundbig.png',
  },
  {
    name: 'Kolkata Knight Riders',
    shortName: 'KKR',
    logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/logos/Roundbig/KKRroundbig.png',
  },
  {
    name: 'Delhi Capitals',
    shortName: 'DC',
    logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/logos/Roundbig/DCroundbig.png',
  },
  {
    name: 'Rajasthan Royals',
    shortName: 'RR',
    logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RR/logos/Roundbig/RRroundbig.png',
  },
  {
    name: 'Sunrisers Hyderabad',
    shortName: 'SRH',
    logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/SRH/logos/Roundbig/SRHroundbig.png',
  },
  {
    name: 'Punjab Kings',
    shortName: 'PBKS',
    logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/logos/Roundbig/PBKSroundbig.png',
  },
  {
    name: 'Gujarat Titans',
    shortName: 'GT',
    logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/logos/Roundbig/GTroundbig.png',
  },
  {
    name: 'Lucknow Super Giants',
    shortName: 'LSG',
    logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/LSG/logos/Roundbig/LSGroundbig.png',
  },
]

const PLAYERS = {
  'Mumbai Indians': [
    { name: 'Rohit Sharma', shortName: 'RS', role: PlayerRole.BATSMAN },
    { name: 'Suryakumar Yadav', shortName: 'SKY', role: PlayerRole.BATSMAN },
    { name: 'Ishan Kishan', shortName: 'IK', role: PlayerRole.WICKET_KEEPER },
    { name: 'Hardik Pandya', shortName: 'HP', role: PlayerRole.ALL_ROUNDER },
    { name: 'Jasprit Bumrah', shortName: 'JB', role: PlayerRole.BOWLER },
    { name: 'Tilak Varma', shortName: 'TV', role: PlayerRole.BATSMAN },
    { name: 'Tim David', shortName: 'TD', role: PlayerRole.BATSMAN },
    { name: 'Piyush Chawla', shortName: 'PC', role: PlayerRole.BOWLER },
    { name: 'Jason Behrendorff', shortName: 'JBD', role: PlayerRole.BOWLER },
    { name: 'Akash Madhwal', shortName: 'AM', role: PlayerRole.BOWLER },
  ],
  'Chennai Super Kings': [
    { name: 'MS Dhoni', shortName: 'MSD', role: PlayerRole.WICKET_KEEPER },
    { name: 'Ruturaj Gaikwad', shortName: 'RG', role: PlayerRole.BATSMAN },
    { name: 'Ravindra Jadeja', shortName: 'RJ', role: PlayerRole.ALL_ROUNDER },
    { name: 'Deepak Chahar', shortName: 'DC', role: PlayerRole.BOWLER },
    { name: 'Moeen Ali', shortName: 'MA', role: PlayerRole.ALL_ROUNDER },
    { name: 'Devon Conway', shortName: 'DC', role: PlayerRole.BATSMAN },
    { name: 'Shivam Dube', shortName: 'SD', role: PlayerRole.ALL_ROUNDER },
    { name: 'Tushar Deshpande', shortName: 'TD', role: PlayerRole.BOWLER },
    { name: 'Maheesh Theekshana', shortName: 'MT', role: PlayerRole.BOWLER },
    { name: 'Matheesha Pathirana', shortName: 'MP', role: PlayerRole.BOWLER },
  ],
  'Royal Challengers Bangalore': [
    { name: 'Virat Kohli', shortName: 'VK', role: PlayerRole.BATSMAN },
    { name: 'Faf du Plessis', shortName: 'FDP', role: PlayerRole.BATSMAN },
    { name: 'Glenn Maxwell', shortName: 'GM', role: PlayerRole.ALL_ROUNDER },
    { name: 'Mohammed Siraj', shortName: 'MS', role: PlayerRole.BOWLER },
    { name: 'Dinesh Karthik', shortName: 'DK', role: PlayerRole.WICKET_KEEPER },
    { name: 'Rajat Patidar', shortName: 'RP', role: PlayerRole.BATSMAN },
    { name: 'Cameron Green', shortName: 'CG', role: PlayerRole.ALL_ROUNDER },
    { name: 'Wanindu Hasaranga', shortName: 'WH', role: PlayerRole.ALL_ROUNDER },
    { name: 'Harshal Patel', shortName: 'HP', role: PlayerRole.BOWLER },
    { name: 'Josh Hazlewood', shortName: 'JH', role: PlayerRole.BOWLER },
  ],
  'Kolkata Knight Riders': [
    { name: 'Shreyas Iyer', shortName: 'SI', role: PlayerRole.BATSMAN },
    { name: 'Nitish Rana', shortName: 'NR', role: PlayerRole.BATSMAN },
    { name: 'Andre Russell', shortName: 'AR', role: PlayerRole.ALL_ROUNDER },
    { name: 'Sunil Narine', shortName: 'SN', role: PlayerRole.ALL_ROUNDER },
    { name: 'Varun Chakaravarthy', shortName: 'VC', role: PlayerRole.BOWLER },
    { name: 'Venkatesh Iyer', shortName: 'VI', role: PlayerRole.ALL_ROUNDER },
    { name: 'Rinku Singh', shortName: 'RS', role: PlayerRole.BATSMAN },
    { name: 'Shardul Thakur', shortName: 'ST', role: PlayerRole.ALL_ROUNDER },
    { name: 'Umesh Yadav', shortName: 'UY', role: PlayerRole.BOWLER },
    { name: 'Lockie Ferguson', shortName: 'LF', role: PlayerRole.BOWLER },
  ],
  'Delhi Capitals': [
    { name: 'Rishabh Pant', shortName: 'RP', role: PlayerRole.WICKET_KEEPER },
    { name: 'David Warner', shortName: 'DW', role: PlayerRole.BATSMAN },
    { name: 'Axar Patel', shortName: 'AP', role: PlayerRole.ALL_ROUNDER },
    { name: 'Anrich Nortje', shortName: 'AN', role: PlayerRole.BOWLER },
    { name: 'Prithvi Shaw', shortName: 'PS', role: PlayerRole.BATSMAN },
    { name: 'Mitchell Marsh', shortName: 'MM', role: PlayerRole.ALL_ROUNDER },
    { name: 'Lalit Yadav', shortName: 'LY', role: PlayerRole.ALL_ROUNDER },
    { name: 'Kuldeep Yadav', shortName: 'KY', role: PlayerRole.BOWLER },
    { name: 'Ishant Sharma', shortName: 'IS', role: PlayerRole.BOWLER },
    { name: 'Mukesh Kumar', shortName: 'MK', role: PlayerRole.BOWLER },
  ],
  'Rajasthan Royals': [
    { name: 'Sanju Samson', shortName: 'SS', role: PlayerRole.WICKET_KEEPER },
    { name: 'Jos Buttler', shortName: 'JB', role: PlayerRole.WICKET_KEEPER },
    { name: 'Yashasvi Jaiswal', shortName: 'YJ', role: PlayerRole.BATSMAN },
    { name: 'R Ashwin', shortName: 'RA', role: PlayerRole.ALL_ROUNDER },
    { name: 'Trent Boult', shortName: 'TB', role: PlayerRole.BOWLER },
    { name: 'Shimron Hetmyer', shortName: 'SH', role: PlayerRole.BATSMAN },
    { name: 'Devdutt Padikkal', shortName: 'DP', role: PlayerRole.BATSMAN },
    { name: 'Yuzvendra Chahal', shortName: 'YC', role: PlayerRole.BOWLER },
    { name: 'Prasidh Krishna', shortName: 'PK', role: PlayerRole.BOWLER },
    { name: 'Navdeep Saini', shortName: 'NS', role: PlayerRole.BOWLER },
  ],
  'Sunrisers Hyderabad': [
    { name: 'Aiden Markram', shortName: 'AM', role: PlayerRole.BATSMAN },
    { name: 'Heinrich Klaasen', shortName: 'HK', role: PlayerRole.WICKET_KEEPER },
    { name: 'Mayank Agarwal', shortName: 'MA', role: PlayerRole.BATSMAN },
    { name: 'Marco Jansen', shortName: 'MJ', role: PlayerRole.ALL_ROUNDER },
    { name: 'Bhuvneshwar Kumar', shortName: 'BK', role: PlayerRole.BOWLER },
    { name: 'Rahul Tripathi', shortName: 'RT', role: PlayerRole.BATSMAN },
    { name: 'Abhishek Sharma', shortName: 'AS', role: PlayerRole.ALL_ROUNDER },
    { name: 'Washington Sundar', shortName: 'WS', role: PlayerRole.ALL_ROUNDER },
    { name: 'T Natarajan', shortName: 'TN', role: PlayerRole.BOWLER },
    { name: 'Umran Malik', shortName: 'UM', role: PlayerRole.BOWLER },
  ],
  'Punjab Kings': [
    { name: 'Shikhar Dhawan', shortName: 'SD', role: PlayerRole.BATSMAN },
    { name: 'Prabhsimran Singh', shortName: 'PS', role: PlayerRole.WICKET_KEEPER },
    { name: 'Sam Curran', shortName: 'SC', role: PlayerRole.ALL_ROUNDER },
    { name: 'Arshdeep Singh', shortName: 'AS', role: PlayerRole.BOWLER },
    { name: 'Rahul Chahar', shortName: 'RC', role: PlayerRole.BOWLER },
    { name: 'Liam Livingstone', shortName: 'LL', role: PlayerRole.ALL_ROUNDER },
    { name: 'Jitesh Sharma', shortName: 'JS', role: PlayerRole.WICKET_KEEPER },
    { name: 'Harpreet Brar', shortName: 'HB', role: PlayerRole.ALL_ROUNDER },
    { name: 'Nathan Ellis', shortName: 'NE', role: PlayerRole.BOWLER },
    { name: 'Kagiso Rabada', shortName: 'KR', role: PlayerRole.BOWLER },
  ],
  'Gujarat Titans': [
    { name: 'Shubman Gill', shortName: 'SG', role: PlayerRole.BATSMAN },
    { name: 'David Miller', shortName: 'DM', role: PlayerRole.BATSMAN },
    { name: 'Hardik Pandya', shortName: 'HP', role: PlayerRole.ALL_ROUNDER },
    { name: 'Rashid Khan', shortName: 'RK', role: PlayerRole.ALL_ROUNDER },
    { name: 'Mohammed Shami', shortName: 'MS', role: PlayerRole.BOWLER },
    { name: 'Wriddhiman Saha', shortName: 'WS', role: PlayerRole.WICKET_KEEPER },
    { name: 'Sai Sudharsan', shortName: 'SS', role: PlayerRole.BATSMAN },
    { name: 'Vijay Shankar', shortName: 'VS', role: PlayerRole.ALL_ROUNDER },
    { name: 'Alzarri Joseph', shortName: 'AJ', role: PlayerRole.BOWLER },
    { name: 'Joshua Little', shortName: 'JL', role: PlayerRole.BOWLER },
  ],
  'Lucknow Super Giants': [
    { name: 'KL Rahul', shortName: 'KLR', role: PlayerRole.WICKET_KEEPER },
    { name: 'Quinton de Kock', shortName: 'QDK', role: PlayerRole.WICKET_KEEPER },
    { name: 'Marcus Stoinis', shortName: 'MS', role: PlayerRole.ALL_ROUNDER },
    { name: 'Ravi Bishnoi', shortName: 'RB', role: PlayerRole.BOWLER },
    { name: 'Mark Wood', shortName: 'MW', role: PlayerRole.BOWLER },
    { name: 'Deepak Hooda', shortName: 'DH', role: PlayerRole.ALL_ROUNDER },
    { name: 'Krunal Pandya', shortName: 'KP', role: PlayerRole.ALL_ROUNDER },
    { name: 'Avesh Khan', shortName: 'AK', role: PlayerRole.BOWLER },
    { name: 'Naveen-ul-Haq', shortName: 'NUH', role: PlayerRole.BOWLER },
    { name: 'Ayush Badoni', shortName: 'AB', role: PlayerRole.BATSMAN },
  ],
}

const VENUES = [
  { name: 'Wankhede Stadium', city: 'Mumbai' },
  { name: 'M. A. Chidambaram Stadium', city: 'Chennai' },
  { name: 'M. Chinnaswamy Stadium', city: 'Bangalore' },
  { name: 'Eden Gardens', city: 'Kolkata' },
  { name: 'Arun Jaitley Stadium', city: 'Delhi' },
  { name: 'Sawai Mansingh Stadium', city: 'Jaipur' },
  { name: 'Rajiv Gandhi International Stadium', city: 'Hyderabad' },
  { name: 'Punjab Cricket Association Stadium', city: 'Mohali' },
  { name: 'Narendra Modi Stadium', city: 'Ahmedabad' },
  { name: 'Ekana Cricket Stadium', city: 'Lucknow' },
]

const MARKET_TYPES = [
  {
    type: MarketType.MATCH_WINNER,
    title: 'Match Winner',
    description: 'Predict the winner of the match',
    options: ['Home Team', 'Away Team'],
  },
  {
    type: MarketType.HIGHEST_RUN_SCORER,
    title: 'Highest Run Scorer',
    description: 'Predict the player who will score the most runs',
    options: ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'],
  },
  {
    type: MarketType.HIGHEST_WICKET_TAKER,
    title: 'Highest Wicket Taker',
    description: 'Predict the player who will take the most wickets',
    options: ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'],
  },
  {
    type: MarketType.TWO_HUNDRED_RUNS_BARRIER,
    title: '200 Runs Barrier',
    description: 'Predict if any team will score 200 or more runs',
    options: ['Yes', 'No'],
  },
]

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.prediction.deleteMany()
  await prisma.marketOption.deleteMany()
  await prisma.market.deleteMany()
  await prisma.playerPerformance.deleteMany()
  await prisma.playerStats.deleteMany()
  await prisma.player.deleteMany()
  await prisma.matchDetails.deleteMany()
  await prisma.match.deleteMany()
  await prisma.team.deleteMany()

  // Create teams
  console.log('Creating teams...')
  const teams = await Promise.all(
    IPL_TEAMS.map(team => prisma.team.create({ data: team }))
  )
  console.log(`Created ${teams.length} teams`)

  // Create players for each team
  console.log('Creating players...')
  const players = new Map()
  for (const team of teams) {
    const teamPlayers = PLAYERS[team.name as keyof typeof PLAYERS]
    if (teamPlayers) {
      const createdPlayers = await Promise.all(
        teamPlayers.map(player =>
          prisma.player.create({
          data: {
              ...player,
            teamId: team.id,
          },
        })
        )
      )
      players.set(team.id, createdPlayers)
      console.log(`Created ${createdPlayers.length} players for ${team.name}`)
    }
  }

  // Create matches
  console.log('Creating matches...')
  const matches = []
  const startDate = new Date('2025-03-22')
  let matchDate = new Date(startDate)

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const homeTeam = teams[i]
      const awayTeam = teams[j]
      const venue = VENUES[i]

      // Create match
      const match = await prisma.match.create({
        data: {
          date: new Date(matchDate),
          status: MatchStatus.UPCOMING,
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          venue: venue.name,
          city: venue.city,
          details: {
            create: {},
          },
        },
      })
      matches.push(match)

      // Create markets for the match
      for (const marketType of MARKET_TYPES) {
        const market = await prisma.market.create({
        data: {
            matchId: match.id,
            type: marketType.type,
            title: marketType.title,
            description: marketType.description,
            status: MarketStatus.ACTIVE,
          options: {
              create: marketType.options.map(text => ({
                label: text,
              })),
          },
        },
      })
      }

      // Increment date by 1 day for next match
      matchDate.setDate(matchDate.getDate() + 1)
    }
  }
  console.log(`Created ${matches.length} matches with markets`)

  // Create player stats
  console.log('Creating player stats...')
  for (const [teamId, teamPlayers] of players) {
    for (const player of teamPlayers) {
      await prisma.playerStats.create({
        data: {
          playerId: player.id,
          matches: Math.floor(Math.random() * 10) + 1,
          runs: Math.floor(Math.random() * 500) + 100,
          wickets: Math.floor(Math.random() * 20) + 1,
          catches: Math.floor(Math.random() * 10) + 1,
          stumpings: Math.floor(Math.random() * 5),
        },
      })
    }
  }
  console.log('Created player stats')

  console.log('✅ Database seeded successfully')
}

main()
  .catch(e => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
