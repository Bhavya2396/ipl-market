import { PrismaClient } from "@prisma/client";
import { parse } from "date-fns";

const prisma = new PrismaClient();

const matches = [
  // March matches
  { date: "03/22/2025", time: "7:30 PM", homeTeam: "KOLKATA", awayTeam: "BENGALURU", venue: "Kolkata" },
  { date: "03/23/2025", time: "3:30 PM", homeTeam: "HYDERABAD", awayTeam: "RAJASTHAN", venue: "Hyderabad" },
  { date: "03/23/2025", time: "7:30 PM", homeTeam: "CHENNAI", awayTeam: "MUMBAI", venue: "Chennai" },
  { date: "03/24/2025", time: "7:30 PM", homeTeam: "DELHI", awayTeam: "LUCKNOW", venue: "Visakhapatnam" },
  { date: "03/25/2025", time: "7:30 PM", homeTeam: "GUJARAT", awayTeam: "PUNJAB", venue: "Ahmedabad" },
  { date: "03/26/2025", time: "7:30 PM", homeTeam: "RAJASTHAN", awayTeam: "KOLKATA", venue: "Guwahati" },
  { date: "03/27/2025", time: "7:30 PM", homeTeam: "HYDERABAD", awayTeam: "LUCKNOW", venue: "Hyderabad" },
  { date: "03/28/2025", time: "7:30 PM", homeTeam: "CHENNAI", awayTeam: "BENGALURU", venue: "Chennai" },
  { date: "03/29/2025", time: "7:30 PM", homeTeam: "GUJARAT", awayTeam: "MUMBAI", venue: "Ahmedabad" },
  { date: "03/30/2025", time: "3:30 PM", homeTeam: "DELHI", awayTeam: "HYDERABAD", venue: "Visakhapatnam" },
  { date: "03/30/2025", time: "7:30 PM", homeTeam: "RAJASTHAN", awayTeam: "CHENNAI", venue: "Guwahati" },
  { date: "03/31/2025", time: "7:30 PM", homeTeam: "MUMBAI", awayTeam: "KOLKATA", venue: "Wankhede Stadium" },
  
  // April matches
  { date: "04/01/2025", time: "7:30 PM", homeTeam: "LUCKNOW", awayTeam: "PUNJAB", venue: "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium" },
  { date: "04/02/2025", time: "7:30 PM", homeTeam: "BENGALURU", awayTeam: "GUJARAT", venue: "Bengaluru" },
  { date: "04/03/2025", time: "7:30 PM", homeTeam: "KOLKATA", awayTeam: "HYDERABAD", venue: "Kolkata" },
  { date: "04/04/2025", time: "7:30 PM", homeTeam: "LUCKNOW", awayTeam: "MUMBAI", venue: "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium" },
  { date: "04/05/2025", time: "3:30 PM", homeTeam: "CHENNAI", awayTeam: "DELHI", venue: "Chennai" },
  { date: "04/05/2025", time: "7:30 PM", homeTeam: "PUNJAB", awayTeam: "RAJASTHAN", venue: "Chandigarh" },
  { date: "04/06/2025", time: "3:30 PM", homeTeam: "KOLKATA", awayTeam: "LUCKNOW", venue: "Kolkata" },
  { date: "04/06/2025", time: "7:30 PM", homeTeam: "HYDERABAD", awayTeam: "GUJARAT", venue: "Hyderabad" },
  { date: "04/07/2025", time: "7:30 PM", homeTeam: "MUMBAI", awayTeam: "BENGALURU", venue: "Wankhede Stadium" },
  { date: "04/08/2025", time: "7:30 PM", homeTeam: "PUNJAB", awayTeam: "CHENNAI", venue: "Chandigarh" },
  { date: "04/09/2025", time: "7:30 PM", homeTeam: "GUJARAT", awayTeam: "RAJASTHAN", venue: "Ahmedabad" },
  { date: "04/10/2025", time: "7:30 PM", homeTeam: "BENGALURU", awayTeam: "DELHI", venue: "Bengaluru" },
  { date: "04/11/2025", time: "7:30 PM", homeTeam: "CHENNAI", awayTeam: "KOLKATA", venue: "Chennai" },
  { date: "04/12/2025", time: "3:30 PM", homeTeam: "LUCKNOW", awayTeam: "GUJARAT", venue: "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium" },
  { date: "04/12/2025", time: "7:30 PM", homeTeam: "HYDERABAD", awayTeam: "PUNJAB", venue: "Hyderabad" },
  { date: "04/13/2025", time: "3:30 PM", homeTeam: "RAJASTHAN", awayTeam: "BENGALURU", venue: "Jaipur" },
  { date: "04/13/2025", time: "7:30 PM", homeTeam: "DELHI", awayTeam: "MUMBAI", venue: "Delhi" },
  { date: "04/14/2025", time: "7:30 PM", homeTeam: "LUCKNOW", awayTeam: "CHENNAI", venue: "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium" },
  { date: "04/15/2025", time: "7:30 PM", homeTeam: "PUNJAB", awayTeam: "KOLKATA", venue: "Chandigarh" },
  { date: "04/16/2025", time: "7:30 PM", homeTeam: "DELHI", awayTeam: "RAJASTHAN", venue: "Delhi" },
  { date: "04/17/2025", time: "7:30 PM", homeTeam: "MUMBAI", awayTeam: "HYDERABAD", venue: "Wankhede Stadium" },
  { date: "04/18/2025", time: "7:30 PM", homeTeam: "BENGALURU", awayTeam: "PUNJAB", venue: "Bengaluru" },
  { date: "04/19/2025", time: "3:30 PM", homeTeam: "GUJARAT", awayTeam: "DELHI", venue: "Ahmedabad" },
  { date: "04/19/2025", time: "7:30 PM", homeTeam: "RAJASTHAN", awayTeam: "LUCKNOW", venue: "Jaipur" },
  { date: "04/20/2025", time: "3:30 PM", homeTeam: "PUNJAB", awayTeam: "BENGALURU", venue: "Chandigarh" },
  { date: "04/20/2025", time: "7:30 PM", homeTeam: "MUMBAI", awayTeam: "CHENNAI", venue: "Wankhede Stadium" },
  { date: "04/21/2025", time: "7:30 PM", homeTeam: "KOLKATA", awayTeam: "GUJARAT", venue: "Kolkata" },
  { date: "04/22/2025", time: "7:30 PM", homeTeam: "LUCKNOW", awayTeam: "DELHI", venue: "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium" },
  { date: "04/23/2025", time: "7:30 PM", homeTeam: "HYDERABAD", awayTeam: "MUMBAI", venue: "Hyderabad" },
  { date: "04/24/2025", time: "7:30 PM", homeTeam: "BENGALURU", awayTeam: "RAJASTHAN", venue: "Bengaluru" },
  { date: "04/25/2025", time: "7:30 PM", homeTeam: "CHENNAI", awayTeam: "HYDERABAD", venue: "Chennai" },
  { date: "04/26/2025", time: "7:30 PM", homeTeam: "KOLKATA", awayTeam: "PUNJAB", venue: "Kolkata" },
  { date: "04/27/2025", time: "3:30 PM", homeTeam: "MUMBAI", awayTeam: "LUCKNOW", venue: "Wankhede Stadium" },
  { date: "04/27/2025", time: "7:30 PM", homeTeam: "DELHI", awayTeam: "BENGALURU", venue: "Delhi" },
  { date: "04/28/2025", time: "7:30 PM", homeTeam: "RAJASTHAN", awayTeam: "GUJARAT", venue: "Jaipur" },
  { date: "04/29/2025", time: "7:30 PM", homeTeam: "DELHI", awayTeam: "KOLKATA", venue: "Delhi" },
  { date: "04/30/2025", time: "7:30 PM", homeTeam: "CHENNAI", awayTeam: "PUNJAB", venue: "Chennai" },
  
  // May matches
  { date: "05/01/2025", time: "7:30 PM", homeTeam: "RAJASTHAN", awayTeam: "MUMBAI", venue: "Jaipur" },
  { date: "05/02/2025", time: "7:30 PM", homeTeam: "GUJARAT", awayTeam: "HYDERABAD", venue: "Ahmedabad" },
  { date: "05/03/2025", time: "7:30 PM", homeTeam: "BENGALURU", awayTeam: "CHENNAI", venue: "Bengaluru" },
  { date: "05/04/2025", time: "3:30 PM", homeTeam: "KOLKATA", awayTeam: "RAJASTHAN", venue: "Kolkata" },
  { date: "05/04/2025", time: "7:30 PM", homeTeam: "PUNJAB", awayTeam: "LUCKNOW", venue: "Dharamsala" },
  { date: "05/05/2025", time: "7:30 PM", homeTeam: "HYDERABAD", awayTeam: "DELHI", venue: "Hyderabad" },
  { date: "05/06/2025", time: "7:30 PM", homeTeam: "MUMBAI", awayTeam: "GUJARAT", venue: "Wankhede Stadium" },
  { date: "05/07/2025", time: "7:30 PM", homeTeam: "KOLKATA", awayTeam: "CHENNAI", venue: "Kolkata" },
  { date: "05/08/2025", time: "7:30 PM", homeTeam: "PUNJAB", awayTeam: "DELHI", venue: "Dharamsala" },
  { date: "05/09/2025", time: "7:30 PM", homeTeam: "LUCKNOW", awayTeam: "BENGALURU", venue: "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium" },
  { date: "05/10/2025", time: "7:30 PM", homeTeam: "HYDERABAD", awayTeam: "LUCKNOW", venue: "Hyderabad" },
  { date: "05/11/2025", time: "3:30 PM", homeTeam: "PUNJAB", awayTeam: "MUMBAI", venue: "Dharamsala" },
  { date: "05/11/2025", time: "7:30 PM", homeTeam: "DELHI", awayTeam: "GUJARAT", venue: "Delhi" },
  { date: "05/12/2025", time: "7:30 PM", homeTeam: "CHENNAI", awayTeam: "RAJASTHAN", venue: "Chennai" },
  { date: "05/13/2025", time: "7:30 PM", homeTeam: "BENGALURU", awayTeam: "HYDERABAD", venue: "Bengaluru" },
  { date: "05/14/2025", time: "7:30 PM", homeTeam: "GUJARAT", awayTeam: "LUCKNOW", venue: "Ahmedabad" },
  { date: "05/15/2025", time: "7:30 PM", homeTeam: "MUMBAI", awayTeam: "DELHI", venue: "Wankhede Stadium" },
  { date: "05/16/2025", time: "7:30 PM", homeTeam: "RAJASTHAN", awayTeam: "PUNJAB", venue: "Jaipur" },
  { date: "05/17/2025", time: "7:30 PM", homeTeam: "BENGALURU", awayTeam: "KOLKATA", venue: "Bengaluru" },
  { date: "05/18/2025", time: "3:30 PM", homeTeam: "GUJARAT", awayTeam: "CHENNAI", venue: "Ahmedabad" },
  { date: "05/18/2025", time: "7:30 PM", homeTeam: "LUCKNOW", awayTeam: "HYDERABAD", venue: "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium" },
  
  // Playoffs
  { date: "05/20/2025", time: "7:30 PM", homeTeam: "TBD", awayTeam: "TBD", venue: "TBD" },
  { date: "05/21/2025", time: "7:30 PM", homeTeam: "TBD", awayTeam: "TBD", venue: "TBD" },
  { date: "05/23/2025", time: "7:30 PM", homeTeam: "TBD", awayTeam: "TBD", venue: "TBD" },
  { date: "05/25/2025", time: "7:30 PM", homeTeam: "TBD", awayTeam: "TBD", venue: "TBD" },
];

const teamShortNames: { [key: string]: string } = {
  "BENGALURU": "RCB",
  "GUJARAT": "GT",
  "KOLKATA": "KKR",
  "HYDERABAD": "SRH",
  "LUCKNOW": "LSG",
  "MUMBAI": "MI",
  "CHENNAI": "CSK",
  "DELHI": "DC",
  "PUNJAB": "PBKS",
  "RAJASTHAN": "RR",
  "TBD": "TBD"
};

async function main() {
  console.log("Starting match schedule update...");

  // Delete all existing matches
  await prisma.match.deleteMany();

  // Create matches
  for (const match of matches) {
    const dateTime = parse(`${match.date} ${match.time}`, "MM/dd/yyyy h:mm a", new Date());
    
    // Skip if either team is TBD
    if (match.homeTeam === "TBD" || match.awayTeam === "TBD") {
      console.log(`Skipping playoff match on ${match.date}`);
      continue;
    }

    try {
      // Get team IDs
      const homeTeam = await prisma.team.findUnique({
        where: { shortName: teamShortNames[match.homeTeam] }
      });
      const awayTeam = await prisma.team.findUnique({
        where: { shortName: teamShortNames[match.awayTeam] }
      });

      if (!homeTeam || !awayTeam) {
        console.error(`Could not find teams for match: ${match.homeTeam} vs ${match.awayTeam}`);
        continue;
      }

      // Create match
      const createdMatch = await prisma.match.create({
        data: {
          date: dateTime,
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          venue: match.venue,
          city: match.venue,
          status: "UPCOMING"
        }
      });

      console.log(`Created match: ${match.homeTeam} vs ${match.awayTeam} on ${match.date}`);
    } catch (error) {
      console.error(`Error creating match: ${match.homeTeam} vs ${match.awayTeam}`, error);
    }
  }

  console.log("Match schedule update completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 