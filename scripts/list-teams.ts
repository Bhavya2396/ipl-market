import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Listing all teams...');

  const teams = await prisma.team.findMany();

  console.log('Teams in database:');
  teams.forEach(team => {
    console.log(`- ${team.name} (${team.shortName})`);
  });

  console.log(`Total: ${teams.length} teams`);
}

main()
  .catch((e) => {
    console.error('❌ Failed to list teams');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 