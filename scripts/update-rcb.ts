import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Updating Royal Challengers team name...');

  const rcbTeam = await prisma.team.findFirst({
    where: {
      name: 'Royal Challengers Bangalore'
    }
  });

  if (rcbTeam) {
    await prisma.team.update({
      where: {
        id: rcbTeam.id
      },
      data: {
        name: 'Royal Challengers Bengaluru'
      }
    });
    console.log('✅ Updated team name from "Royal Challengers Bangalore" to "Royal Challengers Bengaluru"');
  } else {
    console.log('❌ Could not find "Royal Challengers Bangalore" team');
  }
}

main()
  .catch((e) => {
    console.error('❌ Update failed');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 