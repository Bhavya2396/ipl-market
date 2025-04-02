import { PrismaClient, PlayerRole } from "@prisma/client";

const prisma = new PrismaClient();

const teams = {
  "Chennai Super Kings": {
    shortName: "CSK",
    players: [
      // Batters
      { name: "Ruturaj Gaikwad", shortName: "RG", role: PlayerRole.BATSMAN },
      { name: "MS Dhoni", shortName: "MSD", role: PlayerRole.WICKET_KEEPER },
      { name: "Devon Conway", shortName: "DC", role: PlayerRole.BATSMAN },
      { name: "Rahul Tripathi", shortName: "RT", role: PlayerRole.BATSMAN },
      { name: "Shaik Rasheed", shortName: "SR", role: PlayerRole.BATSMAN },
      { name: "Vansh Bedi", shortName: "VB", role: PlayerRole.WICKET_KEEPER },
      { name: "Andre Siddarth", shortName: "AS", role: PlayerRole.BATSMAN },
      
      // All Rounders
      { name: "Rachin Ravindra", shortName: "RR", role: PlayerRole.ALL_ROUNDER },
      { name: "Ravichandran Ashwin", shortName: "RA", role: PlayerRole.ALL_ROUNDER },
      { name: "Vijay Shankar", shortName: "VS", role: PlayerRole.ALL_ROUNDER },
      { name: "Sam Curran", shortName: "SC", role: PlayerRole.ALL_ROUNDER },
      { name: "Anshul Kamboj", shortName: "AK", role: PlayerRole.ALL_ROUNDER },
      { name: "Deepak Hooda", shortName: "DH", role: PlayerRole.ALL_ROUNDER },
      { name: "Jamie Overton", shortName: "JO", role: PlayerRole.ALL_ROUNDER },
      { name: "Kamlesh Nagarkoti", shortName: "KN", role: PlayerRole.ALL_ROUNDER },
      { name: "Ramakrishna Ghosh", shortName: "RG", role: PlayerRole.ALL_ROUNDER },
      { name: "Ravindra Jadeja", shortName: "RJ", role: PlayerRole.ALL_ROUNDER },
      { name: "Shivam Dube", shortName: "SD", role: PlayerRole.ALL_ROUNDER },
      
      // Bowlers
      { name: "Khaleel Ahmed", shortName: "KA", role: PlayerRole.BOWLER },
      { name: "Noor Ahmad", shortName: "NA", role: PlayerRole.BOWLER },
      { name: "Mukesh Choudhary", shortName: "MC", role: PlayerRole.BOWLER },
      { name: "Gurjapneet Singh", shortName: "GS", role: PlayerRole.BOWLER },
      { name: "Nathan Ellis", shortName: "NE", role: PlayerRole.BOWLER },
      { name: "Shreyas Gopal", shortName: "SG", role: PlayerRole.BOWLER },
      { name: "Matheesha Pathirana", shortName: "MP", role: PlayerRole.BOWLER },
    ],
  },
  "Delhi Capitals": {
    shortName: "DC",
    players: [
      { name: "Axar Patel", shortName: "AP", role: PlayerRole.BOWLER },
      { name: "Kuldeep Yadav", shortName: "KY", role: PlayerRole.BOWLER },
      { name: "Tristan Stubbs", shortName: "TS", role: PlayerRole.BATSMAN },
      { name: "Abishek Porel", shortName: "AP", role: PlayerRole.BATSMAN },
      { name: "Mitchell Starc", shortName: "MS", role: PlayerRole.BOWLER },
      { name: "KL Rahul", shortName: "KL", role: PlayerRole.WICKET_KEEPER },
      { name: "Harry Brook", shortName: "HB", role: PlayerRole.BATSMAN },
      { name: "Jake Fraser-Mcgurk", shortName: "JFM", role: PlayerRole.BATSMAN },
      { name: "T Natarajan", shortName: "TN", role: PlayerRole.BOWLER },
      { name: "Karun Nair", shortName: "KN", role: PlayerRole.BATSMAN },
      { name: "Sameer Rizvi", shortName: "SR", role: PlayerRole.ALL_ROUNDER },
      { name: "Ashutosh Sharma", shortName: "AS", role: PlayerRole.ALL_ROUNDER },
      { name: "Mohit Sharma", shortName: "MS", role: PlayerRole.BOWLER },
      { name: "Faf du Plessis", shortName: "FDP", role: PlayerRole.BATSMAN },
      { name: "Mukesh Kumar", shortName: "MK", role: PlayerRole.BOWLER },
      { name: "Darshan Nalkande", shortName: "DN", role: PlayerRole.ALL_ROUNDER },
      { name: "Vipraj Nigam", shortName: "VN", role: PlayerRole.ALL_ROUNDER },
      { name: "Dushmantha Chameera", shortName: "DC", role: PlayerRole.BOWLER },
      { name: "Donovan Ferreira", shortName: "DF", role: PlayerRole.BATSMAN },
      { name: "Ajay Mandal", shortName: "AM", role: PlayerRole.ALL_ROUNDER },
      { name: "Manvanth Kumar", shortName: "MK", role: PlayerRole.ALL_ROUNDER },
      { name: "Madhav Tiwari", shortName: "MT", role: PlayerRole.ALL_ROUNDER },
      { name: "Tripurana Vijay", shortName: "TV", role: PlayerRole.ALL_ROUNDER },
    ],
  },
  "Gujarat Titans": {
    shortName: "GT",
    players: [
      { name: "Rashid Khan", shortName: "RK", role: PlayerRole.BOWLER },
      { name: "Shubman Gill", shortName: "SG", role: PlayerRole.BATSMAN },
      { name: "Sai Sudharsan", shortName: "SS", role: PlayerRole.BATSMAN },
      { name: "Rahul Tewatia", shortName: "RT", role: PlayerRole.ALL_ROUNDER },
      { name: "Shahrukh Khan", shortName: "SK", role: PlayerRole.BATSMAN },
      { name: "Kagiso Rabada", shortName: "KR", role: PlayerRole.BOWLER },
      { name: "Jos Buttler", shortName: "JB", role: PlayerRole.WICKET_KEEPER },
      { name: "Mohammad Siraj", shortName: "MS", role: PlayerRole.BOWLER },
      { name: "Prasidh Krishna", shortName: "PK", role: PlayerRole.BOWLER },
      { name: "Nishant Sindhu", shortName: "NS", role: PlayerRole.ALL_ROUNDER },
      { name: "Mahipal Lomror", shortName: "ML", role: PlayerRole.ALL_ROUNDER },
      { name: "Kumar Kushagra", shortName: "KK", role: PlayerRole.BATSMAN },
      { name: "Anuj Rawat", shortName: "AR", role: PlayerRole.WICKET_KEEPER },
      { name: "Manav Suthar", shortName: "MS", role: PlayerRole.BOWLER },
      { name: "Washington Sundar", shortName: "WS", role: PlayerRole.ALL_ROUNDER },
      { name: "Gerald Coetzee", shortName: "GC", role: PlayerRole.BOWLER },
      { name: "Arshad Khan", shortName: "AK", role: PlayerRole.ALL_ROUNDER },
      { name: "Gurnoor Brar", shortName: "GB", role: PlayerRole.BOWLER },
      { name: "Sherfane Rutherford", shortName: "SR", role: PlayerRole.BATSMAN },
      { name: "R Sai Kishore", shortName: "RSK", role: PlayerRole.ALL_ROUNDER },
      { name: "Ishant Sharma", shortName: "IS", role: PlayerRole.BOWLER },
      { name: "Jayant Yadav", shortName: "JY", role: PlayerRole.ALL_ROUNDER },
      { name: "Glenn Phillips", shortName: "GP", role: PlayerRole.ALL_ROUNDER },
      { name: "Karim Janat", shortName: "KJ", role: PlayerRole.ALL_ROUNDER },
      { name: "Kulwant Khejroliya", shortName: "KK", role: PlayerRole.BOWLER },
    ],
  },
  "Kolkata Knight Riders": {
    shortName: "KKR",
    players: [
      { name: "Rinku Singh", shortName: "RS", role: PlayerRole.BATSMAN },
      { name: "Varun Chakaravarthy", shortName: "VC", role: PlayerRole.BOWLER },
      { name: "Sunil Narine", shortName: "SN", role: PlayerRole.ALL_ROUNDER },
      { name: "Andre Russell", shortName: "AR", role: PlayerRole.ALL_ROUNDER },
      { name: "Harshit Rana", shortName: "HR", role: PlayerRole.BOWLER },
      { name: "Ramandeep Singh", shortName: "RS", role: PlayerRole.BATSMAN },
      { name: "Venkatesh Iyer", shortName: "VI", role: PlayerRole.BATSMAN },
      { name: "Quinton de Kock", shortName: "QDK", role: PlayerRole.WICKET_KEEPER },
      { name: "Rahmanullah Gurbaz", shortName: "RG", role: PlayerRole.WICKET_KEEPER },
      { name: "Anrich Nortje", shortName: "AN", role: PlayerRole.BOWLER },
      { name: "Angkrish Raghuvanshi", shortName: "AR", role: PlayerRole.ALL_ROUNDER },
      { name: "Vaibhav Arora", shortName: "VA", role: PlayerRole.BOWLER },
      { name: "Mayank Markande", shortName: "MM", role: PlayerRole.BOWLER },
      { name: "Rovman Powell", shortName: "RP", role: PlayerRole.BATSMAN },
      { name: "Manish Pandey", shortName: "MP", role: PlayerRole.BATSMAN },
      { name: "Spencer Johnson", shortName: "SJ", role: PlayerRole.BOWLER },
      { name: "Luvnith Sisodia", shortName: "LS", role: PlayerRole.WICKET_KEEPER },
      { name: "Ajinkya Rahane", shortName: "AR", role: PlayerRole.BATSMAN },
      { name: "Anukul Roy", shortName: "AR", role: PlayerRole.ALL_ROUNDER },
      { name: "Moeen Ali", shortName: "MA", role: PlayerRole.ALL_ROUNDER },
      { name: "Umran Malik", shortName: "UM", role: PlayerRole.BOWLER },
    ],
  },
  "Lucknow Super Giants": {
    shortName: "LSG",
    players: [
      { name: "Nicholas Pooran", shortName: "NP", role: PlayerRole.WICKET_KEEPER },
      { name: "Ravi Bishnoi", shortName: "RB", role: PlayerRole.BOWLER },
      { name: "Mayank Yadav", shortName: "MY", role: PlayerRole.BOWLER },
      { name: "Mohsin Khan", shortName: "MK", role: PlayerRole.BOWLER },
      { name: "Ayush Badoni", shortName: "AB", role: PlayerRole.BATSMAN },
      { name: "Rishabh Pant", shortName: "RP", role: PlayerRole.WICKET_KEEPER },
      { name: "David Miller", shortName: "DM", role: PlayerRole.BATSMAN },
      { name: "Mitchell Marsh", shortName: "MM", role: PlayerRole.ALL_ROUNDER },
      { name: "Aiden Markram", shortName: "AM", role: PlayerRole.BATSMAN },
      { name: "Avesh Khan", shortName: "AK", role: PlayerRole.BOWLER },
      { name: "Abdul Samad", shortName: "AS", role: PlayerRole.ALL_ROUNDER },
      { name: "Aryan Juyal", shortName: "AJ", role: PlayerRole.WICKET_KEEPER },
      { name: "Akash Deep", shortName: "AD", role: PlayerRole.BOWLER },
      { name: "Himmat Singh", shortName: "HS", role: PlayerRole.BATSMAN },
      { name: "M Siddharth", shortName: "MS", role: PlayerRole.BOWLER },
      { name: "Digvesh Singh", shortName: "DS", role: PlayerRole.BOWLER },
      { name: "Shahbaz Ahmed", shortName: "SA", role: PlayerRole.ALL_ROUNDER },
      { name: "Akash Singh", shortName: "AS", role: PlayerRole.BOWLER },
      { name: "Shamar Joseph", shortName: "SJ", role: PlayerRole.BOWLER },
      { name: "Prince Yadav", shortName: "PY", role: PlayerRole.BOWLER },
      { name: "Yuvraj Chaudhary", shortName: "YC", role: PlayerRole.ALL_ROUNDER },
      { name: "Rajvardhan Hangargekar", shortName: "RH", role: PlayerRole.ALL_ROUNDER },
      { name: "Arshin Kulkarni", shortName: "AK", role: PlayerRole.ALL_ROUNDER },
      { name: "Matthew Breetzke", shortName: "MB", role: PlayerRole.BATSMAN },
    ],
  },
  "Mumbai Indians": {
    shortName: "MI",
    players: [
      { name: "Jasprit Bumrah", shortName: "JB", role: PlayerRole.BOWLER },
      { name: "Suryakumar Yadav", shortName: "SY", role: PlayerRole.BATSMAN },
      { name: "Hardik Pandya", shortName: "HP", role: PlayerRole.ALL_ROUNDER },
      { name: "Rohit Sharma", shortName: "RS", role: PlayerRole.BATSMAN },
      { name: "Tilak Varma", shortName: "TV", role: PlayerRole.BATSMAN },
      { name: "Trent Boult", shortName: "TB", role: PlayerRole.BOWLER },
      { name: "Naman Dhir", shortName: "ND", role: PlayerRole.ALL_ROUNDER },
      { name: "Robin Minz", shortName: "RM", role: PlayerRole.WICKET_KEEPER },
      { name: "Karn Sharma", shortName: "KS", role: PlayerRole.BOWLER },
      { name: "Ryan Rickelton", shortName: "RR", role: PlayerRole.WICKET_KEEPER },
      { name: "Deepak Chahar", shortName: "DC", role: PlayerRole.BOWLER },
      { name: "Allah Ghazanfar", shortName: "AG", role: PlayerRole.BOWLER },
      { name: "Will Jacks", shortName: "WJ", role: PlayerRole.ALL_ROUNDER },
      { name: "Ashwani Kumar", shortName: "AK", role: PlayerRole.BOWLER },
      { name: "Mitchell Santner", shortName: "MS", role: PlayerRole.ALL_ROUNDER },
      { name: "Reece Topley", shortName: "RT", role: PlayerRole.BOWLER },
      { name: "Shrijith Krishnan", shortName: "SK", role: PlayerRole.BOWLER },
      { name: "Raj Bawa", shortName: "RB", role: PlayerRole.ALL_ROUNDER },
      { name: "Satyanarayana Raju", shortName: "SR", role: PlayerRole.BOWLER },
      { name: "Bevon Jacobs", shortName: "BJ", role: PlayerRole.BATSMAN },
      { name: "Arjun Tendulkar", shortName: "AT", role: PlayerRole.BOWLER },
      { name: "Lizaad Williams", shortName: "LW", role: PlayerRole.BOWLER },
      { name: "Vignesh Puthur", shortName: "VP", role: PlayerRole.ALL_ROUNDER },
    ],
  },
  "Punjab Kings": {
    shortName: "PBKS",
    players: [
      { name: "Shashank Singh", shortName: "SS", role: PlayerRole.BATSMAN },
      { name: "Prabhsimran Singh", shortName: "PS", role: PlayerRole.WICKET_KEEPER },
      { name: "Arshdeep Singh", shortName: "AS", role: PlayerRole.BOWLER },
      { name: "Shreyas Iyer", shortName: "SI", role: PlayerRole.BATSMAN },
      { name: "Yuzvendra Chahal", shortName: "YC", role: PlayerRole.BOWLER },
      { name: "Marcus Stoinis", shortName: "MS", role: PlayerRole.ALL_ROUNDER },
      { name: "Glenn Maxwell", shortName: "GM", role: PlayerRole.ALL_ROUNDER },
      { name: "Nehal Wadhera", shortName: "NW", role: PlayerRole.BATSMAN },
      { name: "Harpreet Brar", shortName: "HB", role: PlayerRole.ALL_ROUNDER },
      { name: "Vishnu Vinod", shortName: "VV", role: PlayerRole.WICKET_KEEPER },
      { name: "Vijaykumar Vyshak", shortName: "VV", role: PlayerRole.BOWLER },
      { name: "Yash Thakur", shortName: "YT", role: PlayerRole.BOWLER },
      { name: "Marco Jansen", shortName: "MJ", role: PlayerRole.ALL_ROUNDER },
      { name: "Josh Inglis", shortName: "JI", role: PlayerRole.WICKET_KEEPER },
      { name: "Lockie Ferguson", shortName: "LF", role: PlayerRole.BOWLER },
      { name: "Azmatullah Omarzai", shortName: "AO", role: PlayerRole.ALL_ROUNDER },
      { name: "Harnoor Pannu", shortName: "HP", role: PlayerRole.BATSMAN },
      { name: "Kuldeep Sen", shortName: "KS", role: PlayerRole.BOWLER },
      { name: "Priyansh Arya", shortName: "PA", role: PlayerRole.BATSMAN },
      { name: "Aaron Hardie", shortName: "AH", role: PlayerRole.ALL_ROUNDER },
      { name: "Suryash Shedge", shortName: "SS", role: PlayerRole.ALL_ROUNDER },
      { name: "Musheer Khan", shortName: "MK", role: PlayerRole.ALL_ROUNDER },
      { name: "Xavier Bartlett", shortName: "XB", role: PlayerRole.BOWLER },
      { name: "Pyla Avinash", shortName: "PA", role: PlayerRole.BATSMAN },
      { name: "Praveen Dubey", shortName: "PD", role: PlayerRole.ALL_ROUNDER },
    ],
  },
  "Rajasthan Royals": {
    shortName: "RR",
    players: [
      { name: "Sanju Samson", shortName: "SS", role: PlayerRole.WICKET_KEEPER },
      { name: "Yashasvi Jaiswal", shortName: "YJ", role: PlayerRole.BATSMAN },
      { name: "Riyan Parag", shortName: "RP", role: PlayerRole.BATSMAN },
      { name: "Dhruv Jurel", shortName: "DJ", role: PlayerRole.WICKET_KEEPER },
      { name: "Shimron Hetmyer", shortName: "SH", role: PlayerRole.BATSMAN },
      { name: "Sandeep Sharma", shortName: "SS", role: PlayerRole.BOWLER },
      { name: "Jofra Archer", shortName: "JA", role: PlayerRole.BOWLER },
      { name: "Mahesh Theekshana", shortName: "MT", role: PlayerRole.BOWLER },
      { name: "Wanindu Hasaranga", shortName: "WH", role: PlayerRole.BOWLER },
      { name: "Akash Madhwal", shortName: "AM", role: PlayerRole.BOWLER },
      { name: "Kumar Kartikeya Singh", shortName: "KKS", role: PlayerRole.BOWLER },
      { name: "Nitish Rana", shortName: "NR", role: PlayerRole.ALL_ROUNDER },
      { name: "Tushar Deshpande", shortName: "TD", role: PlayerRole.BOWLER },
      { name: "Shubham Dubey", shortName: "SD", role: PlayerRole.BATSMAN },
      { name: "Yudhvir Charak", shortName: "YC", role: PlayerRole.ALL_ROUNDER },
      { name: "Fazalhaq Farooqi", shortName: "FF", role: PlayerRole.BOWLER },
      { name: "Vaibhav Suryavanshi", shortName: "VS", role: PlayerRole.BATSMAN },
      { name: "Kwena Maphaka", shortName: "KM", role: PlayerRole.BOWLER },
      { name: "Ashok Sharma", shortName: "AS", role: PlayerRole.BOWLER },
      { name: "Kunal Singh Rathore", shortName: "KSR", role: PlayerRole.BATSMAN },
    ],
  },
  "Royal Challengers Bengaluru": {
    shortName: "RCB",
    players: [
      { name: "Virat Kohli", shortName: "VK", role: PlayerRole.BATSMAN },
      { name: "Rajat Patidar", shortName: "RP", role: PlayerRole.BATSMAN },
      { name: "Yash Dayal", shortName: "YD", role: PlayerRole.BOWLER },
      { name: "Liam Livingstone", shortName: "LL", role: PlayerRole.ALL_ROUNDER },
      { name: "Phil Salt", shortName: "PS", role: PlayerRole.WICKET_KEEPER },
      { name: "Jitesh Sharma", shortName: "JS", role: PlayerRole.WICKET_KEEPER },
      { name: "Josh Hazlewood", shortName: "JH", role: PlayerRole.BOWLER },
      { name: "Rasikh Dar", shortName: "RD", role: PlayerRole.BOWLER },
      { name: "Suyash Sharma", shortName: "SS", role: PlayerRole.BOWLER },
      { name: "Krunal Pandya", shortName: "KP", role: PlayerRole.ALL_ROUNDER },
      { name: "Bhuvneshwar Kumar", shortName: "BK", role: PlayerRole.BOWLER },
      { name: "Swapnil Singh", shortName: "SS", role: PlayerRole.ALL_ROUNDER },
      { name: "Tim David", shortName: "TD", role: PlayerRole.ALL_ROUNDER },
      { name: "Romario Shepherd", shortName: "RS", role: PlayerRole.ALL_ROUNDER },
      { name: "Nuwan Thushara", shortName: "NT", role: PlayerRole.BOWLER },
      { name: "Manoj Bhandage", shortName: "MB", role: PlayerRole.BOWLER },
      { name: "Jacob Bethell", shortName: "JB", role: PlayerRole.ALL_ROUNDER },
      { name: "Devdutt Padikkal", shortName: "DP", role: PlayerRole.BATSMAN },
      { name: "Swastik Chikara", shortName: "SC", role: PlayerRole.BATSMAN },
      { name: "Mohit Rathee", shortName: "MR", role: PlayerRole.BOWLER },
      { name: "Abhinandan Singh", shortName: "AS", role: PlayerRole.BOWLER },
      { name: "Lungi Ngidi", shortName: "LN", role: PlayerRole.BOWLER },
    ],
  },
  "Sunrisers Hyderabad": {
    shortName: "SRH",
    players: [
      { name: "Heinrich Klaasen", shortName: "HK", role: PlayerRole.WICKET_KEEPER },
      { name: "Pat Cummins", shortName: "PC", role: PlayerRole.BOWLER },
      { name: "Abhishek Sharma", shortName: "AS", role: PlayerRole.ALL_ROUNDER },
      { name: "Travis Head", shortName: "TH", role: PlayerRole.BATSMAN },
      { name: "Nitish Kumar Reddy", shortName: "NKR", role: PlayerRole.ALL_ROUNDER },
      { name: "Mohammad Shami", shortName: "MS", role: PlayerRole.BOWLER },
      { name: "Harshal Patel", shortName: "HP", role: PlayerRole.ALL_ROUNDER },
      { name: "Ishan Kishan", shortName: "IK", role: PlayerRole.WICKET_KEEPER },
      { name: "Rahul Chahar", shortName: "RC", role: PlayerRole.BOWLER },
      { name: "Adam Zampa", shortName: "AZ", role: PlayerRole.BOWLER },
      { name: "Atharva Taide", shortName: "AT", role: PlayerRole.ALL_ROUNDER },
      { name: "Abhinav Manohar", shortName: "AM", role: PlayerRole.ALL_ROUNDER },
      { name: "Simarjeet Singh", shortName: "SS", role: PlayerRole.BOWLER },
      { name: "Zeeshan Ansari", shortName: "ZA", role: PlayerRole.BOWLER },
      { name: "Jaydev Unadkat", shortName: "JU", role: PlayerRole.BOWLER },
      { name: "Brydon Carse", shortName: "BC", role: PlayerRole.ALL_ROUNDER },
      { name: "Kamindu Mendis", shortName: "KM", role: PlayerRole.ALL_ROUNDER },
      { name: "Aniket Verma", shortName: "AV", role: PlayerRole.BATSMAN },
      { name: "Eshan Malinga", shortName: "EM", role: PlayerRole.BOWLER },
      { name: "Sachin Baby", shortName: "SB", role: PlayerRole.BATSMAN },
    ],
  },
};

async function main() {
  console.log("Starting player update process...");

  // Delete all existing players and teams
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();

  // Create teams and players
  for (const [teamName, teamData] of Object.entries(teams)) {
    console.log(`Creating team: ${teamName}`);
    
    // Create team
    const team = await prisma.team.create({
      data: {
        name: teamName,
        shortName: teamData.shortName,
      },
    });

    // Create players for the team
    for (const player of teamData.players) {
      console.log(`Creating player: ${player.name}`);
      await prisma.player.create({
        data: {
          name: player.name,
          shortName: player.shortName,
          role: player.role,
          teamId: team.id,
        },
      });
    }
  }

  console.log("Player update process completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 